<template>
  <div v-if="postItemData" class="post-item-wp shared">
    <v-card
      elevation="2"
      class="post-item"
    >
      <div v-if="postItemData.hidden && isPostOwner" class="hidden-post">
        <div class="alert-text">
          <v-icon color="#EFB041">
            mdi-alert-circle
          </v-icon>This post is unlisted and only you can see it
        </div>
        <div class="unhidden-btn">
          <span class="make-visible">
            Make visible
          </span>
        </div>
      </div>
      <div class="post-main-wp">
        <div class="post-data">
          <div class="post-item-header">
            <PostInfoItem
              :avatar-size="postItemData.avatarSize"
              :avatar-src="postItemData.ownerImageUrl"
              :created-at-time="postItemData.createdAtTime"
              :space-name="postItemData.spaceName"
              :handle="postItemData.handle"
              :user-name="postItemData.ownerName"
              :profile-link="postItemData.ownerId"
            />
            <div class="button-wp">
              <EditButton v-if="isPostOwner" :link="'post-edit/?post=' + postItemData.id" />
              <OptionButton :post-id="postItemData.id" :account-id="postItemData.ownerId" :post="postItemData" :can-edit="isPostOwner" :toggle-type="'post'" />
            </div>
          </div>
        </div>
      </div>

      <PostListItem
        v-if="sharedPost"
        :post-item-data="sharedPost"
        :current-user-id="currentUserId"
        :is-shared-post="true"
        class="shared-post"
      />
      <v-divider
        class="mx-4"
      />
      <div class="action-panel-wp">
        <ActionPanel :id="postItemData.id" :is-show-label="false" :handle="postItemData.profileId" :post="postItemData" />
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
    padding-bottom: 15px;

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
  isPostOwner : boolean = getIsPostOwner(this.postItemData.ownerId, this.currentUserId)

  created () {
    const sharedPostId = this.postItemData.sharedPostId
    if (sharedPostId) {
      this.$store.dispatch('posts/getPostById', this.postItemData.sharedPostId).then(() => {
        this.sharedPost = this.$store.getters['posts/getPostInfo'](this.postItemData.sharedPostId)
      })
    }
  }
}
</script>
