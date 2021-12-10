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
              <Title size="large" :name="profileData.name" />
            </div>
            <div class="profile-stats-wp">
              <span @click="openModal"><b>{{ profileData.followingCount | numeral('0,0a') }}</b> {{ profileData.followingCount | pluralize('en', ['Following', 'Following']) }}</span>
              <span @click="openModal"><b>{{ profileData.followersCount | numeral('0,0a') }}</b> {{ profileData.followersCount | pluralize('en', ['Follower', 'Followers']) }}</span>
            </div>
          </div>
        </div>
        <div class="button-wp">
          <!--          <OptionButton />-->
        </div>
      </div>

      <div class="general-information">
        <Paragraph v-if="profileData.summary.length" :text="profileData.summary" :margin-bottom="'17'" />
        <LinkIcons v-if="profileData.links" :links="profileData.links" />
        <div class="account-info-wp">
          <v-icon size="24" class="account-icon">
            mdi-wallet-outline
          </v-icon>
          <Address :address="profileData.address" :size="'large'" :length="addressLength" :show-icon="true" />
          <QrCodeButton :address="profileData.address || profileData.id" />
        </div>
        <div class="account-amount">
          <v-icon class="account-icon">
            mdi-currency-usd
          </v-icon>
          <Tokens :balance="balance" />
        </div>
      </div>

      <div class="action-row">
        <SendTipsButton />
        <FollowButton :follow="isFollowing" type="profile" :entity-id="profileData.id" />
      </div>

      <v-divider
        class="mx-4"
      />
      <Tabs :tab-links="tabLinks" :event-name="tabsEvent" />
    </v-card>
    <ModalConnections :is-modal="isOpenModal" :account-id="profileData.id" />
  </div>
</template>

<style lang="scss">
.profile-item-wp {
  width: 100%;
  margin-top: $space_normal;

  .account-icon {
    color: $color_font_secondary;
    margin-right: 5px;
  }

  .gray {
    color: $color_font_secondary;
    font-weight: normal;
  }

  .profile-item {
    padding: $space_normal $space_normal 0;
    z-index: 9;

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
        color: $color_font_normal;

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
      color: $color_primary;
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

      .qr-icon {
        margin-left: 10px;
        color: $color_black;
      }
    }

    .account-amount {
      display: flex;
    }
  }

  .address-text {
    color: $color_font_normal;
  }

  .mdi-content-copy {
    color: $color_black;
  }

  .action-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: $space_big;
    margin-top: $space_big;

    & button {
      width: calc(50% - 8px);
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ProfileItemModel } from '~/models/profile/profile-item.model'
import { environment } from '~/environments/environment'

@Component
export default class ProfileItem extends Vue {
  @Prop({
    type: Object,
    default: undefined
  }) profileData!: ProfileItemModel

  @Prop({
    type: Array,
    default: () => ['posts', 'spaces']
  }) tabLinks!: []

  @Prop({
    type: String,
    default: 'accountPage'
  }) tabsEvent!: string

  isOpenModal: boolean = false
  isFollowing: boolean = false
  balance: string = ''
  user: ProfileItemModel = {} as ProfileItemModel
  addressLength: number = environment.addressLengthLong

  created () {
    this.load()
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'profiles/UPDATE_PROFILES') {
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

      this.$store.dispatch('accountFollower/isAccountFollower', { myAddress: this.user.id, followedAddress: this.profileData.id })
        .then((data) => {
          this.isFollowing = data
        })
    }

    this.$store.dispatch('profiles/getAccountBalance', this.profileData.id).then((res) => {
      this.balance = res
    })
  }
}
</script>
