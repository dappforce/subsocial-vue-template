<template>
  <v-btn depressed :disabled="true" class="tips-btn">
    Send tips
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
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SendTipsButton extends Vue {
}
</script>
