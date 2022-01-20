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
  line-height: $main_line_height;
  color: $color_font_secondary;
  display: flex;
  align-items: center;
  font-weight: 500;

  .strong{
    color: $color_font_normal;
  }

  &>span:last-child {
    margin-left: 4px;
    color: $color_font_normal;
  }
}
</style>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Tokens extends Vue {
  @Prop({
    type: String || Number
  }) balance!: string | number

  dividedTokens: string[] = []

  @Watch('balance')
  balanceHandler () {
    this.divideTokens()
  }

  created (): void {
    this.divideTokens()
  }

  divideTokens (): void {
    this.dividedTokens = this.balance
      ? this.balance.toString().split('.')
      : ['0', '0000']
  }
}
</script>
