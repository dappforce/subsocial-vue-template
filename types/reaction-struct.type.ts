import { EntityId } from '@subsocial/api/flat-subsocial/dto'

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
