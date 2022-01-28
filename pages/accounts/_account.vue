<template>
  <div class="account-container">
    <ProfileItem
      v-if="!showSpinner"
      :profile-data="accountData"
      :tabs-event="'accountPage'"
      :is-owner="isOwner"
      :is-account-view="true"
      :is-have-space="!!spaces.length"
      :tab-links="tabs"
    />

    <v-tabs-items v-model="currentTab">
      <v-tab-item
        :key="tabs[0]"
        :value="tabs[0]"
        class="items-list"
      >
        <PostContainer v-if="currentTab === tabs[0] && allPostsIds.length" :ids="allPostsIds" :type="isOwner ? 'all' : 'public'" />
        <NoPosts v-if="!allPostsIds.length && !showSpinner" :message="$t('generalMessages.noPostYet')" />
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
          :is-my-own-space="isOwner"
        />
        <NoPosts v-if="!spaces.length" :message="$t('generalMessages.noSpaceYet')" />
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
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ProfileStruct } from '@subsocial/api/flat-subsocial/flatteners'

@Component
export default class Account extends Vue {
  accountData: ProfileStruct | undefined
  spaces: [] = []
  tabs: string[] = [this.$t('tabs.posts') as string, this.$t('tabs.spaces') as string]
  currentTab: string = this.tabs[0]
  allPostsIds: [] = []
  currentUser?: ProfileStruct
  showSpinner: boolean = false
  isOwner: boolean = false

  created (): void {
    this.showSpinner = true
    if (this.$store.state.loading.isLoading) {
      this.load()
    } else {
      this.$store.subscribe((mutation) => {
        if (mutation.type === 'loading/SET_LOADING') {
          this.load()
        }
      })
    }

    this.$nuxt.$on('accountPage', (data: string) => {
      this.currentTab = data
    })
  }

  beforeDestroy (): void {
    this.$store.commit('posts/CLEAR_SELECTED_POSTS')
    this.allPostsIds = []
  }

  async load () {
    this.currentUser = this.$store.state.profiles.currentUser

    return await this.$store.dispatch('profiles/getProfile', { id: this.$route.params.account }).then(() => {
      this.getAccount().then((data) => {
        this.accountData = data
        this.getSpaces().then(() => {
          this.getSpacesData().then(data => this.spaces = data)
          this.$store.dispatch('posts/getAccountPosts', this.$store.state.space.accountSpaceIds).then(() => {
            setTimeout(() => {
              this.isOwner = this.$route.params.account === this.$store.state.profiles.currentUser?.id
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
    return await this.$store.dispatch('space/getSpacesByAccount', { id: this.$route.params.account, isOwner: this.isOwner })
  }
}
</script>
