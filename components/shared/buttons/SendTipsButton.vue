<template>
  <v-btn depressed :disabled="!isAuth" class="tips-btn" @click="isOpen = !isOpen">
    {{ $t('buttons.sendTips') }}
    <ModalSendTips v-if="isAuth" :is-modal="isOpen" :user-info="userInfo" />
  </v-btn>
</template>

<style lang="scss">
.tips-btn {
  width: 99px;
  height: $buttons_height;
  border: 1px solid $color_primary;
  box-sizing: border-box;
  border-radius: $border_small;
  font-style: normal;
  font-weight: 500;
  line-height: $normal_line_height;
  letter-spacing: 1.25px;
  text-transform: capitalize;
  background-color: $color_white !important;
  .v-btn__content {
    color: $color_primary;
    font-size: $font_small;
  }

  &:disabled {
    border: none;
    color: #B3B3B3 !important;
    opacity: 0.5;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ProfileData } from '@subsocial/api/flat-subsocial/dto'

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
}
</script>
