import { AnyId } from '@subsocial/api/flat-subsocial/dto'
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import BN from 'bn.js'
import { SpaceId } from '@subsocial/types/substrate/interfaces'
import { AnySpaceId } from '@subsocial/types'
import SubsocialApiService from '~/services/subsocial-api.service'
import { TransformData, TransformDataArray } from '~/types/transform-dto'
import { Content } from '~/types/content'
import { transformEntityDataArray } from '~/utils/utils'

const subsocialApiService = new SubsocialApiService()

export default class SpaceService {
  async getApi (): Promise<FlatSubsocialApi> {
    return await subsocialApiService.initSubsocialApi()
  }

  async getSpaces (ids: AnyId[]): Promise<TransformDataArray> {
    const spaceData = await (await this.getApi()).findPublicSpaces(ids)
    return transformEntityDataArray(spaceData)
  }

  async getSpace (id: string): Promise<TransformData | undefined> {
    const spaceData = await (await this.getApi()).findSpace({ id: new BN(id) })
    if (spaceData && spaceData.struct.contentId) {
      const transformSpaceData: TransformData = {
        struct: spaceData!.struct,
        content: spaceData.content as Content
      }
      transformSpaceData.content.id = spaceData.struct.contentId

      return transformSpaceData
    }

    return undefined
  }

  async getSpaceIdByHandle (idOrHandle: string): Promise<BN | undefined> {
    const handle = idOrHandle.substring(1).toLowerCase()
    return await (await this.getApi()).subsocial.substrate.getSpaceIdByHandle(handle)
  }

  async getSpaceIdByAccount (idOrHandle: string): Promise<SpaceId[]> {
    return await (await this.getApi()).subsocial.substrate.spaceIdsByOwner(idOrHandle)
  }
}
