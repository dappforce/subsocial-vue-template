<template>
  <v-btn class="vote-button" @click="onClick">
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
    font-size: $font-size-secondary-text;
    line-height: 24px;
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

<script>
export default {
  name: 'VoteButton',

  props: {
    type: {
      type: String,
      default: 'upvote'
    },
    active: {
      type: Boolean,
      default: false
    },
    isShowLabel: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: null
    }
  },

  data () {
    return {
      isActive: this.active,
      voteCount: this.count
    }
  },

  watch: {
    active (newVal, oldVal) {
      this.isActive = newVal
    }
  },

  created () {
    this.$nuxt.$on('upvote', (data) => {
      if (this.isActive === true && this.type === 'downvote') {
        this.isActive = data
        this.voteCount -= 1
      }
    })

    this.$nuxt.$on('downvote', (data) => {
      if (this.isActive === true && this.type === 'upvote') {
        this.isActive = data
        this.voteCount -= 1
      }
    })
  },

  methods: {
    onClick () {
      if (this.isActive) {
        this.voteCount -= 1
      } else {
        this.voteCount += 1
      }
      this.isActive = !this.isActive

      if (this.type === 'upvote') {
        this.$nuxt.$emit('upvote', false)
      } else if (this.type === 'downvote') {
        this.$nuxt.$emit('downvote', false)
      }
    }
  }
}
</script>
