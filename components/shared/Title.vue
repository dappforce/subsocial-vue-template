<template>
  <NuxtLink :to="localePath(link)" class="title" :class="size">
    {{ nameOrId }}
  </NuxtLink>
</template>

<style scoped lang="scss">
.title {
  font-weight: 500;
  font-size: $font_normal;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: $color_font_normal;
  text-transform: capitalize;
  text-decoration: none;
}

.medium {
  font-size: $font_normal;
  letter-spacing: 0.25px;
}

.large {
  font-size: $font_large;
  letter-spacing: 0.15px;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { config } from '~/config/config'

@Component
export default class Title extends Vue {
  @Prop({
    type: String,
    default: ''
  }) name!: string

  @Prop({
    type: String,
    default: ''
  }) size!: string

  @Prop({
    type: String,
    default: '/'
  }) link!: string

  @Prop({
    type: String
  }) id!: string

  addressLength: number = config.addressLengthLong

  get nameOrId () {
    if (this.name === this.id) {
      return this.$root.$options.filters?.addressShortness(this.id, this.addressLength)
    } else if (this.name.length > 0) {
      return this.name
    } else if (this.id) {
      return this.$root.$options.filters?.addressShortness(this.id, this.addressLength)
    }
  }
}
</script>
