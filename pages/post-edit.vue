<template>
  <PostEdit :is-edit="isEdit" :post-item="post" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PostListItemData } from '~/models/post/post-list-item.model'

@Component
export default class PostEditPage extends Vue {
  isEdit: boolean = false
  post: PostListItemData = {} as PostListItemData

  created (): void {
    this.post = this.$store.state.posts.list.find((i: PostListItemData) => i.id === this.$route.query.post)
    this.isEdit = !!this.post
    this.$nuxt.$emit('isShowTabs', false)
  }
}
</script>
