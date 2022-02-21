<template>
  <v-btn depressed :disabled="isEnableTips" class="tips-btn" @click="isOpen = !isOpen">
    {{ $t('buttons.sendTips') }}
    <ModalSendTips v-if="isAuth" :is-modal="isOpen" :user-info="userInfo" />
  </v-btn>
</template>

<style lang="scss">
.tips-btn {
  background-color: $button_bg_white !important;
  height: $buttons_height;
  border: 1px solid $button_outline_gray;
  box-sizing: border-box;
  border-radius: $border_small;
  font-style: normal;
  font-weight: 500;
  line-height: $normal_line_height;
  letter-spacing: 1.25px;
  text-transform: capitalize;

  .v-btn__content {
    color: $input_focused_outline;
    font-size: $font_normal;
    flex: initial;
  }

  &:disabled {
    border: none;
    background-color: $button_bg_disabled !important;

    .v-btn__content {
      color: $text_color_disabled;
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ProfileData } from '@subsocial/types/dto'
import { config } from '~/config/config'

@Component
export default class SendTipsButton extends Vue {
  @Prop({
    type: String
  }) userId!: string

  isOpen: boolean = false
  userInfo: ProfileData | null = null
  isAuth: boolean = !!this.$store.state.profiles.currentUser

  mounted () {
    this.getAccount().then((data) => {
      this.userInfo = data
    })
  }

  async getAccount () {
    return await this.$store.getters['profiles/selectProfileData'](this.userId)
  }
  
  get isEnableTips (): boolean {
    return this.isAuth ? !config.enableTips : !this.isAuth
  }
}
</script>
