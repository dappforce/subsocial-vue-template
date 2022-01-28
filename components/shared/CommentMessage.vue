<template>
  <div class="comment-wp">
    <div class="avatar-wp">
      <Avatar :id="comment.ownerId" :size="36" :src="comment.ownerImageUrl" />
    </div>

    <div class="message-container">
      <div class="message-wp" :class="{ 'edit': isEditComment }">
        <div v-if="comment.hidden && (isCommentOwner || isPostOwner)" class="hidden-bar">
          <div class="alert-text">
            <v-icon color="#EFB041">
              mdi-alert-circle
            </v-icon>
            {{ $t('generalMessages.hiddenPost') }}
          </div>
          <div class="unhidden-btn">
            <span class="make-visible">
              <ToggleVisibilityButton :post="comment" :toggle-type="'post'" />
            </span>
          </div>
        </div>
        <div class="message-data">
          <span>
            <Title :id="comment.ownerId" :link="'/accounts/'+ comment.ownerId" :name="comment.ownerName" />
          </span>
          <span>·</span>
          <span class="comment-date">{{ toDate }}</span>
          <OptionButton
            :post-id="comment.id"
            :account-id="comment.ownerId"
            :post="comment"
            :can-edit="isCommentOwner"
            :toggle-type="'post'"
            :can-edit-comment="isCommentOwner"
            @onEditComment="editComment"
          />
        </div>
        <Paragraph
          v-if="!isEditComment"
          :margin-top="'5'"
          :text="commentText"
          :redirect="false"
          :long-text="commentText"
        />
        <mde-editor
          v-if="isEditComment"
          :show-editor="isEditComment"
          :text="commentText"
          :height="'30px'"
          @contentUpdate="updateCommentText"
        />
        <SendCommentButton
          v-if="isEditComment"
          :comment="editedComment"
          :comment-id="comment.id"
          :is-edit="true"
          :root-post-id="id"
          :content-id="comment.contentId"
          @updatedComment="updatedComment"
        />
        <v-btn v-if="isEditComment" class="close-edit-comment" @click="isEditComment = !isEditComment">
          {{ $t('buttons.cancel') }}
        </v-btn>
      </div>

      <div class="action-wp">
        <ActionPanel
          :id="comment.id"
          :is-show-label="getIsMobileView() ? false : true"
          :is-show-comment-btn="false"
          :is-show-shared-btn="false"
          :is-show-reply-btn="true"
          :handle="handle"
          :post="comment"
        />
      </div>

      <CommentReply
        v-if="showReplyBlock"
        :id="id"
        :handle="handle"
        :parent-comment-id="comment.id"
        @newReply="addCommentToList"
      />

      <span v-if="commentIds.length" class="show-reply" @click="showReplies()">
        {{ isShowReplies ? 'Hide' : 'Show' }} {{ commentIds.length | numeral('0,0a') }} {{ commentIds.length | pluralize('en', [$t('buttons.reply'), $t('buttons.replies')]) }}

        <v-icon color="#F759AB" size="16">{{ isShowReplies ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </span>

      <div v-if="isShowReplies">
        <CommentMessage
          v-for="(item, index) in commentsList"
          :id="id"
          :key="index"
          :comment-data="item"
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

      &.edit {
        background: $color_white;
      }

      .close-edit-comment {
        border: 1px solid $color_light_border;
        box-sizing: border-box;
        border-radius: 4px;
        text-transform: capitalize;
        font-weight: 500;
        margin-left: $space_normal;
      }

      .hidden-bar {
        margin: (-$space_normal) (-$space_normal) $space_tiny;
        height: 40px;
        background: #FEFBE8;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 $space_normal;
        color: $color_font_normal;
        font-size: $font_small;
        border-radius: $border_small $border_small 0 0;
        border-bottom: 1px solid $color_warning_border;

        .v-icon {
          margin-right: 10px;
        }

        .make-visible {
          border: 1px solid #D9D9D9;
          box-sizing: border-box;
          border-radius: $border_small;
          color: $color_font_normal;
          font-weight: 500;
          line-height: 125%;
          padding: 3px 5px;
          transition: all .2s ease;

          &:hover {
            cursor: pointer;
            color: $color_primary;
          }
        }
      }

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
    line-height: $normal_line_height * 2;
    margin-left: $space_normal;
  }
}

