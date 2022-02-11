import QrCodeButtonComponent from '~/components/shared/buttons/QrCodeButton'

export default {
  title: 'Button/Qr Code Button',
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
