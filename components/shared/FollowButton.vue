<template>
  <v-btn
    depressed
    :class="{follow : isFollow, following: !isFollow}"
    :loading="loading"
    :disabled="loading"
    class="follow-btn"
    @click="onClick"
  >
    {{ isFollow ? 'Follow' : 'Following' }}
  </v-btn>
</template>

<style lang="scss">
  .follow {
    background-color: $color_primary !important;
  }
  .following {
    background-color: $color_white !important;
  }
  .follow-btn {
    width: 99px;
    height: $buttons_height;
    border: 1px solid $color_primary;
    box-sizing: border-box;
    border-radius: $border_small;
    font-style: normal;
    font-weight: 500;
    line-height: $normal_line_height;
    letter-spacing: 1.25px;
    text-transform: capitalize;
    .v-btn__content {
      color: $color_primary;
      font-size: $font_small;
    }
    &.follow {
      border: none;
      .v-btn__content {
        color: $color_white;
      }
    }
  }
</style>

<script lang="ts">

import { Component, Prop, Watch } from 'vue-property-decorator'
import { SubmittableResult } from '@polkadot/api'
import TransactionButton from '~/components/abstract/TransactionButton.vue'
import { METHODS, PALLETS } from '~/constants/query'

const TYPE = {
  SPACE: 'space',
  PROFILE: 'profile'
}

type FollowButtonType = 'space' | 'profile';

@Component({})
export default class FollowButton extends TransactionButton {
  @Prop({
    type: Boolean,
    default: false
  }) follow!: boolean

  @Prop({
    type: String,
    default: 'space'
  }) type!: FollowButtonType

  @Prop({
    type: String
  }) entityId!: FollowButtonType

  isFollow: boolean = this.follow
  loading: boolean = false
  backgroundColor: string = this.follow ? 'follow' : 'following'

  @Watch('follow')
  isFollowHandler () {
    this.isFollow = this.follow
  }

  onFailed (result: SubmittableResult | null): void {}

  onSuccess (result: SubmittableResult): void {
    this.isFollow = !this.isFollow
    this.loading = !this.loading
  }

  validate (): boolean {
    return true
  }

  async onClick () {
    let pallet = ''
    let method = ''

    this.loading = !this.loading

    switch (this.type) {
      case TYPE.SPACE:
        pallet = PALLETS.spaceFollows
        method =
          !this.isFollow
            ? METHODS.followSpace
            : METHODS.unfollowSpace
        break
      case TYPE.PROFILE:
        pallet = PALLETS.profileFollows
        method =
          !this.isFollow
            ? METHODS.followAccount
            : METHODS.unfollowAccount
        break
    }

    await this.initExtrinsic({
      pallet,
      method,
      params: [this.entityId]
    })

    await this.sentTransaction()
  }
}
</script>
