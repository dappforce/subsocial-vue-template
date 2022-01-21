<template>
  <v-tabs
    v-model="tab"
    centered
    class="tabs-container"
  >
    <v-tabs-slider class="slider-color" />

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
  min-height: 56px;
  padding-top: $space_normal;
  background-color: $color_page_bg;
  margin-bottom: $space_normal;

  .v-tabs-bar {
    height: 100%;
    min-height: 56px;
    box-shadow: $box_shadow_card;
    width: $general_width;
  }

  .slider-color {
    color: $color_primary;
  }

  .v-slide-group__content {
    justify-content: space-between;
  }
  .tab {
    width: 100%;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: $font_normal;
    line-height: 16px;
    text-align: center;
    letter-spacing: 1.25px;
    text-transform: uppercase;
    color: $main_text_color;

    &.v-tab--active {
      color: $color_primary;
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Tabs extends Vue {
  @Prop({
    type: Array
  }) tabLinks!: ['posts', 'spaces']

  @Prop({
    type: String,
    default: 'mainPage'
  }) eventName!: string

  @Watch('tabLinks')
  tabLinksHandler (newVal: string[], oldVal: string[]) {
    if (newVal !== oldVal) {
      this.tab = this.tabLinks[0]
      this.$nuxt.$emit(this.eventName, this.tab)
    }
  }

  tab: string = this.tabLinks[0]

  mounted (): void {
    this.$nuxt.$emit(this.eventName, this.tab)
  }

  created (): void {
    this.$nuxt.$on('setTab', () => {
      setTimeout(() => {
        this.tab = this.tabLinks[0]
      }, 100)
    })
  }

  onClick (item: string): void {
    this.$nuxt.$emit(this.eventName, item)
  }
}
</script>
