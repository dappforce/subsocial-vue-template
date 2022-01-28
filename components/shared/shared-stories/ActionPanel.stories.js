import ActionPanelComponent from '~/components/shared/ActionPanel'

export default {
  title: 'Shared/Action Panel',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ActionPanelComponent },
  template: '<ActionPanel v-bind="$props" />'
})

export const ActionPanel = Template.bind({})
ActionPanel.args = {
  id: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
  isShowLabel: false,
  handle: 'Subsocial',
  isShowCommentBtn: true,
  isShowSharedBtn: true,
  isShowReplyBtn: false,
  post: {
    isUpvoteActive: true,
    isDownvoteActive: false,
    upvotesCount: 10,
    downvotesCount: 90,
    visibleRepliesCount: 87
  }
}
