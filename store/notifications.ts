import { Notification } from '~/models/notification/notification.model'

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

    const notificationList: Notification[] = []

    commit(UPDATE_NOTIFICATIONS, notificationList)
    commit(SET_LOADING, false)
    return notificationList
  }
}
