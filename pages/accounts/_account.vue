<template>
  <div v-if="!showSpinner" class="account-container">
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
    color: $color_font_normal;
    line-height: 125%;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 34px $space_normal;
    justify-content: center;
    background-color: $color_white;
    box-shadow: $box_shadow_card;
    border-radius: $border_small;
    margin-top: $space_normal;
    font-size: $font_normal;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ProfileStruct } from '@subsocial/api/flat-subsocial/flatteners'
import { routerParamsLength } from '~/utils/utils'

@Component
export default class Account extends Vue {
  accountData: ProfileStruct | undefined
  spaces: [] = []
  tabs: string[] = ['posts', 'spaces']
  currentTab: string = 'posts'
  allPostsIds: [] = []
  currentUser?: ProfileStruct
  showSpinner: boolean = false

  created (): void {
    this.showSpinner = true
    this.currentUser = this.$store.state.profiles.currentUser
    if (this.$store.state.loading.isLoading) {
      this.load()
    } else {
      const unsubscribe = this.$store.subscribe((mutation) => {
        if (mutation.type === 'profiles/SET_POLKADOT_ACCOUNTS') {
          this.load().then(() => {
            unsubscribe()
          })
        }
      })
    }

    const unsubscribeSpaces = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'space/SET_LOADING_ACCOUNT_SPACES' && !state.space.isLoading) {
        this.getSpacesData().then((data) => {
          this.spaces = data
          unsubscribeSpaces()
        })
      }
    })

    this.$nuxt.$emit('isShowTabs', !routerParamsLength(this.$route.params))

    this.$nuxt.$on('accountPage', (data: string) => {
      this.currentTab = data
    })
  }

  beforeDestroy (): void {
    this.$store.commit('posts/CLEAR_SELECTED_POSTS')
    this.allPostsIds = []
  }

  async load () {
    return await this.$store.dispatch('profiles/getProfile', { id: this.$route.params.account }).then(() => {
      this.getAccount().then((data) => {
        this.accountData = data
        this.getSpaces().then(() => {
          this.$store.dispatch('posts/getAccountPosts', this.$store.state.space.accountSpaceIds).then(() => {
            setTimeout(() => {
              this.allPostsIds = this.$store.state.posts.accountPostsIds
              this.showSpinner = false
            }, 500)
          })
        })
      })
    })
  }

  async getAccount () {
    return await this.$store.getters['profiles/selectProfileData'](this.$route.params.account)
  }

  async getSpacesData () {
    return await this.$store.getters['space/getSpacesWithContentByIds'](this.$store.state.space.accountSpaceIds)
  }

  async getSpaces () {
    return await this.$store.dispatch('space/getSpacesByAccount', this.$route.params.account)
  }
}
</script>
