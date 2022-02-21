<template class="token-alert-modal">
  <div data-app>
    <v-dialog
      v-model="openModal"
      max-width="432"
    >
      <v-card class="token-alert-modal-container">
        <v-icon class="close-icon" size="24" @click="onClick">
          mdi-close
        </v-icon>
       
        <div class="token-alert-container">
          <div class="title">
            {{$t('modals.login.title-wait') }}
          </div>

          <div class="message">
            {{ $t('modals.noToken.message') }}
          </div>

          <div class="btn-container">
            <div class="btn">
              <v-btn>
                {{ $t('modals.noToken.button') }}
              </v-btn>
            </div>
          </div>

          <div class="privacy">
            <a href="">{{ $t('buttons.privacyPolicy') }}</a>
            <a href="">{{ $t('buttons.termsOfUse') }}</a>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss">
.token-alert-modal-container {
  .close-icon {
    position: absolute;
    right: $space_normal;
    top: $space_normal;
  }
  
  .token-alert-container {
    max-width: $modal_width;
    padding: $space_normal;

    .title {
      font-weight: 500;
      font-size: $font_huge;
      line-height: 125%;
      color: $text_color_dark_gray;
      width: 100%;
      text-align: center;
      margin-bottom: 14px;
    }

    .message {
      width: 100%;
      text-align: center;
      font-size: $font_normal;
      line-height: 125%;
      color: $text_color_normal;
      margin-bottom: $space_normal;
    }

    .btn-container {
      display: flex;
      justify-content: center;
      margin-bottom: $space_large;

      .btn {
        .v-btn {
          background-color: $button_bg_primary;
          border: none;
          border-radius: $border_small;
          color: $text_color_white;
          width: 100%;
          text-transform: initial;
          font-size: $font_normal;
          box-shadow: none;
          font-weight: 500;
        }
      }
    }

    .privacy {
      display: flex;
      justify-content: space-evenly;

      a {
        text-decoration: none;
        color: $text_color_dark_gray;
        font-size: $font_small;
        line-height: 125%;

        &:hover {
          color: $text_color_primary;
        }
      }
    }
  }

  
}

</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class ModalTokenAlert extends Vue {
  @Prop({
    type: Boolean,
    default: false
  }) isModal!: boolean

  openModal: boolean = false

  @Watch('isModal')
  isModalHandler () {
    this.onClick()
  }

  created (): void {
    this.$nuxt.$on('isShowTokenAlert', (isOpen: boolean) => {
      this.openModal = isOpen
    })
  }

  onClick (): void {
    this.openModal = !this.openModal
  }
}
</script>
