<template>
  <div v-if="space" class="space-item-container">
    <SpaceListItem :space-item-data="space" :avatar-size="46" :is-my-own-space="isMyOwnSpace" :current-user="currentUser" />
    <div v-if="postListIds.length" class="post-list-container">
      <PostContainer :ids="postListIds" :type="isMyOwnSpace ? 'all' : 'public'" />
    </div>
  </div>
</template>

<style lang="scss">
.space-item-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .space-stats-wp {
    color: $color_font_normal !important;
    margin-top: $space_small;

    .count {
      font-weight: 500;
    }
  }

  .post-list-container {
    width: 100%;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ProfileItemModel } from '~/models/profile/profile-item.model'
import { SpaceListItemData } from '~/models/space/space-list-item.model'

@Component({
})
export default class SpacePage extends Vue {
  space: SpaceListItemData | null = null
  currentUser: ProfileItemModel | undefined | null = null
  isMyOwnSpace: boolean = false
  postListIds: string[] = []

  created (): void {
    if (this.$store.state.loading.isLoading) {
      this.$store.dispatch('space/findSpaceById', this.$route.params.space).then((space) => {
        this.setCurrentUser()
        this.space = space
        this.getSpacePosts(space)
      })
    } else {
      const unsubscribe = this.$store.subscribe((mutation) => {
        if (mutation.type === 'profiles/SET_POLKADOT_ACCOUNTS' && this.space === null) {
          this.$store.dispatch('space/getSpaceById', this.$route.params.space).then((space) => {
            this.setCurrentUser()
            this.space = space
            if (space) {
              this.getSpacePosts(space)
              unsubscribe()
            }
          })
        }
      })
    }
  }

  beforeDestroy () {
    this.$store.commit('posts/CLEAR_SELECTED_POSTS')
  }

  mounted () {
    this.$nuxt.$emit('isShowTabs', !(this.$route.name === 'space'))
  }

  async getSpacePosts (space: SpaceListItemData) {
    this.isMyOwnSpace = space && this.currentUser ? space.struct.ownerId === this.currentUser.id : false
    await new Promise((resolve) => {
      resolve(this.$store.dispatch('posts/getPostsBySpace', [this.space?.struct.id]))
    }).then(() => {
      const unsubscribe = this.$store.subscribe((mutation) => {
        if (mutation.type === 'posts/SET_LOADING_POSTS' && mutation.payload === false) {
          this.postListIds = this.$store.state.posts.spacePostsIds
          unsubscribe()
        }
      })
    })
  }

  setCurrentUser () {
    this.currentUser = this.$store.state.profiles.currentUser
  }
}
</script>
