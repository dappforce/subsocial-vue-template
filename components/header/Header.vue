<template>
  <header>
    <div class="header-container">
      <div class="header-line">
        <div class="left-bar">
          <div v-if="isMobileView" class="hamburger" @click="openLeftDrawer">
            <v-icon>{{ isOpenLeftMenu ? 'mdi-close' : 'mdi-menu' }}</v-icon>
          </div>
          <div v-if="!isMobileView" class="project-logo">
            <img src="../../assets/image/vue-logo.svg" width="30"/>
          </div>
          <div class="project-name" @click="returnHome">
            <NuxtLink :to="localePath('/')">
              {{ $t('general.title') }}
            </NuxtLink>
          </div>
        </div>
        <div class="user-block">
          <CreateSpaceButton v-if="user && !hasSpace && !isMobileView" :is-header-btn="true"/>
          <CreatePostButton v-if="user && hasSpace && !isMobileView"/>
          <SignInButton v-if="!user"/>
          <div v-if="user" class="user-info-block">
            <NuxtLink :to="localePath('/notifications')" class="notification-icon">
              <v-icon>
                mdi-bell-outline
              </v-icon>
            </NuxtLink>

            <div class="user-container" @click.stop="openDrawer">
              <v-list-item>
                <v-list-item-avatar size="36">
                  <Avatar :id="user.id" :src="user.avatar" :size="36"/>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ user.name }}</v-list-item-title>
                  <v-list-item-title class="tokens">
                    <Tokens :balance="balance"/>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
            <AccountDrawer :is-open="isOpenDrawer" :user="user" :balance="balance"/>
          </div>
        </div>
      </div>

      <div v-if="user && isMobileView" class="mobile-create-post">
        <NuxtLink :to="localePath(hasSpace ? '/post?new' : '/space?new')">
          <v-icon>mdi-plus</v-icon>
        </NuxtLink>
      </div>

      <ModalAdblock :is-modal="isOpenModal"/>
      <ModalTokenAlert />
    </div>
  </header>
</template>

<style lang="scss">
header {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 10;
  background: $container_bg_white;
  border-bottom: 1px solid $line_outline_gray;

  .header-container {
    display: flex;
    justify-content: space-between;

    .user-block {
      margin-right: $space_normal;
      display: flex;
      align-items: center;

      .notification-icon {
        margin: 0 $space_large;
      }

      .user-info-block {
        display: flex;
        align-items: center;

        .user-container {
          cursor: pointer;
          height: 100%;

          .v-list-item {
            height: 100%;
            padding: 0;

            &__content {
              padding: 0;
              flex-direction: column;
            }

            &__title {
              color: $text_color_normal;
              margin-left: $space_tiny;
              font-size: $font_small;
              align-self: flex-start;
              line-height: 17px;
              font-weight: 500;

              .tokens-wp {
                line-height: 17px;

                span {
                  color: $text_color_dark_gray !important;
                  font-weight: normal !important;
                }
              }
            }
          }
        }

        .notification-icon {
          text-decoration: none;
        }
      }
    }
  }

  .header-line {
    display: flex;
    align-items: center;
    height: 56px;
    width: 100%;
    justify-content: space-between;

    .left-bar {
      display: flex;
      align-items: center;

      .hamburger {
        width: 30px;
        height: 30px;
        line-height: 30px;
        margin-left: $space_large;

        .v-icon {
          color: $icon_color_normal;
        }
      }
      
      .project-logo {
        padding: 0 $space_small;
      }
    }

    .project-name {
      font-style: normal;
      font-weight: 500;
      font-size: $font_large;
      line-height: $main_line_height;
      letter-spacing: 0.15px;
      color: $text_color_normal;

      & a {
        text-decoration: none;
        color: inherit;
      }
    }
  }
  
  .mobile-create-post {
    position: fixed;
    bottom: $space_huge;
    right: $space_normal;
    
    a {
      text-decoration: none;
      background-color: $button_bg_primary;
      height: 50px;
      width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      
      .v-icon {
        color: $icon_color_white;
        width: 20px;
        height: 20px;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  header {
    border: none;

    .header-container {
      display: block;
    }
  }
}

</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ProfileItemModel } from '~/models/profile/profile-item.model'
import { config } from '~/config/config'
import { isMobile } from '~/utils/utils'
import ModalTokenAlert from '~/components/modal/ModalTokenAlert.vue'
@Component({
  components: { ModalTokenAlert }
})
export default class Header extends Vue {
  user: ProfileItemModel | null = null
  isOpenDrawer: boolean = false
  balance: string = ''
  isOpenModal: boolean = false
  tabLinks: string[] = [this.$t('tabs.posts') as string, this.$t('tabs.spaces') as string]
  hasSpace: boolean = false
  addressLength: number = config.addressLengthShort
  isMobileView: boolean = false
  isOpenLeftMenu: boolean = false

  created () {
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'profiles/SET_CURRENT_USER') {
        if (this.$store.state.profiles.currentUser) {
          this.user = this.$store.getters['profiles/selectProfileData'](this.$store.state.profiles.currentUser.id)
          if (!this.user) {
            this.user = this.$store.state.profiles.currentUser
          }
          if (this.user) {
            this.$store.dispatch('space/getIsAccountHasSpaces', this.user.id).then((res) => {
              this.hasSpace = res
            })
          }
          this.balance = this.$store.state.profiles.myBalance
        } else {
          this.user = null
          this.$store.commit('profiles/SET_STATUS', 3)
        }
      }

      if (mutation.type === 'profiles/SET_BALANCE') {
        this.balance = this.$store.state.profiles.myBalance
      }
    })

    this.$store.subscribeAction({
      after: (action) => {
        if (action.type === 'profiles/updateUserInfo') {
          this.user = this.$store.getters['profiles/selectProfileData'](this.$store.state.profiles.currentUser.id)
        }
      }
    })

    if (process.browser) {
      window.addEventListener('resize', this.getIsMobileView)
    }

    this.$nuxt.$on('changeHeaderIcon', (isOpen: boolean) => {
      this.isOpenLeftMenu = isOpen
    })
  }

  openDrawer (): void {
    this.isOpenDrawer = !this.isOpenDrawer
  }

  returnHome (): void {
    this.$nuxt.$emit('setTab')
  }

  mounted () {
    this.checkAdBlock()
    this.getIsMobileView()
  }

  checkAdBlock (): void {
    const { detectAnyAdblocker } = require('vue-adblock-detector')

    detectAnyAdblocker().then((detected: boolean) => {
      if (detected) {
        this.isOpenModal = detected
      }
    })
  }

  openLeftDrawer (): void {
    this.$nuxt.$emit('openDrawer', true)
  }

  getIsMobileView (): void {
    this.isMobileView = isMobile()
  }
}
</script>
