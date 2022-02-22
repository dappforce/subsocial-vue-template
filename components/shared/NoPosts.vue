<template>
  <div class="no-posts">
    {{ message }}
  </div>
</template>

<style scoped lang="scss">
.no-posts {
  color: $text_color_normal;
  line-height: 125%;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 34px $space_normal;
  justify-content: center;
  background-color: $container_bg_white;
  box-shadow: $box_shadow_card;
  border-radius: $border_small;
  margin-top: $space_normal;
  font-size: $font_normal;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class NoPosts extends Vue {
  @Prop({
    type: String
  }) message!: string
}
</script>
