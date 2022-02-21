import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  interface Vue {
    $getPostIdFromLink(link: string | null): string
  }
}

const getPostIdPlugin: Plugin = (context, inject) => {
  inject('getPostIdFromLink', (link: string | null) => {
    return getPostIdFromLink(link)
  })

  const getPostIdFromLink = (link: string | null) => {
    return link ? link.trim().split('-').pop() : ''
  }
}

export default getPostIdPlugin
