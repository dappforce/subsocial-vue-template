<template>
  <div style="width: 100%;">
    <div v-if="postList.length" class="post-container">
      <div v-for="(item, index) in postList" :key="index" style="width: 100%">
        <PostListItem
          v-if="!item.isSharedPost"
          :post-item-data="item"
          :current-user-id="currentUser ? currentUser.id : null"
        />
        <PostListItemShared
          v-if="item.isSharedPost"
          :post-item-data="item"
          :current-user-id="currentUser ? currentUser.id : null"
        />
      </div>
      <infinite-loading
        spinner="spiral"
        @infinite="infiniteScroll"
      />
    </div>
    <BounceSpinner v-if="!postList.length" />
  </div>
</template>

<style lang="scss">
.post-container {
  width: 100%;
}
</style>

<script>
export default {
  name: 'PostContainer',
  props: {
    ids: {
      type: Array
    },
    type: {
      type: String,
      default: 'public'
    }
  },

  data () {
    return {
      postList: [],
      postsIds: [],
      startIndex: 20,
      endIndex: 40,
      step: 20,
      max: 0,
      currentUser: null,
      allPostsIds: [],
      unsubscribe: null
    }
  },

  created () {
    if (this.ids.length) {
      this.load()
    }
  },

  mounted () {
    this.max = this.ids.length
  },

  beforeDestroy () {
    this.startIndex = 20
    this.endIndex = 40
    this.postList = []
    this.postsIds = []
    this.allPostsIds = []
    this.$store.commit('posts/CLEAR_SELECTED_POSTS')
  },

  methods: {
    isAllPostsInState () {
      return this.allPostsIds.slice(0, 20).every(p => this.$store.state.posts.list.some(i => p === i.id))
    },

    load () {
      this.allPostsIds = this.ids

      if (this.isAllPostsInState()) {
        this.selectPostsWithData(0, 20)
      } else {
        this.getNewPosts(0, 20).then(() => {
          this.currentUser = this.$store.state.profiles.currentUser
          this.selectPostsWithData(0, 20)
        })
      }
    },
    selectPostsWithData (start, end) {
      this.$store.dispatch('posts/getPostsWithData', { ids: this.allPostsIds.slice(start, end), commitName: 'SET_SELECTED_POSTS' }).then(() => {
        this.addUniquePostToPostArray(this.$store.state.posts.selectedPost)
      })
    },
    infiniteScroll ($state) {
      setTimeout(async () => {
        await this.getNewPosts(this.startIndex, this.endIndex).then((res) => {
          this.selectPostsWithData(this.startIndex, this.endIndex)
          $state.loaded()
          if (this.max <= this.postList.length) {
            $state.complete()
          }

          if (this.max <= this.step) {
            $state.complete()
          }

          this.unsubscribe = this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'posts/NEW_POSTS_ABSENT' && state === true) {
              $state.complete()
              this.unsubscribe()
              this.$store.commit('posts/NEW_POSTS_ABSENT', false)
            }
          })

          this.startIndex += this.step
          this.endIndex += this.step
        })
      }, 500)
    },
    async getNewPosts (start, end) {
      return await this.$store.dispatch('posts/getPostsByIds', { ids: this.allPostsIds.slice(start, end), type: this.type })
    },

    addUniquePostToPostArray (postsDictionary) {
      const newPostsIds = []
      for (const id in postsDictionary) {
        // eslint-disable-next-line no-prototype-builtins
        if (postsDictionary.hasOwnProperty(id) && !this.postsIds.includes(id)) {
          newPostsIds.push(id)
        }
      }
      const newPosts = newPostsIds
        .sort((a, b) => Number.parseInt(b) - Number.parseInt(a))
        .map(id => postsDictionary[id])
        .filter(post => post !== undefined)
      this.postList.push(...newPosts)
      this.postsIds.push(...newPostsIds)
    }
  }
}
</script>
