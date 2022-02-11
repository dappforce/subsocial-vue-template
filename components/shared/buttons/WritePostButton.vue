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
  background-color: $button_bg_primary !important;
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
    color: $text_color_white;
    font-size: $font_normal;
    flex: initial;
  }

  &:disabled {
    border: none;
    background-color: $button_bg_disabled !important;

    .v-btn__content {
      color: $text_color_disabled;
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
    if (this.$store.state.profiles.currentUser) {
      this.$router.push(this.$nuxt.localePath('/post?new'))
    }
  }
}
</script>
