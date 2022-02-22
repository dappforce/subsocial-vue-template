<template>
  <div v-if="notification.profile" class="notification-container">
    <Avatar :id="notification.profile.id" :src="notification.profile.avatar" :size="46" />
    <div class="notification-info">
      <div class="notification-text">
        <span class="name">
          <Title :id="notification.profile.id" :link="'/accounts/'+ notification.profile.id" :name="notification.profile.name" size="medium" />
        </span>
        <span>{{ notification.activity.agg_count ? $t('notifications.aggregate', {count: notification.activity.agg_count, message: $tc('plural.'+i18nextKey(notification.activity.agg_count, 'aggregate'))}) : '' }}{{ getMessage }}</span>
        <span class="name">
          <Title :id="notification.followingAccount ? notification.followingAccount.id : ''" :link="getUrl" :name="getName" size="medium" />
        </span>
      </div>
      <span class="date"><NuxtLink :to="getUrl">{{ toDate }}</NuxtLink></span>
    </div>
    <PostImage v-if="notification.post && notification.post.image && notification.post.image.length" :image-src="notification.post.image" :link="'/'" />
  </div>
</template>

<style lang="scss">
.notification-container {
  display: flex;
  padding: $space_normal;
  border-bottom: 1px solid rgba(33, 33, 33, 0.08);

  .notification-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 8px;

    .notification-text {
      .name {
        font-weight: 500;
        font-size: $font_normal;
        line-height: $main_line_height;
        letter-spacing: 0.25px;
        color: $text_color_normal;
        
        &:hover a{
          color: $text_color_primary;
        }
      }
    }

    .date a {
      font-size: $font_small;
      line-height: 20px;
      letter-spacing: 0.25px;
      color: $text_color_dark_gray;
      text-decoration: none;
      
      &:hover {
        color: $text_color_primary;
      }
    }
  }

  .post-image {
    width: 46px;
    height: 46px;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { NotificationItemData } from '~/store/notifications'
import { getPostLink, toDate, toI18next } from '~/utils/utils'

@Component
export default class NotificationItem extends Vue {
  @Prop({
    type: Object
  }) notification!: NotificationItemData

  get toDate () {
    return toDate(this.notification.activity.date)
  }

  get getMessage () {
    return this.$t('notifications.' + this.notification.activity.event)
  }

  get getName () {
    return this.notification.post
      ? (this.notification.post?.title || this.notification.post?.summary || 'link')
      : this.notification.space
        ? this.notification.space.name
        : this.notification.followingAccount
          ? (this.notification.followingAccount.name || this.notification.followingAccount.id)
          : ''
  }

  get getUrl () {
    return this.notification.post
      ? getPostLink((this.notification.post?.spaceId || this.notification.post.id),
        this.notification.post?.title || this.notification.post?.summary?.slice(0, 50) || 'link',
        this.notification.post?.id, false)
      : this.notification.space
        ? '/' + this.notification.space.id
        : this.notification.followingAccount ? '/accounts/' + this.notification.activity.following_id : ''
  }

  i18nextKey (count: number, key: string): string {
    return toI18next(count, key, this.$i18n.locale)
  }
}
</script>
