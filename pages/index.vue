<template>
  <v-tabs-items v-model="currentTab">
    <!--    <v-tab-item-->
    <!--      :key="tabs[0]"-->
    <!--      :value="tabs[0]"-->
    <!--      class="items-list"-->
    <!--    >-->
    <!--      <PostListItem-->
    <!--        v-for="(item, index) in myPosts"-->
    <!--        :key="index"-->
    <!--        :post-item-data="item"-->
    <!--        :current-user-id="currentUser.id"-->
    <!--      />-->
    <!--    </v-tab-item>-->

    <v-tab-item
      :key="tabs[1]"
      :value="tabs[1]"
      class="items-list"
    >
      <PostContainer v-if="currentTab === 'posts' && postsIds" :ids="postsIds" />
    </v-tab-item>

    <v-tab-item
      :key="tabs[2]"
      :value="tabs[2]"
      class="items-list"
    >
      <SpaceContainer v-if="currentTab === 'spaces'" />
    </v-tab-item>
  </v-tabs-items>
</template>

<style lang="sass">
.items-list
    display: flex
    flex-direction: column
    align-items: center
</style>

<script>
export default {
  data () {
    return {
      tabs: ['my feed', 'posts', 'spaces'],
      currentTab: null,
      currentUser: null,
      postsIds: null
    }
  },

  beforeDestroy () {
    this.postsIds = null
  },

  created () {
    this.currentUser = this.$store.state.profiles.currentUser

    this.currentTab = this.currentUser ? this.tabs[1] : this.tabs[1]

    this.$nuxt.$on('mainPage', (data) => {
      this.currentTab = data
    })

    this.$nuxt.$on('setTab', (data) => {
      this.currentTab = data
    })

    if (this.$route.name === 'index') {
      this.unsubscribe = this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'posts/SET_LOADING_POST_IDS' && !mutation.payload) {
          this.$store.dispatch('posts/getPostsByIds', { ids: this.$store.state.posts.postsIds.slice(0, 20), type: 'public' })
          this.postsIds = this.$store.state.posts.postsIds
          this.unsubscribe()
        }
      })

      if (this.$store.state.posts.postsIds.length) {
        this.postsIds = this.$store.state.posts.postsIds
      }
    }
  },

  mounted () {
    this.$nuxt.$emit('isShowTabs', Object.keys(this.$route.params).length === 0)
  }
}
</script>
