import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import { CommonContent, IpfsCid } from '@subsocial/types'
import SubsocialApiService from '~/services/subsocial-api.service'
import { ExtrinsicProps } from '~/components/abstract/TransactionButton.vue'

const subsocialApiService = new SubsocialApiService()

export default class TransactionService {
  async getApi (): Promise<FlatSubsocialApi> {
    return await subsocialApiService.initSubsocialApi()
  }

  async getExtrinsic ({ pallet, method, params }: ExtrinsicProps) {
    const api = await (await this.getApi()).subsocial.substrate.api
    if (!api.tx[pallet]) {
      throw new Error(`Unable to find api.tx.${pallet}`)
    } else if (!api.tx[pallet][method]) {
      throw new Error(`Unable to find api.tx.${pallet}.${method}`)
    }

    return api.tx[pallet][method](...params)
  }

  async saveIpfsContent (content: CommonContent) {
    try {
      const cid = await (await this.getApi()).subsocial.ipfs.saveContent(content)
      if (cid) {
        return cid
      } else {
        console.error('Save to IPFS returned an undefined CID')
      }
    } catch (err) {
      console.error(`Failed to build tx params. ${err}`)
    }
    return undefined
  }

  async saveFile (file: File) {
    const cid = await (await this.getApi()).subsocial.ipfs.saveFile(file)
    return cid
  }

  async removeIpfsContent (cid: IpfsCid) {
    await (await this.getApi()).subsocial.ipfs.removeContent(cid)
  }
}
