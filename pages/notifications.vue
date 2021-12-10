<template>
  <v-card class="notification">
    <div class="title">
      Notifications
    </div>
    <NotificationItem
      v-for="(item, index) in notifications"
      :key="index"
      :notification="item"
    />
  </v-card>
</template>

<style lang="scss">
.notification {
  .title {
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

@Component
export default class NotificationsPage extends Vue {
  notifications: Notification | null = null
  users: ProfileItemModel | undefined | null = null
  created () {
    this.notifications = this.$store.state.notifications.list
    this.users = this.$store.state.profiles.list
  }

  mounted () {
    this.$nuxt.$emit('isShowTabs', false)
  }
}
</script>
