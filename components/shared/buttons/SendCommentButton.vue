<template>
  <v-btn :disabled="!comment.length" class="send-button" @click="sendComment">
    {{ isEdit ? $t('buttons.update') : $t('buttons.send') }}
  </v-btn>
</template>

<style scoped lang="scss">
.theme--light.v-btn {
  &.send-button {
    background-color: $color_primary !important;
    border-radius: $border_small;
    width: 78px;
    height: $buttons_height;
    color: $color_white;
    text-align: center;
    font-weight: normal;
    margin-top: $space_tiny;
    margin-bottom: $space_tiny;
    text-transform: capitalize;
    color: $color_white;

    &:disabled {
      background-color: #F597CA !important;
      color: $color_white !important;
    }
  }

  &--disabled {
    &.v-btn--has-bg:disabled {
      background-color: #F597CA !important;
      color: #fff !important;
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { SubmittableResult } from '@polkadot/api'
import { CommonContent, IpfsCid } from '@subsocial/types'
import sanitizeHtml from 'sanitize-html'
import TransactionButton from '~/components/abstract/TransactionButton.vue'
import { METHODS, PALLETS } from '~/constants/query'
import TransactionService from '~/services/transaction.service'
import { getNewIdFromEvent } from '~/utils/utils'
import { PostListItemData } from '~/models/post/post-list-item.model'

const transactionService = new TransactionService()

@Component
export default class SendCommentButton extends TransactionButton {
  @Prop({
    type: String
  }) comment!: string

  @Prop({
    type: String
  }) rootPostId!: string

  @Prop({
    type: String
  }) commentId!: string

  @Prop({
    type: String
  }) parentCommentId!: string

  @Prop({
    type: String
  }) contentId!: string

  @Prop({
    type: Boolean
  }) isEdit!: boolean

  cid: IpfsCid | undefined

  onFailed (): void {
    if (this.cid) {
      transactionService.removeIpfsContent(this.cid).catch(err => new Error(err))
    }
  }

  onSuccess (result: SubmittableResult): void {
    if (this.isEdit) {
      transactionService.removeIpfsContent(this.contentId).catch(err => new Error(err))
    }

    const id = getNewIdFromEvent(result)?.toString() || (Math.floor((Math.random() * 80) + 1000)).toString()
    if (id && !this.isEdit) {
      this.$emit('createdComment', this.createFakeComment(id))
    }

    if (this.isEdit) {
      this.$emit('updatedComment', { id, comment: this.comment })
    }
  }

  validate (): boolean {
    return true
  }

  async sendComment () {
    const pallet = PALLETS.posts
    const method = this.isEdit ? METHODS.updatePost : METHODS.createPost

    this.cid = await transactionService.saveIpfsContent({
      body: sanitizeHtml(this.comment)
    } as CommonContent)

    if (!this.cid) { return }

    const params = this.isEdit
      ? [this.commentId, { content: { IPFS: this.cid } }]
      : this.parentCommentId
        ? [null, { Comment: { parentId: this.parentCommentId, rootPostId: this.rootPostId } }, { IPFS: this.cid }]
        : [null, { Comment: { rootPostId: this.rootPostId } }, { IPFS: this.cid }]

    await this.initExtrinsic({ pallet, params, method })

    await this.sentTransaction()
  }

  createFakeComment (id: string) {
    const user = this.$store.getters['profiles/selectProfileData'](this.$store.state.profiles.currentUser.id)
    const newComment: PostListItemData = {
      body: this.comment,
      summary: this.comment,
      isComment: true,
      id,
      ownerId: user.id,
      ownerName: user.name || user.id,
      ownerImageUrl: user.avatar,
      createdAtTime: new Date().getTime()
    } as PostListItemData

    return newComment
  }
}
</script>
