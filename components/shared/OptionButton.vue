<template>
  <v-menu
    v-model="showMenu"
    bottom
    :offset-y="true"
  >
    <template #activator="{ on, attrs }">
      <v-icon
        v-bind="attrs"
        medium
        class="options-button"
        color="#000000DE"
        v-on="on"
        @click="openMenu"
      >
        mdi-dots-vertical
      </v-icon>
    </template>

    <v-list class="option-items">
      <v-list-item v-if="!noReactions">
        <v-list-item-title @click.stop="openReactions">
          View reactions
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>View on IPFS</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title>Hide</v-list-item-title>
      </v-list-item>
    </v-list>
    <ModalLikes v-if="isOpen" :key="postId" :is-modal="isOpenReaction" :post-id="postId" />
  </v-menu>
</template>

<style lang="scss">
.options-button {
  width: 24px;
  height: 24px;
  line-height: 24px;
}
.option-items {
  .v-list-item {
    cursor: pointer;

    &:hover {
      background-color: rgba(0,0,0,0.05);
    }
  }
}
</style>

<script>
export default {
  name: 'OptionButton',

  props: {
    postId: {
      type: String
    },
    accountId: {
      type: String
    },
    noReactions: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      closeOnClick: true,
      showMenu: false,
      isOpenReaction: false,
      isOpen: false
    }
  },

  watch: {
    isOpen (newVal, oldVal) {
      this.isOpen = newVal
    }
  },

  created () {
    this.$nuxt.$on('isModalClose-' + this.postId, () => {
      this.isOpen = false
    })
  },

  beforeDestroy () {
    this.isOpenReaction = false
  },

  methods: {
    openReactions () {
      this.isOpenReaction = !this.isOpenReaction
      this.showMenu = false
    },

    openMenu () {
      this.isOpen = true
    }
  }
}
</script>
