<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    absolute
    bottom
    color="#fff"
    class="snack"
    left
  >
    {{ text }}
  </v-snackbar>
</template>

<style lang="scss">
.snack {
  z-index: 30;

  .v-snack__wrapper {
    min-width: 150px;
  }

  .v-snack__content {
    color: #222222;
  }
}
</style>

<script>
export default {
  name: 'Snackbar',

  props: {
    defaultText: {
      type: String,
      default: ''
    },
    defaultTimeout: {
      type: Number,
      default: 2000
    },
    defaultShow: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      snackbar: false,
      text: '',
      timeout: 2000
    }
  },

  created () {
    this.$nuxt.$on('isShowSnackbar', (data) => {
      this.snackbar = data.show
      this.text = data.text
    })
  },

  mounted () {
    this.text = this.defaultText
    this.timeout = this.defaultTimeout
    this.snackbar = this.defaultShow
  }
}
</script>
