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
      margin-left: $space_tiny;
      padding: 10px $space_normal;
      background: $color_page_bg;
      border-radius: $border_small;

      .message-data {
        font-size: $font_normal;

        span {
          margin-right: 4px;
          line-height: $main_line_height;
        }

        span:first-child {
          font-weight: 500;
        }

        .owner-name {
          text-decoration: none;
          color: $color_font_normal;
        }

        .comment-date {
          color:$color_font_secondary;
        }

        .options-button {
          &.mdi-dots-vertical::before {
            transform: rotate(90deg);
            color: $color_font_secondary !important;
          }
        }
      }
    }
  }

  .action-wp {
    margin: 0 $space_tiny;
    display: flex;

    .v-btn {
      color: $main_text_color;
    }
  }

  .show-reply {
    cursor: pointer;
    color: $color_link_hover;
    font-size: $font_small;
    font-weight: 500;
    line-height: $main_line_height;
    margin-left: 15px;
  }
}

@media only screen and (max-width: 768px) {
  .message-container {
    width: calc(100% - $buttons_width);
  }
}

</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { PostListItemData } from '~/models/post/post-list-item.model'
import { ReplyIdStruct } from '~/types/reply-id.type'

@Component
export default class CommentMessage extends Vue {
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
    type: Object
  }) comment!: PostListItemData

  showReplyBlock: boolean = false
  commentIds: [] = []
  commentsList: PostListItemData[] = []
  commentsIds: [] = []
  isShowReplies: boolean = false

  created () {
    this.$nuxt.$on(this.comment.id + 'reply', () => {
      this.showReplyBlock = !this.showReplyBlock
    })
    this.$store.dispatch('comment/getPostReplyId', this.comment.id).then(() => {
      const replyIds = this.$store.state.comment.replies.find((i: ReplyIdStruct) => i.id === this.comment.id)?.replyIds
      if (replyIds.length) {
        this.commentIds = replyIds
        this.getNewPosts(replyIds).then(() => {
          this.$store.dispatch('posts/getPostsWithData', { ids: this.commentIds, commitName: 'SET_POSTS_COMMENT', isComment: true }).then((data) => {
            this.addUniquePostToPostArray(this.$store.state.posts.postComments, this.commentIds)
          })
        })
      }
    })
  }

  async getNewPosts (ids: []) {
    return await this.$store.dispatch('posts/getPostsByIds', { ids, type: 'public' })
  }

  addUniquePostToPostArray (postsDictionary: [], ids: []) {
    const newPosts = ids
      .map(id => postsDictionary[id])
      .filter(post => post !== undefined)
    this.commentsList.push(...newPosts)
  }

  showReplies (): void {
    this.isShowReplies = !this.isShowReplies
  }

  get toDate () {
    const diff = this.$dayjs().diff(this.$dayjs(+this.comment.createdAtTime), 'days')

    if (diff < 7) {
      return this.$dayjs(+this.comment.createdAtTime).fromNow().toLowerCase()
    } else if (diff > 7 && diff < 365) {
      return this.$dayjs(+this.comment.createdAtTime).format('d MMM')
    } else {
      return this.$dayjs(+this.comment.createdAtTime).format('d MMM YY')
    }
  }
}
</script>
