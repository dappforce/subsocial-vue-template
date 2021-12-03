import { Commit, Dispatch } from 'vuex'
import { AnyAccountId, AnySpaceId } from '@subsocial/types'
import FollowService from '~/services/follow.service'

const followService = new FollowService()
const SET_LOADING = 'SET_LOADING'

export interface Loading {
  isLoading: boolean
}

export const state = (): Loading => ({
  isLoading: false
})

export const mutations = {
  [SET_LOADING] (state: any, loading: boolean) {
    state.isLoading = loading
  }
}

export const actions = {
  async isAccountFollower ({ dispatch, commit }: {dispatch: Dispatch, commit: Commit}, payload: {myAddress: AnyAccountId, followedAddress: AnyAccountId}) {
    return await followService.isAccountFollower(payload.myAddress, payload.followedAddress)
  },

  async isSpaceFollower ({ dispatch, commit }: {dispatch: Dispatch, commit: Commit}, payload: {myAddress: AnyAccountId, followedAddress: AnySpaceId}) {
    return await followService.isSpaceFollower(payload.myAddress, payload.followedAddress)
  },

  async getAccountFollowers ({ dispatch, commit }: {dispatch: Dispatch, commit: Commit}, payload: string) {
    return await followService.getAccountFollowers(payload)
  },

  async getAccountFollowing ({ dispatch, commit }: {dispatch: Dispatch, commit: Commit}, payload: string) {
    return await followService.getAccountFollowing(payload)
  },

  async getSpaceFollowers ({ dispatch, commit }: {dispatch: Dispatch, commit: Commit}, payload: string) {
    return await followService.getFollowersIdsBySpaceId(payload)
  }
}
