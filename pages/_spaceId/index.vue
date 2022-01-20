<template>
  <div v-if="space" class="space-item-container">
    <SpaceListItem :space-item-data="space" :avatar-size="46" :is-my-own-space="isMyOwnSpace" :current-user="currentUser" :is-space-view="true" />
    <div v-if="postListIds.length" class="post-list-container">
      <PostContainer :ids="postListIds" :type="isMyOwnSpace ? 'all' : 'public'" />
    </div>
    <NoPosts v-if="!postListIds.length" />
  </div>
</template>

<style scoped lang="scss">
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

@Component
export default class SpacePage extends Vue {
  space: SpaceListItemData | null = null
  currentUser: ProfileItemModel | undefined | null = null
  isMyOwnSpace: boolean = false
  postListIds: string[] = []

  created (): void {
    if (this.$store.state.loading.isLoading) {
      this.$store.dispatch('space/findSpaceById', this.$route.params.spaceId).then((space) => {
        this.setCurrentUser().then(() => {
          this.space = space
          this.getSpacePosts()
        })
      })
    } else {
      const unsubscribe = this.$store.subscribe((mutation) => {
        if (mutation.type === 'loading/SET_LOADING' && this.space === null) {
          this.$store.dispatch('space/getSpaceById', this.$route.params.spaceId).then((space) => {
            this.space = space
            if (space) {
              this.setCurrentUser().then(() => {
                this.getSpacePosts()
                unsubscribe()
              })
            }
          })
        }
      })
    }

    this.$store.subscribeAction({
      after: (action) => {
        if (action.type === 'space/updateHiddenState' && action.payload.id === this.$route.params.spaceId) {
          this.space = this.$store.getters['space/getSpaceWithContent'](this.$route.params.spaceId)
        }
        if (action.type === 'profiles/setCurrentAccount') {
          this.setCurrentUser()
          this.isMyOwnSpace = this.isMySpace
        }
      }
    })
  }

  beforeDestroy () {
    this.$store.commit('posts/CLEAR_SELECTED_POSTS')
  }

  async getSpacePosts () {
    this.isMyOwnSpace = this.isMySpace
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

  async setCurrentUser () {
    this.currentUser = await this.$store.state.profiles.currentUser
  }

  get isMySpace () {
    const user = this.$store.state.profiles.currentUser
    return this.space && user ? this.space.struct.ownerId === user.id : false
  }
}
</script>
