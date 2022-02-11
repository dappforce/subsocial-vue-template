import ModalFollowerComponent from '~/components/modal/ModalFollower'

export default {
  title: 'Modal/Modal Follower',
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
  components: { ModalFollowerComponent },
  template: '<ModalFollower v-bind="$props" :openModal="isModal" />'
})

export const ModalFollower = Template.bind({})

ModalFollower.args = {
  isModal: true
}
