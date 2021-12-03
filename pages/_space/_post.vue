<template>
  <div v-if="post" class="post-container">
    <div class="post-item-wp">
      <v-card
        elevation="2"
        class="post-item"
      >
        <div class="post-main-wp">
          <div class="post-data">
            <div class="post-item-header">
              <PostInfoItem
                :avatar-size="post.avatarSize"
                :avatar-src="post.ownerImageUrl"
                :created-at-time="post.createdAtTime"
                :space-name="post.spaceName"
                :user-name="post.ownerName"
                :profile-link="post.ownerId"
              />
              <OptionButton :post-id="post.id" :account-id="post.ownerId" />
            </div>
            <Title size="large" :link="post.postLink" :name="post.title" />

            <p class="markdown-body" v-html="$md.render(post.body)" />

            <Tag v-for="(item, index) in post.tags" :key="index" :tag-name="item" size="medium" />
          </div>
        </div>
        <v-divider
          class="mx-4"
        />
        <div class="action-panel-wp">
          <ActionPanel :is-show-label="true" :is-show-comment-btn="false" :post="post" />
        </div>
      </v-card>
    </div>

    <SpaceListItem v-if="space && currentUser" :space-item-data="space" :avatar-size="40" :current-user="currentUser" />

    <v-card
      elevation="2"
      class="comment-container"
    >
      <Comment :id="post.id" :avatar-src="'fwefwe'" :handle="post.handle" :count="post.visibleRepliesCount" />
    </v-card>
  </div>
</template>

<style module lang="scss">
.post-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .comment-container {
    width: 100%;
    padding: 16px;
    margin-top: 16px;

    .divider {
      display: none;
    }
  }

  .post-item-wp {
    width: 100%;
    margin-top: 16px;

    .post-item {
      padding: 16px 16px 16px;
    }

    .post-main-wp {
      display: flex;
      padding-bottom: 22px;

      .post-data {
        width: 100%;

        .title {
          font-size: $font-size-title-details;
        }
      }
    }

    .markdown-body {
      margin-top: 12px;
      margin-bottom: 22px;
    }

    .post-item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }
  }

  .description {
    margin-bottom: 0;
  }
}
</style>

<script>
export default {
  data () {
    return {
      space: null,
      post: null,
      unsubscribe: null,
      currentUser: null
    }
  },

  created () {
    this.currentUser = this.$store.state.profiles.currentUser
    this.post = this.$store.getters['posts/getPostInfo'](this.$getPostId(this.$route.params.post))
    this.$store.dispatch('space/findSpaceById', this.$route.params.space.substring(1)).then((space) => {
      this.space = space
    })

    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'posts/SET_SUGGESTED_POST_IDS' && this.post === undefined) {
        this.$store.dispatch('posts/getPostById', this.$getPostId(this.$route.params.post)).then(() => {
          this.post = this.$store.getters['posts/getPostInfo'](this.$getPostId(this.$route.params.post))
          this.currentUser = this.$store.state.profiles.currentUser

          this.unsubscribe()
        })
        this.$store.dispatch('space/getSpaceById', this.$route.params.space).then((space) => {
          this.space = space
        })
      }
    })

    this.$nuxt.$emit('isShowTabs', false)
  }
}
</script>
