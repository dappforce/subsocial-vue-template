<template class="login-modal">
  <v-dialog
    v-model="openModal"
    max-width="432"
  >
    <v-card class="login-modal-container">
      <v-icon medium class="close-icon" size="24" @click="onClick">
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
  status: string = ''

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
    this.$nuxt.$on('isShowLoginModal', (data: boolean) => {
      this.openModal = data
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
