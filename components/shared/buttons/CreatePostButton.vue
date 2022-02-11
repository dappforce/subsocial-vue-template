<template>
  <div>
    <v-btn class="create-post-btn" @click="onClick">
      + {{ $t('buttons.newPost') }}
    </v-btn>
  </div>
</template>

<style lang="scss">
.create-post-btn {
  border: 1px solid $button_outline_gray;
  border-radius: $border_small;
  background-color: $button_bg_white !important;
  box-shadow: none;

  .v-btn__content {
    font-weight: 500;
    font-size: $font_normal;
    line-height: 125%;
    text-align: center;
    color: $text_color_normal;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CreatePostButton extends Vue {
  onClick () {
    if (this.$store.state.profiles.currentUser) {
      this.$router.push(this.$nuxt.localePath('/post?new'))
    }
  }
}
</script>
