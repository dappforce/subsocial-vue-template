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
    font-size: $font-size-secondary-text;
    line-height: 24px;
    letter-spacing: 0.1px;
    text-transform: capitalize;
  }
}
</style>

<script>
export default {
  name: 'CommentButton',

  props: {
    id: {
      type: String,
      default: undefined
    },
    count: {
      type: Number
    }
  },

  methods: {
    onClick () {
      this.$nuxt.$emit(this.id, true)
    }
  }
}
</script>
