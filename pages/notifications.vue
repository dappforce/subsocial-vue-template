<template>
  <v-card class="notification">
    <div class="header">
      Notifications
    </div>
    <NotificationItem
      v-for="(item, index) in notifications"
      :key="index"
      :notification="item"
    />
    <infinite-loading
      v-if="newNotificationsIds.length"
      spinner="spiral"
      @infinite="infiniteScroll"
    />
  </v-card>
</template>

<style lang="scss">
.notification {
  margin-top: $space_normal;

  .header {
    font-weight: 500;
    font-size: $font_large;
    line-height: $main_line_height;
    letter-spacing: 0.15px;
    color: $color_font_normal;
    padding: $space_normal;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ProfileItemModel } from '~/models/profile/profile-item.model'
import { NotificationItemData } from '~/store/notifications'
import { config } from '~/config/config'

const stepNumber = config.stepForLoading

@Component
export default class NotificationsPage extends Vue {
  user: ProfileItemModel | null = null
  notifications: NotificationItemData[] = []
  newNotificationsIds: string[] = []
  defaultStart: number = 0
  defaultEnd: number = stepNumber
  startIndex: number = stepNumber
  endIndex: number = stepNumber * 2
  step: number = stepNumber
  max: number = 0

  created () {
    this.addUniquePostToPostArray(this.$store.state.notifications.activities)
    this.max = this.$store.state.notifications.count
    this.$store.subscribeAction({
      after: (action) => {
        if (action.type === 'notifications/getNotificationService') {
          this.user = this.$store.state.profiles.currentUser.id
          this.max = this.$store.state.notifications.count
          this.notifications = []
          this.newNotificationsIds = []
          this.addUniquePostToPostArray(this.$store.state.notifications.activities)
        }
      }
    })
  }

  infiniteScroll ($state: any) {
    setTimeout(async () => {
      await this.getNewNotifications(this.$store.state.profiles.currentUser.id, this.startIndex).then((data) => {
        this.addUniquePostToPostArray(data)
        $state.loaded()
        if (this.max <= this.notifications.length) {
          $state.complete()
        }

        if (this.max <= this.step) {
          $state.complete()
        }

        this.startIndex += this.step
        this.endIndex += this.step
      })
    }, 500)
  }

  async getNewNotifications (userId: string, offset: number) {
    return await this.$store.dispatch('notifications/getNotificationService', { id: userId, offset })
  }

  addUniquePostToPostArray (notifications: NotificationItemData[]) {
    const newNotificationsIds = []
    for (const id in notifications) {
      // eslint-disable-next-line no-prototype-builtins
      if (notifications.hasOwnProperty(id) && !this.newNotificationsIds.includes(id)) {
        newNotificationsIds.push(id)
      }
    }
    const newNotifications = newNotificationsIds
      .sort((a, b) => Number.parseInt(b) - Number.parseInt(a))
      .map(id => notifications[Number(id)])
    this.notifications.push(...newNotifications)
    this.newNotificationsIds.push(...newNotificationsIds)
  }
}
</script>
