<template>
  <div class="spaces-container">
    <div v-if="spaceList.length">
      <SpaceListItem
        v-for="(item, index) in spaceList"
        :key="index"
        :space-item-data="item"
        :avatar-size="40"
        :current-user="currentUser"
        :is-my-own-space="item.struct.ownerId === currentUser.id"
      />
      <infinite-loading
        spinner="spiral"
        @infinite="infiniteScroll"
      />
    </div>
    <BounceSpinner v-if="!spaceList.length" />
  </div>
</template>

<style scoped lang="scss">
.spaces-container {
  width: 100%;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ProfileItemModel } from '~/models/profile/profile-item.model'
import { SpaceListItemData } from '~/models/space/space-list-item.model'
import { config } from '~/config/config'

const stepNumber = config.stepForLoading

@Component
export default class SpaceContainer extends Vue {
  defaultStart: number = 0
  defaultEnd: number = stepNumber
  startIndex: number = stepNumber
  endIndex: number = stepNumber * 2
  step: number = stepNumber
  max: number = config.recommendedSpaceIds.length
  currentUser: ProfileItemModel | null = null
  spaceList: SpaceListItemData[] = []

  created (): void {
    if (this.$store.state.loading.isLoading) {
      this.getNewSpace(this.defaultStart, this.defaultEnd).then(() => {
        this.setCurrentUser()
        this.spaceList = this.$store.getters['space/getSpacesWithContent'](this.defaultStart, this.defaultEnd)
      })
    } else {
      const unsubscribe = this.$store.subscribe((mutation) => {
        if (mutation.type === 'posts/SET_SUGGESTED_POST_IDS' && !this.spaceList.length) {
          this.setCurrentUser()
          this.getNewSpace(this.defaultStart, this.defaultEnd).then(() => {
            this.spaceList = this.$store.getters['space/getSpacesWithContent'](this.defaultStart, this.defaultEnd)
            unsubscribe()
          })
        }
      })
    }
  }

  beforeDestroy (): void {
    this.startIndex = stepNumber
    this.endIndex = stepNumber * 2
    this.$store.commit('content/CLEAR_SPACE_CONTENT', [])
    this.spaceList = []
  }

  infiniteScroll ($state: any) {
    setTimeout(async () => {
      await this.getNewSpace(this.startIndex, this.endIndex).then(() => {
        this.spaceList.push(...this.$store.getters['space/getSpacesWithContent'](this.startIndex, this.endIndex))

        $state.loaded()
        if (this.spaceList.length >= config.recommendedSpaceIds.length) {
          $state.complete()
        }

        this.startIndex += this.step
        this.endIndex += this.step
      })
    }, 500)
  }

  async getNewSpace (start: number, end: number) {
    return await this.$store.dispatch('space/getSpacesByIds', config.recommendedSpaceIds.slice(start, end))
  }

  setCurrentUser (): void {
    if (this.$store.state.profiles.currentUser) {
      this.currentUser = this.$store.state.profiles.currentUser
    }
  }
}
</script>
