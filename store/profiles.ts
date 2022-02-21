import { Commit, Dispatch } from 'vuex/types/index'
import { ProfileStruct, ProfileContent } from '@subsocial/types/dto'
import ProfileService from '~/services/profile.service'
import { Content } from '~/types/content'
import { ACCOUNT_STATUS } from '~/models/enum/account-status.enum'
import { AccountData, Balance, PolkadotAccountWithMeta } from '~/types/account.types'
import StorageService from '~/services/storage.service'
import AccountService from '~/services/account.service'
import { ProfileItemModel } from '~/models/profile/profile-item.model'
import { config } from '~/config/config'
import SubsocialApiService from '~/services/subsocial-api.service'

const profileService = new ProfileService()
const storage = new StorageService()
const accountService = new AccountService()
const subsocialApiService = new SubsocialApiService()

const UPDATE_PROFILES = 'UPDATE_PROFILES'
const SET_LOADING = 'SET_LOADING'
const SET_CURRENT_USER = 'SET_CURRENT_USER'
const SET_STATUS = 'SET_STATUS'
const SET_POLKADOT_ACCOUNTS = 'SET_POLKADOT_ACCOUNTS'
const SET_BALANCE = 'SET_BALANCE'
const SET_SIGNER = 'SET_SIGNER'
const SET_REGISTRY = 'SET_REGISTRY'
const UPDATE_CURRENT_USER = 'UPDATE_CURRENT_USER'

const DEFAULT_TOKEN = 'SUB'
const DEFAULT_DECIMALS = 11

let unsub: (() => void) | undefined

export interface Profile {
  list: ProfileStruct[],
  loading: boolean,
  currentUser: ProfileStruct | undefined,
  status: ACCOUNT_STATUS,
  polkadotAccounts: AccountData[],
  myBalance: String,
  signer: any | null,
  chainDecimal: number,
  chainToken: string
}

export interface UpdateUserModel {
  id: string,
  data: number,
  type: boolean
}

export const state = (): Profile => ({
  list: [],
  loading: false,
  currentUser: undefined,
  status: ACCOUNT_STATUS.INIT,
  polkadotAccounts: [],
  myBalance: '0.0000',
  signer: null,
  chainDecimal: DEFAULT_DECIMALS,
  chainToken: DEFAULT_TOKEN
})

export const mutations = {
  [UPDATE_PROFILES] (state: Profile, profiles: []) {
    state.list = [...new Map(state.list.concat(profiles).map((item: ProfileStruct) =>
      [item.id, item])).values()]
  },

  [SET_LOADING] (state: Profile, loading: boolean) {
    state.loading = loading
  },

  [SET_CURRENT_USER] (state: Profile, user: ProfileStruct) {
    state.currentUser = user
  },

  [SET_STATUS] (state: Profile, status: ACCOUNT_STATUS) {
    state.status = status
  },

  [SET_POLKADOT_ACCOUNTS] (state: Profile, status: AccountData[]) {
    state.polkadotAccounts = status
  },

  [SET_BALANCE] (state: Profile, balance: string) {
    state.myBalance = balance
  },

  [SET_SIGNER] (state: Profile, signer: any) {
    state.signer = signer
  },
  
  [SET_REGISTRY] (state: Profile, payload: {token: string, decimal: number}) {
    state.chainDecimal = payload.decimal
    state.chainToken = payload.token
  },

  [UPDATE_CURRENT_USER] (state: Profile, payload: UpdateUserModel) {
    state.list.find(i => i.id === payload.id)!.followingAccountsCount += payload.type ? payload.data : -payload.data
  }
}

