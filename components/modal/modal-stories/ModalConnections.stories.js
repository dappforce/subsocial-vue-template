import ModalConnectionsComponent from '~/components/modal/ModalConnections'

export default {
  title: 'Modal/Modal Connections',
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
  components: { ModalConnectionsComponent },
  template: '<ModalConnections v-bind="$props" />'
})

export const ModalConnections = Template.bind({})

ModalConnections.args = {
  isModal: false
}
