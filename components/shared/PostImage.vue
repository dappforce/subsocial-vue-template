<template >
  <NuxtLink :to="link" v-if="imageSrc && imageSrc.length">
    <div class="post-image" v-bind:style="{ backgroundImage: 'url(' + imageSrc +')'}"></div>
  </NuxtLink>
</template>

<style lang="scss">
.post-image {
  width: 174px;
  height: 174px;
  margin-left: 16px;
  border-radius: 4px;
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

<script>
export default {
  name: 'PostImage',

  props: {
    link: {
      type: String,
      default: '/'
    },
    imageSrc: {
      type: String
    }
  }
}
</script>
