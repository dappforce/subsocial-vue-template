import PostEditComponent from '~/components/post/PostEdit'

export default {
  title: 'Post Edit',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PostEditComponent },
  template: '<PostEdit v-bind="$props" />'
})

export const PostEdit = Template.bind({})
PostEdit.args = {}