import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import { CommonContent } from '@subsocial/types'
import axios from 'axios'
import SubsocialApiService from '~/services/subsocial-api.service'
import { environment } from '~/environments/environment'
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
    const { addFileUrl } = environment
    const formData = new FormData()
    formData.append('file', file)
    return await axios.post(addFileUrl, formData)
  }
}
