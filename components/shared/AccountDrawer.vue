<template>
  <v-navigation-drawer
    v-model="drawer"
    class="drawer-container"
    right
    temporary
  >
    <div class="user-info">
      <div class="close" @click="closeDrawer">
        <v-icon size="24">
          mdi-close
        </v-icon>
      </div>
      <div class="profile-info-wp">
        <Avatar :id="user.id" :src="user.avatar" :size="40" :name="user.name" />
        <div class="info-container">
          <div class="profile-name-wp">
            <Title size="large" :name="user.name" :link="'/accounts/' + user.id" />
          </div>
          <div class="profile-stats-wp">
            <span @click="openModal"><b>{{ user.followingCount | numeral('0,0a') }}</b> {{ user.followingCount | pluralize('en', ['Following', 'Following']) }}</span>
            <span @click="openModal"><b>{{ user.followersCount | numeral('0,0a') }}</b> {{ user.followersCount | pluralize('en', ['Follower', 'Followers']) }}</span>
          </div>
        </div>
      </div>
      <div class="account-info-wp">
        <v-icon size="24" class="account-icon">
          mdi-wallet-outline
        </v-icon>
        <Address :address="user.address || user.id" :size="'large'" :length="13" :show-icon="true" />
        <QrCodeButton :address="user.address || user.id" />
      </div>

      <div class="account-amount">
        <v-icon class="account-icon">
          mdi-currency-usd
        </v-icon>
        <Tokens :balance="balance" />
      </div>
    </div>

    <v-divider />

    <v-list class="account-btn" dense>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon class="account-icon">
            mdi-account-outline
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            <NuxtLink :to="'/accounts/' + user.id">
              My profile
            </NuxtLink>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon class="account-icon">
            mdi-pencil-outline
          </v-icon>
        </v-list-item-icon>

        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-list-item-content>
              <v-list-item-title
                v-bind="attrs"
                v-on="on"
              >
                Edit my profile
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <span>Coming soon</span>
        </v-tooltip>
      </v-list-item>

      <v-list-item link>
        <v-list-item-icon>
          <v-icon class="account-icon">
            mdi-cog-outline
          </v-icon>
        </v-list-item-icon>

        <v-tooltip top>
          <template #activator="{ on, attrs }">
            <v-list-item-content>
              <v-list-item-title
                v-bind="attrs"
                v-on="on"
              >
                Settings
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <span>Coming soon</span>
        </v-tooltip>
      </v-list-item>
    </v-list>

    <v-divider />

    <div class="user-list">
      <div
        v-for="(item, index) in accounts"
        :key="index"
        class="user-item"
        @click="setAccount(item)"
      >
        <VoteUserItem
          :user-info="item"
          :type="'account'"
          class="user-account"
        />
      </div>
      <div class="shadow">
        <v-divider light />
      </div>
    </div>

    <div class="sign-out">
      <v-btn class="sign-out__btn" @click="signOut">
        Sign Out
      </v-btn>
    </div>
    <ModalConnections :is-modal="isOpenModal" :account-id="user.id" />
  </v-navigation-drawer>
</template>

<style lang="scss">
.drawer-container {
  width: 420px !important;
  padding: 16px 16px;
  z-index: 10;

  .account-icon {
    width: 40px;
    margin-right: 13px;
  }

  .close {
    position: absolute;
    right: 16px;
    top: 16px;
    cursor: pointer;
  }

  .user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    min-height: 0;
    padding-bottom: 16px;

    .profile-info-wp {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .info-container {
        margin-left: 13px;

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
          line-height: 20px;
          letter-spacing: 0.25px;
          margin-top: 5px;
          cursor: pointer;

          span {
            margin-right: 4px;
          }
        }
      }
    }

    .account-info-wp {
      display: flex;
      align-items: center;
      font-size: 16px;

      .address-container {
        display: flex;
        align-items: center;

        .address-text {
          color: rgba(0, 0, 0, 0.87);
          font-size: $font-size-normal;
        }

        .v-icon {
          color: #000000;
          margin-left: 10px;
        }
      }

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
      font-size: $font-size-normal;
      margin-top: 8px;
      font-weight: 500;
      display: flex;
      align-items: center;

      .gray {
        color: #A0A0A0;
        font-weight: normal;
      }
    }
  }

  .account-btn {
    .v-list-item {
      color: #000000;
      padding: 0;

      .v-icon {
        color: #000000;
        margin-right: 12px;
      }

      &__title {
        font-size: $font-size-normal;
        font-weight: normal;
        letter-spacing: 0.25px;
        line-height: 1.1rem;

        a {
          text-decoration: none;
          color: #000000;
        }
      }
    }
  }

  .user-list {
    height: calc(100% - 335px);
    overflow: hidden;
    overflow-y: auto;
    position: relative;
    margin-bottom: 20px;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: none;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.12);;
      width: 6px;
    }

    .user-item {
      padding: 3px 0;

      .user-account {
        transition: all .2s ease;
        &:hover {
          background-color: rgba(238, 236, 236, 0.7);
          cursor: pointer;
          padding: 8px 5px;
        }
      }
    }

    .shadow {
      display: flex;
      align-items: end;
      height: 50px;
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 17.71%, rgba(255, 255, 255, 0.6) 40.1%, #FFFFFF 78.12%);
    }
  }

  .sign-out {
    &__btn {
      border: 1px solid #EB2F96;
      box-sizing: border-box;
      border-radius: 4px;
      width: 100%;
      height: 36px;
      color: #EB2F96;
      font-size: $font-size-buttons-text;
      font-weight: 500;
      letter-spacing: 1.25px;
      box-shadow: none;
      background-color: #fff !important;
    }
  }
}
.v-navigation-drawer {
  position: fixed;
  bottom: 0;
}
</style>

<script>
import StorageService from '../../services/storage.service'
const storageService = new StorageService()
export default {
  name: 'AccountDrawer',

  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    user: {
      type: Object
    },
    balance: {
      type: String
    }
  },

  data () {
    return {
      drawer: false,
      isOpenModal: false,
      accounts: []
    }
  },

  watch: {
    isOpen (newVal, oldVal) {
      this.drawer = !this.drawer
    },
    user (newVal, oldVal) {
      this.filterAccounts(newVal)
    }
  },

  created () {
    const currentAcc = this.$store.state.profiles.currentUser
    this.filterAccounts(currentAcc)
  },

  methods: {
    closeDrawer () {
      this.drawer = false
    },

    openModal () {
      this.isOpenModal = !this.isOpenModal
    },

    setAccount (account) {
      this.$store.dispatch('profiles/setCurrentAccount', account)
    },

    filterAccounts (currentUser) {
      this.accounts = this.$store.state.profiles.polkadotAccounts.filter(i => i.id !== currentUser.id)
    },

    signOut () {
      storageService.removeAccountId()
      this.$store.dispatch('profiles/signOut')
      this.drawer = false
    }
  }
}
</script>
