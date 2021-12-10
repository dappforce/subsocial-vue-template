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
      :avatar-src="item.ownerImageUrl"
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
    left: $space_normal;
    font-size: $font_normal;
    line-height: $main_line_height;
    letter-spacing: 0.25px;
    color: $main_text_color;
    pointer-events: none;
  }
}

.comments-wp {
  .divider {
    margin-bottom: $space_small;
  }

  .comments-counter {
    font-weight: 500;
    font-size: $font_large;
    line-height: $main_line_height;
    letter-spacing: 0.15px;
    color: $color_font_normal;
  }

  .send-message-wp {
    display: flex;
    width: 100%;
    margin-top: $space_normal;

    .avatar-wp {
      display: flex;
      align-items: flex-start;
    }

    .action-wp {
      display: flex;
      flex-direction: column;
      gap: 4px;
      width: 100%;
      margin-left: $space_tiny;

      .send-button {
        background-color: $color_primary;
        border-radius: $border_small;
        width: 78px;
        height: $buttons_height;
        color: $color_white;
        text-align: center;
        font-weight: normal;
        margin-top: $space_tiny;
        margin-bottom: $space_tiny;

        &:disabled {
          background-color: #F597CA!important;
          color: $color_white !important;
        }
      }
    }
  }
}

</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { PostListItemData } from '~/models/post/post-list-item.model'
import { ReplyIdStruct } from '~/types/reply-id.type'

@Component
export default class Comment extends Vue {
  @Prop({
    type: String
  }) id!: string

  @Prop({
    type: String
  }) avatarSrc!: string

  @Prop({
    type: String
  }) handle!: string

  @Prop({
    type: Number
  }) count!: number

  comment: string = ''
  showBtn: boolean = false
  commentIds: [] = []
  commentsList: PostListItemData[] = []
  showSpinner: boolean = true

  created () {
    this.$store.dispatch('comment/getPostReplyId', this.id).then(() => {
      const replyIds = this.$store.state.comment.replies.find((i: ReplyIdStruct) => i.id === this.id)?.replyIds
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
  }

  showButton (): void {
    if (!this.comment.length) {
      this.showBtn = true
    }
  }

  hideButton (): void {
    if (!this.comment.length) {
      this.showBtn = false
    }
  }

  async getNewPosts (ids: []) {
    return await this.$store.dispatch('posts/getPostsByIds', { ids, type: 'public' })
  }

  addUniquePostToPostArray (postsDictionary: [], ids: []) {
    const newPosts = ids
      .map(id => postsDictionary[id])
      .filter(post => post !== undefined)
    this.commentsList.push(...newPosts)
    this.showSpinner = false
  }
}
</script>
