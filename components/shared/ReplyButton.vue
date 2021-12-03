<template>
  <v-btn class="reply-button" @click="onClick">
    <v-icon medium class="shared-icon">mdi-reply</v-icon>
    <span class="vote-label" v-if="isShowLabel">Reply</span>
  </v-btn>
</template>

<style lang="scss">
.reply-button-button {
  display: flex;
  align-items: center;
}

.vote-label {
  margin-left: 9px;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.1px;
  text-transform: capitalize;
}
</style>

<script>
export default {
  name: 'ReplyButton',
  
  props: {
    isShowLabel: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    }
  },

  methods: {
    onClick () {
      this.$nuxt.$emit(this.id + 'reply', true)
    }
  }
}
</script>
