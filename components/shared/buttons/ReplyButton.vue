<template>
  <v-btn class="reply-button" @click="onClick">
    <v-icon medium class="shared-icon">
      mdi-reply
    </v-icon>
    <span v-if="isShowLabel" class="vote-label">Reply</span>
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
  font-size: $font_small;
  line-height: $main_line_height;
  letter-spacing: 0.1px;
  text-transform: capitalize;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ReplyButton extends Vue {
  @Prop({
    type: Boolean,
    default: false
  }) isShowLabel!: boolean

  @Prop({
    type: String
  }) id!: string

  onClick (): void {
    this.$nuxt.$emit(this.id + 'reply', true)
  }
}
</script>
