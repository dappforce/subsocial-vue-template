<template>
  <div v-if="postItemData" class="post-item-wp">
    <v-card
      elevation="2"
      class="post-item"
    >
      <div v-if="postItemData.hidden" class="hidden-post">
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
              :post-item="postItemData"
            />
            <div class="button-wp">
              <EditButton v-if="isPostOwner" :link="'post-edit/?post=' + postItemData.id" />
              <OptionButton :post-id="postItemData.id" :account-id="postItemData.ownerId" />
            </div>
          </div>
          <Title size="large" :link="postItemData.postLink" :name="postItemData.title" />
          <Youtube v-if="postItemData.link" :link="postItemData.link" />
          <Paragraph
            :text="postItemData.summary"
            :is-show-more="postItemData.isShowMore"
            :link="postItemData.postLink"
            margin-top="10"
          />
        </div>

        <PostImage :image-src="postItemData.imageUrl" :link="postItemData.postLink" />
      </div>
      <v-divider
        v-if="!isSharedPost"
        class="mx-4"
      />
      <div v-if="!isSharedPost" class="action-panel-wp">
        <ActionPanel :id="postItemData.id" :is-show-label="false" :handle="postItemData.ownerId" :post="postItemData" />
      </div>
    </v-card>
  </div>
</template>

<style lang="scss">
.post-item-wp {
  width: 100%;
  margin-top: $space_normal;

  .hidden-post {
    margin: -$space_normal -$space_normal $space_normal;
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

  .post-item {
    padding: $space_normal;
    box-shadow: $box_shadow_card !important;
  }

  .post-main-wp {
    display: flex;
    padding-bottom: $space_normal;

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

@Component
export default class PostListItem extends Vue {
  @Prop({
    type: Object,
    default: undefined
  }) postItemData!: PostListItemData

  @Prop({
    type: Boolean,
    default: false
  }) isSharedPost!: boolean

  @Prop({
    type: String
  }) currentUserId!: string

  get isPostOwner () {
    if (this.currentUserId) {
      return this.postItemData.ownerId === this.currentUserId
    } else {
      return false
    }
  }
}
</script>
