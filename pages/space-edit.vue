<template>
  <SpaceEdit :is-edit="isEdit" :space-item="space" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SpaceListItemData } from '~/models/space/space-list-item.model'

@Component
export default class SpaceEditPage extends Vue {
  isEdit: boolean = false
  space: SpaceListItemData = {} as SpaceListItemData

  created () {
    this.space = this.$store.getters['space/getSpaceWithContent'](this.$route.query.space)
    if (!this.space) {
      this.$router.push('/')
    }
    this.isEdit = !!this.space
    this.$nuxt.$emit('isShowTabs', false)
  }
}
</script>
