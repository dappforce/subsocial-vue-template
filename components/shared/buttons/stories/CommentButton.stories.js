import CommentButtonComponent from '~/components/shared/buttons/CommentButton'

export default {
  title: 'Button/Comment Button',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CommentButtonComponent },
  template: '<CommentButton v-bind="$props"/>'
})

export const CommentButton = Template.bind({})

CommentButton.args = {
  id: '312',
  count: 0
}
