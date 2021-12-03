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
    font-size: $font-size-secondary-text;
    line-height: 24px;
    letter-spacing: 0.1px;
  }

  .count-label {
    margin-left: 9px;
    font-weight: 500;
    font-size: $font-size-secondary-text;
    line-height: 24px;
    letter-spacing: 0.1px;
    text-transform: capitalize;
  }
}
</style>

<script>
export default {
  name: 'SharedButton',

  props: {
    isShowLabel: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number
    }
  }
}
</script>
