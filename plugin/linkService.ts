export default ({ app }: any, inject: any) => {
  inject('getPostId', (link: string | null) => {
    return getPostIdFromLink(link)
  })
}

const getPostIdFromLink = (link: string | null) => {
  return link ? link.trim().split('-').pop() : ''
}
