<template>
  <div class="notification-container">
    <Avatar :id="notification.account" :src="notification.avatarSrc" :size="46" :name="notification.userName" />
    <div class="notification-info">
      <div class="notification-text">
        <span class="name">{{ notification.userName ? notification.userName : notification.account }}</span>
        <span>{{ getMessage }}</span>
        <span class="name">{{ getName }}</span>
      </div>
      <span class="date">{{ toDate }}</span>
    </div>
    <PostImage v-if="notification.imageUrl && notification.imageUrl.length" :image-src="notification.imageUrl" :link="'/'" />
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
        color: $color_font_normal;
      }
    }

    .date {
      font-size: $font_small;
      line-height: 20px;
      letter-spacing: 0.25px;
      color: $main_text_color;
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
import { NotificationEntity } from '~/models/enum/notification-entity.enum'
import { OwnerNotificationEntity } from '~/models/enum/owner-notification-entity.enum'
@Component
export default class NotificationItem extends Vue {
  @Prop({
    type: Object
  }) notification!: {}

  // toDate () {
  //   const days = 7
  //   return Math.round(this.$dayjs().diff(this.$dayjs(this.notification.date), 'day', true)) < days
  //     ? this.$dayjs(this.notification.date).fromNow()
  //     : this.$dayjs(this.notification.date).format('MMM D, YYYY HH:mm A')
  // }
  //
  // getMessage () {
  //   return this.notification.isOwnerPost
  //     ? OwnerNotificationEntity[this.notification.event]
  //     : this.notification.isOwnerSpace
  //       ? OwnerNotificationEntity[this.notification.event]
  //       : NotificationEntity[this.notification.event]
  // }
  //
  // getName () {
  //   return this.notification.isOwnerPost ? this.notification.postName : this.notification.isOwnerSpace ? this.notification.spaceName : ''
  // }
}
</script>
