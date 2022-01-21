<template>
  <v-dialog
    v-model="openModal"
    max-width="500px"
  >
    <v-card class="v-modal-container">
      <v-card-title class="st-title">
        {{ $t('modals.tips.title') }}
        <v-icon medium class="close-icon" @click="onClick">
          mdi-close
        </v-icon>
      </v-card-title>

      <v-card flat>
        <div class="send-tips-container">
          <UserItem v-if="userInfo" :user-info="userInfo" />
          <ValidationObserver ref="form" v-slot="{ handleSubmit, handleReset }">
            <form @submit.prevent="handleSubmit(submit)" @reset.prevent="handleReset(onCancel)">
              <ValidationProvider v-slot="{ errors }" :rules="'required|numeric'">
                <div class="form-row">
                  <v-text-field
                    v-model="amount"
                    outlined
                    required
                    suffix="SUB"
                    height="36"
                    hide-details="auto"
                    :messages="errors[0]"
                    :label="$t('modals.tips.inputPlaceholder')"
                  />
                </div>
              </ValidationProvider>
            </form>
          </ValidationObserver>
          <div class="my-balance">
            {{ $t('modals.tips.availableBalance') }}: <strong>{{ myBalance }}</strong>
          </div>
          <div class="button-container">
            <v-btn class="button-third-color" @click="onCancel">
              {{ $t('buttons.cancel') }}
            </v-btn>
            <v-btn class="button-main-color" @click="submit">
              {{ $t('buttons.sendTips') }}
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
.v-modal-container {
  min-height: 270px;

  .v-card {
    height: auto;
  }

  .v-card__title.st-title {
    font-weight: 500;
    font-size: $font_large;
    padding: $space_normal !important;
  }

  .send-tips-container {
    padding: 0 $space_normal $space_normal;

    .user-item-wp {
      border: none;
      padding: 0 0 $space_normal;
    }

    .v-input {
      &__slot {
        min-height: 36px;
      }

      & .v-label {
        top: 9px;
      }
    }

    .v-text-field__details {
      padding: 0;
    }

    .v-messages__message {
      font-size: $font_extra_small;
      color: $color_red;
    }

    .my-balance {
      font-size: $font_small;
      color: $color_font_secondary;
      line-height: 22px;
      margin-top: 3px;

      strong {
        color: $color_black;
      }
    }

    .button-container {
      margin-top: $space_big;
      display: flex;
      justify-content: flex-end;
      width: 100%;
      gap: $space_normal;

      .button-main-color {
        background-color: $color_primary;
      }

      .button-third-color {
        background-color: $color_white
      }

      button {
        min-width: 110px !important;
        font-size: $font_normal;
        border: 1px solid #E0E0E0 !important;
        border-radius: $border_small;
        box-shadow: none;
        text-transform: initial;

        &:last-child {
          border: none;
          color: $color_white;
        }
      }
    }

  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import { numeric, required } from 'vee-validate/dist/rules'
import { ProfileData } from '@subsocial/api/flat-subsocial/dto'
import { config } from '~/config/config'

extend('numeric', {
  ...numeric,
  message: 'The field may only contain numeric characters'
})
extend('required', {
  ...required,
  message: 'This field is required'
})

@Component({
  components: { ValidationProvider, ValidationObserver }
})
export default class ModalSendTips extends Vue {
  $refs!: {
    form: InstanceType<typeof ValidationObserver>;
  }

  @Prop({
    type: Boolean,
    default: false
  }) isModal!: boolean

  @Prop({
    type: Object
  }) userInfo!: ProfileData

  @Watch('isModal')
  isModalHandler () {
    this.onClick()
  }

  openModal: boolean = false
  toAccount: string = ''
  amount: string = ''
  fromAccount: string = ''
  myBalance?: number

  created () {
    this.fromAccount = this.$store.state.profiles.currentUser.id
    this.myBalance = this.$store.state.profiles.myBalance
  }

  submit () {
    this.$refs.form.validate().then((result) => {
      if (result) {
        this.$store.dispatch('profiles/transferMoney', { from: this.fromAccount, to: this.userInfo.id, amount: +this.amount * config.subRate })
          .then(() => {
            this.onClick()
          })
      }
    })
  }

  onClick (): void {
    this.openModal = !this.openModal
  }

  onCancel (): void {
    this.amount = ''
    this.onClick()
  }
}
</script>
