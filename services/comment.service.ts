import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import SubsocialApiService from '~/services/subsocial-api.service'
import { ReplyIdStruct } from '~/types/reply-id.type'
import { bnsToIds, idToBn } from '~/utils/utils'

const subsocialApiService = new SubsocialApiService()

export default class CommentService {
  async getApi (): Promise<FlatSubsocialApi> {
    return await subsocialApiService.initSubsocialApi()
  }

  async getPostReplyId (postId: string): Promise<ReplyIdStruct> {
    const ids = await (await this.getApi()).subsocial.substrate.getReplyIdsByPostId(
      idToBn(postId)
    )

    return { id: postId, replyIds: bnsToIds(ids) }
  }
}
