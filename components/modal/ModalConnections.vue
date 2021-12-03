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
          <v-tabs-slider color="#EB2F96" />
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

  .v-tab--active {
    color: #EB2F96;
  }

  .v-tabs {
    box-shadow: 0 1px 8px rgb(0 0 0 / 20%);
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
        background-color: rgba(0, 0, 0, 0.12);;
        width: 6px;
      }
    }
  }
}

</style>

<script>
export default {
  name: 'ModalConnections',

  props: {
    isModal: {
      type: Boolean,
      default: false
    },
    accountId: {
      type: String
    }
  },

  data () {
    return {
      openModal: false,
      followersUserIds: [],
      followingUserIds: [],
      tabs: ['FOLLOWING', 'FOLLOWERS'],
      activeTab: ''
    }
  },

  watch: {
    isModal (newVal, oldVal) {
      this.onClick()
    }
  },

  created () {
    this.activeTab = this.tabs[0]

    this.$store.dispatch('accountFollower/getAccountFollowers', this.accountId).then((ids) => {
      this.followersUserIds = ids || []
    })

    this.$store.dispatch('accountFollower/getAccountFollowing', this.accountId).then((ids) => {
      this.followingUserIds = ids || []
    })
  },

  methods: {
    onClick () {
      this.openModal = !this.openModal
    }
  }
}
</script>
