import NotificationItemComponent from '~/components/shared/NotificationItem'

export default {
  title: 'Shared/Notification Item',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { NotificationItemComponent },
  template: '<notification-item v-bind="$props" />'
})

export const NotificationItem = Template.bind({})
NotificationItem.args = {
  notification: {
    profile: {
      avatar: 'QmWRGfA1MwTzF4RRXUv9QqPZTrbzRP7CQGNfTgSgj342w4',
      id: 'bafyreigcayr4dfjmeu6l4phdip3gdymq7zflzt7ojifdc6iyxqn7wkkhuy',
      image: 'QmWRGfA1MwTzF4RRXUv9QqPZTrbzRP7CQGNfTgSgj342w4',
      name: 'Banana Republic',
      followersCount: 5,
      followingAccountsCount: 4,
      followingSpacesCount: 13,
      hasProfile: true
    },
    post: {
      body: 'New feed post',
      contentId: 'bafyreihrukzr3uiw73txy74fqwcpeosdsv2lykdaie3l3dsese7urx372u',
      createdAtBlock: 511670,
      createdAtTime: 1643042184000,
      createdByAccount: '3shk6xYyNwwL5yvDVCUoUVoa8iUu3QmsR64kVqi2jL25kyzf',
      downvotesCount: 0,
      hidden: false,
      hiddenRepliesCount: 0,
      id: '339',
      isComment: false,
      isRegularPost: false,
      isSharedPost: true,
      isShowMore: false,
      isUpdated: false,
      ownerId: '3shk6xYyNwwL5yvDVCUoUVoa8iUu3QmsR64kVqi2jL25kyzf',
      repliesCount: 0,
      score: 0,
      sharedPostId: '337',
      sharesCount: 0,
      spaceId: '1005',
      summary: 'New feed post',
      upvotesCount: 1,
      visibleRepliesCount: 0
    },
    activity: {
      account: '3oh6WLmBwpGvgPHYFa65hnH2Vunq7kifKQW7xQ38Bw3YmEkB',
      agg_count: 0,
      aggregated: true,
      block_number: '551520',
      comment_id: null,
      date: '2022-01-27T11:01:24.001Z',
      event: 'PostReactionCreated',
      event_index: 2,
      following_id: null,
      parent_comment_id: null,
      post_id: '339',
      space_id: null
    }

  }
}
