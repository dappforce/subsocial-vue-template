<template>
  <v-btn
    depressed
    class="vote-button"
    @click="onClick"
  >
    <template v-if="type.toLowerCase() === 'upvote'">
      <v-icon class="vote-icon" :class="[isActive ? 'like' : '']">
        {{ isActive ? 'mdi-thumb-up' : 'mdi-thumb-up-outline' }}
      </v-icon>
    </template>
    <template v-if="type.toLowerCase() === 'downvote'">
      <v-icon class="vote-icon" :class="[isActive ? 'dislike' : '']">
        {{ isActive ? 'mdi-thumb-down' : 'mdi-thumb-down-outline' }}
      </v-icon>
    </template>
    <span v-if="isShowLabel" class="vote-label" :class="[isActive && type.toLowerCase() === 'downvote' ? 'dislike' : isActive ? 'like' : '']">{{ type }} <span v-if="voteCount > 0" :class="[isActive && type.toLowerCase() === 'downvote' ? 'dislike' : isActive ? 'like' : '']">({{ voteCount }})</span></span>
    <span v-if="!isShowLabel && voteCount > 0" class="vote-label" :class="[isActive && type.toLowerCase() === 'downvote' ? 'dislike' : isActive && type.toLowerCase() === 'upvote' ? 'like' : '']">{{ voteCount }}</span>
  </v-btn>
</template>

<style lang="scss">
.vote-button {
  display: flex;
  align-items: center;
  background-color: transparent !important;
  color: $icon_color_dark_gray !important;
  box-shadow: none;

  .vote-label {
    margin-left: 9px;
    font-weight: 500;
    font-size: $font_normal;
    line-height: $main_line_height;
    letter-spacing: 0.1px;
    text-transform: capitalize;
  }
}

.like {
  color: $icon_color_like !important;
}

.dislike {
  color: $icon_color_dislike !important;
}
</style>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import { SubmittableResult } from '@polkadot/api'
import { ReactionKind } from '@subsocial/types/substrate/classes'
import TransactionButton from '~/components/abstract/TransactionButton.vue'
import { ReactionStruct } from '~/types/reaction-struct.type'
import { getNewIdsFromEvent } from '~/utils/utils'
import { METHODS, PALLETS } from '~/constants/query'

export enum ReactionEnum {
  Upvote = 'Upvote',
  Downvote = 'Downvote'
}
declare type ReactionKindType = 'Upvote' | 'Downvote';

@Component
export default class VoteButton extends TransactionButton {
  @Prop({
    type: String,
    default: 'upvote'
  }) type!: string

  @Prop({
    type: Boolean,
    default: false
  }) active!: boolean

  @Prop({
    type: Boolean,
    default: false
  }) isShowLabel!: boolean

  @Prop({
    type: Number,
    default: 0
  }) count!: number

  @Prop({
    type: String,
    default: null
  }) postId!: string

  @Prop({
    type: String,
    default: null
  }) reactionId!: string

  @Prop({
    type: Object
  }) reaction!: ReactionStruct

  isActive: boolean = this.active
  voteCount: number = this.count
  oldKind: string | undefined
  newKind: ReactionKindType | undefined
  id: string | null = null
  eventType: string | null = null

  @Watch('active')
  activeHandler (newVal: boolean) {
    this.isActive = newVal
  }

  @Watch('reaction')
  reactionHandler (newVal: any, oldVal: any) {
    if (newVal !== oldVal) {
      if (this.reaction && !this.reactionId) {
        this.id = this.reaction.id
      }
      this.id = this.reactionId
      this.getOldKind()
    }
  }

  @Watch('reactionId')
  reactionIdHandler (newVal: any, oldVal: any) {
    if (newVal !== oldVal) {
      this.id = this.reactionId
    }
  }

  onFailed (result: SubmittableResult | null): void {
  }

  onSuccess (result: SubmittableResult): void {
    if (this.isActive) {
      this.voteCount--
    } else {
      this.voteCount++
    }

    this.eventUpdates()

    this.isActive = !this.isActive
    this.oldKind = this.newKind
    this.id = this.id || getNewIdsFromEvent(result)[1]?.toString()
    this.updatePost()

    if (this.type.toLowerCase() === 'upvote') {
      this.$nuxt.$emit('upvote', { active: false, id: this.id })
    } else if (this.type.toLowerCase() === 'downvote') {
      this.$nuxt.$emit('downvote', { active: false, id: this.id })
    }
  }

  eventUpdates () {
    if (this.eventType === 'delete') {
      this.id = null
      this.newKind = undefined
    }
    this.eventType = null
  }

  validate (): boolean {
    return true
  }

  created () {
    this.getOldKind()
    this.id = this.reactionId

    this.$nuxt.$on('upvote', (data: {active: boolean, id: string}) => {
      if (this.isActive === true && this.type.toLowerCase() === 'downvote') {
        this.oldKind = ReactionEnum.Upvote
        this.id = data.id
        this.isActive = data.active
        this.voteCount--
      }
    })

    this.$nuxt.$on('downvote', (data: {active: boolean, id: string}) => {
      if (this.isActive === true && this.type.toLowerCase() === 'upvote') {
        this.oldKind = ReactionEnum.Downvote
        this.id = data.id
        this.isActive = data.active
        this.voteCount--
      }
    })
  }

  async onClick () {
    this.getNewKind()

    const params = this.buildTxParams()
    const pallet = PALLETS.reactions
    let method = ''

    if (!this.id) {
      method = METHODS.createPostReaction
    } else {
      method = this.isActive
        ? METHODS.deletePostReaction
        : METHODS.updatePostReaction
    }

    await this.initExtrinsic({
      pallet,
      method,
      params
    })

    await this.sentTransaction()
  }

  buildTxParams (): any[] {
    if (!this.id) {
      return [this.postId, ReactionKind(this.newKind as ReactionKindType)]
    } else if (this.oldKind !== this.newKind) {
      return [this.postId, this.id, ReactionKind(this.newKind as ReactionKindType)]
    } else {
      this.eventType = 'delete'
      return [this.postId, this.id]
    }
  }

  getOldKind () {
    this.oldKind = this.reaction?.isUpvote
      ? ReactionEnum.Upvote
      : this.reaction?.isDownvote
        ? ReactionEnum.Downvote
        : undefined
  }

  getNewKind () {
    this.newKind = this.type.toLowerCase() === 'upvote' ? ReactionEnum.Upvote : ReactionEnum.Downvote
  }

  updatePost () {
    const payload = {
      type: this.type,
      isActive: this.isActive,
      postId: this.postId,
      isNew: false
    }

    if (!this.id) {
      payload.isNew = true
    }

    this.$store.dispatch('posts/updatePostReaction', payload)
  }
}
</script>
