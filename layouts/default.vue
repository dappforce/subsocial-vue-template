<template>
  <div data-app>
    <LoadSpinner v-if="showHideSpinner" />
    <Header />
    <div class="container">
      <Nuxt />
      <LeftSideMenu />
      <Snackbar ref="snackbar" />
    </div>
  </div>
</template>

<style lang="scss">
#__layout {
  min-height: 100vh;
}

#__layout, .theme--light.v-tabs-items {
  background: $color_page_bg;
  width: 100%;
}
.container {
  width: $general_width;
  padding: 56px 0 $space_large;

  .v-window {
    overflow: visible;
  }
}

@media only screen and (max-width: 768px) {
  .container {
    width: 100%;
    box-sizing: border-box;
    padding: 56px 14px 0;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Default extends Vue {
  showHideSpinner: boolean = false

  created (): void {
    this.showHideSpinner = !this.showHideSpinner
    this.$store.dispatch('posts/getSuggestedPostIds').then(() => {
      this.$store.dispatch('profiles/initAccount').then(() => {
        this.$store.dispatch('loading/setLoading', true)
        this.showHideSpinner = !this.showHideSpinner
      })
    })
  }
}
</script>
