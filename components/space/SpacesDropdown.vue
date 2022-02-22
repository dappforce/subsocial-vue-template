<template>
  <div data-app class="space-selector form-row">
    <v-combobox
      v-model="selectedItem"
      :items="spaces"
      item-text="name"
      :label="$t('forms.placeholder.postInSpace')"
      hide-details="auto"
      outlined
      :readonly="isEdit"
      @change="onSelect"
    >
      <template slot="item" slot-scope="data">
        <img :src="imageUrl(data.item)" alt="" class="space-image">  {{ data.item.name }}
      </template>
      <template #selection="data">
        <img :src="imageUrl(selectedItem)" alt="" class="space-image">  {{ selectedItem.name }}
      </template>
    </v-combobox>
  </div>
</template>

<style lang="scss">
.space-selector.form-row {
  margin-top: $space_big;

  .space-image {
    width: 36px;
    height: 36px;
    margin-right: 10px;
    border-radius: 50%;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { SpaceListItemData } from '~/models/space/space-list-item.model'
import { SpaceEntity } from '~/models/entities/space-entity.model'
import { environment } from '~/environments/environment'

@Component
export default class SpacesDropdown extends Vue {
  @Prop({
    type: Boolean
  }) isEdit!: boolean

  @Prop({
    type: String
  }) spaceId!: string

  @Prop({
    type: Boolean,
    default: false
  }) isFilter!: boolean

  selectedItem: SpaceEntity | null | undefined = null
  spaces: SpaceEntity[] = []
  spacesIds: string[] = []

  created () {
    this.spacesIds = this.$store.state.space.myAccountSpaceIds
    if (this.$store.state.space.myAccountSpaceIds.length > 0) {
      this.loadSpaceData()
    } else {
      this.$nuxt.$emit('isSpaceExist', false)
    }

    this.$store.subscribeAction({
      after: (action, state) => {
        if (action.type === 'space/getIsAccountHasSpaces') {
          this.spacesIds = this.$store.state.space.myAccountSpaceIds
          if (this.spacesIds.length > 0) {
            this.loadSpaceData()
          } else {
            this.$nuxt.$emit('isSpaceExist', true)
          }
        }
      }
    })
  }

  onSelect (item: any) {
    this.$emit('selectedSpace', item.id)
  }

  loadSpaceData () {
    this.getSpaces(this.spacesIds).then(() => {
      this.getSpacesWithContent()
    })
  }

  async getSpaces (ids: string[]) {
    await this.$store.dispatch('space/getSpacesByIds', ids)
  }

  async getSpacesWithContent () {
    const spaces = await this.$store.getters['space/getSpacesWithContentByIds'](this.$store.state.space.myAccountSpaceIds)
    const mergedSpaces: SpaceEntity[] = spaces.map((i: SpaceListItemData) => {
      return { ...i.content, ...i.struct }
    })

    this.spaces = this.isFilter ? mergedSpaces.filter(i => i.id !== this.spaceId) : mergedSpaces
    if (this.spaces) {
      this.selectedItem = this.spaces.find(i => i.id === this.spaceId) || this.spaces[0]
      this.$emit('selectedSpace', this.selectedItem?.id)
    }
  }

  imageUrl (space: SpaceEntity) {
    return space ? environment.ipfsUrl + space.image : ''
  }
}
</script>
