<template>
  <div class="image-loader-container">
    <div v-if="type === 'round'" class="round">
      <div class="upload-photo-wp" :class="{ loaded: !!previewImage }">
        <div class="upload-photo" :style="{ backgroundImage: 'url(' + previewImage + ')' }">
          <v-file-input
            v-model="image"
            prepend-icon="mdi-camera-outline"
            color="#000"
            @change="loadImage"
          />
          <span v-if="!previewImage">{{ $t('buttons.upload') }}</span>
        </div>
        <span v-if="previewImage" class="delete-image">
          <v-icon @click="clearImage()">mdi-delete-outline</v-icon>
        </span>
      </div>
      <div class="image-subtitle">
        {{ $t('imageShouldBeLessThan', {limit: 2}) }}
      </div>
    </div>
    <div v-if="type === 'square'" class="square">
      <div class="upload-photo-wp" :class="{ loaded: !!previewImage }">
        <div class="upload-photo" :style="{ backgroundImage: 'url(' + previewImage + ')' }">
          <v-file-input
            v-model="image"
            prepend-icon="mdi-camera-outline"
            color="#000"
            hide-details="auto"
            @change="loadImage"
          />
          <span v-if="!previewImage" class="upload-title">{{ $t('buttons.uploadImage') }}</span>
          <span v-if="!previewImage" class="image-recommendations">{{ $t('imageShouldBeLessThan', {limit: 2}) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.image-loader-container {
  .upload-photo-wp {
    display: flex;
    justify-content: center;
    width: 100%;
    position: relative;

    .upload-photo {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      span {
        font-size: $font_small;
        line-height: 20px;
        letter-spacing: 0.25px;
        margin-top: 3px;
      }

      .v-input {
        display: block;
        width: 100%;
        padding: 0;
        margin: 0;
        flex: none;

        .v-input__prepend-outer {
          display: flex;
          width: 100%;
        }

        .v-input__slot {
          display: none;
        }

        .v-input__control {
          position: absolute;
        }
      }
    }
  }
  .round {
    .upload-photo-wp {
      margin-top: -5px;
      padding-bottom: $space_tiny;

      .upload-photo {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        border: 1px dashed rgba(0, 0, 0, 0.38);
        position: relative;
        background-size: cover;
        background-position: center;

        .v-input {
          .v-input__control {
            bottom: -15px;
            left: 0;

            .v-messages__message {
              text-align: center;
            }
          }

          .v-icon {
            color: $icon_color_normal;
          }
        }

        button {
          border-radius: 50%;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;

          &:before {
            padding-bottom: $space_normal;
          }
        }
      }

      .delete-image {
        position: absolute;
        right: calc(50% - 70px);
        top: 0;
        bottom: 20px;
        color: $icon_color_dark_gray;
        display: flex;
        align-items: center;
        justify-content: center;

        i:hover {
          cursor: pointer;
          opacity: 0.6;
        }
      }

      &.loaded {
        .upload-photo {
          border: none;

          .v-file-input {
            display: none;
          }

          &:hover {
            .v-file-input {
              display: block;

              button {
                background: $button_bg_primary;
                &:before {
                  padding-bottom: 0;
                  color: $text_color_white;
                }
              }

              .v-text-field__details {
                display: none;
              }
            }
          }
        }
      }
    }

    .image-subtitle {
      font-size: $font_small;
      color: $text_color_dark_gray;
      text-align: center;
      width: 100%;
      margin-bottom: $space_huge;
    }
  }

  .square {
    .upload-photo-wp {
      padding-bottom: $space_big;

      .upload-photo {
        width: 100%;
        min-height: 98px;
        height: 100%;
        background-size: cover;
        background-position: center;
        border-radius: $border_small;
        border: 1px solid $button_outline_gray;

        span {
          position: absolute;
          bottom: 55px;
          font-weight: 400;
        }

        .image-recommendations {
          font-size: $font_small;
          line-height: $normal_line_height;
          letter-spacing: 0.4px;
          color: $text_color_dark_gray;
          bottom: 35px;
        }

        .v-input {
          height: 100%;

          .v-input__prepend-outer {
            height: 100%;
            margin: 0;

            .v-input__icon{
              height: 100%;

              button {
                width: 100%;
                height: 100%;

                &::after {
                  display: none;
                }

                &::before {
                  margin-bottom: 45px;
                }
              }
            }
          }

          .v-input__control {
            bottom: 0;
          }

          .v-icon {
            color: $text_color_normal;
          }
        }
      }

      &.loaded {
        .upload-photo {
          height: 25vh;

          .v-file-input {
            display: none;
          }

          &:hover {
            .v-file-input {
              display: block;

              button {
                background: $button_bg_primary;
                &:before {
                  padding-bottom: 0;
                  color: $text_color_white;
                }
              }

              .v-text-field__details {
                display: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { IpfsCid } from '@subsocial/types'
import { environment } from '~/environments/environment'
import TransactionService from '~/services/transaction.service'
import { config } from '~/config/config'

const transactionService = new TransactionService()

@Component
export default class ImageLoader extends Vue {
  @Prop({
    type: String
  }) avatar!: string

  @Prop({
    type: String,
    default: 'round'
  }) type!: string
  
  @Watch('avatar')
  avatarHandler (newVal: string, OldVal: string) {
    if (newVal !== OldVal) {
      this.setPreviewImage(this.avatar)
    }
  }

  previewImage: string | null = null
  image?: {} = {}
  cid: IpfsCid | undefined

  created () {
    this.setPreviewImage(this.avatar)
  }

  async loadImage (event: any) {
    if (!event || !event.type.includes('image')) {
      return
    }

    if (event.size > config.imageSizeBytes) {
      this.$nuxt.$emit('isShowSnackbar', { show: true, text: this.$t('imageShouldBeLessThanTwoMB') })
      return
    }
    const file = event
    const mimeType = file.type

    if (mimeType.match(/image\/*/) == null) {
      return
    }

    if (this.cid || this.avatar) {
      transactionService.removeIpfsContent(this.cid || this.avatar).catch(err => new Error(err))
    }

    this.cid = (await transactionService.saveFile(file).then())

    if (this.cid) {
      this.setPreviewImage(this.cid)
      this.$emit('avatar', this.cid)
    }
  }

  setPreviewImage (id: IpfsCid) {
    this.previewImage = id ? environment.ipfsUrl + id : null
  }

  clearImage () {
    this.previewImage = null
    this.$emit('avatar', null)
  }
}
</script>
