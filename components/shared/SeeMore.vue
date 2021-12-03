<template>
  <NuxtLink :to="link" class="see-more-button">
    See more
  </NuxtLink>
</template>

<style lang="scss">
.see-more-button {
  font-weight: 500;
  font-size: $font-size-normal;
  line-height: 24px;
  letter-spacing: 0.25px;
  color: #EB2F96;
  text-transform: capitalize;
  text-decoration: none;
  cursor: pointer;
  white-space: nowrap;
}
</style>

<script>
export default {
  name: 'SeeMore',

  props: {
    link: {
      type: String
    }
  }
}
</script>
