<template>
  <div class="comment-wp">
    <div class="avatar-wp">
      <Avatar :id="handle" :size="36" :src="comment.ownerImageUrl" />
    </div>

    <div class="message-container">
      <div class="message-wp">
        <div class="message-data">
          <span><NuxtLink :to="'/accounts/'+ comment.ownerId" class="owner-name">{{ comment.ownerName }}</NuxtLink></span>
          <span>·</span>
          <span class="comment-date">{{ toDate }}</span>
          <OptionButton :post-id="comment.id" :account-id="comment.ownerId" />
        </div>
        <Paragraph
          :margin-top="'5'"
          :text="comment.body"
        />
      </div>

      <div class="action-wp">
        <ActionPanel
          :id="comment.id"
          :is-show-label="true"
          :is-show-comment-btn="false"
          :is-show-shared-btn="false"
          :is-show-reply-btn="true"
          :handle="handle"
          :post="comment"
        />
      </div>

      <CommentReply v-if="showReplyBlock" :id="id" :avatar-src="avatarSrc" :handle="handle" />

      <span v-if="commentIds.length" class="show-reply" @click="showReplies()">
        {{ isShowReplies ? 'Hide' : 'Show' }} {{ commentIds.length | numeral('0,0a') }} {{ commentIds.length | pluralize('en', ['reply', 'replies']) }}

        <v-icon color="#F759AB" size="16">{{ isShowReplies ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </span>

      <div v-if="isShowReplies">
        <CommentMessage
          v-for="(item, index) in commentsList"
          :id="id"
          :key="index"
          :comment="item"
          :handle="handle"
          :avatar-src="item.ownerImageUrl"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.comment-wp {
  display: flex;
  width: 100%;
  margin-top: 17px;

  .avatar-wp {
    display: flex;
    align-items: flex-start;
  }

  .message-container {
    width: 100%;

    .message-wp {
      margin-left: 8px;
      padding: 10px 16px;
      background: #F2F2F2;
      border-radius: 4px;

      .message-data {
        font-size: $font-size-profile-name;

        span {
          margin-right: 4px;
          line-height: 24px;
        }

        span:first-child {
          font-weight: 500;
        }

        .owner-name {
          text-decoration: none;
          color: rgba(0, 0, 0, 0.87);
        }

        .comment-date {
          color: #A0A0A0;
        }

        .options-button {
          &.mdi-dots-vertical::before {
            transform: rotate(90deg);
            color: #A0A0A0 !important;
          }
        }
      }
    }
  }

  .action-wp {
    margin: 8px;
    display: flex;

    .v-btn {
      color: rgba(0, 0, 0, 0.6);
    }
  }

  .show-reply {
    cursor: pointer;
    color: #F759AB;
    font-size: $font-size-secondary-text;
    font-weight: 500;
    line-height: 24px;
    margin-left: 15px;
  }
}

@media only screen and (max-width: 768px) {
  .message-container {
    width: calc(100% - 36px);
  }
}

</style>

<script>
export default {
  name: 'CommentMessage',

  props: {
    id: {
      type: String
    },
    avatarSrc: {
      type: String
    },
    handle: {
      type: String
    },
    comment: {
      type: Object
    }
  },

  data () {
    return {
      showReplyBlock: false,
      commentIds: [],
      commentsList: [],
      commentsIds: [],
      isShowReplies: false
    }
  },
  computed: {
    toDate () {
      const diff = this.$dayjs().diff(this.$dayjs(+this.comment.createdAtTime), 'days')

      if (diff < 7) {
        return this.$dayjs(+this.comment.createdAtTime).fromNow().toLowerCase()
      } else if (diff > 7 && diff < 365) {
        return this.$dayjs(+this.comment.createdAtTime).format('d MMM')
      } else {
        return this.$dayjs(+this.comment.createdAtTime).format('d MMM YY')
      }
    }
  },

  created () {
    this.$nuxt.$on(this.comment.id + 'reply', (data) => {
      this.showReplyBlock = !this.showReplyBlock
    })
    this.$store.dispatch('comment/getPostReplyId', this.comment.id).then((res) => {
      const replyIds = this.$store.state.comment.replies.find(i => i.id === this.comment.id)?.replyIds
      if (replyIds.length) {
        this.commentIds = replyIds
        this.getNewPosts(replyIds).then(() => {
          this.$store.dispatch('posts/getPostsWithData', { ids: this.commentIds, commitName: 'SET_POSTS_COMMENT', isComment: true }).then((data) => {
            this.addUniquePostToPostArray(this.$store.state.posts.postComments, this.commentIds)
          })
        })
      }
    })
  },

  methods: {
    async getNewPosts (ids) {
      return await this.$store.dispatch('posts/getPostsByIds', { ids, type: 'public' })
    },

    addUniquePostToPostArray (postsDictionary, ids) {
      const newPosts = ids
        .map(id => postsDictionary[id])
        .filter(post => post !== undefined)
      this.commentsList.push(...newPosts)
    },

    showReplies () {
      this.isShowReplies = !this.isShowReplies
    }
  }
}
</script>
