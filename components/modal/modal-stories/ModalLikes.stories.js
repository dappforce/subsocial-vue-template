import ModalLikesComponent from '~/components/modal/ModalLikes'

export default {
  title: 'Modal/Modal Likes',
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
  components: { ModalLikesComponent },
  template: '<ModalLikes v-bind="$props" />'
})

export const ModalLikes = Template.bind({})

ModalLikes.args = {
  isModal: false
}
