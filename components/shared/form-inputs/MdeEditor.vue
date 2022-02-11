<template>
  <div>
    <client-only>
      <vue-easymde
        v-if="showEditor"
        ref="markdownEditor"
        v-model="content"
        class="easy-mde"
        :configs="config"
      />
    </client-only>
  </div>
</template>

<style lang="scss">
.easy-mde {
  .editor-statusbar {
    display: none;
  }

  .editor-preview {
    padding: 0;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator'
import sanitizeHtml from 'sanitize-html'

export interface Config {
  minHeight: string,
  placeholder: string,
  autofocus: boolean,
  spellChecker: boolean,
  sanitizerFunction: (text: string) => {}
}

@Component
export default class MdeEditor extends Vue {
  @Ref('markdownEditor') readonly markdownEditor!: any
  @Prop({
    type: String
  }) text!: string

  @Prop({
    type: Boolean,
    default: false
  }) showEditor!: boolean

  @Prop({
    type: String,
    default: '30px'
  }) height!: string

  @Prop({
    type: String
  }) placeholder!: string

  content: string = ''
  config: Config = {} as Config

  @Watch('text')
  textHandler (newVal: string, oldVal: string) {
    if (newVal !== oldVal) {
      if (!newVal.length) {
        this.easyMde.codemirror.setValue('')
      }
      this.content = newVal
    }
  }

  @Watch('placeholder')
  placeholderHandler (newVal: string, oldVal: string) {
    if (newVal !== oldVal) {
      this.config.placeholder = newVal
    }
  }

  created () {
    this.content = this.text
    this.config = {
      minHeight: this.height,
      placeholder: this.placeholder,
      autofocus: true,
      spellChecker: false,
      sanitizerFunction: (text: string) => sanitizeHtml(text)
    }
  }

  updated () {
    this.easyMde.codemirror.focus()
    this.easyMde.codemirror.on('update', () => {
      this.$emit('contentUpdate', this.content)
    })
  }

  get easyMde () {
    return this.markdownEditor.easymde
  }
}
</script>
