<template>
  <section class="edit-post-container">
    <v-card>
      <ValidationObserver ref="form" v-slot="{ handleSubmit, handleReset }">
        <form @submit.prevent="handleSubmit(submit)" @reset.prevent="handleReset(clear)">
          <h2 class="edit-post-title">
            {{ isEdit ? 'Edit' : 'New' }} post
          </h2>

          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="basil"
            grow
          >
            <v-tabs-slider class="slider-color" />

            <v-tab
              v-for="item in items"
              :key="item"
              :href="'#' + item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item
              :key="items[0]"
              :value="items[0]"
            >
              <ImageLoader :avatar="image" :type="'square'" @avatar="updateImageCID" />
            </v-tab-item>

            <v-tab-item
              :key="items[1]"
              :value="items[1]"
            >
              <div class="form-row youtube-container">
                <ValidationProvider v-slot="{ errors }" name="Video URL" :rules="!isArticleTab ? 'required' : ''">
                  <v-text-field
                    v-model="videoUrl"
                    :hide-details="!isArticleTab ? 'auto' : true"
                    :messages="errors[0]"
                    outlined
                    :label="(!isArticleTab ? '*' : '') + ' Video URL'"
                  />
                </ValidationProvider>
                <client-only>
                  <Youtube v-if="videoUrl" :link="videoUrl" />
                </client-only>
              </div>
            </v-tab-item>
          </v-tabs-items>
          <div class="form-container">
            <div class="form-row">
              <v-text-field
                v-model="postName"
                hide-details="auto"
                outlined
                label="Post title"
              />
            </div>
            <div class="form-row description-row">
              <ValidationProvider v-slot="{ errors }" name="Description" :rules="isArticleTab ? 'required|min:3' : ''">
                <mde-editor
                  :v-validate="description"
                  :show-editor="true"
                  :text="description"
                  name="Description"
                  :placeholder="(isArticleTab ? '*' : '') + ' Post body'"
                  :height="'200px'"
                  @contentUpdate="updateDescription"
                />
                <v-textarea
                  v-model="description"
                  class="hidden-textarea"
                  :messages="errors[0]"
                />
              </ValidationProvider>
            </div>
            <div class="form-row">
              <v-combobox
                v-model="selectTags"
                hide-details="auto"
                multiple
                outlined
                label="Tags"
                append-icon
                chips
                deletable-chips
                class="tag-input"
                :search-input.sync="search"
                placeholder="Press 'Enter' or 'Tab' key to add tags"
                @keyup.tab="updateTags"
                @paste="updateTags"
              />
            </div>
          </div>
          <div class="button-wp">
            <v-btn class="button-third-color" @click="clear">
              {{ isEdit ? 'Cancel' : 'Reset form' }}
            </v-btn>
            <v-btn class="button-main-color" @click="submit">
              {{ isEdit ? 'Save' : 'Create post' }}
            </v-btn>
          </div>
        </form>
      </ValidationObserver>
    </v-card>
  </section>
</template>

