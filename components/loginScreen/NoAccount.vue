<template>
  <div class="no-account">
    <div class="title">
      Sign In
    </div>
    <div class="message">
      No accounts found. Please open your <b>Polkadot extension</b> and create a new account or import existing. Then reload this page.
    </div>
    <div class="privacy">
      <a href="">Privacy Policy</a>
      <a href="">Terms of Use</a>
    </div>
  </div>
</template>

<style lang="scss">
.no-account {
  width: $modal_width;
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

  .message {
    width: 100%;
    padding: 21px;
    background-color: #FFFAD5;
    text-align: center;
    font-size: $font_normal;
    line-height: 125%;
    color: #262626;
    margin-bottom: 22px;
  }

  .privacy {
    display: flex;
    justify-content: space-evenly;

    a {
      text-decoration: none;
      color: $color_font_secondary;
      font-size: $font_small;
      line-height: 125%;

      &:hover {
        color: $color_primary;
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class LoginScreenNoAccount extends Vue {
}
</script>
