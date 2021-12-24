<template>
  <div class="reply-container">
    <Avatar :id="id" :size="36" :src="avatarSrc" />
    <div class="text-area-wp">
      <v-textarea
        ref="reply"
        v-model="comment"
        auto-grow
        outlined
        rows="1"
        row-height="15"
        @focus="showButton"
        @focusout="hideButton"
      />
      <span v-if="!showBtn" class="placeholder">Add a reply...</span>
      <v-btn v-if="showBtn" :disabled="!comment.length" class="send-button">
        Send
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss">
.reply-container {
  display: flex;
  margin: 10px 0 0 $space_tiny;

  .text-area-wp {
    width: 100%;
    margin-left: $space_tiny;
  }

  .send-button {
    background-color: $color_primary !important;
    border-radius: $border_small;
    width: 78px;
    height: $buttons_height;
    color: $color_white;
    text-align: center;
    font-weight: normal;

    &.v-btn.v-btn--disabled:disabled {
      background-color: #F597CA!important;
      color: $color_white !important;
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'

@Component
export default class CommentReply extends Vue {
  @Ref() readonly reply!: HTMLInputElement

  @Prop({
    type: String
  }) id!: string

  @Prop({
    type: String
  }) avatarSrc!: string

  @Prop({
    type: String
  }) handle!: string

  comment: string = ''
  showBtn: boolean = false

  mounted (): void {
    this.reply.focus()
  }

  showButton (): void {
    if (!this.comment.length) {
      this.showBtn = true
    }
  }

  hideButton (): void {
    if (!this.comment.length) {
      this.showBtn = true
    }
  }
}
</script>
