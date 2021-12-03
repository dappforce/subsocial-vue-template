import { Reaction } from '@subsocial/types/substrate/interfaces'

export type FlatReaction = {
  id: string,
  profileId: string,
  isUpvote: false
};

export const flatReaction = (reaction: Reaction) => {
  return {
    id: reaction.id.toString(),
    profileId: reaction.created.account.toString(),
    isUpvote: reaction.kind.isUpvote
  } as FlatReaction
}

export const flatMyReaction = (reaction: Reaction | undefined) => {
  if (reaction) {
    return {
      id: reaction.id.toString(),
      profileId: reaction.created.account.toString(),
      isUpvote: reaction.kind.isUpvote,
      isDownvote: reaction.kind.isDownvote
    } as FlatReaction
  }
  return undefined
}
