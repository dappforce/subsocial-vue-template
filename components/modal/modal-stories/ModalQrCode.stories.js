import ModalQrCodeComponent from '~/components/modal/ModalQrCode'

export default {
  title: 'Modal/Modal Qr Code',
  argTypes: {
    isModal: {
      name: 'Open modal',
      control: 'boolean',
      defaultValue: true
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ModalQrCodeComponent },
  template: '<ModalQrCode v-bind="$props" :openModal="isModal" />'
})

export const ModalQrCode = Template.bind({})

ModalQrCode.args = {
  isModal: true,
  address: 'QmWRGfA1MwTzF4RRXUv9QqPZTrbzRP7CQGNfTgSgj342w4'
}
