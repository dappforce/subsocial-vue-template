import { Commit, Dispatch } from 'vuex'
import { ProfileStruct } from '@subsocial/api/flat-subsocial/flatteners'
import { ProfileContent } from '@subsocial/api/flat-subsocial/dto'
import { environment } from '~/environments/environment'
import ProfileService from '~/services/profile.service'
import { Content } from '~/types/content'
import { ProfileComponentData } from '~/types/profile-component-data.type'
import { ACCOUNT_STATUS } from '~/models/enum/account-status.enum'
import { AccountData, PolkadotAccount } from '~/types/account.types'
import StorageService from '~/services/storage.service'
import AccountService from '~/services/account.service'

const profileService = new ProfileService()
const storage = new StorageService()
const accountService = new AccountService()

const UPDATE_PROFILES = 'UPDATE_PROFILES'
const SET_LOADING = 'SET_LOADING'
const SET_CURRENT_USER = 'SET_CURRENT_USER'
const SET_STATUS = 'SET_STATUS'
const SET_POLKADOT_ACCOUNTS = 'SET_POLKADOT_ACCOUNTS'
const SET_BALANCE = 'SET_BALANCE'

export interface Profile {
  list: ProfileStruct[],
  loading: boolean,
  currentUser: ProfileStruct | undefined,
  status: ACCOUNT_STATUS,
  polkadotAccounts: AccountData[],
  myBalance: String
}

export const state = (): Profile => ({
  list: [],
  loading: false,
  currentUser: undefined,
  status: ACCOUNT_STATUS.INIT,
  polkadotAccounts: [],
  myBalance: '0.0000'
})

export const mutations = {
  [UPDATE_PROFILES] (state: any, profiles: []) {
    state.list = [...new Map(state.list.concat(profiles).map((item: ProfileStruct) =>
      [item.id, item])).values()]
  },

  [SET_LOADING] (state: any, loading: boolean) {
    state.loading = loading
  },

  [SET_CURRENT_USER] (state: any, user: {}) {
    state.currentUser = user
  },

  [SET_STATUS] (state: any, status: ACCOUNT_STATUS) {
    state.status = status
  },

  [SET_POLKADOT_ACCOUNTS] (state: any, status: AccountData[]) {
    state.polkadotAccounts = status
  },

  [SET_BALANCE] (state: any, balance: string) {
    state.myBalance = balance
  }
}

export const actions = {
  async initAccount ({ commit, dispatch }: {commit: Commit, dispatch: any}) {
    const { web3Enable } = await import('@polkadot/extension-dapp')
    const injectedExtensions = await web3Enable('Subsocial')
    const polkadotJs = injectedExtensions.find(
      extension => extension.name === 'polkadot-js'
    )

    if (injectedExtensions.length === 0) {
      commit(SET_STATUS, ACCOUNT_STATUS.EXTENSION_NOT_FOUND)
    }

    if (!polkadotJs) { return }

    const unsub = polkadotJs!.accounts.subscribe(async (accounts) => {
      if (accounts?.length > 0) {
        const polkadotAccounts = await accountService.getAccountsData(accounts as PolkadotAccount[])
        commit(SET_POLKADOT_ACCOUNTS, polkadotAccounts)
        commit(SET_STATUS, ACCOUNT_STATUS.UNAUTHORIZED)
        dispatch('checkIfAlreadySignIn', polkadotAccounts)
      } else {
        commit(SET_STATUS, ACCOUNT_STATUS.ACCOUNTS_NOT_FOUND)
      }
    })
  },

  async getProfile ({ dispatch, commit, state }: {dispatch: Dispatch, commit: Commit, state: Profile}, payload: {id: string, isSetAccount?: boolean}) {
    const data = await profileService.getProfile(payload.id)
    if (data) {
      commit(UPDATE_PROFILES, [data?.struct])
      commit('content/SET_CONTENT', data!.content as Content, { root: true })
      if (payload.isSetAccount) {
        commit(SET_CURRENT_USER, data?.struct)
      }
    } else {
      const account = state.polkadotAccounts.find(i => i.id === payload.id)
      if (payload.isSetAccount) {
        commit(SET_CURRENT_USER, account)
      }
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
    const balance = await accountService.setBalance(account.id)
    commit(SET_BALANCE, balance)
    dispatch('getProfile', { id: account.id, isSetAccount: true })
    storage.setCurrentAccountId(account.id)
  },

  async getProfiles ({ dispatch, commit, state }: {dispatch: Dispatch, commit: Commit, state: Profile}, payload: string[]) {
    const data = await profileService.getProfiles(payload)
    return data
  },

  async getAccountBalance ({ commit }: {commit: Commit}, payload: string) {
    return await accountService.setBalance(payload)
  },

  signOut ({ commit }: {commit: Commit}) {
    commit(SET_CURRENT_USER, undefined)
  }

}

export const getters = {
  selectProfileData: (state: Profile, getters: any, rootState: any) => (id: string) => {
    const struct = state.list.find(i => i.id === id)
    if (struct) {
      const profileComponentData: ProfileComponentData = {
        id,
        address: id,
        followersCount: struct.followersCount,
        followingCount: struct.followingAccountsCount
      }
      if (struct?.contentId) {
        const content = rootState.content.contents.find((i: Content) => i.id === struct.contentId) as ProfileContent
        if (content) {
          profileComponentData.avatar = content.avatar
          profileComponentData.name = content.name
          profileComponentData.summary = content.summary
        }
      }
      return profileComponentData
    }

    return undefined
  }
}
