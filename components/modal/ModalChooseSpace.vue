<template>
  <v-dialog
    v-model="openModal"
    max-width="500px"
  >
    <v-card class="v-modal-container">
      <v-card-title>
        Choose a space for a new post
        <v-icon medium class="close-icon" @click="onClick">
          mdi-close
        </v-icon>
      </v-card-title>

      <v-card flat>
        <div class="space-items-container">
          <SpaceItem v-for="(space, index) in spacesList" :key="index" :space="space" @closeCM="onClick" />
        </div>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="scss">
.v-modal-container {
  height: 370px;

  .v-card {
    height: 306px;
  }

  .v-card__title {
    padding: $space_normal;
    font-weight: 500;
    font-size: $font_large;
  }

  .space-items-container {
    padding: 0 $space_normal $space_normal;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { SpaceListItemData } from '~/models/space/space-list-item.model'

@Component
export default class ModalChooseSpace extends Vue {
  @Prop({
    type: Boolean,
    default: false
  }) isModal!: boolean

  @Prop({
    type: Array
  }) spaces!: SpaceListItemData[]

  @Watch('isModal')
  isModalHandler () {
    this.onClick()
  }

  @Watch('spaces')
  spacesHandler (newVal: SpaceListItemData[], oldVal: SpaceListItemData[]) {
    if (newVal !== oldVal) {
      this.spacesList = newVal
    }
  }

  openModal: boolean = false
  spacesList: SpaceListItemData[] = []

  created () {
    this.spacesList = this.spaces
  }

  onClick (): void {
    this.openModal = !this.openModal
  }
}
</script>
