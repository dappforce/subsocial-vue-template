<template>
  <div>
    <Tabs :tab-links="tabLinks" />

    <v-tabs-items v-model="currentTab" class="main-page-container">
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
        <PostContainer v-if="currentTab === 'posts' && postsIds.length" :ids="postsIds" />
      </v-tab-item>

      <v-tab-item
        :key="tabs[2]"
        :value="tabs[2]"
        class="items-list"
      >
        <SpaceContainer v-if="currentTab === 'spaces'" />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<style scoped lang="scss">
.main-page-container {
  padding-top: 72px;

  .items-list {
    display: flex;
    flex-direction: column;
    align-items: center;
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
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ProfileItemModel } from '~/models/profile/profile-item.model'

@Component
export default class PostEditPage extends Vue {
  @Prop({
    type: Array,
    default: () => ['posts', 'spaces']
  }) tabLinks!: ['posts', 'spaces']

  tabs: string [] = ['my feed', 'posts', 'spaces']
  currentTab: string | null = null
  currentUser: ProfileItemModel | undefined | null = null
  postsIds: string[] = []

  beforeDestroy () {
    this.postsIds = []
  }

  created () {
    this.currentUser = this.$store.state.profiles.currentUser
    this.currentTab = this.currentUser ? this.tabs[1] : this.tabs[1]

    this.$nuxt.$on('mainPage', (data: string) => {
      this.currentTab = data
    })

    this.$nuxt.$on('setTab', (data: string) => {
      this.currentTab = data
    })

    const unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'posts/SET_LOADING_POST_IDS' && !mutation.payload) {
        this.$store.dispatch('posts/getPostsByIds', { ids: this.$store.state.posts.postsIds.slice(0, 20), type: 'public' })
        this.postsIds = this.$store.state.posts.postsIds
        unsubscribe()
      }
    })
    if (this.$store.state.posts.postsIds.length) {
      this.postsIds = this.$store.state.posts.postsIds
    }
  }
}
</script>
