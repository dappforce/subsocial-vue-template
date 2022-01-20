<template>
  <div class="reply-container">
    <Avatar :id="currentUser.id" :size="36" :src="currentUser.avatar" />
    <div class="text-area-wp">
      <mde-editor
        v-if="showEditor"
        :show-editor="true"
        :text="comment"
        class="easy-mde"
        :height="'30px'"
        @contentUpdate="updateComment"
      />
      <v-textarea
        v-if="!showEditor"
        ref="reply"
        v-model="comment"
        auto-grow
        outlined
        rows="1"
        row-height="15"
        @focus="showButton"
      />
      <span v-if="!showBtn" class="placeholder">Add a reply...</span>
      <SendCommentButton v-if="showBtn" :comment="comment" :root-post-id="id" :parent-comment-id="parentCommentId" @createdComment="addCommentToList" />
      <v-btn class="cancel-btn" @click="onCancel">
        {{ $t('buttons.cancel') }}
      </v-btn>
    </div>
  </div>
</template>

<style lang="scss">
.reply-container {
  display: flex;
  margin: $space_normal 0 0 $space_tiny;

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

  .cancel-btn {
    min-width: 78px !important;
    font-size: $font_normal;
    border: 1px solid #E0E0E0 !important;
    border-radius: $border_small;
    box-shadow: none;
    text-transform: initial;
    background-color: $color_white;
    margin-left: $space_small;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'
import { PostListItemData } from '~/models/post/post-list-item.model'
import { ProfileItemModel } from '~/models/profile/profile-item.model'

@Component
export default class CommentReply extends Vue {
  @Ref() readonly reply!: HTMLInputElement

  @Prop({
    type: String
  }) id!: string

  @Prop({
    type: String
  }) parentCommentId!: string

  @Prop({
    type: String
  }) handle!: string

  comment: string = ''
  showBtn: boolean = false
  showEditor: boolean = false
  currentUser: ProfileItemModel | null = null

  mounted (): void {
    this.reply.focus()
  }

  created (): void {
    this.setCurrentUser()
  }

  showButton (): void {
    this.showEditor = !this.showEditor
    this.showBtn = true
  }

  updateComment (content: string): void {
    this.comment = content
  }

  addCommentToList (content: PostListItemData): void {
    this.$emit('newReply', content)
  }

  onCancel () {
    this.$nuxt.$emit(this.parentCommentId + 'reply', false)
  }

  setCurrentUser (): void {
    if (this.$store.state.profiles.currentUser) {
      this.currentUser = this.$store.getters['profiles/selectProfileData'](this.$store.state.profiles.currentUser.id)
      if (!this.currentUser) {
        this.currentUser = this.$store.state.profiles.currentUser
      }
    } else {
      this.currentUser = null
    }
  }
}
</script>
