<template>
  <NuxtLink v-if="imageSrc && imageSrc.length" :to="link">
    <div class="post-image" :style="{ backgroundImage: 'url(' + imageSrc +')'}" />
  </NuxtLink>
</template>

<style lang="scss">
.post-image {
  width: 174px;
  height: 174px;
  margin-left: $space_normal;
  border-radius: $border_small;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;
}

@media only screen and (max-width: 768px) {
  .post-image {
    width: 100%;
    margin-left: 0;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class PostImage extends Vue {
  @Prop({
    type: String,
    default: '/'
  }) link!: string

  @Prop({
    type: String
  }) imageSrc!: string
}
</script>
