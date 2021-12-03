<template>
  <div class="vote-item-wp">
    <div>
      <Avatar :id="userInfo.id" :src="userInfo.avatar" :size="40" :name="userInfo.name" />

      <div class="user-info-wp">
        <span class="user-name">{{ userInfo.name }}</span>

        <Address :address="userInfo.id" :length="17" :show-icon="false" />
      </div>
    </div>

    <FollowButton v-if="type === 'follow'" :follow="userInfo.isFollowing" />

    <div v-if="type === 'account'" class="sub-wb">
      <Tokens :balance="balance" />
    </div>
  </div>
</template>

<style lang="scss">
.vote-item-wp {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;

  &>div {
    display: flex;
  }

  .user-info-wp {
    margin-left: 13px;

    .user-name {
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      letter-spacing: 0.25px;
      color: rgba(0, 0, 0, 0.87);
      width: 200px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      display: block;
    }
  }

  .sub-wb {
    font-weight: 500;
    font-size: 14px;
    padding-left: 4px;

    .gray {
      color: #A0A0A0;
      font-weight: normal;
    }
  }
}
</style>

<script>
export default {
  name: 'VoteUserItem',

  props: {
    userInfo: {
      type: Object,
      default: undefined
    },
    type: {
      type: String
    }
  },

  data () {
    return {
      balance: ''
    }
  },

  watch: {
    userInfo () {
      this.getBalance()
    }
  },

  created () {
    this.getBalance()
  },

  methods: {
    getBalance () {
      new Promise(resolve => resolve(this.userInfo.balance)
      ).then((res) => {
        this.balance = res
      })
    }
  }
}
</script>
