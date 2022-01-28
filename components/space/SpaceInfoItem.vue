<template>
  <div class="space-info-wp">
    <Avatar :id="spaceItem.struct.id" :src="spaceItem.content.image" :size="avatarSize" />
    <div class="info-container">
      <div class="space-name-wp">
        <Title size="medium" :link="spaceItem.struct.handle ? '/@'+spaceItem.struct.handle : '/'+spaceItem.struct.id" :name="spaceItem.content.name" />
      </div>
      <div class="space-stats-wp">
        <span v-if="hidePostCount" class="post-count"><span class="count">{{ spaceItem.struct.postsCount | numeral('0,0a') }} </span>{{ spaceItem.struct.postsCount | pluralize('en', [$t('general.post'), $t('general.posts')]) }}</span>
        <span class="followers-count" @click="openModal"><span class="count">{{ spaceItem.struct.followersCount | numeral('0,0a') }}</span> {{ spaceItem.struct.followersCount | pluralize('en', [$t('general.follower'), $t('general.followers')]) }}</span>
      </div>
    </div>
    <ModalFollower :is-modal="isOpenModal" :space-id="spaceItem.struct.id" />
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
      font-style: normal;
      font-weight: 500;
      font-size: $font_huge;
      line-height: $main_line_height;
      letter-spacing: 0.15px;
      color: $color_font_normal;

      a {
        text-decoration: none;
      }
    }

    .space-stats-wp {
      font-size: $font_small;
      line-height: 20px;
      letter-spacing: 0.25px;
      color: $main_text_color;

      span{
        margin-right: $space_small;

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

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { SpaceListItemData } from '~/models/space/space-list-item.model'
import { routerParamsLength } from '~/utils/utils'

@Component
export default class SpaceInfoItem extends Vue {
  @Prop({
    type: Object,
    default: undefined
  }) spaceItem!: SpaceListItemData

  @Prop({
    type: Number,
    default: 40
  }) avatarSize!: Number

  hidePostCount: boolean = false
  isOpenModal: boolean = false

  created (): void {
    this.isMobile()
  }

  isMobile (): void {
    if (process.browser) {
      if (window.innerWidth <= 760 && routerParamsLength(this.$route.params)) {
        this.hidePostCount = false
      } else {
        this.hidePostCount = true
      }
    }
  }

  openModal (): void {
    this.isOpenModal = !this.isOpenModal
  }
}
</script>
