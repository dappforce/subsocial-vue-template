<template>
  <div class="tokens-wp">
    <span class="strong">{{ dividedTokens[0] }}</span>
    <span>.</span>
    <span>{{ dividedTokens[1] }}</span>
    <span>SUB</span>
  </div>
</template>
<style lang="scss">
.tokens-wp {
  line-height: 24px;
  color: rgba(0, 0, 0, 0.38);
  display: flex;
  align-items: center;
  font-weight: 500;

  .strong{
    color: #222222;
  }

  &>span:last-child {
    margin-left: 4px;
    color: #222222;
  }
}
</style>
<script>
export default {
  name: 'Tokens',

  props: {
    balance: {
      type: String || Number
    }

  },

  data () {
    return {
      dividedTokens: []
    }
  },

  watch: {
    balance (newVal, oldVal) {
      this.divideTokens()
    }
  },

  created () {
    this.divideTokens()
  },

  methods: {
    divideTokens () {
      this.dividedTokens = this.balance
        ? this.balance.toString().split('.')
        : ['0', '0000']
    }
  }
}
</script>
