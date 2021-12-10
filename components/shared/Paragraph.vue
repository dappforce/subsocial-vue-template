<template>
  <div>
    <p v-if="redirect" :style="{ marginBlockStart: marginTop + 'px', marginBlockEnd: marginBottom + 'px' }">
      {{ text }}
      <SeeMore v-if="isShowMore && redirect" :link="link" />
    </p>
    <div v-if="!redirect">
      <div v-if="!isShowMore">
        <p class="markdown-body" :style="{ marginBlockStart: marginTop + 'px', marginBlockEnd: marginBottom + 'px' }" v-html="$md.render(spaceAbout ? spaceAbout : '')" />
      </div>
      <div v-if="isShowMore">
        <div v-if="!showMoreActive" class="less-view">
          <p :style="{ marginBlockStart: marginTop + 'px', marginBlockEnd: marginBottom + 'px' }">
            {{ spaceAbout }}
            <span v-if="isShowMore && !redirect" class="see-more-button" @click="showMore(true)">See more</span>
          </p>
        </div>
        <div v-if="showMoreActive" class="more-view">
          <p class="markdown-body" :style="{ marginBlockStart: marginTop + 'px', marginBlockEnd: marginBottom + 'px' }" v-html="$md.render(spaceAbout ? spaceAbout : '')" />
          <span v-if="isShowMore && !redirect" class="see-more-button" @click="showMore(false)">See less</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  p {
    line-height: $main_line_height;
    color: $color_font_normal;
    text-align: left;
    font-size: $font_normal;
  }
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class FollowButton extends Vue {
  @Prop({
    type: String,
    default: ''
  }) text!: string

  @Prop({
    type: String
  }) longText!: string

  @Prop({
    type: Boolean,
    default: false
  }) isShowMore!: boolean

  @Prop({
    type: Boolean,
    default: true
  }) redirect!: boolean

  @Prop({
    type: String,
    default: '/'
  }) link!: string

  @Prop({
    type: String,
    default: '0'
  }) marginTop!: string

  @Prop({
    type: String,
    default: '0'
  }) marginBottom!: string

  spaceAbout: string = ''
  showMoreActive: boolean = false

  created (): void {
    this.spaceAbout = this.isShowMore ? this.text : this.longText
  }

  showMore (isShowMoreText: boolean): void {
    if (isShowMoreText) {
      this.spaceAbout = this.longText
      this.showMoreActive = !this.showMoreActive
    } else {
      this.spaceAbout = this.text
      this.showMoreActive = !this.showMoreActive
    }
  }
}
</script>
