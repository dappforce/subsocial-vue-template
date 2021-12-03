import { Commit } from 'vuex'

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
  setLoading ({ commit }: {commit: Commit}, payload: boolean) {
    commit(SET_LOADING, payload)
  }
}
