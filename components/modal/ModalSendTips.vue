<template>
  <div data-app>
    <v-dialog
      v-model="openModal"
      max-width="530px"
      @click:outside="onCancel"
    >
      <v-card class="v-modal-container">
        <v-card-title class="st-title">
          {{ $t('modals.tips.title') }}
          <v-icon class="close-icon" @click="onClick">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card flat>
          <div class="send-tips-container">
            <UserItem v-if="userInfo" :user-info="userInfo" :fullAddress="true" :size="60" :isShowRecipient="true" :showCopyBtn="false"/>
            <ValidationObserver ref="form" v-slot="{ handleSubmit, handleReset }">
              <form @submit.prevent="handleSubmit(submit)" @reset.prevent="handleReset(onCancel)">
                <ValidationProvider v-slot="{ errors }" :rules="'required|numeric|min_value:1'">
                  <div class="form-row">
                    <v-text-field
                      v-model="amount"
                      outlined
                      required
                      :suffix="$store.state.profiles.chainToken"
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
              {{ $t('modals.tips.availableBalance') }}: <span>{{ myBalance }} {{ $store.state.profiles.chainToken }}</span>
            </div>
            <div class="button-container">
              <v-btn class="button-third-color" @click="onCancel">
                {{ $t('buttons.cancel') }}
              </v-btn>
              <v-btn :disabled="validate" class="button-main-color" @click="submit">
                {{ $t('buttons.sendTips') }}
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss">
.v-modal-container {
  min-height: 270px;

  .v-card {
    height: auto;
    max-height: none;
  }

  .v-card__title.st-title {
    font-weight: 500;
    font-size: $font_large;
    padding: $space_normal !important;
  }

  .send-tips-container {
    padding: 0 $space_normal $space_normal;
    width: 100%;

    .user-item-wp {
      border: none;
      padding: 0 0 $space_normal;
    }

    .v-input {
      &__slot {
        min-height: 36px;
      }
    }

    .v-text-field--outlined > .v-input__control > .v-input__slot {
      min-height: 36px !important;
    }

    .v-text-field--outlined .v-label {
      top: 9px;
    }

    .v-text-field__details {
      padding: 0;
    }

    .v-messages__message {
      font-size: $font_extra_small;
      color: $text_color_red;
    }
    
    & .address-text {
      color: $text_color_dark_gray;
      word-break: break-all;
    }
    
    & .v-text-field__suffix {
      color: $text_color_normal;
      font-size: $font_normal;
    }

    .my-balance {
      font-size: $font_small;
      color: $text_color_dark_gray;
      line-height: 22px;
      margin-top: 3px;

      span {
        color: $text_color_normal;
      }
    }

    .button-container {
      margin-top: $space_big;
      display: flex;
      justify-content: flex-end;
      width: 100%;
      gap: $space_normal;

      .button-main-color {
        background-color: $button_bg_primary;
      }

      .button-third-color {
        background-color: $button_bg_white
      }

      button {
        min-width: 110px !important;
        font-size: $font_normal;
        border: 1px solid $button_outline_gray !important;
        border-radius: $border_small;
        box-shadow: none;
        text-transform: initial;

        &:last-child {
          border: none;
          color: $text_color_white;
        }
      }
    }

  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import { numeric, required, min_value } from 'vee-validate/dist/rules'
import { ProfileData } from '@subsocial/types/dto'
import { config } from '~/config/config'

extend('numeric', {
  ...numeric,
  message: 'The field may only contain numeric characters'
})
extend('required', {
  ...required,
  message: 'This field is required'
})
extend('min_value', {
  ...min_value,
  message: 'The field must be greater than 0'
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
  myBalance: string = ''

  created () {
    this.fromAccount = this.$store.state.profiles.currentUser?.id
    this.myBalance = this.$store.state.profiles.myBalance.toString()
  }

  submit () {
    this.$refs.form.validate().then((result) => {
      if (result) {
        this.$store.dispatch('profiles/transferMoney', { from: this.fromAccount, to: this.userInfo.id, amount: +this.amount * Math.pow(10, this.$store.state.profiles.chainDecimal) })
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
  
  get validate (): boolean {
    return +this.amount > +this.myBalance
  }
}
</script>
