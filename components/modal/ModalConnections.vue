<template>
  <v-dialog
    v-model="openModal"
    max-width="500px"
  >
    <v-card class="v-modal-container">
      <v-card-title>
        Connections

        <v-icon medium class="close-icon" @click="onClick">
          mdi-close
        </v-icon>
      </v-card-title>
      <v-card>
        <v-tabs
          v-model="activeTab"
          grow
          centered
          slider-color="yellow"
        >
          <v-tabs-slider class="slider-color" />
          <v-tab
            v-for="i in tabs"
            :key="i"
            :href="`#tab-${i}`"
          >
            {{ i }} <span class="votes-count">{{ i === 'FOLLOWING' ? followingUserIds.length : followersUserIds.length }}</span>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab">
          <v-tab-item
            v-for="i in tabs"
            :key="i"
            :value="`tab-${i}`"
          >
            <v-card flat>
              <v-card-text>
                <ModalInfinityScrollContainer :user-ids="i === 'FOLLOWING' ? followingUserIds : followersUserIds" />
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
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
    color: $color_primary;
  }

  .v-tab--active {
    color: $color_primary;
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
        background-color: rgba(0, 0, 0, 0.12);
        width: 6px;
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
  tabs: string[] = ['FOLLOWING', 'FOLLOWERS']
  activeTab: string = ''

  @Watch('isModal')
  isModalHandler () {
    this.onClick()
  }

  created (): void {
    this.activeTab = this.tabs[0]

    this.$store.dispatch('accountFollower/getAccountFollowers', this.accountId).then((ids) => {
      this.followersUserIds = ids || []
    })

    this.$store.dispatch('accountFollower/getAccountFollowing', this.accountId).then((ids) => {
      this.followingUserIds = ids || []
    })
  }

  onClick (): void {
    this.openModal = !this.openModal
  }
}
</script>
