import CommentComponent from '~/components/comment/Comment'

export default {
  title: 'Comment/Comment Input',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CommentComponent },
  template: '<Comment v-bind="$props" :showSpinner="false" />'
})

export const CommentInput = Template.bind({})
CommentInput.args = {
  id: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
  avatarSrc: 'QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd',
  count: 10
}
