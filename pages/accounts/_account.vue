<template>
  <div v-if="accountData" class="account-container">
    <ProfileItem :profile-data="accountData" :tabs-event="'accountPage'" />

    <v-tabs-items v-model="currentTab">
      <v-tab-item
        :key="tabs[0]"
        :value="tabs[0]"
        class="items-list"
      >
        <PostContainer v-if="currentTab === 'posts' && allPostsIds.length" :ids="allPostsIds" />
        <div v-if="!allPostsIds.length && !showSpinner" class="no-posts">
          No posts yet
        </div>
        <BounceSpinner v-if="showSpinner" />
      </v-tab-item>

      <v-tab-item
        :key="tabs[1]"
        :value="tabs[1]"
        class="items-list"
      >
        <SpaceListItem
          v-for="(item, index) in spaces"
          :key="index"
          :space-item-data="item"
          :current-user="currentUser"
        />
        <div v-if="!spaces.length" class="no-posts">
          No spaces yet
        </div>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<style lang="scss">
.account-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .no-posts {
    color: rgba(0, 0, 0, 0.87);
    line-height: 125%;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 34px 16px;
    justify-content: center;
    background-color: #fff;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    margin-top: 16px;
    font-size: $font-size-normal;
  }
}
</style>

<script>
export default {
  data () {
    return {
      accountData: null,
      spaces: [],
      tabs: ['posts', 'spaces'],
      currentTab: 'posts',
      allPostsIds: [],
      currentUser: null,
      showSpinner: false
    }
  },

  created () {
    this.currentUser = this.$store.state.profiles.currentUser
    if (this.$store.state.loading.isLoading) {
      this.load()
    } else {
      this.unsubscribe = this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'profiles/SET_POLKADOT_ACCOUNTS') {
          this.load().then(() => {
            this.unsubscribe()
          })
        }
      })
    }

    this.unsubscribeSpaces = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'space/SET_LOADING_ACCOUNT_SPACES' && !state.space.isLoading) {
        this.getSpacesData().then((data) => {
          this.spaces = data
          this.unsubscribeSpaces()
        })
      }
    })

    this.$nuxt.$emit('isShowTabs', !Object.keys(this.$route.params).length)

    this.$nuxt.$on('accountPage', (data) => {
      this.currentTab = data
    })
  },

  beforeDestroy () {
    this.startIndex = 20
    this.endIndex = 40
    this.postList = []
    this.postsIds = []
    this.$store.commit('posts/CLEAR_SELECTED_POSTS')
    this.allPostsIds = []
  },

  methods: {
    async load () {
      this.showSpinner = true
      return await this.$store.dispatch('profiles/getProfile', { id: this.$route.params.account }).then(() => {
        this.getAccount().then((data) => {
          this.accountData = data
          this.getSpaces().then(() => {
            this.$store.dispatch('posts/getAccountPosts', this.$store.state.space.accountSpaceIds).then((ids) => {
              setTimeout(() => {
                this.allPostsIds = this.$store.state.posts.accountPostsIds
                this.showSpinner = false
              }, 500)
            })
          })
        })
      })
    },

    async getAccount () {
      return await this.$store.getters['profiles/selectProfileData'](this.$route.params.account)
    },

    async getSpacesData () {
      return await this.$store.getters['space/getSpacesWithContentByIds'](this.$store.state.space.accountSpaceIds)
    },

    async getSpaces () {
      return await this.$store.dispatch('space/getSpacesByAccount', this.$route.params.account)
    }
  }
}
</script>
