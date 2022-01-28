<template>
  <div>
    <PostEdit v-if="havePermission" :is-edit="isEdit" :post-item="post" />
    <div v-if="!havePermission && post" class="error">
      <img src="../assets/image/alert.svg" alt="Alert">
      {{ $t('generalMessages.dontHavePermissionToEditPost') }}
    </div>
    <BounceSpinner v-if="!havePermission && !post" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PostListItemData } from '~/models/post/post-list-item.model'

@Component
export default class PostEditPage extends Vue {
  isEdit: boolean = false
  post: PostListItemData | null = null
  havePermission: boolean = false
  postId: string | null = null

  created (): void {
    this.postId = this.$route.query.post as string

    if (this.$store.state.loading.isLoading) {
      this.post = this.postId ? this.$store.getters['posts/getPostInfo'](this.postId) : null
      this.isUserCanEdit()
    } else {
      const unsubscribe = this.$store.subscribe((mutation) => {
        if (mutation.type === 'profiles/SET_CURRENT_USER' && this.post === null && this.postId) {
          this.$store.dispatch('posts/getPostById', this.postId).then(() => {
            this.post = this.$store.getters['posts/getPostInfo'](this.postId)
            this.isUserCanEdit()
            unsubscribe()
          })
        }
      })
    }

    if (this.postId) {
      this.isEdit = !this.isEdit
    } else {
      this.havePermission = !this.havePermission
    }
  }

  isUserCanEdit () {
    const user = this.$store.state.profiles.currentUser
    if (user.id === this.post?.ownerId) {
      this.havePermission = !this.havePermission
    }
  }
}
</script>
