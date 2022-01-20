import { asAccountId } from '@subsocial/api'
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import SubsocialApiService from '~/services/subsocial-api.service'
import { AccountData, AccountRawData, Balance, PolkadotAccountWithMeta } from '~/types/account.types'
import { config } from '~/config/config'
import PostService from '~/services/post.service'

const subsocialApiService = new SubsocialApiService()
const postService = new PostService()

export default class AccountService {
  async getApi (): Promise<FlatSubsocialApi> {
    return await subsocialApiService.initSubsocialApi()
  }

  async getAccountsData (accounts: PolkadotAccountWithMeta[]): Promise<AccountData[]> {
    const suggestedPostIdsPromises = accounts.map(async (account: PolkadotAccountWithMeta) => {
      return await this.getBalance(account.address)
    })

    const balances = await Promise.all(suggestedPostIdsPromises)
    const profiles = await this.loadProfilesByPolkadotAccount(accounts)
    const accountsData = this.extractAccountData({ accounts, balances, profiles })
    return accountsData
  }

  extractAccountData (accountRawData: AccountRawData) {
    return accountRawData.accounts.map((account) => {
      const id = asAccountId(account.address)!.toString()
      const profile = accountRawData.profiles.find(
        profile => profile.id === id
      )

      const balance = accountRawData.balances.find(
        balance => balance.accountId.toString() === id
      )!

      return {
        id,
        name: profile?.content?.name || account.meta.name,
        balance: this.getFormattedBalance(balance),
        avatar: profile?.content?.avatar
      } as unknown as AccountData
    })
  }

  async loadProfilesByPolkadotAccount (polkadotAccounts: PolkadotAccountWithMeta[]) {
    const ids = polkadotAccounts.map(account => account.address)
    return await (await this.getApi()).findProfiles(ids)
  }

  async getBalance (address: string) {
    const api = await (await this.getApi()).subsocial.substrate.api
    return await api.derive.balances.all(address)
  }

  async transferMoney (fromAcc: string, toAcc: string, amount: number, signer: any) {
    const api = await (await this.getApi()).subsocial.substrate.api
    const result = await api.tx.balances
      .transfer(toAcc, 123456789)
      .signAndSend(fromAcc, { signer }, (status) => {
        console.log(status)
      })
    return result
  }

  async setBalance (address: string) {
    const balance = await this.getBalance(address)
    return this.getFormattedBalance(balance)
  }

  async getFormattedBalance (balance: Balance | undefined) {
    const { formatBalance } = await import('@polkadot/util')
    const { decimals, currency: unit } = config
    formatBalance.setDefaults({ decimals, unit })
    const [prefix, postfix] = balance
      ? formatBalance(balance.freeBalance, {
        forceUnit: '-',
        withSi: false
      }).split('.')
      : ['0', undefined]

    return prefix + '.' + (postfix || '0000')
  }

  async getAccountFeedIds (id: string) {
    const spaceIds = await (await this.getApi()).subsocial.substrate.spaceIdsFollowedByAccount(id)
    const postIds = await postService.getSuggestedPostsIds(spaceIds.map(id => id.toString()), true)
    return postIds
  }
}
