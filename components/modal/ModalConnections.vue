<template>
  <div class="modal-connections" data-app>
    <v-dialog
      v-model="openModal"
      max-width="500px"
    >
      <v-card class="v-modal-container">
        <v-card-title>
          {{ $t('modals.connections.connections') }}

          <v-icon class="close-icon" @click="onClick">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card>
          <v-tabs
            v-model="activeTab"
            grow
            centered
          >
            <v-tabs-slider class="slider-color" />
            <v-tab
              v-for="(i, index) in tabs"
              :key="i"
              :href="`#tab-${i}`"
            >
              {{ i }} <span class="votes-count">{{ index === 0 ? followingUserIds.length : followersUserIds.length }}</span>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-if="openModal" v-model="activeTab">
            <v-tab-item
              v-for="(i, index) in tabs"
              :key="i"
              :value="`tab-${i}`"
            >
              <v-card flat>
                <v-card-text>
                  <ModalInfinityScrollContainer :user-ids="index === 0 ? followingUserIds : followersUserIds" :type="'connections'" />
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss">
.modal-connections {
  .v-modal-container {
    .v-card__title {
      display: flex;
      justify-content: space-between;
    }

    .v-sheet.v-card {
      box-shadow: none;
    }

    .votes-count {
      font-weight: 400;
      padding-left: 10px;
    }

    .slider-color {
      color: $slider_color;
    }

    .v-tab--active {
      color: $text_color_primary;
    }

    .v-tabs {
      box-shadow: $box_shadow_for_tabs;
      position: relative;
      z-index: 1;
    }

    .v-tabs-items {
      .v-card {
        overflow: hidden;
        max-height: 500px;
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
      }
    }
  }

}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component
export default class ModalConnections extends Vue {
  @Prop({
    type: Boolean,
    default: false
  }) isModal!: boolean

  @Prop({
    type: String
  }) accountId!: string

  openModal: boolean = false
  followersUserIds: string[] = []
  followingUserIds: string[] = []
  tabs: string[] = [this.$t('tabs.following') as string, this.$t('tabs.followers') as string]
  activeTab: string = ''
  userId: string = this.accountId

  @Watch('isModal')
  isModalHandler () {
    this.onClick()
  }

  @Watch('accountId')
  accountIdHandler (newVal: string, oldVal: string) {
    if (newVal !== oldVal) {
      this.userId = newVal
      this.getUserIds()
    }
  }

  created (): void {
    this.activeTab = this.tabs[0]
    this.getUserIds()
  }

  onClick (): void {
    this.openModal = !this.openModal
  }

  getUserIds () {
    this.$store.dispatch('accountFollower/getAccountFollowers', this.userId).then((ids) => {
      this.followersUserIds = ids || []
    })

    this.$store.dispatch('accountFollower/getAccountFollowing', this.userId).then((ids) => {
      this.followingUserIds = ids || []
    })
  }
}
</script>
