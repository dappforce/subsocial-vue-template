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
    font-size: $font_huge;
    line-height: 125%;
    color: $color_font_secondary;
    width: 100%;
    text-align: center;
    margin-bottom: 14px;
  }

  .message {
    width: 100%;
    text-align: center;
    font-size: $font_normal;
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
      border-bottom: 1px solid $color_shadow;

      &:hover {
        background-color: rgba(238, 236, 236, 0.7);
        cursor: pointer;
      }

      .info {
        display: flex;
        flex-direction: column;
        margin-left: $space_normal;

        .name {
          font-weight: 500;
          font-size: $font_normal;
          line-height: 125%;
          color: $color_font_normal;
        }

        .balance {
          font-size: $font_small;
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
      color: $color_font_secondary;
      font-size: $font_small;
      line-height: 125%;

      &:hover {
        color: $color_primary;
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { AccountData } from '~/types/account.types'

export interface Balance {
  id: string,
  balance: any
}

@Component
export default class LoginScreenAccounts extends Vue {
  accounts: AccountData[] = []
  balances: Balance[] = []

  created () {
    this.accounts = this.$store.state.profiles.polkadotAccounts
    this.getBalance(this.$store.state.profiles.polkadotAccounts)
  }

  getBalance (accounts: AccountData[]) {
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
  }

  findBalance (id: string) {
    const bal = this.balances.find(i => i.id === id)
    if (bal) {
      return bal.balance
    }
  }

  setAccount (account: AccountData) {
    this.$store.dispatch('profiles/setCurrentAccount', account)
  }
}
</script>
