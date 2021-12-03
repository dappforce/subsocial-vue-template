<template>
  <div v-if="userInfo" class="user-item-wp">
    <div>
      <Avatar :id="userInfo.id" :src="isAvatar(userInfo)" :size="40" :name="isName(userInfo)" />

      <div class="user-info-wp">
        <span class="user-name">{{ isName(userInfo) }}</span>

        <Address :address="userInfo.id" :length="17" :show-icon="false" />
      </div>
    </div>

    <FollowButton v-if="type === 'follow'" :follow="isFollow" />

    <div v-if="type === 'account'" class="sub-wb">
      <Tokens :balance="balance" />
    </div>
  </div>
</template>

<style lang="scss">
.user-item-wp {
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
  name: 'UserItem',

  props: {
    userInfo: {
      type: Object,
      default: undefined
    },
    type: {
      type: String
    },
    id: {
      type: String
    }
  },

  data () {
    return {
      balance: '',
      isFollow: false
    }
  },

  watch: {
    userInfo () {
      this.getBalance()
    }
  },

  created () {
    this.getBalance()
    if (this.$store.state.profiles.currentUser) {
      this.$store.dispatch('accountFollower/isAccountFollower', {
        myAddress: this.$store.state.profiles.currentUser.id,
        followedAddress: this.userInfo.id
      }).then(res => this.isFollow = res)
    }
  },

  methods: {
    getBalance () {
      new Promise(resolve => resolve(this.userInfo.balance)
      ).then((res) => {
        this.balance = res
      })
    },

    isAvatar (user) {
      return user.content ? user.content.avatar : null
    },

    isName (user) {
      return user.content ? user.content.name : user.id
    }
  }
}
</script>
