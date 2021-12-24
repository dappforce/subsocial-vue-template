<template>
  <span @click="onClick">
    {{ hidden ? 'Make visible' : 'Hide' }} {{ hidden ? '' : type }}
  </span>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { OptionBool, OptionId, OptionIpfsContent, OptionOptionText, PostUpdate, SpaceUpdate } from '@subsocial/types/substrate/classes'
import { SubmittableResult } from '@polkadot/api'
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
  type: string = this.post ? this.postType(this.post) : 'space'

  created () {
    this.hidden = this.toggleType === 'post' ? this.post.hidden : this.space.struct.hidden
  }

  option () {
    const { registry } = require('@subsocial/types/substrate/registry')
    const { Option } = require('@polkadot/types')
    return new Option(registry, 'Option<SpacePermissions>')
  }

  onFailed (result: SubmittableResult | null): void {
  }

  onSuccess (result: SubmittableResult): void {
    this.$router.go(0)
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

  // newTxParamsPost (): [string | undefined, PostUpdate] {
  //   const update = new PostUpdate({
  //     space_id: new OptionId(),
  //     content: new OptionIpfsContent(),
  //     hidden: new OptionBool(!this.hidden)
  //   })
  //   return [this.post.id, update]
  // }

  newTxParamsSpace (): [string | undefined, {}] {
    const update = {
      hidden: !this.hidden
    }

    //   new SpaceUpdate({
    //   handle: new OptionOptionText(),
    //   content: new OptionIpfsContent(),
    //   hidden: new OptionBool(!this.hidden),
    //   permissions: null
    // })
    return [this.space.struct.id, update]
  }

  // newTxParamsSpace (): [string | undefined, SpaceUpdate] {
  //   const update = {
  //     hidden: !this.hidden
  //   }
  //
  //   //   new SpaceUpdate({
  //   //   handle: new OptionOptionText(),
  //   //   content: new OptionIpfsContent(),
  //   //   hidden: new OptionBool(!this.hidden),
  //   //   permissions: null
  //   // })
  //   return [this.space.struct.id, update]
  // }

  private postType (post: PostListItemData) {
    return post.isComment ? 'comment' : 'post'
  }
}
</script>
