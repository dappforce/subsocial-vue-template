<template>
  <div class="no-account">
    <div class="title">
      {{ isLoginText ? $t('modals.login.title') : $t('modals.login.waitSec') }}
    </div>
    <div v-if="!isLoginText" class="sub-title">
      {{ $t('modals.login.noAccountScreen.notLoginMessage') }}
    </div>
    <div class="message" v-html="$t('modals.login.noAccountScreen.message')" />
    <div class="privacy">
      <a href="">{{ $t('buttons.privacyPolicy') }}</a>
      <a href="">{{ $t('buttons.termsOfUse') }}</a>
    </div>
  </div>
</template>

<style lang="scss">
.no-account {
  max-width: $modal_width;
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
    text-align: center;
    margin-bottom: $space_normal;
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
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class LoginScreenNoAccount extends Vue {
  @Prop({
    type: Boolean
  }) isLoginText!: boolean
}
</script>
