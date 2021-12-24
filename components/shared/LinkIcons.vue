<template>
  <div class="link-icons-container">
    <div
      v-for="(link, index) in links"
      :key="index"
      class="link-icon-wp"
    >
      <a target="_blank" :href="link">
        <v-icon v-if="isTelegramOrMedium(link)" size="20" color="#000">mdi-{{ link | linkToIcon }}</v-icon>
        <img v-if="isTelegramOrMedium(link) === 'telegram'" width="18" height="18" src="../../assets/image/telegram.svg" alt="">
        <img v-if="isTelegramOrMedium(link) === 'medium'" width="20" height="20" src="../../assets/image/medium.svg" alt="">
      </a>
    </div>
  </div>
</template>

<style lang="scss">
.link-icons-container {
  display: flex;
  align-items: center;

  .link-icon-wp {
    display: flex;
    align-items: center;
    margin-right: 10px;

    a {
      text-decoration: none;
      display: flex;
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class LinkIcons extends Vue {
  @Prop({
    type: Array
  }) links!: []

  isTelegramOrMedium (link: string): string | boolean {
    const linkPrefix = '^(https?://)?([a-z0-9-]+.)?'
    const newSocialLinkRegExp = (brandDomain: string) => {
      return new RegExp(linkPrefix + brandDomain)
    }

    if (newSocialLinkRegExp('medium.com').test(link)) {
      return 'medium'
    } else if (newSocialLinkRegExp('t.me').test(link) ||
      newSocialLinkRegExp('telegram.me').test(link)) {
      return 'telegram'
    }

    return true
  }
}
</script>
