<template>
  <v-btn depressed :disabled="true" class="tips-btn">
    Send tips
  </v-btn>
</template>

<style lang="scss">
.tips-btn {
  width: 99px;
  height: 36px;
  border: 1px solid #EB2F96;
  box-sizing: border-box;
  border-radius: 4px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 1.25px;
  text-transform: capitalize;
  background-color: #fff !important;
  .v-btn__content {
    color: #EB2F96;
    font-size: $font-size-secondary-text;
  }
  
  &:disabled {
    border: none;
    color: #B3B3B3 !important;
    opacity: 0.5;
  }
}
</style>

<script>
export default {
  name: 'SendTipsButton'
}
</script>
