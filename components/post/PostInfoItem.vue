<template>
  <div class="post-info-wp">
    <Avatar :id="profileLink" :src="avatarSrc" :size="avatarSize" :name="userName" />
    <div class="info-container">
      <Title :link="'/accounts/'+ profileLink" :name="userName" />
      <div class="post-additional-info">
        <span class="owner-name"><NuxtLink :to="handle ? '/@'+handle : '/'+spaceId">{{ spaceName }}</NuxtLink></span>
        <span>·</span>
        <span v-if="postLink"><NuxtLink :to="postLink">{{ toDate }}</NuxtLink></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.post-info-wp {
  display: flex;

  .info-container {
    margin-left: 15px;

    .title {
      max-width: 360px;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .post-additional-info {
    font-size: $font-size-secondary-text;
    line-height: 20px;
    letter-spacing: 0.25px;
    color: rgba(0, 0, 0, 0.6);

    a {
      color: rgba(0, 0, 0, 0.6);
      text-decoration: none;
    }

    span {
      margin-right: 4px;
    }
  }
}
</style>

<script>
export default {
  name: 'PostInfoItem',

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
    createdAtTime: {
      type: [String, Number],
      default: new Date()
    },
    profileLink: {
      type: String,
      default: '/'
    },
    postLink: {
      type: String
    },
    spaceId: {
      type: String
    }
  },

  computed: {
    toDate () {
      const diff = this.$dayjs().diff(this.$dayjs(+this.createdAtTime), 'days')

      if (diff < 7) {
        return this.$dayjs(+this.createdAtTime).fromNow().toLowerCase()
      } else if (diff > 7 && diff < 365) {
        return this.$dayjs(+this.createdAtTime).format('D MMM')
      } else {
        return this.$dayjs(+this.createdAtTime).format('D MMM YY')
      }
    }
  }
}
</script>
