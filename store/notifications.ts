import { Activity } from '@subsocial/types'
import { Commit } from 'vuex'
import { PostContent, SpaceContent, PostStruct, ProfileStruct, SpaceStruct } from '@subsocial/types/dto'
import { nonEmptyStr } from '@subsocial/utils'
import NotificationService from '~/services/notification.service'
import { config } from '~/config/config'
import { KeyValuePair } from '~/models/key-value-pair.model'
import { Content } from '~/types/content'
import { ProfileItemModel } from '~/models/profile/profile-item.model'
import { selectPostStructByIds } from '~/utils/utils'

const notificationService = new NotificationService()

const SET_NOTIFICATIONS = 'SET_NOTIFICATIONS'
const CLEAR_NOTIFICATIONS = 'CLEAR_NOTIFICATIONS'
const SET_NOTIFICATIONS_COUNT = 'SET_NOTIFICATIONS_COUNT'
const SET_NOTIFICATIONS_WITH_DATA = 'SET_NOTIFICATIONS_WITH_DATA'
const SET_LOADING = 'SET_LOADING'

export interface NotificationItemData {
  activity: Activity
  post: PostStruct & PostContent | undefined
  space: SpaceStruct & SpaceContent | undefined
  profile: ProfileItemModel | undefined
  followingAccount: ProfileItemModel
}

export interface Notifications {
  list: Activity[],
  loading: boolean,
  count: number,
  activities: NotificationItemData[]
}

export const state = (): Notifications => ({
  list: [],
  count: 0,
  loading: false,
  activities: []
})

export const mutations = {
  [SET_NOTIFICATIONS] (state: Notifications, notifications: Activity[]) {
    state.list = [...new Map(state.list.concat(notifications).map((item: Activity) =>
      [item.block_number, item])).values()]
  },

  [CLEAR_NOTIFICATIONS] (state: Notifications) {
    state.list = []
  },

  [SET_NOTIFICATIONS_COUNT] (state: Notifications, count: number) {
    state.count = count
  },

  [SET_LOADING] (state: Notifications, loading: boolean) {
    state.loading = loading
  },

  [SET_NOTIFICATIONS_WITH_DATA] (state: Notifications, data: NotificationItemData[]) {
    state.activities = data
  }
}

export const actions = {
  async getNotificationService ({ commit, getters, dispatch, rootState }: { commit: Commit, getters: any, dispatch: any, rootState: any}, payload: {id: string, offset: number}) {
    const notifications = await notificationService.getNotifications(payload.id, payload.offset, config.stepForLoading)
    commit(SET_NOTIFICATIONS, notifications)

    const ids = getters.selectIds(notifications)
    await dispatch('posts/getPostsByIds', { ids: ids.postIds.filter((i: string) => !rootState.posts.list.some((p: PostStruct) => p.id === i)), type: 'all' }, { root: true })
    await dispatch('space/getSpacesByIds', ids.spaceIds.filter((i: string) => !rootState.space.spaces.some((p: SpaceStruct) => p.id === i)), { root: true })
    await dispatch('profiles/getProfiles', ids.ownerIds.filter((i: string) => !rootState.profiles.list.some((p: ProfileStruct) => p.id === i)), { root: true })

    const newNotifications = getters.selectNotificationsWithDetails(ids)
    commit(SET_NOTIFICATIONS_WITH_DATA, newNotifications)
    return newNotifications
  },

  async getNotificationCount ({ commit }: {commit: Commit}, payload: string) {
    const count = await notificationService.getNotificationsCount(payload)
    commit(SET_NOTIFICATIONS_COUNT, count)
  }
}

export const getters = {
  selectIds: () => (data: Activity[]) => {
    const ownerIds: string[] = []
    const spaceIds: string[] = []
    const postIds: string[] = []

    // eslint-disable-next-line camelcase
    data.forEach(({ account, following_id, space_id, post_id, comment_id }) => {
      nonEmptyStr(account) && ownerIds.push(account)
      nonEmptyStr(following_id) && ownerIds.push(following_id)
      nonEmptyStr(space_id) && spaceIds.push(space_id)
      nonEmptyStr(post_id) && postIds.push(post_id)
      nonEmptyStr(comment_id) && postIds.push(comment_id)
    })

    return { ownerIds: [...new Set(ownerIds)], spaceIds: [...new Set(spaceIds)], postIds: [...new Set(postIds)] }
  },
  selectNotificationsWithDetails: (state: Notifications, getters: any, rootState: any) => (ids: {postIds: string[]}) => {
    const postArray = selectPostStructByIds(ids.postIds, rootState.posts.list)
    const notifications = state.list
    const contentEntities = rootState.content.contents
    const profileEntity = rootState.profiles.list
    const spaceEntity = [...rootState.space.spaces, rootState.space.currentSpace]
    const notificationsArray: KeyValuePair<NotificationItemData> = {}
    notifications.map((n: Activity) => {
      const item: NotificationItemData = {} as NotificationItemData
      item.activity = n
      item.profile = <ProfileItemModel>getProfile(n.account, profileEntity, contentEntities)
      if (n.post_id) {
        item.post = { ...contentEntities.find((content: Content) => content?.id === postArray.find(i => i.id === n.post_id)?.contentId), ...postArray.find(i => i.id === n.post_id) } || undefined
      } else {
        item.post = n.comment_id ? contentEntities.find((content: Content) => content?.id === postArray.find(i => i.id === n.post_id)?.contentId) : undefined
      }
      if (n.following_id) {
        item.followingAccount = <ProfileItemModel>getProfile(n.following_id, profileEntity, contentEntities)
      }

      item.space = n.space_id
        ? { ...contentEntities.find((content: Content) => content?.id === spaceEntity.find(i => i.id === n.space_id)?.contentId), ...spaceEntity.find(i => i.id === n.space_id) }
        : undefined
      notificationsArray[n.block_number] = item
    })
    return notificationsArray
  }
}
const getProfile = (userId: string, profileEntity: ProfileItemModel[], contentEntities: Content[]) => {
  return profileEntity.find((profile: ProfileItemModel) => profile.id === userId)?.contentId
    ? contentEntities.find((content: Content) => content?.id === profileEntity.find((profile: ProfileItemModel) => profile?.id === userId)?.contentId)
    : profileEntity.find((profile: ProfileItemModel) => profile.id === userId)
}
