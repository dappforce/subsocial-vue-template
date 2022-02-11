<template>
  <v-btn depressed class="create-space-btn" :class="[isHaveSpace ? 'have-space' : '']" @click="onClick">
    {{ isHeaderBtn ? '+ ' + $t('buttons.createSpace') : $t('buttons.createSpace') }}
  </v-btn>
</template>

<style lang="scss">
.create-space-btn {
  min-width: 99px;
  height: $buttons_height;
  border: 1px solid $button_outline_primary;
  box-sizing: border-box;
  border-radius: $border_small;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 1.25px;
  text-transform: capitalize;
  background-color: $button_bg_white !important;

  .v-btn__content {
    color: $text_color_primary;
    font-size: $font_normal;
  }

  &.have-space {
    background-color: $button_bg_white !important;
    border: 1px solid $button_outline_gray;

    .v-btn__content {
      color: $text_color_normal;
    }
  }

  &:disabled {
    border: none;
    color: $text_color_disabled !important;
    opacity: 0.5;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CreateSpaceButton extends Vue {
  @Prop({
    type: Boolean,
    default: false
  }) isHeaderBtn!: boolean

  @Prop({
    type: Boolean,
    default: false
  }) isHaveSpace!: boolean

  onClick () {
    if (this.$store.state.profiles.currentUser) {
      this.$router.push(this.$nuxt.localePath('/space?new'))
    }
  }
}
</script>
