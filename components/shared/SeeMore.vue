<template>
  <NuxtLink :to="localePath(link)" class="see-more-button">
    {{ $t('general.seeMore') }}
  </NuxtLink>
</template>

<style lang="scss">
.see-more-button {
  font-weight: 500;
  font-size: $font_normal;
  line-height: $main_line_height;
  letter-spacing: 0.25px;
  color: $text_color_primary;
  text-transform: capitalize;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class SeeMore extends Vue {
  @Prop({
    type: String
  }) link!: string
}
</script>
