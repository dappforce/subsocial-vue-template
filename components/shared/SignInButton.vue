<template>
  <div>
    <v-btn class="signin-button" @click="openModal">
      Sign In
    </v-btn>

    <ModalLogin :is-modal="isOpenModal" />
  </div>
</template>

<style lang="scss">
.signin-button {
  border: 1px solid $color_primary;
  border-radius: $border_small;
  background-color: $color_white !important;

  .v-btn__content {
    font-weight: 500;
    font-size: $font_normal;
    line-height: 125%;
    text-align: center;
    color: $color_primary;
    text-transform: capitalize;
  }

}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class SignInButton extends Vue {
  isOpenModal: boolean = false

  openModal () {
    this.isOpenModal = !this.isOpenModal
  }
}
</script>
