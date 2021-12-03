<template>
  <v-dialog
    v-model="openModal"
    max-width="328"
  >
    <v-card class="qr-container">
      <v-icon medium class="close-icon" size="24" @click="onClick">
        mdi-close
      </v-icon>
      <div>
        <span class="title">Account address</span>
        <qrcode-vue :value="address" :size="size" level="M" class="qr" />
        <span class="address">{{ address }}</span>
      </div>
      <div class="btn-container">
        <v-btn class="close-btn" @click="onClick">
          Close
        </v-btn>
        <v-btn class="copy-btn" @click="copyAddress">
          <v-icon :size="16">
            mdi-content-copy
          </v-icon>
          Copy
        </v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
.qr-container {
  padding: 12px 16px 16px;

  .close-icon {
    position: absolute;
    right: 16px;
    top: 12px;
  }

  .title {
    font-weight: 500;
    font-size: $font-size-title-preview;
    line-height: 125%;
    color: #222222;
  }

  .qr {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 18px;
    margin-bottom: 20px;
  }

  .address {
    font-weight: 500;
    font-size: $font-size-secondary-text;
    line-height: 125%;
    color: #222222;
    text-align: center;
    display: block;
  }

  .btn-container {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .v-btn {
      width: 140px;
      border: 1px solid #EB2F96;
      box-sizing: border-box;
      border-radius: 5px;

      &.close-btn {
        background: #FFFFFF;
        color: #EB2F96;
        box-shadow: none;
      }

      &.copy-btn {
        background: #EB2F96;
        color: #fff;

        .v-icon {
          margin-right: 12px;
        }
      }
    }
  }
}
</style>

<script>
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'ModalQrCode',
  components: {
    QrcodeVue
  },

  props: {
    isModal: {
      type: Boolean,
      default: false
    },
    address: {
      type: String
    }
  },

  data () {
    return {
      value: 'https://example.com',
      size: 170,
      openModal: false
    }
  },

  watch: {
    isModal (newVal, oldVal) {
      this.onClick()
    }
  },

  methods: {
    onClick () {
      this.openModal = !this.openModal
    },
    async copyAddress () {
      try {
        await navigator.clipboard.writeText(this.address).then(() => {
          this.$nuxt.$emit('isShowSnackbar', { show: true, text: 'Address copied!' })
        })
      } catch ($e) {
        console.log('Cannot copy')
      }
    }
  }
}
</script>
