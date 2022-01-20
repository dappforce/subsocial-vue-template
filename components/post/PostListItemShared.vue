<template>
  <div class="post-item-wp shared">
    <v-card
      v-if="post"
      elevation="2"
      class="post-item"
    >
      <div v-if="post.hidden && isPostOwner" class="hidden-post">
        <div class="alert-text">
          <v-icon color="#EFB041">
            mdi-alert-circle
          </v-icon>This post is unlisted and only you can see it
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
        v-if="sharedPost"
        :post-item-data="sharedPost"
        :current-user-id="currentUserId"
        :is-shared-post="true"
        class="shared-post"
      />
      <div v-if="sharedPost === undefined" class="hidden-post-text">
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
      border: 1px solid $color_light_border;
      border-radius: $border_small;

      & .post-item {
        box-shadow: none !important;
      }
    }
  }

  .hidden-post {
    margin: (-$space_normal) (-$space_normal) $space_normal;
    height: 40px;
    background: #FEFBE8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 $space_normal;
    color: $color_font_normal;
    font-size: $font_small;
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
    background: $color_white;
    border: 1px solid $color_light_border;
    box-sizing: border-box;
    border-radius: $border_small;
    padding: $space_large;
    color: $color_dark_gray;
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

  created () {
    const sharedPostId = this.postItemData.sharedPostId
    if (sharedPostId) {
      this.$store.dispatch('posts/getPostById', this.postItemData.sharedPostId).then(() => {
        this.sharedPost = this.$store.getters['posts/getPostInfo'](this.postItemData.sharedPostId)
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
}
</script>
