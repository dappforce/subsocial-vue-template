<template>
  <div>
    <div v-if="list.length">
      <UserItem v-for="(item, index) in list" :key="index" :user-info="item" :type="'follow'" />

      <infinite-loading
        spinner="spiral"
        @infinite="infiniteScroll"
      />
    </div>
    <div v-if="!userIds.length" class="no-reactions">
      No reactions yet
    </div>
    <BounceSpinner v-if="userIds.length && !list.length" />
  </div>
</template>

<style lang="scss">
.no-reactions {
  display: flex;
  justify-content: center;
  font-size: $font-size-secondary-text;
}
</style>

<script>
export default {
  name: 'ModalInfinityScrollContainer',

  props: {
    userIds: {
      type: Array
    }
  },

  data () {
    return {
      startIndex: 20,
      endIndex: 40,
      step: 20,
      list: []
    }
  },

  created () {
    this.getUsersProfile(0, 20)
  },
  methods: {
    infiniteScroll ($state) {
      setTimeout(async () => {
        await this.getUsersProfile(this.startIndex, this.endIndex).then(() => {
          $state.loaded()
          if (this.list.length >= this.userIds.length) {
            $state.complete()
          }

          this.startIndex += this.step
          this.endIndex += this.step
        })
      }, 100)
    },

    async getUsersProfile (start, end) {
      return await this.$store.dispatch('profiles/getProfiles', this.userIds.slice(start, end)).then((res) => {
        this.list.push(...res)
      })
    }
  }
}
</script>
