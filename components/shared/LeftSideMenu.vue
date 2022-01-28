<template>
  <div class="ma-12 pa-12">
    <v-card>
      <v-navigation-drawer
        v-model="drawer"
        :expand-on-hover="!isMobileView"
        absolute
        width="220"
        @transitionend="onDrawerChange"
      >
        <v-list class="px-5">
          <v-list-item link :href="links.reactApp">
            <v-list-item-icon>
              <img class="logo" src="../../assets/image/react-logo.svg" alt="React logo">
            </v-list-item-icon>
            <v-list-item-title>{{ $t('drawer.reactApp') }}</v-list-item-title>
          </v-list-item>

          <v-list-item link :href="links.angularApp">
            <v-list-item-icon>
              <img class="logo" src="../../assets/image/angular-logo.svg" alt="Angular logo">
            </v-list-item-icon>
            <v-list-item-title>{{ $t('drawer.angularApp') }}</v-list-item-title>
          </v-list-item>

          <v-divider />

          <v-list-item link :href="links.subsocial">
            <v-list-item-icon>
              <img class="logo" src="../../assets/image/subsocial-icon.svg" alt="Subsocial logo">
            </v-list-item-icon>
            <v-list-item-title>{{ $t('drawer.subsocialApp') }}</v-list-item-title>
          </v-list-item>
          <v-list-item link :href="links.landingPage">
            <v-list-item-icon>
              <v-icon>mdi-web</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('drawer.landingPage') }}</v-list-item-title>
          </v-list-item>
          <v-list-item link :href="links.legalDocuments">
            <v-list-item-icon>
              <v-icon>mdi-file-document-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('drawer.legalDocuments') }}</v-list-item-title>
          </v-list-item>
          <v-list-item link :href="links.github">
            <v-list-item-icon>
              <v-icon>mdi-github</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('drawer.github') }}</v-list-item-title>
          </v-list-item>
          <v-list-item link :href="links.whatIsSubsocial">
            <v-list-item-icon>
              <v-icon>mdi-help-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('drawer.whatIsSubsocial') }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-list class="bottom">
          <v-list-item class="bottom-title">
            <v-list-item-icon />
            <v-list-item-title class="social-title">
              {{ $t('drawer.ourSocialLinks') }}
            </v-list-item-title>
          </v-list-item>

          <v-list-item :inactive="true">
            <v-list-item-icon link>
              <a :href="links.twitter" class="twitter-link">
                <img src="../../assets/image/twitter.svg" alt="twitter icon">
              </a>
            </v-list-item-icon>
            <v-list-item-title>
              <a :href="links.discord" class="social-link">
                <img src="../../assets/image/discord.svg" alt="discord icon">
              </a>
              <a :href="links.telegram" class="social-link">
                <img src="../../assets/image/telegram-gray.svg" alt="telegram icon">
              </a>
              <a :href="links.megaphone" class="social-link">
                <img src="../../assets/image/megaphone.svg" alt="megaphone icon">
              </a>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
  </div>
</template>

<style scoped lang="scss">
.v-navigation-drawer {
  padding-top: 56px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  z-index: 1;

  .logo {
    height: 24px;
  }

  & .v-divider {
    margin: 0 16px;
  }

  .v-list--nav .v-list-item:not(:last-child):not(:only-child) {
    margin-bottom: 0!important;
  }

  .v-list-item {
    &__title {
      margin-left: $space_normal;
      font-size: $font_small;
      color: $color_dark_gray;
      font-weight: 500;
      line-height: 125%;
      z-index: 10;

      &.social-title {
        font-weight: normal;
        color: $color_font_secondary;
      }

      .social-link {
        margin-right: $space_normal;
        & img {
          border: 1px solid transparent;
        }
        
        &:hover img {
          border-radius: 50%;
          border-color: $color_hover_social_linK;
        }
      }
    }
    
    &__icon {
      z-index: 10;
    }

    .twitter-link {
      margin-right: $space_normal;
      position: relative;

      & img {
        border: 1px solid transparent;
      }

      &:hover img {
        border-radius: 50%;
        border-color: $color_hover_social_linK;
      }
    }
  }

  &--is-mouseover {
    .twitter-link {
      &::after {
        display: none !important;
      }
    }
  }

  .bottom {
    position: absolute;
    bottom: 0;
    left: -3px;

    .bottom-title {
      min-height: 15px !important;

      .v-list-item__icon {
        margin: 0!important;
      }
    }
  }
}
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { MenuLinks } from '~/constants/menu-links'
import { isMobile } from '~/utils/utils'

@Component
export default class LeftSideMenu extends Vue {
  links: {} = MenuLinks
  drawer: boolean = false
  isMobileView: boolean = false
  isSetMobile: boolean = false

  created () {
    this.$nuxt.$on('openDrawer', (isOpen: boolean) => {
      this.drawer = isOpen
    })

    if (process.browser) {
      window.addEventListener('resize', this.getIsMobile)
      this.getIsMobile()
    }
  }

  getIsMobile () {
    this.isMobileView = isMobile()
    if (!isMobile()) {
      this.drawer = true
    } else if (!this.isSetMobile) {
      this.drawer = false
    }

    if (window.innerWidth < 991 && !this.isSetMobile) {
      this.isSetMobile = true
    } else if (window.innerWidth > 991 && this.isSetMobile) {
      this.isSetMobile = false
    }

    return isMobile()
  }

  onDrawerChange () {
    this.$nuxt.$emit('changeHeaderIcon', this.drawer)
  }
}
</script>
