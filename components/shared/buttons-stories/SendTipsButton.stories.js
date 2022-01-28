import WritePostButtonComponent from '~/components/shared/buttons/WritePostButton'

export default {
  title: 'Button/Write Post Button',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { WritePostButtonComponent },
  template: '<send-tips-button @onClick="click" v-bind="$props" />'
})

export const WritePostButton = Template.bind({})
WritePostButton.args = {}
