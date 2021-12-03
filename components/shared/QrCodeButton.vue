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
  border: 1px solid #EB2F96;
  border-radius: 4px;
  background-color: #fff !important;

  .v-btn__content {
    font-weight: 500;
    font-size: 17px;
    line-height: 125%;
    text-align: center;
    color: #EB2F96;
    text-transform: capitalize;
  }

}
</style>

<script>
export default {
  name: 'QrCodeButton',

  props: {
    address: {
      type: String
    }
  },

  data () {
    return {
      isOpenModal: false
    }
  },

  methods: {
    openModal () {
      this.isOpenModal = !this.isOpenModal
    }
  }
}
</script>
