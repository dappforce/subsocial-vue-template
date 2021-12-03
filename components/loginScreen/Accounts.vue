<template>
  <div class="account-present">
    <div class="title">
      Sign In
    </div>
    <div class="message">
      Click on your account to sign in:
    </div>
    <div class="accounts-container">
      <div
        v-for="(item, index) in accounts"
        :key="index"
        class="account"
        @click="setAccount(item)"
      >
        <Avatar :id="item.id" :src="item.avatar" />
        <div class="info">
          <span class="name">{{ item.name }}</span>
          <span class="balance">
            <Tokens :balance="findBalance(item.id)" />
          </span>
        </div>
        <div class="address">
          <Address :address="item.id" :show-copy-btn="false" />
        </div>
      </div>
    </div>
    <div class="privacy">
      <a href="">Privacy Policy</a>
      <a href="">Terms of Use</a>
    </div>
  </div>
</template>

<style lang="scss">
.account-present {
  width: 432px;
  padding: 18px;

  .title {
    font-weight: 500;
    font-size: $font-size-title-details;
    line-height: 125%;
    color: #A0A0A0;
    width: 100%;
    text-align: center;
    margin-bottom: 14px;
  }

  .message {
    width: 100%;
    text-align: center;
    font-size: $font-size-normal;
    line-height: 125%;
    color: #262626;
    margin-bottom: 10px;
  }

  .accounts-container {
    max-height: 264px;
    margin-bottom: 22px;

    .account {
      display: flex;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #EEECEC;

      &:hover {
        background-color: rgba(238, 236, 236, 0.7);
        cursor: pointer;
      }

      .info {
        display: flex;
        flex-direction: column;
        margin-left: 16px;

        .name {
          font-weight: 500;
          font-size: $font-size-profile-name;
          line-height: 125%;
          color: #222222;
        }

        .balance {
          font-size: $font-size-secondary-text;
        }
      }

      .address {
        margin: 0 0 0 auto;
      }
    }
  }

  .privacy {
    display: flex;
    justify-content: space-evenly;

    a {
      text-decoration: none;
      color: #A0A0A0;
      font-size: $font-size-secondary-text;
      line-height: 125%;

      &:hover {
        color: #EB2F96;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'LoginScreenAccounts',
  data () {
    return {
      accounts: [],
      balances: []
    }
  },
  created () {
    this.accounts = this.$store.state.profiles.polkadotAccounts
    this.getBalance(this.$store.state.profiles.polkadotAccounts)
  },
  methods: {
    getBalance (accounts) {
      accounts.map(async (i) => {
        await new Promise((resolve) => {
          resolve(i.balance)
        }).then((res) => {
          const account = {
            id: i.id,
            balance: res
          }
          this.balances.push(account)
        })
      })
    },
    findBalance (id) {
      const bal = this.balances.find(i => i.id === id)
      if (bal) {
        return bal.balance
      }
    },
    setAccount (account) {
      this.$store.dispatch('profiles/setCurrentAccount', account)
    }
  }
}
</script>
