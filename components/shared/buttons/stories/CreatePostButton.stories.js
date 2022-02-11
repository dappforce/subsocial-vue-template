import CreatePostButtonComponent from '~/components/shared/buttons/CreatePostButton'

export default {
  title: 'Button/Create Post Button',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CreatePostButtonComponent },
  template: '<CreatePostButton v-bind="$props" />'
})

export const CreatePostButton = Template.bind({})
