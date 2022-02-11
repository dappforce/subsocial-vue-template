import SendTipsButtonComponent from '~/components/shared/buttons/SendTipsButton'

export default {
  title: 'Button/Send Tips Button',
  argTypes: {
  }
}

const isAuth = true

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SendTipsButtonComponent },
  data: () => ({ isAuth }),
  template: '<send-tips-button v-bind="$props" :isAuth="isAuth" />'
})

export const SendTipsButton = Template.bind({})
SendTipsButton.args = {}
