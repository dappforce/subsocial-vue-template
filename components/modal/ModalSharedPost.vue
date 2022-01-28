<template>
  <div data-app>
    <v-dialog
      v-model="openModal"
      max-width="763"
      @click:outside="clickOutside"
    >
      <v-card v-if="post && openModal" class="shared-post-container">
        <v-icon class="close-icon" size="24" @click="onClick">
          mdi-close
        </v-icon>

        <div class="title">
          {{ $t('post.sharePost') }}
        </div>

        <SpacesDropdown class="modal-space-dropdown" :space-id="post.spaceId" :is-filter="true" @selectedSpace="updateSpaceID" />

        <MdeEditor
          :show-editor="true"
          :height="'50px'"
          :placeholder="$t('post.addComment')"
          :text="comment"
          @contentUpdate="updateComment"
        />

        <PostListItem v-if="post" :post-item-data="post" :current-user-id="currentUser ? currentUser.id : null" :is-shared-post="true" />

        <div class="button-container">
          <v-btn class="button-third-color" @click="onClick">
            {{ $t('buttons.cancel') }}
          </v-btn>
          <v-btn class="button-main-color" @click="sharePost">
            {{ $t('buttons.createAPost') }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss">
.shared-post-container {
  width: $general_width;
  padding: $space_large;

  &.v-card {
    overflow: hidden;
    max-height: 80vh;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: none;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $color_gray;
      width: 6px;
    }
  }

  .close-icon {
    position: absolute;
    right: $space_normal;
    top: $space_normal;
  }

  .title {
    font-size: $font_large;
    font-weight: 500;
  }

  .modal-space-dropdown {
    margin-bottom: $space_normal;

    .v-input {
      &__slot {
        min-height: 40px;
      }

      &__append-inner {
        margin-top: 8px;
      }
    }

  }

  .editor-toolbar, .CodeMirror {
    border-color: $color_border;
  }

  .v-text-field--outlined fieldset {
    border-color: $color_border;
  }

  .v-text-field--outlined.v-input--is-focused fieldset,
  .v-text-field--outlined.v-input--has-state fieldset {
    border-width: 1px;
    border-color: $color_font_normal;
  }

  .button-container {
    margin-top: $space_big;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: $space_normal;

    .button-main-color {
      background-color: $color_primary;
    }

    .button-third-color {
      background-color: $color_white
    }

    button {
      min-width: 110px !important;
      font-size: $font_normal;
      border: 1px solid #E0E0E0 !important;
      border-radius: $border_small;
      box-shadow: none;
      text-transform: initial;

      &:last-child {
        border: none;
        color: $color_white;
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import { ProfileStruct } from '@subsocial/api/flat-subsocial/flatteners'
import { CommonContent, IpfsCid } from '@subsocial/types'
import { SubmittableResult } from '@polkadot/api'
import { createPostSlug } from '@subsocial/utils'
import sanitizeHtml from 'sanitize-html'
import { PostListItemData } from '~/models/post/post-list-item.model'
import TransactionButton from '~/components/abstract/TransactionButton.vue'
import { METHODS, PALLETS } from '~/constants/query'
import TransactionService from '~/services/transaction.service'
import { getNewIdFromEvent } from '~/utils/utils'
import { SpaceListItemData } from '~/models/space/space-list-item.model'

const transactionService = new TransactionService()

@Component
export default class ModalSharedPost extends TransactionButton {
  @Prop({
    type: Boolean,
    default: false
  }) isModal!: boolean

  @Prop({
    type: String
  }) postId!: string

  @Prop({
    type: String
  }) rootPostId!: string

  openModal: boolean = false
  spacesIds: string[] = []
  spaceId: string = ''
  comment: string = ''
  post: PostListItemData | null = null
  currentUser?: ProfileStruct
  cid: IpfsCid | undefined

  @Watch('isModal')
  isModalHandler () {
    this.openModal = this.isModal
    this.getPost()
    this.setCurrentUser()
  }

  onClick (): void {
    this.clickOutside()
    this.openModal = !this.openModal
  }

  clickOutside (): void {
    this.$nuxt.$emit('isSharedPost-' + this.rootPostId)
  }

  updateSpaceID (id: string): void {
    this.spaceId = id
  }

  updateComment (comment: string) {
    this.comment = comment
  }

  private getPost () {
    if (this.postId) {
      this.post = this.$store.getters['posts/getPostInfo'](this.postId)
    }
  }

  setCurrentUser (): void {
    this.currentUser = this.$store.state.profiles.currentUser
  }

  onFailed (): void {
    if (this.cid) {
      transactionService.removeIpfsContent(this.cid).catch(err => new Error(err))
    }
  }

  onSuccess (result: SubmittableResult): void {
    const id = getNewIdFromEvent(result)?.toString()
    if (id) {
      this.goToPostPage(id)
    }
  }

  async goToPostPage (id: string) {
    const space: SpaceListItemData = await this.$store.getters['space/getSpaceWithContent'](this.spaceId)
    const slug = createPostSlug(id, { title: this.comment, body: this.comment })

    await this.$store.dispatch('posts/getPostById', id).then(() => {
      this.$router.push(this.$nuxt.localePath('/' + (space.struct?.handle || space.struct.id) + '/' + slug))
    })
  }

  validate (): boolean {
    return true
  }

  async sharePost () {
    const pallet = PALLETS.posts
    const method = METHODS.createPost

    this.cid = await transactionService.saveIpfsContent({
      body: sanitizeHtml(this.comment)
    } as CommonContent)

    if (!this.cid) { return }

    const params = [this.spaceId, { SharedPost: this.postId }, { IPFS: this.cid }]

    await this.initExtrinsic({ pallet, params, method })

    await this.sentTransaction()
  }
}
</script>
