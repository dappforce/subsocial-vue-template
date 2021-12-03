import { SpaceStruct } from '@subsocial/api/flat-subsocial/flatteners'
import { SpaceEntity } from '~/models/entities/space-entity.model'
import { Content } from '~/types/content'

const SET_CONTENT = 'SET_CONTENT'
const UPDATE_SPACE_CONTENT = 'UPDATE_SPACE_CONTENT'
const SET_LOADING_CONTENT = 'SET_LOADING_CONTENT'
const SET_CURRENT_CONTENT = 'SET_CURRENT_CONTENT'
const CLEAR_SPACE_CONTENT = 'CLEAR_SPACE_CONTENT'

export interface ContentModel {
  contents: Content[],
  spaceContent: SpaceStruct[],
  postContent: Content[],
  isLoading: boolean
}

export const state = (): ContentModel => ({
  contents: [],
  spaceContent: [],
  postContent: [],
  isLoading: false
})

export const mutations = {
  [UPDATE_SPACE_CONTENT] (state: any, content: []) {
    state.spaceContent = [...new Set([...state.spaceContent, ...content])]
  },
  [SET_LOADING_CONTENT] (state: any, loading: boolean) {
    state.loading = loading
  },
  [SET_CURRENT_CONTENT] (state: any, space: SpaceEntity) {
    state.currentSpace = space
  },
  [CLEAR_SPACE_CONTENT] (state: any, content: []) {
    state.spaceContent = content
  },
  [SET_CONTENT] (state: any, content: []) {
    state.contents = state.contents.concat(content)
  }
}

export const actions = {

}

export const getters = {
  getContent: (state: any, rootState: any) => {
    return state.content
  }
}
