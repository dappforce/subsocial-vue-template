<template>
  <div class="vote-item-wp">
    <div>
      <Avatar :id="userInfo.id" :src="userInfo.avatar" :size="40" :name="userInfo.name" />

      <div class="user-info-wp">
        <span class="user-name">{{ userInfo.name }}</span>

        <Address :address="userInfo.id" :length="addressLength" :show-icon="false" />
      </div>
    </div>

    <FollowButton v-if="type === 'follow'" :follow="userInfo.isFollowing" type="profile" :entity-id="userInfo.id" />

    <div v-if="type === 'account'" class="sub-wb">
      <Tokens :balance="balance" />
    </div>
  </div>
</template>

<style lang="scss">
.vote-item-wp {
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
import { ProfileItemModel } from '~/models/profile/profile-item.model'
import { environment } from '~/environments/environment'

@Component
export default class VoteUserItem extends Vue {
  @Prop({
    type: Object,
    default: undefined
  }) userInfo!: ProfileItemModel

  @Prop({
    type: String
  }) type!: string

  balance: string = ''
  addressLength: number = environment.addressLengthLong

  @Watch('userInfo')
  userInfoHandler () {
    this.getBalance()
  }

  created () {
    this.getBalance()
  }

  getBalance () {
    new Promise(resolve => resolve(this.userInfo.balance)
    ).then((res) => {
      this.balance = res as string
    })
  }
}
</script>
