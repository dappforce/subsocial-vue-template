import ModalConnectionsComponent from '~/components/modal/ModalConnections'

export default {
  title: 'Modal/Modal Connections',
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
  components: { ModalConnectionsComponent },
  template: '<ModalConnections v-bind="$props" :openModal="isModal" />'
})

export const ModalConnections = Template.bind({})

ModalConnections.args = {
  isModal: true
}
