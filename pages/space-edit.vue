<template>
  <SpaceEdit :is-edit="isEdit" :space-item="space" />
</template>

<script>
export default {
  data () {
    return {
      isEdit: false,
      space: null
    }
  },

  created () {
    this.space = this.$store.getters['space/getSpaceWithContent'](this.$route.query.space)
    if (!this.space) {
      this.$router.push('/')
    }
    this.isEdit = !!this.space
    this.$nuxt.$emit('isShowTabs', false)
  }
}
</script>
