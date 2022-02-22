import MdeEditorComponent from '~/components/shared/form-inputs/MdeEditor'

export default {
  title: 'Inputs/Markdown Editor',
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MdeEditorComponent },
  template: '<MdeEditor v-bind="$props" :showEditor="true" />'
})

export const MarkdownEditor = Template.bind({})