@media only screen and (max-width: 768px) {
  .message-container {
    width: calc(100% - 36px) !important;
  }
}

</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { PostListItemData } from '~/models/post/post-list-item.model'
import { ReplyIdStruct } from '~/types/reply-id.type'
import { getIsPostOwner, isMobile } from '~/utils/utils'

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
  }) commentData!: PostListItemData

  @Prop({
    type: Boolean,
    default: false
  }) isPostOwner!: boolean

  @Prop({
    type: String
  }) userId!: string

  comment: PostListItemData = this.commentData
  showReplyBlock: boolean = false
  commentIds: string[] = []
  commentsList: PostListItemData[] = []
  isShowReplies: boolean = false
  isCommentOwner : boolean = false
  currentUserId: string | undefined = undefined
  isEditComment: boolean = false
  editedComment: string = ''
  commentText: string = ''

  created () {
    this.commentText = this.comment.body
    this.$nuxt.$on(this.comment.id + 'reply', () => {
      this.showReplyBlock = !this.showReplyBlock
    })
    this.$store.dispatch('comment/getPostReplyId', this.comment.id).then(() => {
      const replyIds = this.$store.state.comment.replies.find((i: ReplyIdStruct) => i.id === this.comment.id)?.replyIds
      if (replyIds.length) {
        this.commentIds = JSON.parse(JSON.stringify(replyIds))
        this.getNewPosts(replyIds).then(() => {
          this.$store.dispatch('posts/getPostsWithData', { ids: this.commentIds, commitName: 'SET_POSTS_COMMENT', isComment: true }).then(() => {
            this.addUniquePostToPostArray(this.$store.state.posts.postComments, this.commentIds)
          })
        })
      }
    })

    this.currentUserId = this.$store.state.profiles?.currentUser?.id
    this.isCommentOwner = getIsPostOwner(this.comment.ownerId, this.currentUserId)

    this.$store.subscribeAction({
      after: (action) => {
        if (action.type === 'posts/updateHiddenState' && action.payload.id === this.comment.id) {
          this.comment = this.$store.getters['posts/getCommentInfo'](this.comment.id)
        }
      }
    })
  }

  async getNewPosts (ids: []) {
    return await this.$store.dispatch('posts/getPostsByIds', { ids, type: this.isPostOwner ? 'all' : 'public' })
  }

  addUniquePostToPostArray (postsDictionary: [], ids: string[]) {
    const newPosts = ids
      .map((id: any) => postsDictionary[id])
      .filter(post => post !== undefined)
    this.commentsList.push(...newPosts)
    if (!newPosts.length) {
      this.commentIds = []
    }
  }

  showReplies (): void {
    this.isShowReplies = !this.isShowReplies
  }

  addCommentToList (content: PostListItemData): void {
    if (content) {
      this.showReplyBlock = false
      this.showReplies()
      this.commentsList.push(content)
      this.$store.dispatch('posts/getPostById', this.id)
      if (this.commentIds.length) {
        this.commentIds.push(content.id as string)
      }
    }
  }

  editComment (content: boolean): void {
    if (content) {
      this.isEditComment = !this.isEditComment
    }
  }

  updateCommentText (content: string): void {
    this.editedComment = content
  }

  updatedComment (content: {id: string, comment: string }): void {
    this.commentText = content.comment
    this.isEditComment = !this.isEditComment
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

  getIsMobileView (): boolean {
    return isMobile()
  }
}
</script>
