import { EntityId } from '@subsocial/types/dto'

type AccountAndPostId = string
export type ReactionId = EntityId
export type ReactionType = 'Upvote' | 'Downvote'

export type Reaction = {
  reactionId?: ReactionId
  isUpvote?: boolean
  isDownvote?: boolean
}

export type ReactionStruct = Reaction & {
  id: AccountAndPostId
}
