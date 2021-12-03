import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import { AnyAccountId, AnyPostId, AnyReactionId } from '@subsocial/types'
import { Reaction, ReactionId } from '@subsocial/types/substrate/interfaces'
import SubsocialApiService from '~/services/subsocial-api.service'
import { METHODS, PALLETS } from '~/services/follow.service'
import { flatMyReaction, FlatReaction, flatReaction } from '~/utils/flatten.map'
import { bnToId, idToBn } from '~/utils/utils'
const subsocialApiService = new SubsocialApiService()

export default class ReactionService {
  async getApi (): Promise<FlatSubsocialApi> {
    return await subsocialApiService.initSubsocialApi()
  }

  async getPostReactionIdsByAccount (id: string) {
    return await subsocialApiService.getSubstrateIdsById({
      pallet: PALLETS.reactions,
      method: METHODS.reactionIdsByPostId,
      id
    })
  }

  async findReactions (ids: AnyReactionId[]): Promise<FlatReaction[]> {
    const reactions = await subsocialApiService.api?.subsocial.substrate.findReactions(ids)
    return reactions.map(reaction => flatReaction(reaction))
  }

  async findReaction (id: AnyReactionId) {
    const reaction = await subsocialApiService.api?.subsocial.substrate.findReaction(id)
    return flatMyReaction(reaction)
  }

  async getPostReactionIdByAccount (accountId: AnyAccountId, postId: AnyPostId) {
    const readyApi = await (await this.getApi()).subsocial.substrate.api
    const id = await readyApi.query.reactions.postReactionIdByAccount([accountId, postId]) as ReactionId
    return id
  }
}
