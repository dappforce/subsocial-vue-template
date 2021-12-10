<template>
  <div class="no-extension">
    <div class="title">
      Sign In
    </div>

    <div class="sub-title">
      <span>Polkadot Extension</span> was not found or disabled.
      Install the extension with the button below.
    </div>

    <div class="btn-container">
      <v-btn class="signin-button">
        <a href="https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd">
          <img src="../../assets/image/chrome-icon.svg" alt="Chrome logo">
          Install for Chrome
        </a>
      </v-btn>

      <v-btn class="signin-button">
        <a href="https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/">
          <img src="../../assets/image/firefox-icon.svg" alt="Firefox logo">
          Install for Firefox
        </a>
      </v-btn>
    </div>

    <div class="need-help">
      Need help? Read our <a href="">Sign In Guide</a>
    </div>
  </div>
</template>

<style lang="scss">
.no-extension {
  width: 432px;
  height: 267px;
  padding: 18px;

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
      width: 230px;
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
