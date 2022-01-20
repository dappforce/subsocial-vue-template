<template>
  <span @click="onClick">{{ hidden ? $t('buttons.makeVisible') : $t('buttons.hide') }} {{ hidden ? '' : type }}</span>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import TransactionButton from '~/components/abstract/TransactionButton.vue'
import { PostListItemData } from '~/models/post/post-list-item.model'
import { PALLETS, METHODS } from '~/constants/query'
import { SpaceListItemData } from '~/models/space/space-list-item.model'

const TYPE = {
  SPACE: 'space',
  POST: 'post'
}

@Component
export default class ToggleVisibilityButton extends TransactionButton {
  @Prop({
    type: Object,
    default: undefined
  }) post!: PostListItemData

  @Prop({
    type: Object,
    default: undefined
  }) space!: SpaceListItemData

  @Prop({
    type: String
  }) toggleType!: string

  hidden: boolean | undefined = false
  type: string = this.post ? this.postType(this.post) : this.$t('general.space') as string

  created () {
    this.hidden = this.toggleType === 'post' ? this.post.hidden : this.space.struct.hidden
  }

  option () {
    const { registry } = require('@subsocial/types/substrate/registry')
    const { Option } = require('@polkadot/types')
    return new Option(registry, 'Option<SpacePermissions>')
  }

  onFailed (): void {
  }

  onSuccess (): void {
    this.type === 'space'
      ? this.$store.dispatch('space/updateHiddenState', { id: this.space.struct.id, state: this.space.struct.hidden })
      : this.$store.dispatch('posts/updateHiddenState', { id: this.post.id, state: this.post.hidden })
  }

  validate (): boolean {
    return true
  }

  async onClick () {
    let params: any = ''
    let pallet: string = ''
    let method: string = ''

    switch (this.toggleType) {
      case TYPE.SPACE:
        pallet = PALLETS.spaces
        method = METHODS.updateSpace
        params = this.newTxParamsSpace()
        break
      case TYPE.POST:
        pallet = PALLETS.posts
        method = METHODS.updatePost
        params = this.newTxParamsPost()
        break
    }

    await this.initExtrinsic({
      pallet,
      method,
      params
    })
    await this.sentTransaction()
  }

  newTxParamsPost (): [string | undefined, {}] {
    const update = {
      hidden: !this.hidden
    }
    return [this.post.id, update]
  }

  newTxParamsSpace (): [string | undefined, {}] {
    const update = {
      hidden: !this.hidden
    }
    return [this.space.struct.id, update]
  }

  private postType (post: PostListItemData): string {
    return post.isComment ? this.$t('general.comment') as string : this.$t('general.post') as string
  }
}
</script>
