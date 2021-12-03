import { SpaceStruct } from '@subsocial/api/flat-subsocial/flatteners'
import { Commit, Dispatch } from 'vuex/types/index'
import { AnyId } from '@subsocial/api/flat-subsocial/dto'
import { SpaceContentExtend, SpaceListItemData } from '~/models/space/space-list-item.model'
import SpaceService from '~/services/space.service'
import { Content } from '~/types/content'
import { environment } from '@/environments/environment'

const UPDATE_SPACE = 'UPDATE_SPACE'
const CLEAR_SPACES = 'CLEAR_SPACES'
const SET_LOADING_SPACE = 'SET_LOADING_SPACE'
const SET_LOADING_ACCOUNT_SPACES = 'SET_LOADING_ACCOUNT_SPACES'
const SET_CURRENT_SPACE = 'SET_CURRENT_SPACE'
const SET_ACCOUNT_SPACE_IDS = 'SET_ACCOUNT_SPACE_IDS'
const spaceServices = new SpaceService()

export interface SpaceModel {
  spaces: SpaceStruct[],
  currentSpace?: SpaceStruct,
  accountSpaceIds: [],
  isLoading: boolean
}

export const state = (): SpaceModel => ({
  spaces: [],
  isLoading: false,
  currentSpace: undefined,
  accountSpaceIds: []
})

export const mutations = {
  [UPDATE_SPACE] (state: any, spaces: SpaceStruct[]) {
    state.spaces = [...new Map(state.spaces.concat(spaces).map((item: SpaceStruct) =>
      [item.id, item])).values()]
  },
  [SET_LOADING_SPACE] (state: any, loading: boolean) {
    state.isLoading = loading
  },
  [SET_LOADING_ACCOUNT_SPACES] (state: any, loading: boolean) {
    state.isLoading = loading
  },
  [SET_CURRENT_SPACE] (state: any, space: SpaceStruct) {
    state.currentSpace = space
  },
  [SET_ACCOUNT_SPACE_IDS] (state: any, ids: []) {
    state.accountSpaceIds = ids
  },
  [CLEAR_SPACES] (state: any, space: SpaceStruct) {
    state.spaces = space
  }
}

export const actions = {
  async getSpacesByIds ({ commit }: {commit: Commit }, payload: AnyId[]) {
    commit(SET_LOADING_SPACE, true)
    const data = await spaceServices.getSpaces(payload)
    commit('content/SET_CONTENT', data.contents, { root: true })
    commit(UPDATE_SPACE, data.structs)
    commit(SET_LOADING_SPACE, false)
  },

  async getSpaceById ({ commit }: {commit: Commit }, payload: string) {
    if (payload.startsWith('@')) {
      const space = await spaceServices.getSpaceIdByHandle(payload).then(async (id: any) => {
        return await spaceServices.getSpace(id)
      })
      return space
    } else {
      const space = await spaceServices.getSpace(payload)
      return space
    }
  },

  async getSpacesByAccount ({ commit }: {commit: Commit }, payload: string) {
    const spaces = await spaceServices.getSpaceIdByAccount(payload).then(async (ids: AnyId[]) => {
      const spaceIds = ids.map(id => id.toString())
      commit(SET_ACCOUNT_SPACE_IDS, spaceIds)
      return await spaceServices.getSpaces(spaceIds)
    })
    commit(SET_LOADING_ACCOUNT_SPACES, true)
    commit('content/SET_CONTENT', spaces.contents, { root: true })
    commit(UPDATE_SPACE, spaces.structs)
    commit(SET_LOADING_ACCOUNT_SPACES, false)
  },

  findSpaceById ({ state, rootState }: {rootState: any, state: SpaceModel}, payload: string) {
    const struct = payload.startsWith('@')
      ? state.spaces.find((i: SpaceStruct) => i.handle === payload.substring(1))
      : state.spaces.find((i: SpaceStruct) => i.id === payload)
    if (struct && struct.contentId) {
      const content = rootState.content.contents.find((i: Content) => i.id === struct.contentId) as SpaceContentExtend
      return content ? ({ struct, content } as unknown as SpaceListItemData) : undefined
    }
    return undefined
  }
}

export const getters = {
  getSpacesWithContent: (state: SpaceModel, getters: any, rootState: any) => (start: number, end: number) => {
    const recommendedSpace = environment.recommendedSpaceIds
    const spacesArray = state.spaces.filter(i => recommendedSpace.includes(i.id))
    const contentEntities = rootState.content.contents
    const spaceData: SpaceListItemData[] = []
    spacesArray.slice(start, end).map((struct: SpaceStruct) => {
      if (struct.contentId) {
        const content = contentEntities.find((i: Content) => i.id === struct.contentId) as SpaceContentExtend
        return content ? spaceData.push({ struct, content }) : null
      }
    })
    return spaceData
  },

  getSpaceWithContent: (state: SpaceModel, getters: any, rootState: any) => (id: string) => {
    const struct = state.spaces.find((i: SpaceStruct) => i.id === id)
    const content = rootState.content.contents.find((i: Content) => i.id === struct?.contentId) as SpaceContentExtend
    return { struct, content }
  },

  getSpacesWithContentByIds: (state: SpaceModel, getters: any, rootState: any) => (ids: string[]) => {
    const spaceData: SpaceListItemData[] = []
    ids.forEach((id) => {
      const struct = state.spaces.find((i: SpaceStruct) => i.id === id)
      if (struct?.contentId) {
        const content = rootState.content.contents.find((i: Content) => i.id === struct?.contentId) as SpaceContentExtend
        if (content) {
          return content ? spaceData.push({ struct, content }) : null
        }
      }
    })

    return spaceData
  }
}
