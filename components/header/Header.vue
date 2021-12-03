<template>
  <header>
    <div class="header-container">
      <div class="header-line">
        <div class="left-bar">
          <button mat-icon-button class="menu-button">
            <v-icon medium>
              mdi-menu
            </v-icon>
          </button>
          <div class="project-name" @click="returnHome">
            <NuxtLink to="/">
              {{ socialName }}
            </NuxtLink>
          </div>
        </div>

        <div class="user-block">
          <SignInButton v-if="!user" />
          <div v-if="user" class="user-info-block">
            <NuxtLink to="notifications" class="notification-icon">
              <v-icon>
                mdi-bell-outline
              </v-icon>
            </NuxtLink>
            <div class="user-container" @click.stop="openDrawer">
              <v-list-item>
                <v-list-item-avatar size="30">
                  <Avatar :id=" user.id" :src=" user.avatar" :size="30" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>{{ user.name }}</v-list-item-title>
                  <v-list-item-title class="tokens">
                    <Tokens :balance="balance" />
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </div>
            <AccountDrawer :is-open="isOpenDrawer" :user="user" :balance="balance" />
          </div>
        </div>
      </div>

      <span v-show="isShowTabs" class="tabs-container">
        <Tabs :tab-links="tabLinks" />
      </span>
    </div>
  </header>
</template>

<style lang="scss">
header {
  position: relative;
  z-index: 10;
  background: #FFFFFF;
  box-shadow: 0px 3px 10px rgba(153, 153, 153, 0.14), 0px 3px 9px rgba(153, 153, 153, 0.12), 0px 1px 20px rgba(153, 153, 153, 0.2);

  .header-container {
    display: flex;
    justify-content: space-between;

    .tabs-container {
      width: 763px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
    }

    .user-block {
      margin-right: 15px;

      .notification-icon {
        margin-right: 15px;
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
              color: #222222;
              margin-left: 10px;
              font-size: $font-size-secondary-text;
              align-self: flex-start;
              line-height: 17px;

              .tokens-wp {
                line-height: 17px;

                span {
                  color: #A0A0A0 !important;
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

      .menu-button {
        width: 30px;
        height: 30px;
        line-height: 30px;
        margin: 13px 30px 13px 15px;

        .v-icon {
          color: rgba(0, 0, 0, 0.87);
        }
      }
    }

    .project-name {
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: $font-size-title-details;
      line-height: 24px;
      letter-spacing: 0.15px;
      color: rgba(0, 0, 0, 0.87);

      & a {
        text-decoration: none;
        color: inherit;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  header {
    .header-container {
      display: block;

      .tabs-container {
        width: 100%;
        position: relative;
        left: 0;
        transform: none;
      }
    }
  }
}

</style>

<script>
import { environment } from '~/environments/environment'

export default {
  name: 'Header',

  props: {
    socialName: {
      type: String,
      default: environment.appName
    },
    showTabs: {
      type: Boolean,
      default: false
    },
    tabLinks: {
      type: Array,
      default: ['my feed', 'posts', 'spaces']
    }
  },

  data () {
    return {
      tab: null,
      isShowTabs: this.showTabs,
      user: undefined,
      isOpenDrawer: false,
      balance: ''
    }
  },

  watch: {
    showTabs (val, oldval) {
      this.isShowTabs = this.showTabs
    }
  },

  created () {
    this.$nuxt.$on('isShowTabs', (data) => {
      this.isShowTabs = data
    })

    if (Object.keys(this.$route.params).length) {
      this.isShowTabs = false
    }

    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'profiles/SET_CURRENT_USER') {
        if (this.$store.state.profiles.currentUser) {
          this.user = this.$store.getters['profiles/selectProfileData'](this.$store.state.profiles.currentUser.id)
          if (!this.user) {
            this.user = this.$store.state.profiles.currentUser
          }
          this.balance = this.$store.state.profiles.myBalance
        } else {
          this.user = undefined
          this.$store.commit('profiles/SET_STATUS', 3)
        }
      }
    })
  },

  methods: {
    openDrawer () {
      this.isOpenDrawer = !this.isOpenDrawer
      this.showMenu = false
    },

    returnHome () {
      this.$nuxt.$emit('setTab', this.tabLinks[0])
    }
  }
}
</script>
