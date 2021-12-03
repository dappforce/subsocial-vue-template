<template>
  <v-tabs
    v-model="tab"
    centered
    class="tabs-container"
  >
    <v-tabs-slider color="#EB2F96" />

    <v-tab
      v-for="item in tabLinks"
      :key="item"
      :href="'#' + item"
      class="tab"
      @click="onClick(item)"
    >
      {{ item }}
    </v-tab>
  </v-tabs>
</template>

<style lang="scss">
.tabs-container {
  height: 100%;
  min-height: 48px;

  .v-tabs-bar {
    height: 100%;
    min-height: 48px;
  }

  .v-slide-group__content {
    justify-content: space-between;
  }
  .tab {
    width: 100%;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    text-align: center;
    letter-spacing: 1.25px;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.6);

    &.v-tab--active {
      color: #EB2F96;
    }
  }
}
</style>

<script>
export default {
  name: 'Tabs',

  props: {
    tabLinks: {
      type: Array,
      default: ['posts', 'spaces']
    },
    eventName: {
      type: String,
      default: 'mainPage'
    }
  },
  data () {
    return {
      tab: this.tabLinks[1],
      newTabValue: null
    }
  },

  mounted () {
    if (this.$route.params.length) {
      this.tab = this.tabLinks[0]
    } else {
      this.tab = this.$store.state.profiles.currentUser ? this.tabLinks[0] : this.tabLinks[0]
    }
    this.$nuxt.$emit(this.eventName, this.tab)
  },

  created () {
    this.$nuxt.$on('setTab', (data) => {
      setTimeout(() => {
        this.tab = data
      }, 100)
    })
  },

  methods: {
    onClick (item) {
      this.$nuxt.$emit(this.eventName, item)
    }
  }
}
</script>
