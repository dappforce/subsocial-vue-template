<template>
  <div class="address-container" @mouseover="mouseover" @mouseleave="mouseleave">
    <span class="address-text">{{ address | addressShortness(length) }}</span>
    <button v-show="showCopy && showCopyBtn" @click="copyAddress">
      <v-icon :size="size === 'small' ? '16px' : '24px'">
        mdi-content-copy
      </v-icon>
    </button>
  </div>
</template>

<style lang="scss">
.address-container {
  position: relative;

  .address-text {
    font-size: $font_small;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: $text_color_normal;
  }

  .mat-icon-button {
    position: absolute;
    width: 25px;
    height: 25px;
    line-height: 25px;
    margin-left: $space_tiny;
    top: -2px;
  }

}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export interface AddressInt {
  showCopy: boolean
}
@Component

export default class Address extends Vue implements AddressInt {
  @Prop({
    type: String
  }) address!: string

  @Prop({
    type: Number,
    default: 17
  }) length!: number

  @Prop({
    type: Boolean,
    default: false
  }) showIcon!: boolean

  @Prop({
    type: String,
    default: 'small'
  }) size!: string

  @Prop({
    type: Boolean,
    default: true
  }) showCopyBtn!: boolean

  public showCopy: boolean = this.showIcon;

  async copyAddress () {
    try {
      await navigator.clipboard.writeText(this.address).then(() => {
        this.$nuxt.$emit('isShowSnackbar', { show: true, text: this.$t('snackbars.addressCopied') })
      })
    } catch ($e) {
      console.log('Cannot copy')
    }
  }

  mouseover (): void {
    if (!this.showIcon) {
      this.showCopy = true
    }
  }

  mouseleave (): void {
    if (!this.showIcon) {
      this.showCopy = false
    }
  }
}
</script>
