<template>
  <div class="action-container">
    <div class="action-panel-wp">
      <VoteButton type="upvote" :active="myReaction ? myReaction.isUpvote : false" :is-show-label="isShowLabel" :count="post.upvotesCount" />
      <VoteButton type="downvote" :active="myReaction ? myReaction.isDownvote : false" :is-show-label="isShowLabel" :count="post.downvotesCount" />
      <CommentButton v-if="isShowCommentBtn" :id="id" :count="post.visibleRepliesCount" />
      <ReplyButton v-if="isShowReplyBtn" :id="id" :is-show-label="isShowLabel" />
      <SharedButton v-if="isShowSharedBtn" :is-show-label="isShowLabel" :count="post.sharesCount" />
    </div>
    <div v-if="showCommentBlock" class="comment-container">
      <Comment :id="id" :avatar-src="isAvatar(currentUser)" :handle="handle" :count="post.visibleRepliesCount" />
    </div>
  </div>
</template>

<style lang="scss">
.action-container {
  flex-direction: column;
  margin-bottom: -8px;

  .action-panel-wp {
    display: flex;

    &>* {
      flex: 1;
      display: flex;
      justify-content: center;
      min-height: 40px;
      align-items: center;
      color: rgba(0, 0, 0, 0.6);

      &:hover {
        color: #E5E5E5;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'ActionPanel',

  props: {
    isShowLabel: {
      type: Boolean,
      default: false
    },
    isShowCommentBtn: {
      type: Boolean,
      default: true
    },
    isShowSharedBtn: {
      type: Boolean,
      default: true
    },
    isShowReplyBtn: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    },
    handle: {
      type: String
    },
    post: {
      type: Object,
      default: undefined
    }
  },

  data () {
    return {
      showCommentBlock: false,
      currentUser: undefined,
      myReaction: undefined
    }
  },

  created () {
    this.$nuxt.$on(this.id, (data) => {
      this.setCurrentUser()
      this.showCommentBlock = !this.showCommentBlock
    })
    if (this.$store.state.profiles.currentUser) {
      this.getMyReaction()
    }

    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'profiles/SET_CURRENT_USER') {
        this.setCurrentUser()
      }
    })
  },

  methods: {
    isAvatar (user) {
      if (user) {
        return typeof user.avatar === 'undefined' ? null : user.avatar
      } else {
        return null
      }
    },

    setCurrentUser () {
      if (this.$store.state.profiles.currentUser) {
        this.currentUser = this.$store.getters['profiles/selectProfileData'](this.$store.state.profiles.currentUser.id)
        if (!this.currentUser) {
          this.currentUser = this.$store.state.profiles.currentUser
        }
      }
    },

    getMyReaction () {
      return this.$store.dispatch('reaction/getPostReactionIdByAccount', { accountId: this.$store.state.profiles.currentUser.id, postId: this.post.id }).then((res) => {
        this.myReaction = res
      })
    }
  }
}
</script>
