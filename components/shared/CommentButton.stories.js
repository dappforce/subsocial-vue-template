import CommentButtonComponent from '~/components/shared/CommentButton'

export default {
  title: 'Shared/Button/Comment',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CommentButtonComponent },
  template: '<CommentButton v-bind="$props" />'
})

export const CommentButton = Template.bind({})
