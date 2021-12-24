<template>
  <v-btn class="create-space-btn" to="/space-edit">
    + Create Space
  </v-btn>
</template>

<style lang="scss">
.create-space-btn {
  border: 1px solid $color_primary;
  border-radius: $border_small;
  background-color: $color_white !important;
  box-shadow: none;
  margin-right: $space_normal;

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
export default class CreateSpaceButton extends Vue {

}
</script>
