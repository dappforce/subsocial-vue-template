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
  padding: $space_small $space_normal $space_normal;

  .close-icon {
    position: absolute;
    right: $space_normal;
    top: $space_small;
  }

  .title {
    font-weight: 500;
    font-size: $font_large;
    line-height: 125%;
    color: $color_font_normal;
  }

  .qr {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 18px;
    margin-bottom: $space_large;
  }

  .address {
    font-weight: 500;
    font-size: $font_small;
    line-height: 125%;
    color: $color_font_normal;
    text-align: center;
    display: block;
  }

  .btn-container {
    margin-top: $space_large;
    display: flex;
    justify-content: space-between;

    .v-btn {
      width: 140px;
      border: 1px solid $color_primary;
      box-sizing: border-box;
      border-radius: 5px;

      &.close-btn {
        background: $color_white;
        color: $color_primary;
        box-shadow: none;
      }

      &.copy-btn {
        background: $color_primary;
        color: $color_white;

        .v-icon {
          margin-right: $space_small;
        }
      }
    }
  }
}
</style>

<script lang="ts">
import QrcodeVue from 'qrcode.vue'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
  components: {
    QrcodeVue
  }
})
export default class ModalQrCode extends Vue {
  @Prop({
    type: Boolean,
    default: false
  }) isModal!: boolean

  @Prop({
    type: String
  }) address!: string

  value: string = 'https://example.com'
  size: number = 170
  openModal: boolean = false

  @Watch('isModal')
  isModalHandler () {
    this.onClick()
  }

  onClick () {
    this.openModal = !this.openModal
  }

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
</script>
