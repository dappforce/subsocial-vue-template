import notifications from '~/content/notifications.json'
import { Notification } from '~/models/notification/notification.model'
import { ProfileData } from '~/models/profile/profile-data.model'
import profile from '~/content/profiles.json'
import { environment } from '~/environments/environment'
import { ContentData } from '~/models/content-data.model'
import contents from '~/content/content.json'
import { PostData } from '~/models/post/post-data.model'
import posts from '~/content/posts.json'
import { SpaceData } from '~/models/space/space-data.model'
import spaces from '~/content/spaces.json'

const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS'
const SET_LOADING = 'SET_LOADING'

export const state = () => ({
  list: [],
  loading: false
})

export const mutations = {
  [UPDATE_NOTIFICATIONS] (state: any, posts: {}) {
    state.list = posts
  },

  [SET_LOADING] (state: any, loading: boolean) {
    state.loading = loading
  }
}

export const actions = {
  getNotifications ({ commit }: any) {
    commit(SET_LOADING, true)
    const notificationMockData: Notification[] = notifications as []
    // @ts-ignore
    const profileMockData : ProfileData = profile.profiles
    // @ts-ignore
    const contentMockData : ContentData = contents
    // @ts-ignore
    const postMockData : PostData = posts.posts
    // @ts-ignore
    const spaceMockData : SpaceData = spaces
    const notificationList: Notification[] = []

    notificationMockData.map((i:Notification) => {
      const profile = profileMockData.entities[i.account]
      const profileContent = contentMockData.entities[profile?.contentId]
      // @ts-ignore
      const post = postMockData.entities[i?.post_id]
      const postContent = contentMockData.entities[post?.contentId]
      // @ts-ignore
      const space = spaceMockData.entities[i?.space_id]
      const spaceContent = contentMockData.entities[space?.contentId]

      notificationList.push({
        ...i,
        avatarSrc: environment.ipfsUrl + profileContent?.avatar || '',
        userName: profileContent?.name,
        imageUrl: postContent?.image
          ? environment.ipfsUrl + postContent?.image
          : spaceContent?.image ? environment.ipfsUrl + spaceContent?.image : '',
        isOwnerPost: !!post,
        isOwnerSpace: !!space,
        postName: postContent?.title,
        spaceName: spaceContent?.name
      })
    })
    commit(UPDATE_NOTIFICATIONS, notificationList)
    commit(SET_LOADING, false)
    return notificationList
  }
}
