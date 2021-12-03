<template>
  <div class="comments-wp">
    <v-divider
      class="mx-4 divider"
    />
    <div class="comments-counter">
      {{ count | numeral('0,0a') }} {{ count | pluralize('en', ['comment', 'comments']) }}
    </div>

    <div class="send-message-wp">
      <div class="avatar-wp">
        <Avatar :id="id" :size="36" :src="avatarSrc" />
      </div>

      <div class="action-wp">
        <div class="text-area-wp">
          <v-textarea
            v-model="comment"
            auto-grow
            outlined
            rows="1"
            row-height="15"
            @focus="showButton"
            @focusout="hideButton"
          />
          <span v-if="!showBtn" class="placeholder">Add a comment...</span>
        </div>
        <v-btn v-if="showBtn" :disabled="!comment.length" class="send-button">
          Send
        </v-btn>
      </div>
    </div>
    <BounceSpinner v-if="showSpinner" />

    <CommentMessage
      v-for="(item, index) in commentsList"
      :id="id"
      :key="index"
      :comment="item"
      :handle="handle"
      :avatar-src="'fqwefqwe'"
    />
  </div>
</template>

<style lang="scss">
.text-area-wp {
  position: relative;

  .v-input__slot {
    min-height: 36px !important;

    textarea {
      margin-top: 4px !important;
    }
  }

  .v-text-field__details {
    display: none;
  }

  .placeholder {
    position: absolute;
    top: 6px;
    left: 16px;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.25px;
    color: rgba(0, 0, 0, 0.6);
    pointer-events: none;
  }
}

.comments-wp {
  .divider {
    margin-bottom: 12px;
  }

  .comments-counter {
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: 0.15px;
    color: rgba(0, 0, 0, 0.87);
  }

  .send-message-wp {
    display: flex;
    width: 100%;
    margin-top: 16px;

    .avatar-wp {
      display: flex;
      align-items: flex-start;
    }

    .action-wp {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
      margin-left: 8px;

      .send-button {
        background-color: #EB2F96;
        border-radius: 4px;
        width: 78px;
        height: 36px;
        color: #fff;
        text-align: center;
        font-weight: normal;
        margin-top: 8px;
        margin-bottom: 7px;

        &:disabled {
          background-color: #F597CA!important;
          color: #fff !important;
        }
      }
    }
  }
}

</style>

<script>
export default {
  name: 'Comment',

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
    count: {
      type: Number
    }
  },

  data () {
    return {
      comment: '',
      showBtn: false,
      commentIds: [],
      commentsList: [],
      showSpinner: true
    }
  },

  created () {
    this.$store.dispatch('comment/getPostReplyId', this.id).then(() => {
      const replyIds = this.$store.state.comment.replies.find(i => i.id === this.id)?.replyIds
      if (replyIds.length) {
        this.commentIds = replyIds
        this.getNewPosts(replyIds).then(() => {
          this.$store.dispatch('posts/getPostsWithData', { ids: this.commentIds, commitName: 'SET_POSTS_COMMENT', isComment: true }).then((data) => {
            this.addUniquePostToPostArray(this.$store.state.posts.postComments, this.commentIds)
          })
        })
      } else {
        this.showSpinner = false
      }
    })
  },

  methods: {
    showButton () {
      if (!this.comment.length) {
        this.showBtn = true
      }
    },
    hideButton () {
      if (!this.comment.length) {
        this.showBtn = false
      }
    },

    async getNewPosts (ids) {
      return await this.$store.dispatch('posts/getPostsByIds', { ids, type: 'public' })
    },

    addUniquePostToPostArray (postsDictionary, ids) {
      const newPosts = ids
        .map(id => postsDictionary[id])
        .filter(post => post !== undefined)
      this.commentsList.push(...newPosts)
      this.showSpinner = false
    }
  }
}
</script>
