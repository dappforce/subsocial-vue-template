<template>
  <div>
    <div v-if="list.length">
      <UserItem v-for="(item, index) in list" :key="index" :user-info="item" :type="'follow'" />

      <infinite-loading
        spinner="spiral"
        @infinite="infiniteScroll"
      />
    </div>
    <div v-if="!userIds.length " class="no-reactions">
      {{ type === 'likes' ? $t('modals.infinityScroll.noReactionsYet') : $t('modals.infinityScroll.noDataYet') }}
    </div>
    <BounceSpinner v-if="userIds.length && !list.length" />
  </div>
</template>

<style lang="scss">
.no-reactions {
  display: flex;
  justify-content: center;
  font-size: $font_small;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { ProfileStruct } from '@subsocial/types/dto'
import { config } from '~/config/config'

const stepNumber = config.infinityScrollOffset

@Component
export default class ModalInfinityScrollContainer extends Vue {
  @Prop({
    type: Array
  }) userIds!: string[]

  @Prop({
    type: String,
    default: 'likes'
  }) type!: string

  defaultStart: number = 0
  defaultEnd: number = stepNumber
  startIndex: number = stepNumber
  endIndex: number = stepNumber * 2
  step: number = stepNumber
  list: ProfileStruct[] = []

  created () {
    this.getUsersProfile(this.defaultStart, this.defaultEnd)
  }

  infiniteScroll ($state: any) {
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
  }

  async getUsersProfile (start: number, end: number) {
    return await this.$store.dispatch('profiles/getProfiles', this.userIds.slice(start, end)).then((res) => {
      this.list.push(...res)
    })
  }
}
</script>
