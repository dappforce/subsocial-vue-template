<template>
  <div class="action-container">
    <div class="action-panel-wp">
      <VoteButton
        type="upvote"
        :post-id="post.id"
        :reaction="myReaction"
        :reaction-id="myReaction ? myReaction.id : null"
        :active="myReaction ? myReaction.isUpvote : false"
        :is-show-label="isShowLabel"
        :count="post.upvotesCount"
      />
      <VoteButton
        type="downvote"
        :post-id="post.id"
        :reaction="myReaction"
        :reaction-id="myReaction ? myReaction.id : null"
        :active="myReaction ? myReaction.isDownvote : false"
        :is-show-label="isShowLabel"
        :count="post.downvotesCount"
      />
      <CommentButton v-if="isShowCommentBtn" :id="id" :count="isPostOwner ? post.repliesCount : post.visibleRepliesCount" />
      <ReplyButton v-if="isShowReplyBtn" :id="id" :is-show-label="isShowLabel" />
      <SharedButton v-if="isShowSharedBtn" :is-show-label="isShowLabel" :count="post.sharesCount" />
    </div>
    <div v-if="showCommentBlock" class="comment-container">
      <Comment :id="id" :avatar-src="isAvatar(currentUser)" :handle="handle" :count="isPostOwner ? post.repliesCount : post.visibleRepliesCount" :is-post-owner="isPostOwner" />
    </div>
  </div>
</template>

<style lang="scss">
.action-container {
  flex-direction: column;
  margin-bottom: -$space_tiny;

  .action-panel-wp {
    display: flex;

    &>* {
      flex: 1;
      display: flex;
      justify-content: center;
      min-height: 40px;
      align-items: center;
      color: $main_text_color;

      &:hover {
        color: #E5E5E5;
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { PostStruct } from '@subsocial/api/flat-subsocial/flatteners'
import { ProfileItemModel } from '~/models/profile/profile-item.model'

export interface ActionPanelInt {
  showCommentBlock: boolean
  currentUser: ProfileItemModel | null
  myReaction: any
}
@Component
export default class ActionPanel extends Vue implements ActionPanelInt {
  @Prop({
    type: String
  }) id!: string

  @Prop({
    type: String
  }) handle!: string

  @Prop({
    type: Boolean,
    default: false
  }) isShowLabel!: boolean

  @Prop({
    type: Boolean,
    default: true
  }) isShowCommentBtn!: boolean

  @Prop({
    type: Boolean,
    default: true
  }) isShowSharedBtn!: boolean

  @Prop({
    type: Boolean,
    default: false
  }) isShowReplyBtn!: boolean

  @Prop({
    type: Object,
    default: undefined
  }) post!: PostStruct

  showCommentBlock: boolean = false
  currentUser: ProfileItemModel | null = null
  myReaction: any = {}
  isPostOwner: boolean = false

  created (): void {
    this.$nuxt.$on(this.id, () => {
      this.setCurrentUser()
      this.showCommentBlock = !this.showCommentBlock
    })
    if (this.$store.state.profiles.currentUser) {
      this.setCurrentUser()
      this.getMyReaction()
    }

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'profiles/SET_CURRENT_USER') {
        this.setCurrentUser()
        this.getMyReaction()
      }
    })
  }

  isAvatar (user: ProfileItemModel): string | null {
    if (user) {
      return typeof user.avatar === 'undefined' ? null : user.avatar
    } else {
      return null
    }
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

    this.isPostOwner = this.post.ownerId === this.currentUser?.id
  }

  getMyReaction (): void {
    if (this.currentUser) {
      this.$store.dispatch('reaction/getPostReactionIdByAccount', { accountId: this.currentUser.id, postId: this.post.id }).then((res) => {
        this.myReaction = res
      })
    } else {
      this.myReaction = {}
    }
  }
}
</script>
