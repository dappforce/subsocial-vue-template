import { asAccountId } from '@subsocial/api'
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import { AnyAccountId } from '@subsocial/types'
import { ProfileData } from '@subsocial/api/flat-subsocial/dto'
import SubsocialApiService from '~/services/subsocial-api.service'
import { AccountData, AccountRawData, Balance, PolkadotAccount } from '~/types/account.types'
import { environment } from '~/environments/environment'

const subsocialApiService = new SubsocialApiService()

export default class AccountService {
  async getApi (): Promise<FlatSubsocialApi> {
    return await subsocialApiService.initSubsocialApi()
  }

  async getAccountsData (accounts: PolkadotAccount[]): Promise<AccountData[]> {
    const suggestedPostIdsPromises = accounts.map(async (account: PolkadotAccount) => {
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
        name: profile?.content?.name || account.name,
        balance: this.getFormattedBalance(balance),
        avatar: profile?.content?.avatar
      } as unknown as AccountData
    })
  }

  async loadProfilesByPolkadotAccount (polkadotAccounts: PolkadotAccount[]) {
    const ids = polkadotAccounts.map(account => account.address)
    return await (await this.getApi()).findProfiles(ids)
  }

  async getBalance (address: string) {
    const api = await (await this.getApi()).subsocial.substrate.api
    return await api.derive.balances.all(address)
  }

  async setBalance (address: string) {
    const balance = await this.getBalance(address)
    return this.getFormattedBalance(balance)
  }

  private async getFormattedBalance (balance: Balance | undefined) {
    const { formatBalance } = await import('@polkadot/util')
    const { decimals, currency: unit } = environment
    formatBalance.setDefaults({ decimals, unit })
    const [prefix, postfix] = balance
      ? formatBalance(balance.freeBalance, {
        forceUnit: '-',
        withSi: false
      }).split('.')
      : ['0', undefined]

    return prefix + '.' + (postfix || '0000')
  }
}
