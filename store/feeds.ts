import { Commit } from 'vuex'
import FeedService from '~/services/feed.service'
import AccountService from '~/services/account.service'
import { config } from '~/config/config'

const feedService = new FeedService()
const accountService = new AccountService()

const SET_FEED_IDS = 'SET_FEED_IDS'
const SET_FEED_COUNT = 'SET_FEED_COUNT'
const CLEAR_FEED_COUNT = 'CLEAR_FEED_COUNT'
const CLEAR_FEED_IDS = 'CLEAR_FEED_IDS'

export interface Feeds {
  feedIds: string[],
  feedCount: number
}

export const state = (): Feeds => ({
  feedIds: [],
  feedCount: 0
})

export const mutations = {
  [SET_FEED_IDS] (state: Feeds, payload: string[]) {
    state.feedIds = [...state.feedIds, ...payload]
  },

  [SET_FEED_COUNT] (state: Feeds, payload: number) {
    state.feedCount = payload
  },

  [CLEAR_FEED_COUNT] (state: Feeds) {
    state.feedCount = 0
  },
  [CLEAR_FEED_IDS] (state: Feeds) {
    state.feedIds = []
  }
}

export const actions = {
  async getFeedIds ({ commit }: {commit: Commit}, payload: {id: string, offset: number}) {
    const feed = await feedService.getNewsFeed(payload.id, payload.offset, config.stepForLoading)
    const feedIds = feed.map(i => i.post_id)
    commit(SET_FEED_IDS, feedIds)
    return feedIds
  },

  async getFeedCount ({ commit }: {commit: Commit}, payload: string) {
    const count = await feedService.getFeedCount(payload)
    commit(SET_FEED_COUNT, count)
  },

  async getNewsFeed ({ commit }: {commit: Commit}, payload: string) {
    const feedIds = await accountService.getAccountFeedIds(payload)
    commit(SET_FEED_IDS, feedIds)
  }
}