export const actions = {
  async initAccount ({ state, commit, dispatch }: {state: Profile, commit: Commit, dispatch: any}) {
    const { web3Enable, web3Accounts } = await import('@polkadot/extension-dapp')
    const injectedExtensions = await web3Enable('Subsocial')
    const polkadotJs = injectedExtensions.find(
      extension => extension.name === 'polkadot-js'
    )

    if (injectedExtensions.length === 0) {
      commit(SET_STATUS, ACCOUNT_STATUS.EXTENSION_NOT_FOUND)
    }

    if (!polkadotJs) { return }

    commit(SET_SIGNER, polkadotJs.signer)

    const accounts = await web3Accounts()

    if (accounts?.length > 0) {
      const polkadotAccounts = await accountService.getAccountsData(accounts as PolkadotAccountWithMeta[], { token: state.chainToken, decimals: state.chainDecimal })
      commit(SET_POLKADOT_ACCOUNTS, polkadotAccounts)
      commit(SET_STATUS, ACCOUNT_STATUS.UNAUTHORIZED)
      dispatch('checkIfAlreadySignIn', polkadotAccounts)
    } else {
      commit(SET_STATUS, ACCOUNT_STATUS.ACCOUNTS_NOT_FOUND)
    }
  },

  async getProfile ({ dispatch, commit, state }: {dispatch: Dispatch, commit: Commit, state: Profile}, payload: {id: string, isSetAccount?: boolean}) {
    const data = await profileService.getProfile(payload.id)
    if (data) {
      commit(UPDATE_PROFILES, [data?.struct])
      commit('content/SET_CONTENT', data!.content as Content, { root: true })
      if (payload.isSetAccount) {
        commit(SET_CURRENT_USER, data?.struct)
      }
    } else if (payload.isSetAccount) {
      const account = state.polkadotAccounts.find(i => i.id === payload.id)
      if (payload.isSetAccount) {
        commit(SET_CURRENT_USER, account)
      }
    } else {
      const anonymous = {
        id: payload.id,
        address: payload.id,
        followersCount: 0,
        followingCount: 0
      }
      commit(UPDATE_PROFILES, [anonymous])
    }
  },

  async checkIfAlreadySignIn ({ commit, dispatch }: {commit: Commit, dispatch: any}, accountData: AccountData[]) {
    const id = storage.getAccountId()
    const account = accountData.find(accountData => accountData.id === id)
    if (account) {
      await dispatch('setCurrentAccount', account)
    }
  },

  async setCurrentAccount ({ commit, getters, dispatch }: {commit: Commit, getters: any, dispatch: any}, account: AccountData) {
    if (unsub) {
      unsub()
    }

    commit('notifications/CLEAR_NOTIFICATIONS', [], { root: true })
    commit('feeds/CLEAR_FEED_IDS', [], { root: true })
    commit('feeds/CLEAR_FEED_COUNT', [], { root: true })

    dispatch('subscribeOnBalance', account.id)
    dispatch('getProfile', { id: account.id, isSetAccount: true })

    if (config.isOffChainFeed) {
      await dispatch('feeds/getFeedCount', account.id, { root: true })
      await dispatch('feeds/getFeedIds', { id: account.id, offset: 0 }, { root: true })
    } else {
      dispatch('feeds/getNewsFeed', account.id, { root: true })
    }

    dispatch('notifications/getNotificationService', { id: account.id, offset: 0 }, { root: true })
    dispatch('notifications/getNotificationCount', account.id, { root: true })

    commit(SET_STATUS, ACCOUNT_STATUS.AUTHORIZED)
    storage.setCurrentAccountId(account.id)
  },

  async getProfiles ({ commit }: {commit: Commit}, payload: string[]) {
    const data = await profileService.getProfiles(payload)
    const struct = data.map(i => i.struct)
    const content = data.map((i) => {
      return { ...i.content, id: i.struct.contentId ? i.struct.contentId : i.id }
    })

    commit(UPDATE_PROFILES, struct)
    commit('content/SET_CONTENT', content, { root: true })
    return data
  },

  async getAccountBalance ({ state }: {state: Profile}, payload: string) {
    const registry = { token: state.chainToken, decimals: state.chainDecimal }
    return await accountService.setBalance(payload, registry)
  },

  async subscribeOnBalance ({ state, commit }: {state: Profile, commit: Commit}, address: string) {
    const registry = { token: state.chainToken, decimals: state.chainDecimal }
    const api = await (await profileService.getApi()).subsocial.substrate.api
    unsub = await api.derive.balances.all(address, (data: Balance | undefined) => {
      accountService.getFormattedBalance(data, registry).then((balance) => {
        commit(SET_BALANCE, balance)
      })
    })
  },

  async updateUserInfo ({ commit }: {commit: Commit}, payload: UpdateUserModel) {
    await commit(UPDATE_CURRENT_USER, payload)
  },

  async transferMoney ({ state }: {state: Profile}, payload: {from: string, to: string, amount: number }) {
    return await accountService.transferMoney(payload.from, payload.to, payload.amount, state.signer)
  },
  
  async getRegistry ({ commit }: {commit: Commit}) {
    const registry = await subsocialApiService.getRegistry()
    const payload = {
      decimal: registry.chainDecimals[0],
      token: registry.chainTokens[0]
    }

    commit(SET_REGISTRY, payload)
  },

  signOut ({ commit }: {commit: Commit}) {
    commit(SET_CURRENT_USER, undefined)
    commit(SET_SIGNER, undefined)
  }
}

export const getters = {
  selectProfileData: (state: Profile, getters: any, rootState: any) => (id: string) => {
    const struct = state.list.find(i => i.id === id)
    if (struct) {
      const profileComponentData: ProfileItemModel = {
        id,
        address: id,
        name: state.polkadotAccounts.find(i => i.id === id)?.name,
        followersCount: struct.followersCount,
        followingCount: struct.followingAccountsCount,
        contentId: struct.contentId
      }
      if (struct?.contentId) {
        const content = rootState.content.contents.find((i: Content) => i?.id === struct.contentId) as ProfileContent
        if (content) {
          profileComponentData.avatar = content.avatar
          profileComponentData.name = content.name
          profileComponentData.summary = content.summary
          profileComponentData.about = content.about
        }
      }
      return profileComponentData
    }

    return undefined
  }
}
