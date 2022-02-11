<template>
  <div class="post-item-wp shared">
    <v-card
      v-if="post"
      elevation="2"
      class="post-item"
    >
      <div v-if="post.hidden && isPostOwner" class="hidden-container">
        <div class="alert-text">
          <v-icon>
            mdi-alert-circle
          </v-icon>
          {{ $t('generalMessages.hiddenMessage', {type: $t('general.post')}) }}
        </div>
        <div class="unhidden-btn">
          <span class="make-visible">
            <ToggleVisibilityButton :post="post" :toggle-type="'post'" />
          </span>
        </div>
      </div>
      <div class="post-main-wp">
        <div class="post-data">
          <div class="post-item-header">
            <PostInfoItem
              :post-item="post"
            />
            <div class="button-wp">
              <OptionButton :post-id="post.id" :account-id="post.ownerId" :post="post" :can-edit="isPostOwner" :toggle-type="'post'" />
            </div>
          </div>
        </div>
      </div>

      <Paragraph
        v-if="post.summary.length"
        :text="post.summary"
        :is-show-more="post.isShowMore"
        :link="post.postLink"
        :margin-bottom="'10'"
      />

      <PostListItem
        v-if="isShowHiddenPost()"
        :post-item-data="sharedPost"
        :current-user-id="currentUserId"
        :is-shared-post="true"
        class="shared-post"
      />
      <div v-if="!isShowHiddenPost() || sharedPost === undefined " class="hidden-post-text">
        Post not found
      </div>

      <div class="action-panel-wp">
        <ActionPanel :id="post.id" :is-show-label="false" :handle="post.ownerId" :post="post" />
      </div>
    </v-card>
  </div>
</template>

<style lang="scss">
.post-item-wp.shared {
  width: 100%;
  margin-top: $space_normal;

  .post-item {
    padding: $space_normal;

    .shared-post {
      margin-top: 0;
      border: 1px solid $border_outline_gray;
      border-radius: $border_small;

      & .post-item {
        box-shadow: none !important;
      }
    }
  }
  
  .post-main-wp {
    display: flex;
    padding-bottom: 0;

    .post-data {
      width: 100%;
    }
  }

  .post-item-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: $space_normal;

    .button-wp {
      display: flex;
      align-items: center;
      height: $buttons_height;
    }
  }

  .hidden-post-text {
    text-align: center;
    background: $container_bg_white;
    border: 1px solid $border_outline_gray;
    box-sizing: border-box;
    border-radius: $border_small;
    padding: $space_large;
    color: $text_color_dark_gray;
    font-size: $font_normal;
  }
}

@media only screen and (max-width: 768px) {
  .post-main-wp {
    flex-direction: column;
  }
}

</style>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { PostListItemData } from '~/models/post/post-list-item.model'
import { getIsPostOwner } from '~/utils/utils'

@Component
export default class PostListItemShared extends Vue {
  @Prop({
    type: Object,
    default: undefined
  }) postItemData!: PostListItemData

  @Prop({
    type: String
  }) currentUserId!: string

  sharedPost: PostListItemData | null = null
  post: PostListItemData = this.postItemData
  isPostOwner : boolean = getIsPostOwner(this.postItemData.ownerId, this.currentUserId)
  isSharedPostOwner: boolean = false

  created () {
    const sharedPostId = this.postItemData.sharedPostId
    if (sharedPostId) {
      this.$store.dispatch('posts/getPostById', this.postItemData.sharedPostId).then(() => {
        this.sharedPost = this.$store.getters['posts/getPostInfo'](this.postItemData.sharedPostId)
        this.isSharedPostOwner = this.sharedPost ? getIsPostOwner(this.sharedPost?.ownerId, this.currentUserId) : false
      })
    }

    this.$store.subscribeAction({
      after: (action) => {
        if (action.type === 'posts/updateHiddenState' && action.payload.id === this.postItemData.id) {
          this.post = this.$store.getters['posts/getPostInfo'](this.postItemData.id)
        }
      }
    })
  }

  isShowHiddenPost (): boolean {
    if (this.isSharedPostOwner) {
      return !!this.sharedPost
    } else {
      return !!this.sharedPost && !this.sharedPost.hidden
    }
  }
}
</script>
