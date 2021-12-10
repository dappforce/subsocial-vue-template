<template>
  <div :class="size" class="tag">
    {{ tagName }}
  </div>
</template>

<style lang="scss">
.tag {
  display: inline-flex;
  padding: 6px $space_small;
  margin-right: $space_tiny;
  color: $main_text_color;
  background: rgba(33, 33, 33, 0.08);
  border-radius: 16px;
  letter-spacing: 0.25px;
  font-size: $font_small;
  cursor: pointer;
}

.tag.medium {
  font-size: $font_small;
}

.tag.large {
  font-size: $font_normal;
}

.tag.huge {
  font-size: $font_large;
}

</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Tag extends Vue {
  @Prop({
    type: String,
    default: ''
  }) tagName!: string

  @Prop({
    type: String,
    default: 'medium'
  }) size!: string
}
</script>
