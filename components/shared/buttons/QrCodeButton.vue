<template>
  <div>
    <v-icon size="24" class="qr-icon" @click="openModal">
      mdi-qrcode
    </v-icon>

    <ModalQrCode :is-modal="isOpenModal" :address="address" />
  </div>
</template>

<style lang="scss">
.signin-button {
  border: 1px solid $button_bg_primary;
  border-radius: $border_small;
  background-color: $button_bg_white !important;

  .v-btn__content {
    font-weight: 500;
    font-size: $font_normal;
    line-height: 125%;
    text-align: center;
    color: $text_color_primary;
    text-transform: capitalize;
  }

}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class QrCodeButton extends Vue {
  @Prop({
    type: String
  }) address!: string

  isOpenModal: boolean = false

  openModal (): void {
    this.isOpenModal = !this.isOpenModal
  }
}
</script>
