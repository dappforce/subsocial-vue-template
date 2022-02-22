import CommentReplyComponent from '~/components/comment/CommentReply'

export default {
  title: 'Comment/Comment Reply',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CommentReplyComponent },
  template: '<CommentReply v-bind="$props" />'
})

export const CommentReply = Template.bind({})
CommentReply.args = {
  id: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
  avatarSrc: 'QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd'
}
