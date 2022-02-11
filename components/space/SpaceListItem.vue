<template>
  <div v-if="space" class="space-item-wp">
    <v-card
      elevation="2"
      class="space-item"
    >
      <div v-if="space.struct.hidden && isMyOwnSpace" class="hidden-container">
        <div class="alert-text">
          <v-icon>
            mdi-alert-circle
          </v-icon>
          {{ $t('generalMessages.hiddenMessage', {type: $t('general.space')}) }}
        </div>
        <div class="unhidden-btn">
          <span class="make-visible">
            <ToggleVisibilityButton :space="space" :toggle-type="'space'" />
          </span>
        </div>
      </div>
      <div class="space-item-header">
        <SpaceInfoItem
          :space-item="space"
          :avatar-size="avatarSize"
        />
        <div class="button-wp">
          <FollowButton v-if="!isSpaceView" :follow="isFollowing" class="follow-btn" type="space" :entity-id="spaceItemData.struct.id" />
          <OptionButton
            :no-reactions="true"
            :space="spaceItemData"
            :can-edit="isMyOwnSpace"
            :toggle-type="'space'"
            :is-space-view="isSpaceView"
            :follow="isFollowing"
          />
        </div>
      </div>
      <div v-if="space.content.summary.length" class="description">
        <Paragraph
          :text="space.content.summary"
          :long-text="space.content.about"
          :link="link(space)"
          :is-show-more="space.content.isShowMore"
          :redirect="isSpaceView ? false : true"
          margin-top="10"
        />
      </div>
      <LinkIcons v-if="isSpaceView && space.content.links && space.content.links.length" :links="space.content.links" class="links-container" />
      <div v-if="space.content.tags.length" class="tags-container">
        <Tag v-for="tag in space.content.tags" :key="tag" :tag-name="tag" size="medium" />
      </div>
      <div v-if="isSpaceView" class="action-row">
        <EditSpaceButton v-if="isMyOwnSpace" :space-id="space.struct.id" />
        <SendTipsButton v-if="!isMyOwnSpace" :user-id="space.struct.ownerId" />
        <WritePostButton v-if="isMyOwnSpace" :space-id="space.struct.id" />
        <FollowButton v-if="!isMyOwnSpace" :follow="isFollowing" type="space" :entity-id="space.struct.id" />
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
      color: $text_color_normal;
    }

    .tags-container {
      .tag {
        margin-top: $space_normal;
      }
    }

    .links-container {
      margin-top: $space_normal;
    }

    .action-row {
      display: flex;
      justify-content: space-between;
      margin-top: 22px;

      & button, & a, & .btn-tooltip-wrapper {
        width: calc(50% - 8px);
      }

      & .write-post-btn {
        width: 100%;
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { SpaceListItemData } from '~/models/space/space-list-item.model'
import { ProfileItemModel } from '~/models/profile/profile-item.model'
import { isMobile } from '~/utils/utils'

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

  @Prop({
    type: Boolean,
    default: false
  }) isSpaceView!: boolean

  isFollowing: boolean = false
  user: ProfileItemModel | null = null
  space: SpaceListItemData = this.spaceItemData

  @Watch('currentUser')
  currentUserHandler () {
    this.getIsFollowing()
  }

  created (): void {
    if (this.currentUser) {
      this.user = this.currentUser
      this.getIsFollowing()
    }

    this.$store.subscribe((mutation) => {
      if (mutation.type === 'profiles/SET_CURRENT_USER') {
        this.setCurrentUser()
        this.getIsFollowing()
      }
    })

    this.$store.subscribeAction({
      after: (action) => {
        if (action.type === 'space/updateHiddenState' && action.payload.id === this.space.struct.id) {
          this.space = this.$store.getters['space/getSpaceWithContent'](this.space.struct.id)
        }
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
