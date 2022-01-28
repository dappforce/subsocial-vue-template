<template>
  <v-tooltip top :disabled="isHaveSpace">
    <template #activator="{ on }">
      <div class="btn-tooltip-wrapper" v-on="on">
        <v-btn
          depressed
          class="write-post-btn"
          :disabled="!isHaveSpace"
          @click="onClick"
        >
          {{ $t('buttons.writePost') }}
        </v-btn>
      </div>
    </template>
    <span>Tooltip</span>
  </v-tooltip>
</template>

<style lang="scss">
.write-post-btn {
  background-color: $color_primary !important;
  height: $buttons_height;
  border: none;
  box-sizing: border-box;
  border-radius: $border_small;
  font-style: normal;
  font-weight: 500;
  line-height: $normal_line_height;
  letter-spacing: 1.25px;
  text-transform: capitalize;

  .v-btn__content {
    color: $color_white;
    font-size: $font_normal;
    flex: initial;
  }

  &:disabled {
    border: none;
    background-color: $color_shadow !important;

    .v-btn__content {
      color: $color_disabled_gray;
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import StorageService from '~/services/storage.service'

const storageService = new StorageService()

@Component
export default class WritePostButton extends Vue {
  @Prop({
    type: String
  }) spaceId!: string

  @Prop({
    type: Boolean,
    default: true
  }) isHaveSpace!: boolean

  onClick () {
    if (this.spaceId) {
      storageService.setCurrentSpaceId(this.spaceId)
    }
    this.$router.push(this.$nuxt.localePath('/post?new'))
  }
}
</script>
