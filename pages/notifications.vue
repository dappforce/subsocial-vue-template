<template>
  <v-card class="notification">
    <div class="title">Notifications</div>
    <NotificationItem
      v-for="(item, index) in notifications"
      :key="index"
      :notification="item"
    >
    </NotificationItem>
  </v-card>
</template>

<style lang="scss">
.notification {
  .title {
    font-weight: 500;
    font-size: $font-size-title-preview;
    line-height: 24px;
    letter-spacing: 0.15px;
    color: rgba(0, 0, 0, 0.87);
    padding: 16px 16px 8px;
  }
}
</style>

<script>
export default {
  data () {
    return {
      notifications: null,
      users: null
    }
  },
  
  created () {
    this.notifications = this.$store.state.notifications.list
    this.users = this.$store.state.profiles.list
  },

  mounted () {
    this.$nuxt.$emit('isShowTabs', false)
  }
}
</script>