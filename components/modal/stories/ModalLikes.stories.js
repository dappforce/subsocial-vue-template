import ModalLikesComponent from '~/components/modal/ModalLikes'

export default {
  title: 'Modal/Modal Likes',
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
  components: { ModalLikesComponent },
  template: '<ModalLikes v-bind="$props" :openModal="isModal" />'
})

export const ModalLikes = Template.bind({})

ModalLikes.args = {
  isModal: true
}
