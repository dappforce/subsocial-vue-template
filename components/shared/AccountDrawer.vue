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
            <Title :id="user.id" size="large" :name="user.name" :link="'/accounts/' + user.id" />
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
        <Address :address="user.address || user.id" :size="'large'" :length="addressLength" :show-icon="true" />
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
      <v-list-item link :to="localePath('/accounts/' + user.id)">
        <v-list-item-icon>
          <v-icon class="account-icon">
            mdi-account-outline
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            My profile
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link :to="localePath('/profile/?id=' + user.id)">
        <v-list-item-icon>
          <v-icon class="account-icon">
            mdi-pencil-outline
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>
            Edit my profile
          </v-list-item-title>
        </v-list-item-content>
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
  padding: $space_normal $space_normal $space_normal 11px;
  z-index: 10;

  .account-icon {
    width: 40px;
    margin-right: 13px;
  }

  .close {
    position: absolute;
    right: $space_normal;
    top: $space_normal;
    cursor: pointer;
  }

  & .user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    min-height: 0;
    padding-bottom: $space_normal;
    padding-left: 5px;

    .profile-info-wp {
      display: flex;
      align-items: center;
      margin-bottom: $space_large;

      .info-container {
        margin-left: 13px;

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
      font-size: $font_normal;

      .address-container {
        display: flex;
        align-items: center;

        .address-text {
          color: $color_font_normal;
          font-size: $font_normal;
        }

        .v-icon {
          color: $color_black;
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
        color: $color_black;
      }
    }

    .account-amount {
      font-size: $font_normal;
      margin-top: $space_tiny;
      font-weight: 500;
      display: flex;
      align-items: center;

      .gray {
        color: $color_font_secondary;
        font-weight: normal;
      }
    }
  }

  & .account-btn {
    padding-left: 5px;

    .v-list-item {
      color: $color_black;
      padding: 0;

      .v-icon {
        color: $color_black;
        margin-right: $space_small;
      }

      &__title {
        font-size: $font_normal;
        font-weight: normal;
        letter-spacing: 0.25px;
        line-height: 1.1rem;

        a {
          text-decoration: none;
          color: $color_black;
        }
      }
    }
  }

  .user-list {
    height: calc(100% - 335px);
    overflow: hidden;
    overflow-y: auto;
    position: relative;
    margin-bottom: $space_large;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: none;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $color_gray;
      width: 6px;
    }

    .user-item {
      padding: 3px 0;

      .user-account {
        transition: all .2s ease;
        &:hover {
          background-color: rgba(238, 236, 236, 0.7);
          cursor: pointer;
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
    padding-left: 5px;
    &__btn {
      border: 1px solid $color_primary;
      box-sizing: border-box;
      border-radius: $border_small;
      width: 100%;
      height: $buttons_height;
      color: $color_primary;
      font-size: $font_normal;
      font-weight: 500;
      letter-spacing: 1.25px;
      box-shadow: none;
      background-color: $color_white !important;
    }
  }
}
.v-navigation-drawer {
  position: fixed;
  bottom: 0;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import StorageService from '../../services/storage.service'
import { ProfileItemModel } from '~/models/profile/profile-item.model'
import { AccountData } from '~/types/account.types'
import { config } from '~/config/config'
const storageService = new StorageService()

@Component
export default class AccountDrawer extends Vue {
  @Prop({
    type: String
  }) balance!: string

  @Prop({
    type: Boolean
  }) isOpen!: boolean

  @Prop({
    type: Object
  }) user!: ProfileItemModel

  drawer: boolean = false
  isOpenModal: boolean = false
  accounts: AccountData[] = []
  addressLength: number = config.addressLengthShort

  created () {
    const currentAcc = this.$store.state.profiles.currentUser
    this.filterAccounts(currentAcc)
  }

  @Watch('isOpen')
  isOpenDrawer () {
    this.drawer = !this.drawer
  }

  @Watch('user')
  userChanged (newVal: ProfileItemModel) {
    this.filterAccounts(newVal)
  }

  closeDrawer (): void {
    this.drawer = false
  }

  openModal (): void {
    this.isOpenModal = !this.isOpenModal
  }

  setAccount (account: ProfileItemModel): void {
    this.$store.dispatch('profiles/setCurrentAccount', account)
  }

  filterAccounts (currentUser: ProfileItemModel): void {
    this.accounts = this.$store.state.profiles.polkadotAccounts.filter((i: AccountData) => i.id !== currentUser.id)
  }

  signOut () {
    storageService.removeAccountId()
    this.$store.dispatch('profiles/signOut')
    this.drawer = false
  }
}
</script>
