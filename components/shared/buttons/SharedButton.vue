<template>
  <v-btn class="shared-button" @click="onClick">
    <v-icon class="vote-icon">
      mdi-repeat
    </v-icon>
    <span v-if="isShowLabel" class="share-label">{{ $t('buttons.share') }}</span>
    <span class="count-label">{{ count ? isShowLabel ? '(' + count + ')' : count : '' }}</span>
    <ModalSharedPost v-if="post" :is-modal="isOpen" :post-id="getPostId" :root-post-id="post.id" />
  </v-btn>
</template>

<style lang="scss">
.shared-button {
  display: flex;
  align-items: center;
  background-color: transparent !important;
  color: $icon_color_dark_gray !important;
  box-shadow: none;
  
  .share-label {
    margin-left: 6px;
    font-weight: 500;
    font-size: $font_normal;
    line-height: $main_line_height;
    letter-spacing: 0.1px;
  }

  .count-label {
    margin-left: 4px;
    font-weight: 500;
    font-size: $font_normal;
    line-height: $main_line_height;
    letter-spacing: 0.1px;
    text-transform: capitalize;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { PostListItemData } from '~/models/post/post-list-item.model'

@Component
export default class SharedButton extends Vue {
  @Prop({
    type: Boolean,
    default: false
  }) isShowLabel!: boolean

  @Prop({
    type: Number
  }) count!: number

  @Prop({
    type: Object,
    default: undefined
  }) post!: PostListItemData

  isOpen: boolean = false

  created (): void {
    if (this.post) {
      this.$nuxt.$on('isSharedPost-' + this.post.id, () => {
        this.isOpen = false
      })
    }
  }

  onClick (): void {
    if (this.$store.state.profiles.currentUser) {
      this.isOpen = true
    } else {
      this.$nuxt.$emit('isShowLoginModal', { isOpen: true, isLoginClicked: false })
    }
  }

  get getPostId (): string | undefined {
    if (this.post) {
      return this.post.isSharedPost ? this.post.sharedPostId : this.post.id
    }
  }
}
</script>
