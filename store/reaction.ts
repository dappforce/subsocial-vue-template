import { Commit, Dispatch } from 'vuex'
import { AnyAccountId, AnyPostId } from '@subsocial/types'
import ReactionService from '~/services/reaction.service'

const reactionService = new ReactionService()
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
  async getPostReactionIdsByAccount ({ dispatch, commit }: {dispatch: Dispatch, commit: Commit}, payload: {accountId: AnyAccountId, postId: string}) {
    const reactionIds = await reactionService.getPostReactionIdsByAccount(payload.postId)
    return await reactionService.findReactions(reactionIds)
  },

  async getPostReactionIdByAccount ({ dispatch, commit }: {dispatch: Dispatch, commit: Commit}, payload: {accountId: AnyAccountId, postId: AnyPostId}) {
    const reactionId = await reactionService.getPostReactionIdByAccount(payload.accountId, payload.postId)
    return await reactionService.findReaction(reactionId)
  }
}
