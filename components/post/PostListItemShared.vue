<template>
  <div v-if="postItemData" class="post-item-wp shared">
    <v-card
      elevation="2"
      class="post-item"
    >
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
              <OptionButton />
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
  margin-top: 16px;

  .post-item {
    padding: 16px 16px 16px;

    .shared-post {
        margin-top: 0;
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
  name: 'PostListItemShared',

  props: {
    postItemData: {
      type: Object,
      default: undefined
    },
    currentUserId: {
      type: String
    }
  },

  data () {
    return {
      sharedPost: null
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
  },

  created () {
    const sharedPostId = this.postItemData.sharedPostId
    if (sharedPostId) {
      this.$store.dispatch('posts/getPostById', this.$getPostId(this.postItemData.sharedPostId)).then(() => {
        this.sharedPost = this.$store.getters['posts/getPostInfo'](this.$getPostId(this.postItemData.sharedPostId))
      })
    }
  }
}
</script>
