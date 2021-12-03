import SpaceEditComponent from '~/components/space/SpaceEdit'

export default {
  title: 'Space Edit',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SpaceEditComponent },
  template: '<SpaceEdit v-bind="$props" />'
})

export const SpaceEdit = Template.bind({})
SpaceEdit.args = {}