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
          <Address :address="profileData.address" :size="'large'" :length="17" :show-icon="true" />
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
        <FollowButton :follow="isFollowing" />
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
  margin-top: 16px;

  .account-icon {
    color: #A0A0A0;
    margin-right: 5px;
  }

  .gray {
    color: #A0A0A0;
    font-weight: normal;
  }

  .profile-item {
    padding: 16px 16px 0;
    z-index: 9;

    .profile-item-header {
      display: flex;
      justify-content: space-between;
    }
  }

  .profile-info-wp {
    display: flex;
    margin-bottom: 20px;

    .info-container {
      margin-left: 13px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .profile-name-wp {
        display: flex;
        align-items: center;
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: $font-size-title-preview;
        line-height: 24px;
        align-items: center;
        letter-spacing: 0.15px;
        color: rgba(0, 0, 0, 0.87);

        a {
          text-decoration: none;
        }
      }

      .profile-stats-wp {
        font-size: $font-size-secondary-text;
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
      color: #EB2F96;
      text-decoration: none;
    }

    .account-info-wp {
      display: flex;
      align-items: center;
      font-size: 16px;
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
        color: #000;
      }
    }

    .account-amount {
      display: flex;
    }
  }

  .address-text {
    color: rgba(0, 0, 0, 0.87);
  }

  .mdi-content-copy {
    color: #000;
  }

  .action-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    margin-top: 24px;

    & button {
      width: calc(50% - 8px);
    }
  }
}
</style>

<script>
export default {
  name: 'ProfileItem',

  props: {
    profileData: {
      type: Object,
      default: undefined
    },
    tabLinks: {
      type: Array,
      default: () => ['posts', 'spaces']
    },
    tabsEvent: {
      type: String,
      default: 'accountPage'
    }
  },

  data () {
    return {
      isOpenModal: false,
      isFollowing: false,
      balance: null
    }
  },

  created () {
    this.load()
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'profiles/UPDATE_PROFILES') {
        this.load()
      }
    })
  },

  methods: {
    openModal () {
      this.isOpenModal = !this.isOpenModal
    },

    load () {
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
}
</script>
