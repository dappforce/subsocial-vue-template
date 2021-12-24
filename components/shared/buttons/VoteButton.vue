<template>
  <v-btn
    class="vote-button"
    @click="onClick"
  >
    <template v-if="type === 'upvote'">
      <v-icon medium class="vote-icon" :color="isActive ? '#3BB356' : ''">
        {{ isActive ? 'mdi-thumb-up' : 'mdi-thumb-up-outline' }}
      </v-icon>
    </template>
    <template v-if="type === 'downvote'">
      <v-icon medium class="vote-icon" :color="isActive ? '#EA3323' : ''">
        {{ isActive ? 'mdi-thumb-down' : 'mdi-thumb-down-outline' }}
      </v-icon>
    </template>
    <span v-if="isShowLabel" class="vote-label" :class="[isActive && type === 'downvote' ? 'dislike' : isActive ? 'like' : '']">{{ type }} <span v-if="voteCount > 0" :class="[type === 'downvote' ? 'dislike' : 'like']">({{ voteCount }})</span></span>
    <span v-if="!isShowLabel && voteCount > 0" class="vote-label" :class="[isActive && type === 'downvote' ? 'dislike' : isActive && type === 'upvote' ? 'like' : '']">{{ voteCount }}</span>
  </v-btn>
</template>

<style lang="scss">
.vote-button {
  display: flex;
  align-items: center;

  .vote-label {
    margin-left: 9px;
    font-weight: 500;
    font-size: $font_small;
    line-height: $main_line_height;
    letter-spacing: 0.1px;
    text-transform: capitalize;
  }
}

.like {
  color: #3BB356;
}

.dislike {
  color: #EA3323;
}
</style>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import { SubmittableResult } from '@polkadot/api'
import { ReactionKind } from '@subsocial/types/substrate/classes'
import { ReactionType } from '@subsocial/api/flat-subsocial/dto'
import TransactionButton from '~/components/abstract/TransactionButton.vue'
import { ReactionStruct } from '~/types/reaction-struct.type'
import { getNewIdsFromEvent } from '~/utils/utils'
import { METHODS, PALLETS } from '~/constants/query'

export enum ReactionEnum {
  Upvote = 'Upvote',
  Downvote = 'Downvote'
}

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
  newKind: string | undefined

  @Watch('active')
  activeHandler (newVal: boolean) {
    this.isActive = newVal
  }

  @Watch('reaction')
  reactionHandler (newVal: any, oldVal: any) {
    if (newVal !== oldVal) {
      if (this.reaction && !this.reactionId) {
        this.reactionId = this.reaction.id
        this.getOldKind()
      }
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

    this.isActive = !this.isActive
    this.oldKind = this.newKind
    this.reactionId = this.reactionId || getNewIdsFromEvent(result)[1]?.toString()

    this.updatePost()

    if (this.type === 'upvote') {
      this.$nuxt.$emit('upvote', false)
    } else if (this.type === 'downvote') {
      this.$nuxt.$emit('downvote', false)
    }
  }

  validate (): boolean {
    return true
  }

  created () {
    this.getOldKind()
    if (this.reaction) {
      this.getOldKind()
    }

    this.$nuxt.$on('upvote', (data: boolean) => {
      if (this.isActive === true && this.type === 'downvote') {
        this.isActive = data
        this.voteCount--
      }
    })

    this.$nuxt.$on('downvote', (data: boolean) => {
      if (this.isActive === true && this.type === 'upvote') {
        this.isActive = data
        this.voteCount--
      }
    })
  }

  async onClick () {
    this.getNewKind()
    const params = this.buildTxParams()
    const pallet = PALLETS.reactions
    let method = ''

    if (!this.reaction?.id) {
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
    if (!this.reactionId) {
      return [this.postId, new ReactionKind(this.newKind)]
    } else if (this.oldKind !== this.newKind) {
      return [this.postId, this.reactionId, new ReactionKind(this.newKind)]
    } else {
      return [this.postId, this.reactionId]
    }
  }

  getOldKind () {
    this.oldKind = this.reaction.isUpvote
      ? ReactionEnum.Upvote
      : this.reaction.isDownvote
        ? ReactionEnum.Downvote
        : undefined
  }

  getNewKind () {
    this.newKind = this.type === 'upvote' ? ReactionEnum.Upvote : ReactionEnum.Downvote
  }

  updatePost () {
    const payload = {
      type: this.type,
      isActive: this.isActive,
      postId: this.postId,
      isNew: false
    }

    if (!this.reactionId) {
      payload.isNew = true
    }

    this.$store.dispatch('posts/updatePostReaction', payload)
  }
}
</script>
