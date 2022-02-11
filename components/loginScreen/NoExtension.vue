<template>
  <div class="no-extension">
    <div class="title">
      {{ isLoginText ? $t('modals.login.title') : $t('modals.login.title-wait') }}
    </div>

    <div class="sub-title" v-html="isLoginText ? $t('modals.login.noExtension.message') : $t('modals.login.noExtension.notLoginMessage')" />

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
  max-width: $modal_width;
  min-height: 267px;
  padding: $space_normal;

  .title {
    font-weight: 500;
    font-size: $font_huge;
    line-height: 125%;
    color: $text_color_dark_gray;
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
      color: $text_color_primary;
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
      border: 1px solid $button_outline_gray;
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
      color: $text_color_normal;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
    }
  }

  .need-help {
    font-size: $font_small;
    color: $text_color_dark_gray;
    line-height: 125%;
    text-align: center;

    a {
      text-decoration: none;
      color: $text_color_primary;
      font-weight: 500;

      &:hover {
        color: $text_color_dark_gray;
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class LoginScreenNoExtension extends Vue {
  @Prop({
    type: Boolean
  }) isLoginText!: boolean
}
</script>
