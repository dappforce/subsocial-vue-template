<template>
  <div class="space-info-wp">
    <Avatar :id="id" :src="avatarSrc" :size="avatarSize" :name="userName" />
    <div class="info-container">
      <div class="space-name-wp">
        <Title size="medium" :link="handle ? '/@'+handle : '/'+id" :name="spaceName" />
      </div>
      <div class="space-stats-wp">
        <span v-if="hidePostCount" class="post-count"><span class="count">{{ postsCount | numeral('0,0a') }} </span>{{ postsCount | pluralize('en', ['post', 'posts']) }}</span>
        <span class="followers-count" @click="openModal"><span class="count">{{ followersCount | numeral('0,0a') }}</span> {{ followersCount | pluralize('en', ['follower', 'followers']) }}</span>
      </div>
    </div>
    <ModalFollower :is-modal="isOpenModal" :space-id="id" />
  </div>
</template>

<style lang="scss">
.space-info-wp {
  display: flex;
  .info-container {
    margin-left: 13px;

    .space-name-wp {
      display: flex;
      align-items: center;
      font-family: Roboto;
      font-style: normal;
      font-weight: 500;
      font-size: $font-size-title-details;
      line-height: 24px;
      align-items: center;
      letter-spacing: 0.15px;
      color: rgba(0, 0, 0, 0.87);

      a {
        text-decoration: none;
      }
    }

    .space-stats-wp {
      font-size: $font-size-secondary-text;
      line-height: 20px;
      letter-spacing: 0.25px;
      color: rgba(0, 0, 0, 0.6);

      span{
        margin-right: 12px;

        &.count {
          margin-right: 0;
        }

        &.followers-count {
          cursor: pointer;
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: 'SpaceInfoItem',

  props: {
    spaceName: {
      type: String,
      default: ''
    },
    postsCount: {
      type: Number,
      default: 0
    },
    followersCount: {
      type: Number,
      default: 0
    },
    avatarSrc: {
      type: String
    },
    avatarSize: {
      type: Number,
      default: 40
    },
    userName: {
      type: String
    },
    handle: {
      type: String
    },
    id: {
      type: String
    }
  },

  data () {
    return {
      hidePostCount: false,
      isOpenModal: false
    }
  },

  created () {
    this.isMobile()
  },

  methods: {
    isMobile () {
      if (process.browser) {
        if (window.innerWidth <= 760 && Object.keys(this.$route.params).length) {
          this.hidePostCount = false
        } else {
          this.hidePostCount = true
        }
      }
    },
    openModal () {
      this.isOpenModal = !this.isOpenModal
    }
  }
}
</script>
