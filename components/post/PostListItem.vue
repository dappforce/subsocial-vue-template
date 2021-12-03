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
              :avatar-size="postItemData.avatarSize"
              :avatar-src="postItemData.ownerImageUrl"
              :created-at-time="postItemData.createdAtTime"
              :space-name="postItemData.spaceName"
              :handle="postItemData.handle"
              :user-name="postItemData.ownerName"
              :profile-link="postItemData.ownerId"
              :post-link="postItemData.postLink"
              :space-id="postItemData.spaceId"
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
  margin-top: 16px;

  .hidden-post {
    margin: -16px -16px 16px;
    height: 40px;
    background: #FEFBE8;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    color: rgba(0, 0, 0, 0.87);
    font-size: $font-size-secondary-text;

    .v-icon {
      margin-right: 10px;
    }

    .make-visible {
      border: 1px solid #D9D9D9;
      box-sizing: border-box;
      border-radius: 4px;
      color: #222222;
      font-weight: 500;
      line-height: 125%;
      padding: 3px 5px;
      transition: all .2s ease;

      &:hover {
        cursor: pointer;
        color: #EB2F96;
      }
    }
  }

  .post-item {
    padding: 16px 16px 16px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2) !important;
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
    margin-bottom: 16px;

    .button-wp {
      display: flex;
      align-items: center;
      height: 36px;
    }
  }
}

@media only screen and (max-width: 768px) {
  .post-main-wp {
    flex-direction: column;
  }
}

</style>

<script>
export default {
  name: 'PostListItem',

  props: {
    postItemData: {
      type: Object,
      default: undefined
    },
    currentUserId: {
      type: String
    },
    isSharedPost: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isPostOwner () {
      if (this.currentUserId) {
        return this.postItemData.ownerId === this.currentUserId
      } else {
        return false
      }
    }
  }
}
</script>
