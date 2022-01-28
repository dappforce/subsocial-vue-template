<template class="login-modal">
  <div data-app>
    <v-dialog
      v-model="openModal"
      max-width="432"
    >
      <v-card class="login-modal-container">
        <v-icon class="close-icon" size="24" @click="onClick">
          mdi-close
        </v-icon>
        <LoginScreenNoExtension v-if="status === statusEnum.EXTENSION_NOT_FOUND" :is-login-text="isLoginText" />
        <LoginScreenNoAccount v-if="status === statusEnum.ACCOUNTS_NOT_FOUND" :is-login-text="isLoginText" />
        <LoginScreenAccounts v-if="status === statusEnum.UNAUTHORIZED" :is-login-text="isLoginText" />
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss">
.login-modal-container {
  .close-icon {
    position: absolute;
    right: $space_normal;
    top: $space_normal;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { ACCOUNT_STATUS } from '~/models/enum/account-status.enum'

@Component
export default class ModalLogin extends Vue {
  @Prop({
    type: Boolean,
    default: false
  }) isModal!: boolean

  openModal: boolean = false
  status: ACCOUNT_STATUS = ACCOUNT_STATUS.INIT
  isLoginText: boolean = false

  @Watch('isModal')
  isModalHandler () {
    this.onClick()
  }

  created (): void {
    this.status = this.$store.state.profiles.status
    this.$store.subscribe((mutation) => {
      if (mutation.type === 'profiles/SET_STATUS') {
        this.status = this.$store.state.profiles.status
      }
    })
    this.$nuxt.$on('isShowLoginModal', (data: { isOpen: boolean, isLoginClicked: boolean }) => {
      this.openModal = data.isOpen
      this.isLoginText = data.isLoginClicked
    })
  }

  onClick (): void {
    this.openModal = !this.openModal
  }

  get statusEnum () {
    return ACCOUNT_STATUS
  }
}
</script>
