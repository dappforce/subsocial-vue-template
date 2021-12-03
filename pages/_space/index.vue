<template>
  <div v-if="space" class="space-item-container">
    <SpaceListItem :space-item-data="space" :avatar-size="46" :is-my-own-space="isMyOwnSpace" :current-user="currentUser" />
    <div class="post-list-container">
      <PostContainer v-if="postListIds.length" :ids="postListIds" :type="isMyOwnSpace ? 'all' : 'public'" />
    </div>
  </div>
</template>

<style lang="scss">
.space-item-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .space-stats-wp {
    color: rgba(0, 0, 0, 0.87) !important;
    margin-top: 12px;

    .count {
      font-weight: 500;
    }
  }

  .post-list-container {
    width: 100%;
  }
}
</style>

<script>
export default {
  data () {
    return {
      space: null,
      currentUser: null,
      isMyOwnSpace: false,
      postListIds: [],
      postList: [],
      postsIds: [],
      startIndex: 20,
      endIndex: 40,
      step: 20
    }
  },

  created () {
    if (this.$store.state.loading.isLoading) {
      this.$store.dispatch('space/findSpaceById', this.$route.params.space).then((space) => {
        this.setCurrentUser()
        this.space = space
        this.getSpacePosts(space)
      })
    } else {
      this.unsubscribe = this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'profiles/SET_POLKADOT_ACCOUNTS' && this.space === null) {
          this.$store.dispatch('space/getSpaceById', this.$route.params.space).then((space) => {
            this.setCurrentUser()
            this.space = space
            if (space) {
              this.getSpacePosts(space)
              this.unsubscribe()
            }
          })
        }
      })
    }
  },

  beforeDestroy () {
    this.startIndex = 20
    this.endIndex = 40
    this.postList = []
    this.postsIds = []
    this.$store.commit('posts/CLEAR_SELECTED_POSTS')
  },

  mounted () {
    this.$nuxt.$emit('isShowTabs', !this.$route.name === 'space')
  },

  methods: {
    async getSpacePosts (space) {
      this.isMyOwnSpace = space && this.currentUser ? space.struct.ownerId === this.currentUser.id : false
      return await new Promise((resolve, reject) => {
        resolve(this.$store.dispatch('posts/getPostsBySpace', [this.space.struct.id]))
      }).then(() => {
        this.unsubscribe = this.$store.subscribe((mutation, state) => {
          if (mutation.type === 'posts/SET_LOADING_POSTS' && mutation.payload === false) {
            this.postListIds = this.$store.state.posts.spacePostsIds
            this.unsubscribe()
          }
        })
      })
    },
    setCurrentUser () {
      this.currentUser = this.$store.state.profiles.currentUser
    }
  }

}
</script>
