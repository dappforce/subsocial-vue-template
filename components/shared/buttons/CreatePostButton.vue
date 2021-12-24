<template>
  <div>
    <v-btn class="create-post-btn" @click="onClick">
      + New Post
    </v-btn>
    <ModalChooseSpace :is-modal="isOpenModal" :spaces="spaces" />
  </div>
</template>

<style lang="scss">
.create-post-btn {
  border: 1px solid $color_black;
  border-radius: $border_small;
  background-color: $color_white !important;
  box-shadow: none;
  margin-right: $space_normal;

  .v-btn__content {
    font-weight: 500;
    font-size: $font_normal;
    line-height: 125%;
    text-align: center;
    color: $color_black;
    text-transform: capitalize;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SpaceListItemData } from '~/models/space/space-list-item.model'

@Component
export default class CreatePostButton extends Vue {
  spacesIds: string[] = []
  isOpenModal: boolean = false
  spaces: SpaceListItemData[] = []

  created () {
    const unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'space/UPDATE_SPACE' && !this.spaces.length) {
        this.spacesIds = this.$store.state.space.myAccountSpaceIds
        if (this.$store.state.space.myAccountSpaceIds.length > 1) {
          this.loadSpaceData()
        }
        unsubscribe()
      }
    })

    this.$store.subscribeAction({
      after: (action, state) => {
        if (action.type === 'space/getIsAccountHasSpaces') {
          this.spacesIds = this.$store.state.space.myAccountSpaceIds
          if (this.spacesIds.length > 1) {
            this.loadSpaceData()
          }
        }
      }
    })
  }

  loadSpaceData () {
    this.getSpaces(this.spacesIds).then(() => {
      this.getSpacesWithContent()
    })
  }

  onClick () {
    if (this.spacesIds.length === 1) {
      this.$router.push('/post-edit/?spaceId=' + this.spacesIds[0])
    } else {
      this.isOpenModal = !this.isOpenModal
    }
  }

  async getSpaces (ids: string[]) {
    await this.$store.dispatch('space/getSpacesByIds', ids)
  }

  async getSpacesWithContent () {
    this.spaces = await this.$store.getters['space/getSpacesWithContentByIds'](this.$store.state.space.myAccountSpaceIds)
  }
}
</script>
