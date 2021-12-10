import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import SubsocialApiService from '~/services/subsocial-api.service'
import { ExtrinsicProps } from '~/components/abstract/TransactionButton.vue'

const subsocialApiService = new SubsocialApiService()

export default class TransactionService {
  async getApi (): Promise<FlatSubsocialApi> {
    return await subsocialApiService.initSubsocialApi()
  }

  async getExtrinsic ({ pallet, method, params }: ExtrinsicProps) {
    console.log(pallet, method, params)
    const api = await (await this.getApi()).subsocial.substrate.api
    if (!api.tx[pallet]) {
      throw new Error(`Unable to find api.tx.${pallet}`)
    } else if (!api.tx[pallet][method]) {
      throw new Error(`Unable to find api.tx.${pallet}.${method}`)
    }

    return api.tx[pallet][method](...params)
  }
}
