<template class="login-modal">
  <v-dialog
    v-model="openModal"
    max-width="432"
  >
    <v-card class="login-modal-container">
      <v-icon medium class="close-icon" size="14" @click="onClick">
        mdi-close
      </v-icon>
      <LoginScreenNoExtension v-if="status === statusEnum.EXTENSION_NOT_FOUND" />
      <LoginScreenNoAccount v-if="status === statusEnum.ACCOUNTS_NOT_FOUND" />
      <LoginScreenAccounts v-if="status === statusEnum.UNAUTHORIZED" />
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
.login-modal-container {
  .close-icon {
    position: absolute;
    right: 16px;
    top: 16px;
  }
}

</style>

<script>
import { ACCOUNT_STATUS } from '~/models/enum/account-status.enum'

export default {
  name: 'ModalLogin',

  props: {
    isModal: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      openModal: false,
      status: ''
    }
  },

  computed: {
    statusEnum () {
      return ACCOUNT_STATUS
    }
  },

  watch: {
    isModal () {
      this.onClick()
    }
  },

  created () {
    this.status = this.$store.state.profiles.status
    this.unsubscribe = this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'profiles/SET_STATUS') {
        this.status = this.$store.state.profiles.status
      }
    })
  },

  methods: {
    onClick () {
      this.openModal = !this.openModal
    }
  }
}
</script>
