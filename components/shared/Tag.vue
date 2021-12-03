<template>
  <div :class="size" class="tag">
    {{ tagName }}
  </div>
</template>

<style lang="scss">
.tag {
  display: inline-flex;
  padding: 6px 12px;
  margin-right: 8px;
  color: rgba(0, 0, 0, 0.6);
  background: rgba(33, 33, 33, 0.08);
  border-radius: 16px;
  letter-spacing: 0.25px;
  font-size: $font-size-secondary-text;
  cursor: pointer;
}

.tag.small {
  font-size: 12px;
}

.tag.medium {
  font-size: $font-size-secondary-text;
}

.tag.large {
  font-size: $font-size-normal;
}

.tag.huge {
  font-size: $font-size-title-preview;
}

</style>

<script>
export default {
  name: 'Tag',

  props: {
    tagName: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium'
    }
  }
}
</script>
