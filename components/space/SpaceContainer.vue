<template>
  <div>
    <div v-if="spaceList.length">
      <SpaceListItem
        v-for="(item, index) in spaceList"
        :key="index"
        :space-item-data="item"
        :avatar-size="40"
        :current-user="currentUser"
      />
      <infinite-loading
        spinner="spiral"
        @infinite="infiniteScroll"
      />
    </div>
    <BounceSpinner v-if="!spaceList.length" />
  </div>
</template>
<script>
import { environment } from '@/environments/environment'

export default {
  name: 'SpaceContainer',

  data () {
    return {
      spaceList: [],
      startIndex: 20,
      endIndex: 40,
      step: 20,
      max: environment.recommendedSpaceIds.length,
      currentUser: null
    }
  },

  created () {
    if (this.$store.state.loading.isLoading) {
      this.getNewSpace(0, 20).then(() => {
        this.setCurrentUser()
        this.spaceList = this.$store.getters['space/getSpacesWithContent'](0, 20)
      })
    } else {
      this.unsubscribe = this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'posts/SET_SUGGESTED_POST_IDS' && this.spaceList === null) {
          this.setCurrentUser()
          this.getNewSpace(0, 20).then(() => {
            this.spaceList = this.$store.getters['space/getSpacesWithContent'](0, 20)
            this.unsubscribe()
          })
        }
      })
    }
  },
  beforeDestroy () {
    this.startIndex = 20
    this.endIndex = 40
    this.$store.commit('content/CLEAR_SPACE_CONTENT', [])
    this.spaceList = null
  },
  methods: {
    infiniteScroll ($state) {
      setTimeout(async () => {
        await this.getNewSpace(this.startIndex, this.endIndex).then(() => {
          this.spaceList.push(...this.$store.getters['space/getSpacesWithContent'](this.startIndex, this.endIndex))

          $state.loaded()
          if (this.spaceList.length >= environment.recommendedSpaceIds.length) {
            $state.complete()
          }

          this.startIndex += this.step
          this.endIndex += this.step
        })
      }, 600)
    },
    async getNewSpace (start, end) {
      return await this.$store.dispatch('space/getSpacesByIds', environment.recommendedSpaceIds.slice(start, end))
    },
    setCurrentUser () {
      if (this.$store.state.profiles.currentUser) {
        this.currentUser = this.$store.state.profiles.currentUser
      }
    }
  }
}
</script>
