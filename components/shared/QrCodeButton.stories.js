import QrCodeButtonComponent from '~/components/shared/QrCodeButton'

export default {
  title: 'Shared/Button/QrCodeButton',
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { QrCodeButtonComponent },
  template: '<QrCodeButton v-bind="$props" />'
})

export const QrCodeButton = Template.bind({})
QrCodeButton.args = {
  address: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8'
}
