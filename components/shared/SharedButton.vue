<template>
  <v-btn class="shared-button">
    <v-icon medium class="vote-icon">
      mdi-export-variant
    </v-icon>
    <span v-if="isShowLabel" class="share-label">Share</span>
    <span class="count-label">{{ count ? count : '' }}</span>
  </v-btn>
</template>

<style lang="scss">
.share-button {
  display: flex;
  align-items: center;

  .share-label {
    margin-left: 9px;
    font-weight: 500;
    font-size: $font_small;
    line-height: $main_line_height;
    letter-spacing: 0.1px;
  }

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
export default class SharedButton extends Vue {
  @Prop({
    type: Boolean,
    default: false
  }) isShowLabel!: boolean

  @Prop({
    type: Number
  }) count!: number
}
</script>
