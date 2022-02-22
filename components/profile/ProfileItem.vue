<template>
  <div class="profile-item-wp">
    <v-card
      elevation="2"
      class="profile-item"
    >
      <div class="profile-item-header">
        <div class="profile-info-wp">
          <Avatar :id="profileData.id" :src="profileData.avatar" :size="46" :name="profileData.name" />
          <div class="info-container">
            <div class="profile-name-wp">
              <Title size="large" :name="profileData.name || profileData.id | addressShortness(addressLength)" />
            </div>
            <div class="profile-stats-wp">
              <span @click="openModal">
                <b>{{profileData.followersCount | numeral('0,0a')}}</b> {{$tc('plural.'+i18nextKey(profileData.followersCount, 'follower'))}}
              </span>
              <span @click="openModal">
                <b>{{profileData.followingCount | numeral('0,0a')}}</b> {{$tc('plural.'+i18nextKey(profileData.followingCount, 'following'))}}
              </span>
            </div>
          </div>
        </div>
        <div class="button-wp">
          <EditButton v-if="isOwner && isAccountView" :link="'/profile?id=' + profileData.id" />
        </div>
      </div>

      <div class="general-information">
        <Paragraph v-if="profileData.summary" :text="profileData.summary" :margin-bottom="'17'" />
        <LinkIcons v-if="profileData.links" :links="profileData.links" />
        <div class="account-info-wp">
          <div size="24" class="account-icon">
            <img class="logo" src="../../assets/image/wallet.jpg" alt="Wallet">
          </div>
          <Address :address="profileData.address" :size="'large'" :length="addressLength" :show-icon="true" />
          <QrCodeButton :address="profileData.address || profileData.id" />
        </div>
        <div class="account-amount">
          <div class="account-icon">
            <img class="logo" src="../../assets/image/balance.jpg" alt="Currency">
          </div>
          <Tokens :balance="balance" />
        </div>
      </div>

      <div class="action-row">
        <SendTipsButton v-if="!isOwner" :user-id="profileData.id" />
        <CreateSpaceButton v-if="isOwner" :is-have-space="isHaveSpace" />
        <WritePostButton v-if="isOwner" :is-have-space="isHaveSpace" />
        <FollowButton v-if="!isOwner" :follow="isFollowing" type="profile" :entity-id="profileData.id" />
      </div>

      <v-divider
        class="mx-4"
      />
      <Tabs class="profile-tabs" :tab-links="tabLinks" :event-name="tabsEvent" />
    </v-card>
    <ModalConnections :is-modal="isOpenModal" :account-id="profileData.id" />
  </div>
</template>

<style lang="scss">
.profile-item-wp {
  width: 100%;
  margin-top: $space_normal;

  .account-icon {
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
    
    img {
      width: 24px;
    }
  }

  .profile-item {
    padding: $space_normal $space_normal 0;
    z-index: 2;

    .profile-item-header {
      display: flex;
      justify-content: space-between;
    }
  }

  .profile-info-wp {
    display: flex;
    margin-bottom: $space_large;

    .info-container {
      margin-left: 13px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .profile-name-wp {
        display: flex;
        font-style: normal;
        font-weight: 500;
        font-size: $font_large;
        line-height: $main_line_height;
        align-items: center;
        letter-spacing: 0.15px;
        color: $text_color_normal;

        a {
          text-decoration: none;
        }
      }

      .profile-stats-wp {
        font-size: $font_small;
        letter-spacing: 0.25px;

        span {
          margin-right: 4px;
          cursor: pointer;
        }
      }
    }
  }

  .general-information {
    .link {
      font-weight: 500;
      letter-spacing: 0.25px;
      color: $text_color_primary;
      text-decoration: none;
    }

    .account-info-wp {
      display: flex;
      align-items: center;
      font-size: $font_normal;
      margin-bottom: 13px;

      & > span {
        margin-right: 10px;

        & > span:first-child {
          font-weight: 500;
          margin-right: 5px;
        }
      }

      .address-text {
        font-size: $font_normal;
      }

      .qr-icon {
        margin-left: 10px;
        color: $icon_color_normal;
      }
    }

    .account-amount {
      display: flex;
    }
  }

  .address-text {
    color: $text_color_normal;
  }

  .mdi-content-copy {
    color: $icon_color_normal;
  }

  .action-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: $space_normal;
    margin-top: $space_big;

    & button, & a, & .btn-tooltip-wrapper {
      width: calc(50% - 8px);
    }

    & .write-post-btn {
      width: 100%;
    }
  }

  .profile-tabs {
    &.tabs-container {
      padding-top: 0 !important;
      background-color: transparent;
      margin-bottom: 0;

      & .v-tabs-bar {
        box-shadow: none;
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ProfileItemModel } from '~/models/profile/profile-item.model'
import { config } from '~/config/config'
import { toI18next } from '~/utils/utils'

@Component
export default class ProfileItem extends Vue {
  @Prop({
    type: Object,
    default: undefined
  }) profileData!: ProfileItemModel

  @Prop({
    type: Array
  }) tabLinks!: []

  @Prop({
    type: String,
    default: 'accountPage'
  }) tabsEvent!: string

  @Prop({
    type: Boolean
  }) isOwner!: string

  @Prop({
    type: Boolean,
    default: false
  }) isAccountView!: boolean

  @Prop({
    type: Boolean,
    default: false
  }) isHaveSpace!: boolean

  isOpenModal: boolean = false
  isFollowing: boolean = false
  balance: string = ''
  user: ProfileItemModel = {} as ProfileItemModel
  addressLength: number = config.addressLengthLong

  created () {
    this.load()

    this.$store.subscribe((mutation) => {
      if (mutation.type === 'profiles/SET_CURRENT_USER') {
        this.load()
      }
    })
  }

  openModal (): void {
    this.isOpenModal = !this.isOpenModal
  }

  load (): void {
    if (this.$store.state.profiles.currentUser) {
      this.user = this.$store.getters['profiles/selectProfileData'](this.$store.state.profiles.currentUser.id)

      if (!this.user) {
        this.user = this.$store.state.profiles.currentUser
      }
      this.$store.dispatch('accountFollower/isAccountFollower', { myAddress: this.user.id, followedAddress: this.profileData ? this.profileData.id : this.$route.params.account })
        .then((data) => {
          this.isFollowing = data
        })
    }

    this.$store.dispatch('profiles/getAccountBalance', this.profileData ? this.profileData.id : this.$route.params.account).then((res) => {
      this.balance = res
    })
  }

  i18nextKey (count: number, key: string): string {
    return toI18next(count, key, this.$i18n.locale)
  }
}
</script>
