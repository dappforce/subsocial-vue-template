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
</template>

<style lang="sass">
.items-list
    display: flex
    flex-direction: column
    align-items: center
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ProfileItemModel } from '~/models/profile/profile-item.model'

const { routerParamsLength } = require('@/utils/utils')

@Component
export default class PostEditPage extends Vue {
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

    if (this.$route.name === 'index') {
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

  mounted () {
    this.$nuxt.$emit('isShowTabs', routerParamsLength(this.$route.params) === 0)
  }
}
</script>
