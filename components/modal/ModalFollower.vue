<template>
  <div data-app>
    <v-dialog
      v-model="openModal"
      max-width="500px"
    >
      <v-card v-if="usersIds" class="v-modal-container">
        <v-card-title>
          {{usersIds.length | numeral('0,0a')}} {{ $tc('plural.'+i18nextKey(usersIds.length, 'follower')) }}
          <v-icon class="close-icon" @click="onClick">
            mdi-close
          </v-icon>
        </v-card-title>

        <v-card flat>
          <v-card-text>
            <ModalInfinityScrollContainer :user-ids="usersIds" />
          </v-card-text>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss">
.v-modal-container {
  .v-card__title {
    display: flex;
    justify-content: space-between;
  }

  .v-card {
    overflow: hidden;
    min-height: 200px;
    max-height: 550px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: none;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $scroll_outline_gray;
      width: 6px;
    }

    .user-item-wp {
      border-bottom: 1px solid $border_outline_gray;
    }
  }
}

</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { toI18next } from '~/utils/utils'

@Component
export default class ModalFollower extends Vue {
  @Prop({
    type: Boolean,
    default: false
  }) isModal!: boolean

  @Prop({
    type: String
  }) spaceId!: string

  openModal: boolean = false
  usersIds: [] = []
  tabs: string[] = [this.$t('tabs.upvotes') as string, this.$t('tabs.downvotes') as string]
  activeTab: string = ''

  @Watch('isModal')
  isModalHandler () {
    this.onClick()
  }

  created (): void {
    this.activeTab = this.tabs[0]

    this.$store.dispatch('accountFollower/getSpaceFollowers', this.spaceId).then((ids) => {
      this.usersIds = ids
    })
  }

  onClick (): void {
    this.openModal = !this.openModal
  }

  i18nextKey (count: number, key: string): string {
    return toI18next(count, key, this.$i18n.locale)
  }
}
</script>
