<template>
  <div v-if="userInfo" class="user-item-wp">
    <div>
      <Avatar :id="userInfo.id" :src="isAvatar(userInfo)" :size="40" :name="isName(userInfo)" />

      <div class="user-info-wp">
        <span class="user-name">{{ isName(userInfo) }}</span>

        <Address :address="userInfo.id" :length="addressLength" :show-icon="false" />
      </div>
    </div>

    <FollowButton v-if="type === 'follow'" :follow="isFollow" type="profile" :entity-id="userInfo.id" />

    <div v-if="type === 'account'" class="sub-wb">
      <Tokens :balance="balance" />
    </div>
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

    .user-name {
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
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { ProfileData } from '@subsocial/api/flat-subsocial/dto'
import { ProfileItemModel } from '~/models/profile/profile-item.model'
import { config } from '~/config/config'

@Component
export default class UserItem extends Vue {
  @Prop({
    type: Object,
    default: undefined
  }) userInfo!: ProfileItemModel

  @Prop({
    type: String
  }) type!: string

  @Prop({
    type: String
  }) id!: string

  balance: string = ''
  isFollow: boolean = false
  addressLength: number = config.addressLengthLong

  @Watch('userInfo')
  userInfoHandler () {
    this.getBalance()
  }

  created (): void {
    this.getBalance()
    if (this.$store.state.profiles.currentUser) {
      this.$store.dispatch('accountFollower/isAccountFollower', {
        myAddress: this.$store.state.profiles.currentUser.id,
        followedAddress: this.userInfo.id
      }).then((res: boolean) => {
        this.isFollow = res
      })
    }
  }

  getBalance (): void {
    new Promise(resolve => resolve(this.userInfo.balance)
    ).then((res) => {
      this.balance = res as string
    })
  }

  isAvatar (user: ProfileData): string | null {
    return user.content ? user.content.avatar : null
  }

  isName (user: ProfileData): string {
    return user.content ? user.content.name : user.id
  }
}
</script>
