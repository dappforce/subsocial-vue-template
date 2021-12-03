import CommentComponent from '~/components/shared/Comment'

export default {
  title: 'Shared/Comment',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CommentComponent },
  template: '<Comment v-bind="$props" />'
})

export const Comment = Template.bind({})
Comment.args = {
  id: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
  avatarSrc: 'QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd',
  count: 10
}
