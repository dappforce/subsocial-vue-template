<template>
  <div class="comments-wp">
    <v-divider
      v-if="showDivider"
      class="mx-4 divider"
    />
    <div class="comments-counter">
      {{ count | numeral('0,0a') }} {{ count | pluralize('en', [$t('general.comment'), $t('general.comments')]) }}
    </div>

    <div class="send-message-wp">
      <div class="avatar-wp">
        <Avatar :id="userId" :size="36" :src="avatarSrc" />
      </div>

      <div class="action-wp">
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
            v-model="comment"
            auto-grow
            outlined
            rows="1"
            row-height="15"
            @focus="showButton"
          />
          <span v-if="!showBtn" class="placeholder">{{ $t('post.addComment') }}</span>
        </div>
        <div class="btn-container">
          <SendCommentButton v-if="showBtn" :comment="comment" :root-post-id="id" @createdComment="addCommentToList" />
          <v-btn v-if="showBtn" class="cancel-btn" @click="showButton">
            {{ $t('buttons.cancel') }}
          </v-btn>
        </div>
      </div>
    </div>
    <BounceSpinner v-if="showSpinner" />

    <CommentMessage
      v-for="(item, index) in commentsList"
      :id="id"
      :key="index"
      :comment-data="item"
      :handle="handle"
      :avatar-src="item.ownerImageUrl"
      :is-post-owner="isPostOwner"
      :user-id="userId"
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

      .easy-mde {
        .EasyMDEContainer .CodeMirror {
          min-height: 30px;
        }

        .CodeMirror-scroll {
          min-height: 30px !important;
        }

        .editor-statusbar {
          display: none;
        }
      }

      .cancel-btn {
        width: 78px !important;
        font-size: $font_normal;
        border: 1px solid #E0E0E0 !important;
        border-radius: $border_small;
        box-shadow: none;
        text-transform: initial;
        background-color: $color_white;
        margin-left: $space_small;
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

  @Prop({
    type: Boolean,
    default: false
  }) isPostOwner!: boolean

  @Prop({
    type: Boolean,
    default: true
  }) showDivider!: boolean

  @Prop({
    type: String
  }) userId!: string

  comment: string = ''
  showBtn: boolean = false
  commentIds: [] = []
  commentsList: PostListItemData[] = []
  showSpinner: boolean = true
  showEditor: boolean = false

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
    this.showEditor = !this.showEditor
    this.showBtn = !this.showBtn
    this.comment = ''
  }

  async getNewPosts (ids: []) {
    return await this.$store.dispatch('posts/getPostsByIds', { ids, type: this.isPostOwner ? 'all' : 'public' })
  }

  addUniquePostToPostArray (postsDictionary: [], ids: []) {
    const newPosts = ids
      .map(id => postsDictionary[id])
      .filter(post => post !== undefined)
    this.commentsList.push(...newPosts)
    this.showSpinner = false
  }

  updateComment (content: string): void {
    this.comment = content
  }

  addCommentToList (content: PostListItemData): void {
    this.commentsList.push(content)
    this.showButton()
    this.comment = ''
    this.$store.dispatch('posts/getPostById', this.id)
  }
}
</script>
