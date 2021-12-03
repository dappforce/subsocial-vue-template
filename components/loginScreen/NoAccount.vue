<template>
  <div class="no-account">
    <div class="title">
      Sign In
    </div>
    <div class="message">
      No accounts found. Please open your <b>Polkadot extension</b> and create a new account or import existing. Then reload this page.
    </div>
    <div class="privacy">
      <a href="">Privacy Policy</a>
      <a href="">Terms of Use</a>
    </div>
  </div>
</template>

<style lang="scss">
.no-account {
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
    padding: 21px;
    background-color: #FFFAD5;
    text-align: center;
    font-size: $font-size-normal;
    line-height: 125%;
    color: #262626;
    margin-bottom: 22px;
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
  name: 'LoginScreenNoAccount'
}
</script>
