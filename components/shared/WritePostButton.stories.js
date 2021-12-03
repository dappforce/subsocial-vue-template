import SendTipsButtonComponent from '~/components/shared/SendTipsButton'

export default {
  title: 'Shared/Button/Send Tips',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SendTipsButtonComponent },
  template: '<send-tips-button @onClick="click" v-bind="$props" />'
})

export const SendTipsButton = Template.bind({})
SendTipsButton.args = {}

