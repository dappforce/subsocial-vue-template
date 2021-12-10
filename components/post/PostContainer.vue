<template>
  <div style="width: 100%;">
    <div v-if="postList.length" class="post-container">
      <div v-for="(item, index) in postList" :key="index" style="width: 100%">
        <PostListItem
          v-if="!item.isSharedPost"
          :post-item-data="item"
          :current-user-id="currentUser ? currentUser.id : null"
        />
        <PostListItemShared
          v-if="item.isSharedPost"
          :post-item-data="item"
          :current-user-id="currentUser ? currentUser.id : null"
        />
      </div>
    </div>
    <infinite-loading
      v-if="postList.length"
      spinner="spiral"
      @infinite="infiniteScroll"
    />
    <BounceSpinner v-if="!postList.length" />
  </div>
</template>

<style lang="scss">
.post-container {
  width: 100%;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { SharedPostStruct } from '@subsocial/api/flat-subsocial/flatteners'
import { ProfileItemModel } from '~/models/profile/profile-item.model'
import { environment } from '~/environments/environment'

const stepNumber = environment.stepForLoading

@Component({})
export default class PostContainer extends Vue {
  @Prop({
    type: String,
    default: 'public'
  }) type!: string

  @Prop({
    type: Array
  }) ids!: []

  defaultStart: number = 0
  defaultEnd: number = stepNumber
  startIndex: number = stepNumber
  endIndex: number = stepNumber * 2
  step: number = stepNumber
  max: number = 0
  postList: SharedPostStruct[] = []
  postsIds: string[] = []
  currentUser: ProfileItemModel | undefined | null = null
  allPostsIds: string[] = []

  created () {
    if (this.ids.length) {
      this.load()
    }
  }

  mounted () {
    this.max = this.ids.length
  }

  beforeDestroy () {
    this.startIndex = stepNumber
    this.endIndex = stepNumber * 2
    this.postList = []
    this.postsIds = []
    this.allPostsIds = []
    this.$store.commit('posts/CLEAR_SELECTED_POSTS')
  }

  load () {
    this.allPostsIds = this.ids

    if (this.isAllPostsInState()) {
      this.selectPostsWithData(this.defaultStart, this.defaultEnd)
      this.currentUser = this.$store.state.profiles.currentUser
    } else {
      this.getNewPosts(this.defaultStart, this.defaultEnd).then(() => {
        this.currentUser = this.$store.state.profiles.currentUser
        this.selectPostsWithData(this.defaultStart, this.defaultEnd)
      })
    }
  }

  isAllPostsInState () {
    return this.allPostsIds.slice(this.defaultStart, this.defaultEnd).every(p => this.$store.state.posts.list.some((i: SharedPostStruct) => p === i.id))
  }

  selectPostsWithData (start: number, end: number) {
    this.$store.dispatch('posts/getPostsWithData', { ids: this.allPostsIds.slice(start, end), commitName: 'SET_SELECTED_POSTS' }).then(() => {
      this.addUniquePostToPostArray(this.$store.state.posts.selectedPost)
    })
  }

  infiniteScroll ($state: any) {
    setTimeout(async () => {
      await this.getNewPosts(this.startIndex, this.endIndex).then(() => {
        this.selectPostsWithData(this.startIndex, this.endIndex)
        $state.loaded()
        if (this.max <= this.postList.length) {
          $state.complete()
        }

        if (this.max <= this.step) {
          $state.complete()
        }

        const unsubscribe = this.$store.subscribe((mutation, state) => {
          if (mutation.type === 'posts/NEW_POSTS_ABSENT' && state === true) {
            $state.complete()
            this.$store.commit('posts/NEW_POSTS_ABSENT', false)
            unsubscribe()
          }
        })

        this.startIndex += this.step
        this.endIndex += this.step
      })
    }, 500)
  }

  async getNewPosts (start: number, end: number) {
    return await this.$store.dispatch('posts/getPostsByIds', { ids: this.allPostsIds.slice(start, end), type: this.type })
  }

  addUniquePostToPostArray (postsDictionary: SharedPostStruct[]) {
    const newPostsIds = []
    for (const id in postsDictionary) {
      // eslint-disable-next-line no-prototype-builtins
      if (postsDictionary.hasOwnProperty(id) && !this.postsIds.includes(id)) {
        newPostsIds.push(id)
      }
    }
    const newPosts = newPostsIds
      .sort((a, b) => Number.parseInt(b) - Number.parseInt(a))
      .map(id => postsDictionary[Number(id)])
      .filter(post => post !== undefined)
    this.postList.push(...newPosts)
    this.postsIds.push(...newPostsIds)
  }
}
</script>
