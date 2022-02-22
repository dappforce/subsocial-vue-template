<template>
  <div data-app>
    <v-navigation-drawer
      v-model="drawer"
      class="drawer-container"
      right
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
              <span @click="openModal">
                <b>{{user.followingCount | numeral('0,0a')}}</b> {{$tc('plural.'+i18nextKey(user.followingCount, 'following'))}}
              </span>
              <span @click="openModal">
                <b>{{user.followersCount | numeral('0,0a')}}</b> {{ $tc('plural.'+i18nextKey(user.followersCount, 'follower')) }}
              </span>
            </div>
          </div>
        </div>
        <div class="account-info-wp">
          <div size="24" class="account-icon">
            <img class="logo" src="../../assets/image/wallet.jpg" alt="Wallet">
          </div>
          <Address :address="user.address || user.id" :size="'large'" :length="addressLength" :show-icon="true" />
          <QrCodeButton :address="user.address || user.id" />
        </div>

        <div class="account-amount">
          <div class="account-icon">
            <img class="logo" src="../../assets/image/balance.jpg" alt="Currency">
          </div>
          <Tokens :balance="balance" />
        </div>
      </div>

      <v-divider />

      <v-list class="account-btn custom-hover" dense>
        <v-list-item link :to="localePath('/accounts/' + user.id)">
          <v-list-item-icon>
            <v-icon class="account-icon">
              mdi-account-outline
            </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ $t('buttons.myProfile') }}
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
              {{ $t('buttons.editMyProfile') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-click-outside="changeLocal" link>
          <v-list-item-icon>
            <v-icon class="account-icon">
              mdi-web
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content class="language-container" @click="toggleSelect = !toggleSelect">
            <v-list-item-title>
              {{ $t('buttons.Language') }}: {{ getLanguageName() }}

              <v-select
                v-model="selectedHeaders"
                :items="availableLocales"
                :menu-props="{value: toggleSelect}"
                return-object
                item-text="name"
                class="select-language-input"
                @change="changeLocal"
              />
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
                  {{ $t('buttons.settings') }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <span>Coming soon</span>
          </v-tooltip>
        </v-list-item>
      </v-list>

      <v-divider />

      <div class="drawer-user-container px-5">
        <div class="user-list">
          <div
            v-for="(item, index) in accounts"
            :key="index"
            class="user-item"
            @click="setAccount(item)"
          >
            <ProfileAccountListItem
              :user-info="item"
              :type="'account'"
              class="user-account"
            />
          </div>
        </div>
        <div class="shadow">
          <v-divider light />
        </div>
      </div>
      
      <div class="sign-out">
        <v-btn class="sign-out__btn" @click="signOut">
          {{ $t('buttons.signOut') }}
        </v-btn>
      </div>
      <ModalConnections :is-modal="isOpenModal" :account-id="user.id" />
    </v-navigation-drawer>
  </div>
</template>

<style lang="scss">
.drawer-container {
  width: 420px !important;
  z-index: 10;
  box-shadow: $box_shadow_left_drawer;
  
  .account-icon {
    width: 40px;
    margin-right: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      width: 24px;
    }
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
    padding: $space_normal;

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
          color: $text_color_normal;

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
          color: $text_color_normal;
          font-size: $font_normal;
        }

        .v-icon {
          color: $icon_color_normal;
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
        color: $text_color_normal;
      }
      
      svg {
        fill: #888;
      }
    }

    .account-amount {
      font-size: $font_normal;
      margin-top: $space_tiny;
      font-weight: 500;
      display: flex;
      align-items: center;

      .gray {
        color: $text_color_dark_gray;
        font-weight: normal;
      }
    }
  }

  & .account-btn {

    .v-list-item {
      color: $text_color_dark_gray;
      padding: 0 $space_normal;

      .v-icon {
        color: $icon_color_dark_gray;
        margin-right: $space_small;
      }

      &__title {
        font-size: $font_normal;
        font-weight: normal;
        letter-spacing: 0.25px;
        line-height: 1.1rem;
        color: $text_color_dark_gray;
        z-index: 10;

        a {
          text-decoration: none;
          color: $text_color_normal;
        }
      }
    }
  }

  .language-container {
    height: 34px;
    
    .v-select__selection {
      display: none;
    }

    .v-list-item__title {
      height: 19px;
      display: flex;
      cursor: pointer;
      align-items: center;
    }

    & .v-text-field {
      padding: 0;
      margin: 0;

      &__details {
        display: none;
      }
    }

    & .v-input {
      &__slot {
        margin: 0;

        &:before, &:after {
          display: none;
        }
      }
    }
  }
  
  .drawer-user-container {
    height: calc(100% - 390px);
    position: relative;

    .shadow {
      display: flex;
      align-items: flex-end;
      height: 50px;
      position: absolute;
      bottom: 15px;
      right: 0;
      left: 0;
      background: $drawer_shadow;
    }

    .user-list {
      height: calc(100% - 15px);
      overflow: hidden;
      overflow-y: auto;
      position: relative;
      margin-bottom: $space_large;
      padding-bottom: 30px;
      
      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        box-shadow: none;
      }

      &::-webkit-scrollbar-thumb {
        background-color: $scroll_outline_gray;
        width: 6px;
      }

      & .user-item {
        padding: 0 $space_normal !important;
        transition: all .2s ease;
        
        &:hover {
          background-color: $hover_menu_item;
          cursor: pointer;
        }
      }
    }
  }
  
  .sign-out {
    padding: 0 $space_normal $space_normal;
    
    &__btn {
      border: 1px solid $button_outline_primary;
      box-sizing: border-box;
      border-radius: $border_small;
      width: 100%;
      height: $buttons_height;
      color: $text_color_primary;
      font-size: $font_normal;
      font-weight: 500;
      letter-spacing: 1.25px;
      box-shadow: none;
      background-color: $button_bg_white !important;
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
import { toI18next } from '~/utils/utils'
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
  toggleSelect: boolean = false
  selectedHeaders: any[] = []

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

  get availableLocales () {
    return this.$i18n.locales
  }

  changeLocal (event: any) {
    this.toggleSelect = false
    if (event.code) {
      storageService.setSelectedLanguage(event.code)
      this.$updateDateLocal(event.code)
    }
  }

  getLanguageName (): string {
    const locales = this.$i18n.locales as [{ code: string, name: string }]
    const currentLang = locales.find((i: { code: string, name: string }) => i.code === this.$i18n.locale)
    return currentLang ? currentLang.name : ''
  }

  i18nextKey (count: number, key: string): string {
    return toI18next(count, key, this.$i18n.locale)
  }
}
</script>
