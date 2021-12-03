<template>
  <div class="address-container" @mouseover="mouseover" @mouseleave="mouseleave">
    <span class="address-text">{{ shortAddress }}</span>
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
    font-size: $font-size-secondary-text;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: rgba(0, 0, 0, 0.38);
  }

  .mat-icon-button {
    position: absolute;
    width: 25px;
    height: 25px;
    line-height: 25px;
    margin-left: 8px;
    top: -2px;
  }

}
</style>

<script>
export default {
  name: 'Address',

  props: {
    address: {
      type: String,
      default: ''
    },
    length: {
      type: Number,
      default: 17
    },
    showIcon: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small'
    },
    showCopyBtn: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      showCopy: this.showIcon
    }
  },

  computed: {
    shortAddress () {
      if (this.length > this.address.length) {
        return this.address
      } else {
        const index = Math.floor(this.length / 2)
        return this.address.substring(0, index) + '...' + this.address.slice(-index)
      }
    }
  },

  methods: {
    async copyAddress () {
      try {
        await navigator.clipboard.writeText(this.address).then(() => {
          this.$nuxt.$emit('isShowSnackbar', { show: true, text: 'Address copied!' })
        })
      } catch ($e) {
        console.log('Cannot copy')
      }
    },
    mouseover () {
      if (!this.showIcon) {
        this.showCopy = true
      }
    },
    mouseleave () {
      if (!this.showIcon) {
        this.showCopy = false
      }
    }
  }
}
</script>
