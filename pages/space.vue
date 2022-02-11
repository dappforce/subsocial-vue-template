<template>
  <div>
    <SpaceEdit v-if="havePermission" :is-edit="isEdit" :space-item="space" />
    <div v-if="!havePermission && space" class="error">
      {{ $t('generalMessages.dontHavePermission', {type: $t('general.space')}) }}
    </div>
    <BounceSpinner v-if="!havePermission && !space" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SpaceListItemData } from '~/models/space/space-list-item.model'

@Component
export default class SpaceEditPage extends Vue {
  isEdit: boolean = false
  space: SpaceListItemData | null = null
  havePermission: boolean = false
  spaceId: string | null = null

  created () {
    this.spaceId = this.$route.query.space as string

    if (this.$store.state.loading.isLoading) {
      this.space = this.spaceId ? this.$store.getters['space/getSpaceWithContent'](this.spaceId) : null
      this.isUserCanEdit()
    } else {
      const unsubscribe = this.$store.subscribe((mutation) => {
        if (mutation.type === 'profiles/SET_CURRENT_USER' && this.space === null && this.spaceId) {
          this.$store.dispatch('space/getSpaceById', this.spaceId).then((space) => {
            this.space = space
            this.isUserCanEdit()
            unsubscribe()
          })
        }
      })
    }

    if (this.spaceId) {
      this.isEdit = true
    } else {
      this.havePermission = !this.havePermission
    }
  }

  isUserCanEdit () {
    const user = this.$store.state.profiles.currentUser
    if (user.id === this.space?.struct?.ownerId) {
      this.havePermission = !this.havePermission
    }
  }
}
</script>
