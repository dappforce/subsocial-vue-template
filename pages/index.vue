<template>
  <div>
    <Tabs :tab-links="tabsLink" />
    <v-tabs-items v-model="currentTab" class="main-page-container">
      <v-tab-item
        :key="tabs[0]"
        :value="tabs[0]"
        class="items-list"
      >
        <PostContainer v-if="currentTab === tabs[0] && feedIds.length" :ids="feedIds" :is-feed="true" :feed-count="feedCount" />
        <NoPosts v-if="!feedIds.length" :message="$t('generalMessages.emptyFeed')" />
      </v-tab-item>

      <v-tab-item
        :key="tabs[1]"
        :value="tabs[1]"
        class="items-list"
      >
        <PostContainer v-if="currentTab === tabs[1] && postsIds.length" :ids="postsIds" />
      </v-tab-item>

      <v-tab-item
        :key="tabs[2]"
        :value="tabs[2]"
        class="items-list"
      >
        <SpaceContainer v-if="currentTab === tabs[2]" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<style scoped lang="scss">
.main-page-container {
  padding-top: 72px;

  @media (max-width: 991px){
    padding-top: 56px;
  }

  .items-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .empty-feed {
    text-align: center;
    padding: 40px;
    background-color: $container_bg_white;
    margin-top: $space_normal;
    width: 100%;
  }
}

.tabs-container {
  position: fixed;
  top: 56px;
  left: 0;
  height: 72px;
  z-index: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  
  @media (max-width: 768px) {
    top: 40px;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ProfileItemModel } from '~/models/profile/profile-item.model'
import { config } from '~/config/config'

const stepNumber = config.infinityScrollOffset

@Component
export default class IndexPage extends Vue {
  tabsLink: string [] = this.guestTabs
  tabs: string [] = this.userTabs
  currentTab: string | null = null
  currentUser: ProfileItemModel | null = null
  postsIds: string[] = []
  feedIds: string[] = []
  feedCount: number = 0

  beforeDestroy () {
    this.postsIds = []
  }

  created () {
    this.currentUser = this.$store.state.profiles.currentUser
    this.$nuxt.$on('mainPage', (data: string) => {
      this.currentTab = data
    })

    this.$nuxt.$on('setTab', () => {
      this.currentTab = this.tabsLink[0]
    })

    const unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'posts/SET_LOADING_POST_IDS' && !mutation.payload) {
        this.$store.dispatch('posts/getPostsByIds', { ids: this.$store.state.posts.postsIds.slice(0, stepNumber), type: 'public' })
        this.postsIds = this.$store.state.posts.postsIds
        unsubscribe()
      }
    })

    this.$store.subscribeAction({
      before: (action) => {
        if (action.type === 'profiles/setCurrentAccount') {
          this.feedIds = []
        }
      },
      after: (action) => {
        if (action.type === 'feeds/getNewsFeed') {
          this.feedIds = this.$store.state.feeds.feedIds
          this.tabsLink = this.userTabs
        }
        if (action.type === 'profiles/signOut') {
          this.tabsLink = this.guestTabs
        }
        if (action.type === 'feeds/getFeedCount') {
          this.feedCount = this.$store.state.feeds.feedCount
        }
        if (action.type === 'feeds/getFeedIds' && !this.feedIds.length) {
          this.feedIds = this.$store.state.feeds.feedIds
          this.tabsLink = this.userTabs
        }
      }
    })

    if (this.$store.state.posts.postsIds.length) {
      this.postsIds = this.$store.state.posts.postsIds
    }

    if (this.currentUser) {
      this.tabsLink = this.userTabs
      this.feedIds = this.$store.state.feeds.feedIds
      this.feedCount = this.$store.state.feeds.feedCount
    }
  }

  get guestTabs (): string[] {
    return [this.$t('tabs.posts') as string, this.$t('tabs.spaces') as string]
  }

  get userTabs (): string[] {
    return [this.$t('tabs.feed') as string, this.$t('tabs.posts') as string, this.$t('tabs.spaces') as string]
  }
}
</script>
