<template>
  <div class="ma-12 pa-12">
    <v-card>
      <v-navigation-drawer
        permanent
        expand-on-hover
        width="230"
      >
        <v-list class="px-5">
          <v-list-item link :href="links.reactApp">
            <v-list-item-icon>
              <img class="logo" src="../../assets/image/react-logo.svg" alt="React logo">
            </v-list-item-icon>
            <v-list-item-title>React app</v-list-item-title>
          </v-list-item>

          <v-list-item link :href="links.angularApp">
            <v-list-item-icon>
              <img class="logo" src="../../assets/image/angular-logo.svg" alt="Angular logo">
            </v-list-item-icon>
            <v-list-item-title>Angular app</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider />

        <v-list
          nav
        >
          <v-list-item link :href="links.subsocial">
            <v-list-item-icon>
              <img class="logo" src="../../assets/image/subsocial-icon.svg" alt="Subsocial logo">
            </v-list-item-icon>
            <v-list-item-title>Subsocial app</v-list-item-title>
          </v-list-item>
          <v-list-item link :href="links.landingPage">
            <v-list-item-icon>
              <v-icon>mdi-web</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Landing page</v-list-item-title>
          </v-list-item>
          <v-list-item link :href="links.legalDocuments">
            <v-list-item-icon>
              <v-icon>mdi-file-document-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Legal Documents</v-list-item-title>
          </v-list-item>
          <v-list-item link :href="links.github">
            <v-list-item-icon>
              <v-icon>mdi-github</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Github</v-list-item-title>
          </v-list-item>
          <v-list-item link :href="links.whatIsSubsocial">
            <v-list-item-icon>
              <v-icon>mdi-help-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>What is Subsocial?</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-list class="bottom">
          <v-list-item class="bottom-title">
            <v-list-item-icon />
            <v-list-item-title class="social-title">
              Our social links:
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

      &.social-title {
        font-weight: normal;
        color: $color_font_secondary;
      }

      .social-link {
        margin-right: $space_normal;
      }
    }

    .twitter-link {
      margin-right: $space_normal;
      position: relative;

      &::after {
        content: '';
        background-image: url("assets/image/3-dots.svg ");
        width: 5px;
        height: 15px;
        display: block;
        position: absolute;
        right: -8px;
        top: 8px;
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

@Component
export default class LeftSideMenu extends Vue {
  links: {} = MenuLinks
}
</script>
