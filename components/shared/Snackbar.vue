<template>
  <div data-app>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      fixed
      bottom
      class="snack"
      left
    >
      {{ text }}
    </v-snackbar>
  </div>
</template>

<style lang="scss">
.snack {
  z-index: 30;

  .v-snack__wrapper {
    min-width: 150px;
    background-color: $snackbar_bg;
  }

  .v-snack__content {
    color: $text_color_normal;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Snackbar extends Vue {
  @Prop({
    type: String,
    default: ''
  }) defaultText!: string

  @Prop({
    type: Number,
    default: 2000
  }) defaultTimeout!: number

  @Prop({
    type: Boolean,
    default: false
  }) defaultShow!: boolean

  snackbar: boolean = false
  text: string = ''
  timeout: number = 2000

  created () {
    this.$nuxt.$on('isShowSnackbar', (data: any) => {
      this.snackbar = data.show
      this.text = data.text
      this.timeout = data.timeout ? data.timeout : this.defaultTimeout
    })
  }

  mounted () {
    this.text = this.defaultText
    this.timeout = this.defaultTimeout
    this.snackbar = this.defaultShow
  }
}
</script>
