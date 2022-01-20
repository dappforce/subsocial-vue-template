<template>
  <v-menu
    v-model="showMenu"
    bottom
    :offset-y="true"
  >
    <template #activator="{ on, attrs }">
      <v-icon
        v-bind="attrs"
        medium
        class="options-button"
        color="#000000DE"
        v-on="on"
        @click="openMenu"
      >
        mdi-dots-vertical
      </v-icon>
    </template>

    <v-list class="option-items">
      <v-list-item v-if="canEditComment && isComment" @click="editComment">
        <v-list-item-icon>
          <v-icon>mdi-pencil-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('buttons.editComment') }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item v-if="canEdit && !isComment && isSpaceViewAndDesktop" @click="editPostOrSpace">
        <v-list-item-icon>
          <v-icon>mdi-pencil-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('general.edit') }} {{ toggleType === 'post' ? $t('general.post') : $t('general.space') }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item v-if="(post || space) && canEdit">
        <v-list-item-icon>
          <v-icon>mdi-eye-off-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          <ToggleVisibilityButton :post="post" :space="space" :toggle-type="toggleType" />
        </v-list-item-title>
      </v-list-item>
      <v-list-item v-if="!noReactions" @click.stop="openReactions">
        <v-list-item-icon>
          <v-icon>mdi-thumbs-up-down-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ $t('buttons.viewReactions') }}
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-cube-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t('buttons.viewOnIPFS') }}</v-list-item-title>
      </v-list-item>
    </v-list>
    <ModalLikes v-if="isOpen && !noReactions" :key="postId" :is-modal="isOpenReaction" :post-id="postId" />
  </v-menu>
</template>

<style lang="scss">
.options-button {
  width: 24px;
  height: 24px;
  line-height: $main_line_height;
}
.option-items {
  padding: 0;

  .v-list-item {
    cursor: pointer;
    height: 36px;

    &__title {
      color: $color_icon_gray;
    }

    .v-list-item__icon {
      align-self: center;
      margin: 0 $space_normal 0 0 ;

      .v-icon {
        color: $color_icon_gray;
      }
    }

    &:hover {
      background-color: rgba(0,0,0,0.05);
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { PostListItemData } from '~/models/post/post-list-item.model'
import { SpaceListItemData } from '~/models/space/space-list-item.model'
import { isMobile } from '~/utils/utils'

@Component
export default class OptionButton extends Vue {
  @Prop({
    type: String
  }) postId!: string

  @Prop({
    type: Object,
    default: undefined
  }) post!: PostListItemData

  @Prop({
    type: Object,
    default: undefined
  }) space!: SpaceListItemData

  @Prop({
    type: String
  }) accountId!: string

  @Prop({
    type: Boolean,
    default: false
  }) noReactions!: boolean

  @Prop({
    type: Boolean,
    default: false
  }) canEdit!: boolean

  @Prop({
    type: Boolean,
    default: false
  }) isSpaceView!: boolean

  @Prop({
    type: Boolean,
    default: false
  }) canEditComment!: boolean

  @Prop({
    type: String
  }) toggleType!: string

  showMenu: boolean = false
  isOpenReaction: boolean = false
  isOpen: boolean = false

  @Watch('isOpen')
  isOpenHandler (newVal: boolean) {
    this.isOpen = newVal
  }

  created (): void {
    this.$nuxt.$on('isModalClose-' + this.postId, () => {
      this.isOpen = false
    })
  }

  beforeDestroy (): void {
    this.isOpenReaction = false
  }

  openReactions (): void {
    this.isOpenReaction = !this.isOpenReaction
    this.showMenu = false
  }

  openMenu (): void {
    this.isOpen = true
  }

  editComment (): void {
    this.$emit('onEditComment', true)
  }

  editPostOrSpace (): void {
    this.toggleType === 'post'
      ? this.$router.push(this.$nuxt.localePath('/post/?post=' + this.post.id))
      : this.$router.push(this.$nuxt.localePath('/space/?space=' + this.space.struct.id))
  }

  get isComment (): boolean {
    return this.post ? this.post.isComment : false
  }

  get isSpaceViewAndDesktop (): boolean {
    return this.isSpaceView ? this.isSpaceView && isMobile() : true
  }
}
</script>
