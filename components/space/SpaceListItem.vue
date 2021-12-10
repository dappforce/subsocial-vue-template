<template>
  <div v-if="spaceItemData" class="space-item-wp">
    <v-card
      elevation="2"
      class="space-item"
    >
      <div class="space-item-header">
        <SpaceInfoItem
          :space-item="spaceItemData"
          :avatar-size="avatarSize"
        />
        <div class="button-wp">
          <EditButton v-if="isMyOwnSpace && isSpaceView" :link="'space-edit/?space=' + spaceItemData.struct.id" />
          <FollowButton v-if="!isSpaceView" :follow="isFollowing" class="follow-btn" type="space" :entity-id="spaceItemData.struct.id" />
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
        <FollowButton :follow="isFollowing" type="space" :entity-id="spaceItemData.struct.id" />
      </div>
    </v-card>
  </div>
</template>

<style lang="scss">
.space-item-wp {
  width: 100%;
  margin-top: $space_normal;

  .space-item {
    padding: $space_normal;
  }

  .space-item-header {
    display: flex;
    justify-content: space-between;

    .button-wp {
      display: flex;
      align-items: center;
      height: $buttons_height;

      .follow-btn {
        margin-right: 10px;
      }
    }
  }

  .description {
    margin: 13px 0 0;
    font-size: $font_normal;
    line-height: $main_line_height;
    letter-spacing: 0.25px;
    color: $color_font_normal;
  }

  .tags-container {
    margin-top: 10px;

    .tag {
      margin-top: 10px;
    }
  }

  .links-container {
    margin-top: $space_normal;
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

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { SpaceListItemData } from '~/models/space/space-list-item.model'
import { ProfileItemModel } from '~/models/profile/profile-item.model'

@Component
export default class SpaceListItem extends Vue {
  @Prop({
    type: Object,
    default: undefined
  }) spaceItemData!: SpaceListItemData

  @Prop({
    type: Boolean
  }) isMyOwnSpace!: boolean

  @Prop({
    type: Number,
    default: 40
  }) avatarSize!: number

  @Prop({
    type: Object
  }) currentUser!: ProfileItemModel

  isSpaceView: boolean = false
  isFollowing: boolean = false
  user: ProfileItemModel | null = null

  @Watch('currentUser')
  currentUserHandler () {
    this.getIsFollowing()
  }

  mounted (): void {
    if (this.$route.fullPath.includes('@') && this.$route.name !== 'space-post') {
      this.isSpaceView = true
    }
  }

  created (): void {
    if (this.currentUser) {
      this.user = this.currentUser
      this.getIsFollowing()
    }

    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'profiles/SET_CURRENT_USER') {
        this.setCurrentUser()
        this.getIsFollowing()
      }
    })
  }

  link (space: SpaceListItemData): string {
    return space.struct.handle ? '@' + space.struct.handle : space.struct.id
  }

  getIsFollowing () {
    if (this.user) {
      this.$store.dispatch('accountFollower/isSpaceFollower', { myAddress: this.user.id, followedAddress: this.spaceItemData.struct.id }).then((res) => {
        this.isFollowing = res
      })
    } else {
      this.isFollowing = false
    }
  }

  setCurrentUser (): void {
    if (this.$store.state.profiles.currentUser) {
      this.user = this.$store.getters['profiles/selectProfileData'](this.$store.state.profiles.currentUser.id)
      if (!this.currentUser) {
        this.user = this.$store.state.profiles.currentUser
      }
    } else {
      this.user = null
    }
  }
}
</script>
