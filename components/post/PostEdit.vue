<template>
  <section class="edit-post-container">
    <v-card>
      <h2>{{ isEdit ? 'Edit' : 'New' }} post</h2>

      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="basil"
        grow
      >
        <v-tabs-slider class="slider-color" />

        <v-tab
          v-for="item in items"
          :key="item"
          :href="'#' + item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item
          :key="items[0]"
          :value="items[0]"
        >
          <div class="upload-photo-wp" :class="{ loaded: !!previewImage }">
            <div class="upload-photo" :style="{ backgroundImage: 'url(' + previewImage + ')' }">
              <v-file-input
                v-model="avatar"
                prepend-icon="mdi-camera-outline"
                color="#000"
                :rules="avatarRules"
                @change="selectImage"
              />
              <span v-if="!previewImage" class="upload-title">Upload cover image</span>
              <span v-if="!previewImage" class="image-recommendations">Image should be less than 2 MB</span>
            </div>
          </div>

          <v-form v-model="valid">
            <div class="form-row">
              <v-text-field
                v-model="postName"
                :counter="50"
                outlined
                label="      Post title"
              />
            </div>
            <div class="form-row">
              <v-textarea
                v-model="description"
                :error-messages="descriptionErrors"
                :counter="2500"
                required
                outlined
                auto-grow
                name="input-7-4"
                label="* Post body"
                @input="$v.description.$touch()"
                @blur="$v.description.$touch()"
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
        </v-tab-item>

        <v-tab-item
          :key="items[1]"
          :value="items[1]"
        >
          <v-form v-model="valid">
            <div class="form-row youtube-container">
              <v-text-field
                v-model="videoUrl"
                :error-messages="videoUrlErrors"
                outlined
                label="* Video URL"
                required
                @input="$v.videoUrl.$touch()"
                @blur="$v.videoUrl.$touch()"
              />
              <client-only>
                <Youtube v-if="videoUrl" :link="videoUrl" />
              </client-only>
            </div>
            <div class="form-row">
              <v-text-field
                v-model="postName"
                :counter="50"
                outlined
                label="Post title"
                @input="$v.postName.$touch()"
                @blur="$v.postName.$touch()"
              />
            </div>
            <div class="form-row">
              <v-textarea
                v-model="description"
                :counter="2500"
                outlined
                auto-grow
                name="input-7-4"
                label="Post body"
                @input="$v.description.$touch()"
                @blur="$v.description.$touch()"
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
        </v-tab-item>
      </v-tabs-items>
      <div class="button-wp">
        <v-btn color="#fff" @click="clear">
          {{ isEdit ? 'Cancel' : 'Reset form' }}
        </v-btn>
        <v-btn class="btn-main-color" @click="submit">
          {{ isEdit ? 'Save' : 'Create post' }}
        </v-btn>
      </div>
    </v-card>
  </section>
</template>

<style lang="scss">
.edit-post-container {
  max-width: 628px;
  margin:$space_large auto 0;
  min-height: 60vh;
  padding-bottom: $space_normal;

  .v-card {
    padding: 35px 23px 21px;

    .v-tabs {
      border-bottom: 1px solid #E0E0E0;

      .slider-color {
        color: $color_primary;
      }
    }

    .v-tabs-items {
      background: $color_white;
    }
  }

  h2 {
    margin: 0;
  }

  .form-row {
    width: 100%;
  }

  .youtube-container {
    margin-top: 15px;
  }

  .upload-photo-wp {
    display: flex;
    justify-content: center;
    width: 100%;
    position: relative;
    padding-bottom: $space_large;
    margin-top: $space_normal;

    .upload-photo {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 98px;
      border-radius: $border_small;
      border: 1px solid rgba(0, 0, 0, 0.38);

      span {
        font-size: $font_small;
        line-height: 20px;
        letter-spacing: 0.25px;
        margin-top: 3px;
        position: absolute;
        bottom: 55px;
        font-weight: 400;
      }

      .image-recommendations {
        font-size: $font_small;
        line-height: $normal_line_height;
        letter-spacing: 0.4px;
        color: rgba(0, 0, 0, 0.38);
        bottom: 35px;
      }

      .v-input {
        display: block;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        flex: none;

        .v-input__prepend-outer {
          display: flex;
          width: 100%;
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

        .v-input__slot {
          display: none;
        }

        .v-input__control {
          position: absolute;
          bottom: 0;
        }

        .v-icon {
          color: $color_black;
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
              background: $button_hover;
              &:before {
                padding-bottom: 0;
                color: $color_white;
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

  .v-chip {
    &__content {
      color: $main_text_color;
    }
  }

  .button-wp {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: $space_normal;
    margin-top: 5px;

    .btn-main-color {
      color: $color_primary;
    }

    button {
      min-width: 110px !important;
      font-size: $font_normal;
      border: 1px solid #E0E0E0;
      border-color: #E0E0E0 !important;
      border-radius: $border_small;
      box-shadow: none;
      text-transform: capitalize;

      &:last-child {
        border: none;
        color: $color_white;
      }
    }

    @media (max-width: 768px) {
      & {
        justify-content: space-between;
      }
    }
  }

  .tag-input {
    .v-label--active {
      left: 6px !important;
    }
  }
}
</style>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  name: 'PostEdit',
  mixins: [validationMixin],

  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    postItem: {
      type: Object
    }
  },
  validations: {
    postName: { maxLength: maxLength(50) },
    description: { required, maxLength: maxLength(2500) },
    videoUrl: { required }
  },

  data () {
    return {
      tab: null,
      items: ['article', 'video'],
      valid: false,
      postName: '',
      description: '',
      avatarRules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
      ],
      avatar: [],
      selectTags: [],
      search: '',
      videoUrl: '',
      previewImage: ''
    }
  },

  computed: {
    postNameErrors () {
      const errors = []
      if (!this.$v.postName.$dirty) { return errors }
      !this.$v.postName.maxLength && errors.push('Title must be at most 50 characters long')
      !this.$v.postName.required && errors.push('Title is required.')
      return errors
    },
    descriptionErrors () {
      const errors = []
      if (!this.$v.description.$dirty) { return errors }
      !this.$v.description.maxLength && errors.push('Name must be at most 2500 characters long')
      !this.$v.description.required && errors.push('Post body is required.')
      return errors
    },
    videoUrlErrors () {
      const errors = []
      if (!this.$v.videoUrl.$dirty) { return errors }
      !this.$v.videoUrl.required && errors.push('Post body is required.')
      return errors
    }
  },

  watch: {
    tab (newVal, oldVal) {
      if (newVal !== oldVal) {
        // this.clear()
      }
    }
  },

  created () {
    if (this.isEdit) {
      this.postName = this.postItem.title
      this.description = this.postItem.body
      this.selectTags = this.postItem.tags
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
      this.postName = ''
      this.description = ''
      this.videoUrl = ''
      this.selectTags = []
    },
    selectImage (image) {
      const currentImage = image
      this.previewImage = URL.createObjectURL(currentImage)
    }
  }
}
</script>
