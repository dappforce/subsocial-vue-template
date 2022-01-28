import MdeEditorComponent from '~/components/shared/MdeEditor'

export default {
  title: 'Shared/Mde Editor',
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { MdeEditorComponent },
  template: '<MdeEditor v-bind="$props" :showEditor="true" />'
})

export const MdeEditor = Template.bind({})
