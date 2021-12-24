<template>
  <div class="space-item" @click="onClick">
    <Avatar :id="space.struct.id" :src="space.content.image" :size="40" :name="space.content.name" />
    <span class="space-item-name">{{ space.content.name }}</span>
  </div>
</template>

<style lang="scss">
.space-item {
  padding: 11px 0;
  border-bottom: 1px solid $color_border;
  cursor: pointer;

  .space-item-name {
    font-size: $font_normal;
    font-weight: 500;
    color: $color_black;
    padding-left: $space_normal;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { SpaceListItemData } from '~/models/space/space-list-item.model'

@Component
export default class SpaceItem extends Vue {
  @Prop({
    type: Object
  }) space!: SpaceListItemData

  onClick () {
    this.$router.push('/post-edit/?spaceId=' + this.space.struct.id)
    this.$emit('closeCM', null)
  }
}
</script>
