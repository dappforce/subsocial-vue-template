<template>
  <div data-app>
    <LoadSpinner v-if="showHideSpinner" />
    <Header :show-tabs="true" :tab-links="['posts', 'spaces']" />
    <div class="container">
      <Nuxt />
      <Snackbar />
    </div>
  </div>
</template>

<style lang="scss">
#__layout {
  min-height: 100vh;
}

#__layout, .theme--light.v-tabs-items {
  background: #F2F2F2;
  width: 100%;
}
.container {
  width: 763px;
  padding: 0 0 20px;

  .v-window {
    overflow: visible;
  }
}

@media only screen and (max-width: 768px) {
  .container {
    width: 100%;
    box-sizing: border-box;
    padding: 0 14px;
  }
}
</style>

<script>
export default {
  name: 'Default',

  data () {
    return {
      showHideSpinner: false
    }
  },

  created () {
    this.showHideSpinner = true
    this.$store.dispatch('posts/getSuggestedPostIds').then(() => {
      this.$store.dispatch('profiles/initAccount')
      this.$store.dispatch('loading/setLoading', true)
      this.showHideSpinner = false
    })

    this.$store.dispatch('notifications/getNotifications')
  }
}
</script>
