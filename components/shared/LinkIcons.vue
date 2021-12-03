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

<script>
export default {
  name: 'LinkIcons',

  filters: {
    linkToIcon (link) {
      function getLinkBrand (link) {
        for (const key in socialLinksRegExp) {
          if (isSocialBrandLink(key, link)) {
            return key
          }
        }
        return 'web'
      }

      function isSocialBrandLink (brand, link) {
        if (!link) {
          return false
        }

        link = link.trim().toLowerCase()
        return !!socialLinksRegExp[brand].find(r => r.test(link))
      }

      const newSocialLinkRegExp = (brandDomain) => {
        return new RegExp(linkPrefix + brandDomain)
      }

      const linkPrefix = '^(https?://)?([a-z0-9-]+.)?'

      const socialLinksRegExp = {
        facebook: [
          newSocialLinkRegExp('facebook.com'),
          newSocialLinkRegExp('fb.me'),
          newSocialLinkRegExp('fb.com'),
          newSocialLinkRegExp('facebook.me')
        ],
        twitter: [newSocialLinkRegExp('twitter.com')],
        medium: [newSocialLinkRegExp('medium.com')],
        linkedin: [
          newSocialLinkRegExp('linkedin.com'),
          newSocialLinkRegExp('linked.in')
        ],
        github: [newSocialLinkRegExp('github.com')],
        reddit: [newSocialLinkRegExp('reddit.com')],
        youtube: [
          newSocialLinkRegExp('youtube.com'),
          newSocialLinkRegExp('youtu.be')
        ],
        telegram: [
          newSocialLinkRegExp('t.me'),
          newSocialLinkRegExp('telegram.me')
        ]
      }
      return getLinkBrand(link)
    }
  },

  props: {
    links: {
      type: Array
    }
  },

  methods: {
    isTelegramOrMedium (link) {
      const linkPrefix = '^(https?://)?([a-z0-9-]+.)?'
      const newSocialLinkRegExp = (brandDomain) => {
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
}
</script>
