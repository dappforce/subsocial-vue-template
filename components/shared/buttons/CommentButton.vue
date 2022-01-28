<template>
  <v-btn class="comment-button" @click="onClick">
    <v-icon medium class="shared-icon">
      mdi-comment-text-outline
    </v-icon>
    <span class="count-label">{{ count ? count : '' }}</span>
  </v-btn>
</template>

<style lang="scss">
.comment-button {
  display: flex;
  align-items: center;

  .count-label {
    margin-left: 9px;
    font-weight: 500;
    font-size: $font_small;
    line-height: $main_line_height;
    letter-spacing: 0.1px;
    text-transform: capitalize;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CommentButton extends Vue {
  @Prop({
    type: String,
    default: undefined
  }) id!: string

  @Prop({
    type: Number
  }) count!: number

  onClick () {
    if (this.id) {
      this.$nuxt.$emit(this.id, true)
    }
  }
}
</script>
