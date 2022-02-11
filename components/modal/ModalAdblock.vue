<template>
  <div data-app>
    <v-dialog
      v-model="openModal"
      max-width="432"
    >
      <v-card class="adblock-modal-container">
        <v-icon class="close-icon" size="24" @click="onClick">
          mdi-close
        </v-icon>
        <div class="subsocial-logo">
          <img src="../../assets/image/subsocial-logo.svg" alt="Subsocial logo">
        </div>
        <div class="title">
          {{ $t('modals.adblock.title') }}
        </div>
        <div class="subtitle">
          {{ $t('modals.adblock.subtitle') }}
        </div>
        <div class="btn-container">
          <div class="disable-btn">
            <v-btn @click="reloadPage">
              {{ $t('modals.adblock.button') }}
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss">
.adblock-modal-container {
  width: $modal_width;
  padding: $space_large;

  .close-icon {
    position: absolute;
    right: $space_normal;
    top: $space_normal;
  }

  .subsocial-logo {
    text-align: center;
    margin-bottom: $space_normal;

    img {
      height: 40px;
      width: 180px;
    }
  }

  .title {
    font-size: $font_huge;
    line-height: 125%;
    font-weight: 500;
    text-align: center;
    padding: 0 $space_large;
    color: $text_color_normal;
    margin-bottom: $space_normal;
  }

  .subtitle {
    font-size: $font_normal;
    text-align: center;
    line-height: 125%;
    color: $text_color_normal;
    margin-bottom: $space_large;
    text-transform: initial;
  }

  .btn-container {
    display: flex;
    justify-content: space-between;

    .disable-btn {
      width: 100%;
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
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class ModalAdblock extends Vue {
  @Prop({
    type: Boolean,
    default: false
  }) isModal!: boolean

  openModal: boolean = false

  @Watch('isModal')
  isModalHandler () {
    this.onClick()
  }

  reloadPage (): void {
    this.$router.go(0)
  }

  onClick (): void {
    this.openModal = !this.openModal
  }
}
</script>
