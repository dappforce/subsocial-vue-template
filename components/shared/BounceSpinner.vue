<template>
  <div class="bounce-spinner">
    <div class="bounce1" />
    <div class="bounce2" />
    <div class="bounce3" />
  </div>
</template>

<style lang="scss">
.bounce-spinner {
  margin: 30px auto 20px;
  width: 70px;
  text-align: center;

  &  > div {
    width: 18px;
    height: 18px;
    background-color: #EB2F96;

    border-radius: 100%;
    display: inline-block;
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  }

  .bounce1 {
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  .bounce2 {
    -webkit-animation-delay: -0.16s;
    animation-delay: -0.16s;
  }

  @-webkit-keyframes sk-bouncedelay {
    0%, 80%, 100% { -webkit-transform: scale(0) }
    40% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bouncedelay {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% {
        -webkit-transform: scale(1.0);
        transform: scale(1.0);
      }
  }
}

</style>

<script>
export default {
  name: 'BounceSpinner'
}
</script>
