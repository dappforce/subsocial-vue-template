import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import { ProfileStruct } from '@subsocial/api/flat-subsocial/flatteners'
import { AnyAccountId } from '@subsocial/types'
import { ProfileData } from '@subsocial/api/flat-subsocial/dto'
import SubsocialApiService from '~/services/subsocial-api.service'

const subsocialApiService = new SubsocialApiService()

export default class ProfileService {
  async getApi (): Promise<FlatSubsocialApi> {
    return await subsocialApiService.initSubsocialApi()
  }

  async getProfile (id: string) {
    const profileData = await (await this.getApi()).findProfile(id)
    if (profileData?.content) {
      const struct = profileData?.struct as unknown as ProfileStruct
      if (struct) {
        const content = { ...profileData.content, id: struct.contentId }
        return { struct, content }
      }
    }

    return profileData
  }

  async getProfiles (ids: AnyAccountId[]): Promise<ProfileData[]> {
    return await (await this.getApi()).findProfiles(ids)
  }
}
