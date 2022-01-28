<template>
  <v-btn depressed class="edit-space-btn" @click="onClick">
    {{ $t('buttons.editSpace') }}
  </v-btn>
</template>

<style lang="scss">
.edit-space-btn {
  background-color: $color_white !important;
  height: $buttons_height;
  border: 1px solid $color_border;
  box-sizing: border-box;
  border-radius: $border_small;
  font-style: normal;
  font-weight: 500;
  line-height: $normal_line_height;
  letter-spacing: 1.25px;
  text-transform: capitalize;

  .v-btn__content {
    color: $color_font_normal;
    font-size: $font_normal;
    flex: initial;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class EditSpaceButton extends Vue {
  @Prop({
    type: String
  }) spaceId!: string

  onClick (): void {
    this.$router.push(this.$nuxt.localePath('/space/?space=' + this.spaceId))
  }
}
</script>
