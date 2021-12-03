<template>
  <PostEdit :is-edit="isEdit" :post-item="post" />
</template>

<script>
export default {
  data () {
    return {
      isEdit: false,
      post: null
    }
  },

  created () {
    this.post = this.$store.state.posts.list.find(i => i.id === this.$route.query.post)
    this.isEdit = !!this.post
    this.$nuxt.$emit('isShowTabs', false)
  }
}
</script>
