import Vue from 'vue'

Vue.filter('linkToIcon', (link: string) => {
  function getLinkBrand (link: string) {
    for (const key in socialLinksRegExp) {
      if (isSocialBrandLink(key, link)) {
        return key
      }
    }
    return 'web'
  }

  function isSocialBrandLink (brand: string, link: string) {
    if (!link) {
      return false
    }

    link = link.trim().toLowerCase()
    // @ts-ignore
    return !!socialLinksRegExp[brand].find((r: any) => r.test(link))
  }

  const newSocialLinkRegExp = (brandDomain: string) => {
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
})
