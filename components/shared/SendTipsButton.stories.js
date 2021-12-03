import WritePostButtonComponent from '~/components/shared/WritePostButton'

export default {
  title: 'Shared/Button/Write Post',
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

