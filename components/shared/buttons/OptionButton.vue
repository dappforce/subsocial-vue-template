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
      <v-list-item v-if="!noReactions">
        <v-list-item-title @click.stop="openReactions">
          View reactions
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>View on IPFS</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="(post || space) && canEdit">
        <v-list-item-title>
          <ToggleVisibilityButton :post="post" :space="space" :toggle-type="toggleType" />
        </v-list-item-title>
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
  .v-list-item {
    cursor: pointer;

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
}
</script>
