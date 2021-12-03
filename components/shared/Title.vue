<template>
  <NuxtLink :to="link" class="title" :class="size">
    {{ name }}
  </NuxtLink>
</template>

<style lang="scss">
.title {
  font-weight: 500;
  font-size: $font-size-normal;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: rgba(0, 0, 0, 0.87);
  text-transform: capitalize;
  text-decoration: none;
}

.medium {
  font-size: $font-size-profile-name;
  letter-spacing: 0.25px;
}

.large {
  font-size: $font-size-title-preview;
  letter-spacing: 0.15px;
}
</style>

<script>
export default {
  name: 'Title',

  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: '/'
    }
  }
}
</script>