<style lang="scss">
.edit-post-container {
  max-width: 628px;
  margin:$space_large auto 0;
  min-height: 60vh;
  padding-bottom: $space_normal;

  .edit-post-title {
    font-size: $font_large;
  }

  .v-card {
    padding: $space_huge $space_big $space_big;

    .v-tabs {
      border-bottom: 1px solid #E0E0E0;

      .slider-color {
        color: $color_primary;
      }
    }

    .v-tabs-items {
      background: $color_white;
    }
  }

  h2 {
    margin: 0;
  }

  .form-row {
    width: 100%;
    margin-bottom: $space_big;

    .CodeMirror-placeholder {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.6);
      opacity: 1;
    }

    &.description-row {
      margin-bottom: 10px;
    }

    .editor-toolbar, .CodeMirror {
      border-color: $color_border;
    }

    .v-text-field--outlined fieldset {
      border-color: $color_border;
    }

    .v-text-field--outlined.v-input--is-focused fieldset, .v-text-field--outlined.v-input--has-state fieldset {
      border-width: 1px;
      border-color: $color_font_normal;
    }
  }

  .youtube-container {
    margin-top: $space_normal;
  }

  .v-chip {
    &__content {
      color: $main_text_color;
    }
  }

  .hidden-textarea {
    padding: 0 !important;
    textarea, .v-input__slot {
      display: none!important;
      visibility: hidden;
    }
  }

  .button-wp {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: $space_normal;
    margin-top: 5px;

    .button-main-color {
      background-color: $color_primary;
    }

    .button-third-color {
      background-color: $color_white
    }

    button {
      min-width: 110px !important;
      font-size: $font_normal;
      border: 1px solid #E0E0E0;
      border-color: #E0E0E0 !important;
      border-radius: $border_small;
      box-shadow: none;
      text-transform: capitalize;

      &:last-child {
        border: none;
        color: $color_white;
      }
    }

    @media (max-width: 768px) {
      & {
        justify-content: space-between;
      }
    }
  }

  .tag-input {
    .v-label--active {
      left: 6px !important;
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import { required, min } from 'vee-validate/dist/rules'
import { SubmittableResult } from '@polkadot/api'
import { CommonContent, IpfsCid } from '@subsocial/types'
import { createPostSlug } from '@subsocial/utils'
import { PostListItemData } from '~/models/post/post-list-item.model'
import TransactionButton from '~/components/abstract/TransactionButton.vue'
import { METHODS, PALLETS } from '~/constants/query'
import TransactionService from '~/services/transaction.service'
import { getNewIdFromEvent, getPostIdFromLink } from '~/utils/utils'
import { SpaceListItemData } from '~/models/space/space-list-item.model'
extend('required', required)
extend('min', min)
extend('required', {
  ...required,
  message: 'This field is required'
})

const transactionService = new TransactionService()

@Component({
  components: { ValidationProvider, ValidationObserver }
})
export default class PostEdit extends TransactionButton {
  $refs!: {
    form: InstanceType<typeof ValidationObserver>;
  };

  @Prop({
    type: Boolean,
    default: false
  }) isEdit!: boolean

  @Prop({
    type: Object
  }) postItem!: PostListItemData

  post: PostListItemData | null = null
  tab: string | null = null
  items: string[] = ['article', 'video']
  postName: string = ''
  description: string = ''
  image: string = ''
  selectTags: string[] = []
  search: string = ''
  videoUrl: string = ''
  spaceId: string = ''

  @Watch('postItem')
  postItemHandler (newVal: any, OldVal: any) {
    if (newVal !== OldVal) {
      this.post = newVal
      this.insertDataInForm()
    }
  }

  created () {
    if (this.isEdit) {
      this.insertDataInForm()
    }
    this.spaceId = this.$route.query.spaceId as string
  }

  insertDataInForm () {
    this.postName = this.postItem.title
    this.description = this.postItem.body
    this.selectTags = this.postItem.tags
    this.image = this.postItem.imageUrl
    this.videoUrl = this.postItem.link || ''
  }

  updateTags () {
    this.$nextTick(() => {
      if (this.search) { this.selectTags.push(...this.search.split(',')) }
      this.$nextTick(() => {
        this.search = ''
      })
    })
  }

  submit () {
    this.$refs.form.validate().then((result) => {
      if (result) {
        this.OnCreateOrUpdatePost()
      }
    })
  }

  clear () {
    this.$refs.form.reset()
    this.postName = ''
    this.description = ''
    this.videoUrl = ''
    this.selectTags = []
  }

  get isArticleTab () {
    return this.tab === this.items[0]
  }

  updateDescription (content: string): void {
    this.description = content
  }

  updateImageCID (cid: string): void {
    this.image = cid
  }

  onFailed (result: SubmittableResult | null): void {
  }

  onSuccess (result: SubmittableResult): void {
    const id = this.postItem?.id || getNewIdFromEvent(result)?.toString()
    if (id) {
      this.goToPostPage(id)
    }
  }

  validate (): boolean {
    return true
  }

  async goToPostPage (id: string) {
    const space: SpaceListItemData = await this.$store.getters['space/getSpaceWithContent'](this.spaceId)
    const slug = createPostSlug(id, { title: this.postName, body: this.description })

    await this.$store.dispatch('posts/getPostById', id).then(() => {
      this.$router.push('/' + (space.struct?.handle || space.struct.id) + '/' + slug)
    })
  }

  async OnCreateOrUpdatePost () {
    const pallet = PALLETS.posts
    const method = this.isEdit ? METHODS.updatePost : METHODS.createPost

    const cid: IpfsCid | undefined = await transactionService.saveIpfsContent({
      title: this.postName,
      image: this.isArticleTab ? this.image : '',
      tags: this.selectTags,
      body: this.description,
      link: this.videoUrl || undefined
    } as CommonContent)

    if (!cid) { return }

    const params = this.isEdit
      ? [this.postItem?.id, { spaceId: null, content: { IPFS: cid }, hidden: null }]
      : [this.spaceId, { RegularPost: null }, { IPFS: cid }]

    await this.initExtrinsic({ pallet, params, method })

    await this.sentTransaction()
  }
}

</script>
