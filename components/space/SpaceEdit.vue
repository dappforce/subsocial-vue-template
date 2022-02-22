<template>
  <section class="edit-space-container">
    <v-card>
      <h2 class="edit-space-title">
        {{ getTitle() }}
      </h2>

      <ImageLoader :avatar="avatar" :type="'round'" @avatar="updateImageCID"/>
      <ValidationObserver ref="form" v-slot="{ handleSubmit, handleReset }">
        <form @submit.prevent="handleSubmit(submit)" @reset.prevent="handleReset(clear)">
          <div class="form-row">
            <ValidationProvider v-slot="{ errors }" name="Space name" rules="required">
              <v-text-field
                v-model="name"
                outlined
                :label="'* ' + $t( isProfile ? 'forms.placeholder.profileName' : 'forms.placeholder.spaceName')"
                required
                hide-details="auto"
                :messages="errors[0]"
              />
            </ValidationProvider>
          </div>
          <div class="form-row">
            <mde-editor
              :show-editor="true"
              :text="description"
              :placeholder="$t('forms.placeholder.description')"
              :height="'200px'"
              @contentUpdate="updateDescription"
            />
          </div>
          <div v-if="!isProfile" class="form-row">
            <v-combobox
              v-model="selectTags"
              multiple
              outlined
              :label="$t('forms.fieldName.tags')"
              append-icon
              chips
              deletable-chips
              class="tag-input"
              :search-input.sync="search"
              :placeholder="$t('forms.placeholder.tags')"
              hide-details="auto"
              @keyup.tab="updateTags"
              @paste="updateTags"
            />
          </div>
        </form>
      </ValidationObserver>

      <div class="button-wp">
        <v-btn class="button-third-color" @click="clear">
          {{ isEdit ? $t('buttons.cancel') : 'Reset' }}
        </v-btn>
        <v-btn class="button-main-color" @click="submit">
          {{ isEdit ? $t('buttons.save') : 'Create' }}
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
  margin: $space_large auto 0;
  min-height: 60vh;
  padding-bottom: $space_normal;

  .v-card {
    padding: $space_huge $space_big $space_big;
  }

  .edit-space-title {
    text-transform: capitalize;
    font-size: $font_large;
    margin: 0 0 15px;
  }

  .v-text-field__details {
    padding: 0 !important;
  }

  .form-row {
    width: 100%;
    margin-bottom: $space_big;

    .editor-toolbar, .CodeMirror {
      border-color: $border_outline_gray;
    }

    .CodeMirror-placeholder {
      font-size: $font_normal;
      color: $text_color_dark_gray;
      opacity: 1;
    }

    .v-text-field--outlined fieldset {
      border-color: $input_outline_gray;
    }

    .v-text-field--outlined.v-input--is-focused fieldset, .v-text-field--outlined.v-input--has-state fieldset {
      border-width: 1px;
      border-color: $input_focused_outline;
    }
  }

  .v-select--chips {
    .v-chip {
      &__content {
        color: $text_color_normal;
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

    .v-text-field__details {
      display: none;
    }
  }

  .button-wp {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: $space_normal;
    margin-top: 5px;

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
      text-transform: capitalize;

      &:last-child {
        border: none;
        color: $text_color_white;
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

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator'
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import { SubmittableResult } from '@polkadot/api'
import { OptionId, OptionText } from '@subsocial/types/substrate/classes'
import { IpfsCid } from '@subsocial/types'
import sanitizeHtml from 'sanitize-html'
import { environment } from '~/environments/environment'
import { SpaceListItemData } from '~/models/space/space-list-item.model'
import TransactionButton from '~/components/abstract/TransactionButton.vue'
import { PALLETS, METHODS } from '~/constants/query'
import TransactionService from '~/services/transaction.service'
import { ProfileItemModel } from '~/models/profile/profile-item.model'
import { getNewIdFromEvent } from '~/utils/utils'

extend('required', required)
extend('required', {
  ...required,
  message: 'This field is required'
})

const transactionService = new TransactionService()

@Component({
  components: {
    ValidationProvider,
    ValidationObserver
  }
})
export default class SpaceEdit extends TransactionButton {
  $refs!: {
    form: InstanceType<typeof ValidationObserver>;
  }

  @Prop({
    type: Boolean,
    default: false
  }) isEdit!: boolean

  @Prop({
    type: Boolean,
    default: false
  }) isProfile!: boolean

  @Prop({
    type: Object
  }) spaceItem!: SpaceListItemData

  @Prop({
    type: Object
  }) profileItem!: ProfileItemModel

  space: SpaceListItemData | null = null
  profile: ProfileItemModel | null = null
  name: string = ''
  description: string = ''
  avatar: string = ''
  selectTags: string[] = []
  search: string = ''
  url: string = environment.ipfsUrl
  cid: IpfsCid | undefined

  created () {
    if (this.spaceItem || this.profileItem) {
      this.insertDataInForm()
    }
  }

  insertDataInForm (): void {
    this.name = this.isProfile ? this.profileItem?.name || '' : this.spaceItem.content.name
    this.description = this.isProfile ? this.profileItem?.summary || '' : this.spaceItem.content.about
    this.selectTags = this.isProfile ? [] : this.spaceItem.content.tags
    this.avatar = this.isProfile ? this.profileItem?.avatar || '' : this.spaceItem.content.image ? this.spaceItem.content.image : ''
  }

  updateImageCID (cid: string): void {
    this.avatar = cid
  }

  updateDescription (content: string): void {
    this.description = content
  }

  updateTags (): void {
    this.$nextTick(() => {
      if (this.search) {
        this.selectTags.push(...this.search.split(','))
      }
      this.$nextTick(() => {
        this.search = ''
      })
    })
  }

  submit () {
    this.$refs.form.validate().then((result) => {
      if (result) {
        this.OnCreateOrUpdateSpace()
      }
    })
  }

  clear () {
    this.$refs.form.reset()
    if (this.spaceItem || this.profileItem) {
      this.insertDataInForm()
    }
    this.name = ''
    this.description = ''
    this.selectTags = []
  }

  onFailed (): void {
    if (this.cid) {
      transactionService.removeIpfsContent(this.cid).catch(err => new Error(err))
    }
  }

  onSuccess (result: SubmittableResult): void {
    if (this.isEdit && (this.cid !== this.spaceItem?.struct.contentId || this.cid !== this.profileItem?.contentId)) {
      transactionService.removeIpfsContent(this.spaceItem?.struct.contentId || this.profileItem?.contentId || '').catch(err => new Error(err))
    }

    if (this.isProfile) {
      const id = this.profileItem?.id || getNewIdFromEvent(result)?.toString()

      if (id) {
        this.$router.push(this.$nuxt.localePath('/accounts/' + id))
      }
    } else {
      const id = this.spaceItem?.struct?.id || getNewIdFromEvent(result)?.toString()
      if (id) {
        this.$store.dispatch('space/getSpacesByIds', [id]).then(() => {
          this.$router.push(this.$nuxt.localePath('/' + id))
        })
      }
    }
  }

  validate (): boolean {
    return true
  }

  async OnCreateOrUpdateSpace () {
    const pallet = this.isProfile ? PALLETS.profiles : PALLETS.spaces
    const method = this.getMethods()

    this.cid = await transactionService.saveIpfsContent({
      about: sanitizeHtml(this.description),
      image: this.avatar,
      name: this.name,
      tags: this.selectTags,
      links: [],
      avatar: this.avatar
    })

    if (!this.cid) {
      return
    }
    const params = this.getParams(this.cid)

    await this.initExtrinsic({
      pallet,
      params,
      method
    })

    await this.sentTransaction()
  }

  getParams (cid: IpfsCid) {
    if (this.isProfile) {
      return this.isEdit ? [{ content: { IPFS: cid } }] : [{ IPFS: cid }]
    } else {
      return this.isEdit
        ? [this.spaceItem?.struct.id, { content: { IPFS: cid } }]
        : [
          new OptionId(),
          new OptionText(''),
          { IPFS: cid },
          null
        ]
    }
  }

  getMethods () {
    if (this.isProfile) {
      return this.isEdit ? METHODS.updateProfile : METHODS.createProfile
    } else {
      return this.isEdit ? METHODS.updateSpace : METHODS.createSpace
    }
  }
  
  getTitle () {
    if (this.isProfile) {
      return this.isEdit ? this.$t('forms.titles.editProfile') : this.$t('forms.titles.newProfile')
    } else {
      return this.isEdit ? this.$t('forms.titles.editSpace') : this.$t('forms.titles.newSpace')
    }
  }
}
</script>
