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
  background: $color_white;
  box-shadow: $header_shadow;

  .header-container {
    display: flex;
    justify-content: space-between;

    .tabs-container {
      width: $general_width;
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
              color: $color_font_normal;
              margin-left: 10px;
              font-size: $font_small;
              align-self: flex-start;
              line-height: 17px;

              .tokens-wp {
                line-height: 17px;

                span {
                  color: $color_font_secondary !important;
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
          color: $color_font_normal;
        }
      }
    }

    .project-name {
      font-style: normal;
      font-weight: 500;
      font-size: $font_huge;
      line-height:$main_line_height;
      letter-spacing: 0.15px;
      color: $color_font_normal;

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

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { environment } from '~/environments/environment'
import { ProfileItemModel } from '~/models/profile/profile-item.model'
import { routerParamsLength } from '~/utils/utils'
@Component
export default class Header extends Vue {
  @Prop({
    type: String,
    default: environment.appName
  }) socialName!: string

  @Prop({
    type: Boolean,
    default: false
  }) showTabs!: boolean

  @Prop({
    type: Array,
    default: ['posts', 'spaces']
  }) tabLinks!: ['posts', 'spaces']

  isShowTabs: boolean = this.showTabs
  user: ProfileItemModel | null = null
  isOpenDrawer: boolean = false
  balance: string = ''

  @Watch('showTabs')
  showTabsHandler () {
    this.isShowTabs = this.showTabs
  }

  created () {
    this.$nuxt.$on('isShowTabs', (data: boolean) => {
      this.isShowTabs = data
    })

    if (routerParamsLength(this.$route.params)) {
      this.isShowTabs = false
    }

    this.$store.subscribe((mutation) => {
      if (mutation.type === 'profiles/SET_CURRENT_USER') {
        if (this.$store.state.profiles.currentUser) {
          this.user = this.$store.getters['profiles/selectProfileData'](this.$store.state.profiles.currentUser.id)
          if (!this.user) {
            this.user = this.$store.state.profiles.currentUser
          }
          this.balance = this.$store.state.profiles.myBalance
        } else {
          this.user = null
          this.$store.commit('profiles/SET_STATUS', 3)
        }
      }
    })
  }

  openDrawer () {
    this.isOpenDrawer = !this.isOpenDrawer
  }

  returnHome () {
    this.$nuxt.$emit('setTab', this.tabLinks[0])
  }
}
</script>
