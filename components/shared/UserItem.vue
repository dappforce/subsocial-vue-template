<template>
  <div v-if="userInfo" class="user-item-wp">
    <div>
      <Avatar :id="userInfo.id" :src="isAvatar(userInfo)" :size="40" :name="isName(userInfo)" />

      <div class="user-info-wp">
        <span class="user-name"><NuxtLink :to="localePath('/accounts/' + userInfo.id)">{{ isName(userInfo) }}</NuxtLink></span>

        <Address :address="userInfo.id" :length="addressLength" :show-icon="false" />
      </div>
    </div>

    <FollowButton v-if="type === 'follow' && isNotCurrentUser" :follow="isFollow" type="profile" :entity-id="userInfo.id" />
  </div>
</template>

<style lang="scss">
.user-item-wp {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: $space_tiny 0;

  &>div {
    display: flex;
  }

  .user-info-wp {
    margin-left: 13px;

    .user-name a {
      font-weight: 500;
      font-size: $font_normal;
      line-height: 22px;
      letter-spacing: 0.25px;
      color: $color_font_normal;
      width: 200px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      display: block;
      text-decoration: none;
    }
  }

  .sub-wb {
    font-weight: 500;
    font-size: $font_small;
    padding-left: 4px;

    .gray {
      color: $color_font_secondary;
      font-weight: normal;
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ProfileData } from '@subsocial/api/flat-subsocial/dto'
import { ProfileStruct } from '@subsocial/api/flat-subsocial/flatteners'
import { config } from '~/config/config'

@Component
export default class UserItem extends Vue {
  @Prop({
    type: Object,
    default: undefined
  }) userInfo!: ProfileData | ProfileStruct

  @Prop({
    type: String
  }) type!: string

  @Prop({
    type: String
  }) id!: string

  balance: string = ''
  isFollow: boolean = false
  addressLength: number = config.addressLengthLong

  created (): void {
    if (this.$store.state.profiles.currentUser) {
      this.$store.dispatch('accountFollower/isAccountFollower', {
        myAddress: this.$store.state.profiles.currentUser.id,
        followedAddress: this.userInfo.id
      }).then((res: boolean) => {
        this.isFollow = res
      })
    }
  }

  isAvatar (user: any): string | null {
    return user.content ? user.content.avatar : user.avatar ? user.avatar : null
  }

  isName (user: any): string {
    return user.content ? user.content.name : user.name ? user.name : null
  }

  get isNotCurrentUser (): boolean {
    return this.userInfo.id !== this.$store.state.profiles.currentUser.id
  }
}
</script>
