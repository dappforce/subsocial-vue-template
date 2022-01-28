import ModalAdblockComponent from '~/components/modal/ModalAdblock'

export default {
  title: 'Modal/Modal Adblock',
  argTypes: {
    isModal: {
      name: 'Open modal',
      control: 'boolean',
      defaultValue: false
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ModalAdblockComponent },
  template: '<ModalAdblock v-bind="$props" />'
})

export const ModalAdblock = Template.bind({})

ModalAdblock.args = {
  isModal: false
}