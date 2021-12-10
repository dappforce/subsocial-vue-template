<template>
  <v-btn depressed class="tips-btn">
    Write post
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
  line-height: 16px;
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
export default class WritePostButton extends Vue {
}
</script>
