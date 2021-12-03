import { newFlatSubsocialApi, SubsocialApi } from '@subsocial/api'
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import { AnyId } from '@subsocial/api/flat-subsocial/dto'
import { environment } from '~/environments/environment'

type FetchSubstrateProps = {
  pallet: string;
  method: string;
  id: AnyId;
};

export default class SubsocialApiService {
  // @ts-ignore
  public api: FlatSubsocialApi

  async initSubsocialApi () {
    const { substrateNodeUrl, offchainUrl, ipfsNodeUrl } = environment
    this.api = await newFlatSubsocialApi({
      substrateNodeUrl,
      offchainUrl,
      ipfsNodeUrl,
      useServer: {
        httpRequestMethod: 'get'
      }
    })
    return this.api
  }

  async getSubstrateIdsById (props: FetchSubstrateProps) {
    const readyApi = await (await this.initSubsocialApi()).subsocial.substrate.api
    const { pallet, method, id } = props
    const ids = await readyApi.query[pallet][method](id)
    return (ids.toJSON() as Array<any>).map(id => id.toString())
  }
}
