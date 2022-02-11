<template>
  <v-btn
    depressed
    :class="{follow : !isFollow, following: isFollow}"
    :disabled="loading"
    class="follow-btn"
    @click="onClick"
  >
    <ButtonSpinner v-if="loading" />
    {{ isFollow ? $t('buttons.following') : $t('buttons.follow') }}
  </v-btn>
</template>

<style lang="scss">
  .follow {
    background-color: $button_bg_primary !important;
  }
  .following {
    background-color: $button_bg_white  !important;
  }
  .follow-btn {
    width: 99px;
    height: $buttons_height;
    border: 1px solid $button_outline_primary;
    box-sizing: border-box;
    border-radius: $border_small;
    font-style: normal;
    font-weight: 500;
    line-height: $normal_line_height;
    letter-spacing: 1.25px;
    text-transform: capitalize;
    .v-btn__content {
      color: $text_color_primary;
      font-size: $font_normal;
      flex: initial;
    }
    &.follow {
      border: none;
      .v-btn__content {
        color: $text_color_white;
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
  }) entityId!: string

  isFollow: boolean = this.follow
  loading: boolean = false
  backgroundColor: string = this.follow ? 'follow' : 'following'

  @Watch('follow')
  isFollowHandler () {
    this.isFollow = this.follow
  }

  onFailed (): void {
    this.loading = !this.loading
  }

  onSuccess (result: SubmittableResult): void {
    this.isFollow = !this.isFollow
    this.loading = !this.loading
    this.$store.dispatch('profiles/updateUserInfo', { id: this.$store.state.profiles.currentUser.id, data: 1, type: this.isFollow })
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
