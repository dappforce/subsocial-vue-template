<template>
  <div class="no-extension">
    <div class="title">
      {{ $t('modals.login.title') }}
    </div>

    <div class="sub-title" v-html="$t('modals.login.noExtension.message')" />

    <div class="btn-container">
      <v-btn class="signin-button">
        <a href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd">
          <img src="../../assets/image/chrome-icon.svg" alt="Chrome logo">
          {{ $t('modals.login.noExtension.installForChrome') }}
        </a>
      </v-btn>

      <v-btn class="signin-button">
        <a href="https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/">
          <img src="../../assets/image/firefox-icon.svg" alt="Firefox logo">
          {{ $t('modals.login.noExtension.installForFirefox') }}
        </a>
      </v-btn>
    </div>

    <div class="need-help">
      {{ $t('modals.login.noExtension.needHelp') }} <a href="">{{ $t('modals.login.noExtension.signInGuide') }}</a>
    </div>
  </div>
</template>

<style lang="scss">
.no-extension {
  width: $modal_width;
  height: 267px;
  padding: $space_normal;

  .title {
    font-weight: 500;
    font-size: $font_huge;
    line-height: 125%;
    color: $color_font_secondary;
    width: 100%;
    text-align: center;
    margin-bottom: 14px;
  }

  .sub-title {
    font-size: $font_normal;
    line-height: 125%;
    text-align: center;
    margin-bottom: $space_large;
    span {
      color: $color_primary;
    }
  }

  .btn-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: $space_large;

    .signin-button {
      width: 200px;
      display: flex;
      justify-content: flex-start;
      border: 1px solid #D9D9D9;
      box-sizing: border-box;
      border-radius: $border_small;
      box-shadow: none;

      &:first-child {
        margin-bottom: $space_normal;
      }
    }

    a {
      text-decoration: none;
      font-size: $font_normal;
      line-height: 125%;
      color: #262626;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Roboto;

      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
  }

  .need-help {
    font-size: $font_small;
    color: #8C8C8C;
    line-height: 125%;
    text-align: center;

    a {
      text-decoration: none;
      color: $color_primary;
      font-weight: 500;

      &:hover {
        color: #8C8C8C;
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class LoginScreenNoExtension extends Vue {
}
</script>
