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
    line-height: 24px;
    color: rgba(0, 0, 0, 0.87);
    text-align: left;
    font-size: $font-size-normal;
  }
</style>

<script>
export default {
  name: 'Paragraph',

  props: {
    text: {
      type: String,
      default: ''
    },
    isShowMore: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      default: '/'
    },
    marginTop: {
      type: String,
      default: '0'
    },
    marginBottom: {
      type: String,
      default: '0'
    },
    redirect: {
      type: Boolean,
      default: true
    },
    longText: {
      type: String
    }
  },

  data () {
    return {
      spaceAbout: '',
      showMoreActive: false
    }
  },

  created () {
    this.spaceAbout = this.isShowMore ? this.text : this.longText
  },

  methods: {
    showMore (isShowMoreText) {
      if (isShowMoreText) {
        this.spaceAbout = this.longText
        this.showMoreActive = !this.showMoreActive
      } else {
        this.spaceAbout = this.text
        this.showMoreActive = !this.showMoreActive
      }
    }
  }
}
</script>
