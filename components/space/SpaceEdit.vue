<template>
  <section class="edit-space-container">
    <v-card>
      <h2>{{ isEdit ? 'Edit' : 'New' }} space</h2>

      <div class="upload-photo-wp" :class="{ loaded: !!previewImage }">
        <div class="upload-photo" :style="{ backgroundImage: 'url(' + previewImage + ')' }">
          <v-file-input
            v-model="avatar"
            prepend-icon="mdi-camera-outline"
            color="#000"
            :rules="avatarRules"
            @change="selectImage"
          />
          <span v-if="!previewImage">Upload</span>
        </div>
        <span v-if="previewImage" class="delete-image">
          <v-icon @click="clearImage()">mdi-delete-outline</v-icon>
        </span>
      </div>
      <v-form v-model="valid">
        <div class="form-row">
          <v-text-field
            v-model="spaceName"
            :error-messages="spaceNameErrors"
            :counter="50"
            outlined
            label="* Space name"
            required
            @input="$v.spaceName.$touch()"
            @blur="$v.spaceName.$touch()"
          />
        </div>
        <div class="form-row">
          <v-textarea
            v-model="description"
            outlined
            name="input-7-4"
            label="Description"
            rows="9"
          />
        </div>
        <div class="form-row">
          <v-combobox
            v-model="selectTags"
            multiple
            outlined
            label="Tags"
            append-icon
            chips
            deletable-chips
            class="tag-input"
            :search-input.sync="search"
            placeholder="Press 'Enter' or 'Tab' key to add tags"
            @keyup.tab="updateTags"
            @paste="updateTags"
          />
        </div>
      </v-form>

      <div class="button-wp">
        <v-btn color="#fff" @click="clear">
          {{ isEdit ? 'Cancel' : 'Reset form' }}
        </v-btn>
        <v-btn color="#EB2F96" @click="submit">
          {{ isEdit ? 'Save' : 'Create space' }}
        </v-btn>
      </div>
    </v-card>
  </section>
</template>

<style lang="scss">
.preview {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.edit-space-container {
  max-width: 628px;
  margin: 20px auto 0;
  min-height: 60vh;
  padding-bottom: 16px;

  .v-card {
    padding: 35px 23px 21px;
  }

  h2 {
    margin: 0 0 15px;
  }

  .form-row {
    width: 100%;
  }

  .upload-photo-wp {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: -5px;
    position: relative;
    padding-bottom: 20px;

    .upload-photo {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 1px dashed rgba(0, 0, 0, 0.38);
      position: relative;
      background-size: cover;
      background-position: center;

      span {
        font-size: 14px;
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
          bottom: -15px;
          left: 0;

          .v-messages__message {
            text-align: center;
          }
        }

        .v-icon {
          color: #000;
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
          padding-bottom: 15px;
        }
      }
    }

    .delete-image {
      position: absolute;
      right: calc(50% - 70px);
      top: 0;
      bottom: 20px;
      color: #666666;
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
              background: rgba(0, 0, 0, 0.2);
              &:before {
                padding-bottom: 0;
                color: #fff;
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

  .v-select--chips {
    .v-chip {
      &__content {
        color: rgba(0, 0, 0, 0.6);
      }

      .tag-input {
        .v-label--active {
          left: 6px !important;
        }
      }

      .v-icon:before {
        content: "\F0156" !important;
      }
    }

    .v-input__slot {
      margin-bottom: 25px;
    }

    .v-text-field__details {
      display: none;
    }
  }

  .button-wp {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: 16px;
    margin-top: 5px;

    button {
      min-width: 110px !important;
      font-size: 17px;
      border: 1px solid #E0E0E0;
      border-color: #E0E0E0 !important;
      border-radius: 4px;
      box-shadow: none;
      text-transform: capitalize;

      &:last-child {
        border: none;
        color: #fff;
      }
    }

    @media (max-width: 768px) {
      & {
        justify-content: space-between;
      }
    }
  }
}
</style>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'
import { environment } from '~/environments/environment'

export default {
  name: 'SpaceEdit',
  mixins: [validationMixin],

  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    spaceItem: {
      type: Object
    }
  },
  validations: {
    spaceName: { required, maxLength: maxLength(50) }
  },

  data: () => ({
    valid: false,
    spaceName: '',
    description: '',
    avatarRules: [
      value => !value || value.size < 2000000 || 'Image should be less than 2 MB!'
    ],
    avatar: [],
    selectTags: [],
    search: '',
    previewImage: null,
    url: environment.ipfsUrl
  }),

  computed: {
    spaceNameErrors () {
      const errors = []
      if (!this.$v.spaceName.$dirty) { return errors }
      !this.$v.spaceName.maxLength && errors.push('Name must be at most 50 characters long')
      !this.$v.spaceName.required && errors.push('Name is required.')
      return errors
    }
  },
  created () {
    if (this.isEdit) {
      this.spaceName = this.spaceItem.content.name
      this.description = this.spaceItem.content.summary
      this.selectTags = this.spaceItem.content.tags
      this.previewImage = this.url + this.spaceItem.content.image
    }
  },

  methods: {
    updateTags () {
      this.$nextTick(() => {
        if (this.search) { this.selectTags.push(...this.search.split(',')) }
        this.$nextTick(() => {
          this.search = ''
        })
      })
    },
    submit () {
      this.$v.$touch()
    },
    clear () {
      this.$v.$reset()
      this.spaceName = ''
      this.description = ''
      this.selectTags = [],
      this.previewImage = null
    },
    selectImage (image) {
      const currentImage = image
      this.previewImage = URL.createObjectURL(currentImage)
    },
    clearImage () {
      this.previewImage = null
    }
  }
}
</script>
