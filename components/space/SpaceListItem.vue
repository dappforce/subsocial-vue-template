<template>
  <div v-if="spaceItemData" class="space-item-wp">
    <v-card
      elevation="2"
      class="space-item"
    >
      <div class="space-item-header">
        <SpaceInfoItem
          :id="spaceItemData.struct.id"
          :avatar-size="avatarSize"
          :avatar-src="spaceItemData.content.image"
          :posts-count="spaceItemData.struct.postsCount"
          :followers-count="spaceItemData.struct.followersCount"
          :space-name="spaceItemData.content.name"
          :user-name="spaceItemData.userName"
          :handle="spaceItemData.struct.handle"
        />
        <div class="button-wp">
          <EditButton v-if="isMyOwnSpace && isSpaceView" :link="'space-edit/?space=' + spaceItemData.struct.id" />
          <FollowButton v-if="!isSpaceView" :follow="isFollowing" class="follow-btn" />
          <OptionButton :no-reactions="true" />
        </div>
      </div>
      <div v-if="spaceItemData.content.summary.length" class="description">
        <Paragraph
          :text="spaceItemData.content.summary"
          :long-text="spaceItemData.content.about"
          :link="link(spaceItemData)"
          :is-show-more="spaceItemData.content.isShowMore"
          :redirect="isSpaceView ? false : true"
          margin-top="10"
        />
      </div>
      <LinkIcons v-if="isSpaceView" :links="spaceItemData.content.links" class="links-container" />
      <div v-if="spaceItemData.content.tags.length" class="tags-container">
        <Tag v-for="tag in spaceItemData.content.tags" :key="tag" :tag-name="tag" size="medium" />
      </div>
      <div v-if="isSpaceView" class="action-row">
        <SendTipsButton v-if="!isMyOwnSpace" />
        <WritePostButton v-if="isMyOwnSpace" />
        <FollowButton :follow="isFollowing" />
      </div>
    </v-card>
  </div>
</template>

<style lang="scss">
.space-item-wp {
  width: 100%;
  margin-top: 16px;

  .space-item {
    padding: 16px;
  }

  .space-item-header {
    display: flex;
    justify-content: space-between;

    .button-wp {
      display: flex;
      align-items: center;
      height: 36px;

      .follow-btn {
        margin-right: 10px;
      }
    }
  }

  .description {
    margin: 13px 0 0;
    font-size: $font-size-normal;
    line-height: 24px;
    letter-spacing: 0.25px;
    color: rgba(0, 0, 0, 0.87);
  }

  .tags-container {
    margin-top: 10px;

    .tag {
      margin-top: 10px;
    }
  }

  .links-container {
    margin-top: 16px;
  }

  .action-row {
    display: flex;
    justify-content: space-between;
    margin-top: 22px;

    & button {
      width: calc(50% - 8px);
    }
  }
}
</style>

<script>
export default {
  name: 'SpaceListItem',

  props: {
    spaceItemData: {
      type: Object,
      default: undefined
    },
    avatarSize: {
      type: Number,
      default: 40
    },
    isMyOwnSpace: {
      type: Boolean
    },
    currentUser: {
      type: Object
    }
  },

  data () {
    return {
      isSpaceView: false,
      isFollowing: false
    }
  },

  mounted () {
    if (this.$route.fullPath.includes('@') && this.$route.name !== 'space-post') {
      this.isSpaceView = true
    }
  },

  created () {
    if (this.currentUser) {
      this.$store.dispatch('accountFollower/isSpaceFollower', { myAddress: this.currentUser.id, followedAddress: this.spaceItemData.struct.id }).then((res) => {
        this.isFollowing = res
      })
    }
  },

  methods: {
    link (space) {
      return space.struct.handle ? '@' + space.struct.handle : space.struct.id
    }
  }
}
</script>
