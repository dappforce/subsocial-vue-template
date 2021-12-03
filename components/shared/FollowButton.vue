<template>
  <v-btn depressed :class="{follow : isFollow, following: !isFollow}" class="follow-btn" @click="onClick">
    {{ isFollow ? 'Follow' : 'Following' }}
  </v-btn>
</template>

<style lang="scss">
  .follow {
    background-color: #EB2F96 !important;
  }
  .following {
    background-color: #fff !important;
  }
  .follow-btn {
    width: 99px;
    height: 36px;
    border: 1px solid #EB2F96;
    box-sizing: border-box;
    border-radius: 4px;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 1.25px;
    text-transform: capitalize;
    .v-btn__content {
      color: #EB2F96;
      font-size: $font-size-secondary-text;
    }
    &.follow {
      border: none;
      .v-btn__content {
        color: #fff;
      }
    }
  }
</style>

<script>
export default {
  name: 'FollowButton',

  props: {
    follow: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      isFollow: this.follow,
      backgroundColor: this.follow ? 'follow' : 'following'
    }
  },

  watch: {
    follow () {
      this.isFollow = this.follow
    }
  },

  methods: {
    onClick () {
      this.isFollow = !this.isFollow
      this.backgroundColor = this.follow ? 'follow' : 'following'
    }
  }
}
</script>
