<template>
  <div>
    <v-btn class="signin-button" @click="openModal">
      Sign In
    </v-btn>

    <ModalLogin :is-modal="isOpenModal" />
  </div>
</template>

<style lang="scss">
.signin-button {
  border: 1px solid #EB2F96;
  border-radius: 4px;
  background-color: #fff !important;

  .v-btn__content {
    font-weight: 500;
    font-size: 17px;
    line-height: 125%;
    text-align: center;
    color: #EB2F96;
    text-transform: capitalize;
  }

}
</style>

<script>

export default {
  name: 'SignInButton',

  data () {
    return {
      isOpenModal: false
    }
  },

  created () {

  },

  methods: {
    openModal () {
      this.isOpenModal = !this.isOpenModal
    }
  }
}
</script>
