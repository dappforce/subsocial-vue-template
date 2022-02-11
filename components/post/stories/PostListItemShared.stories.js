import PostListItemSharedComponent from '~/components/post/PostListItemShared'

const sharedPost = {
  body: '',
  createdAtTime: '1632837930000',
  downvotesCount: 0,
  hiddenRepliesCount: 0,
  imageUrl: 'QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd',
  isComment: false,
  isSharedPost: false,
  isShowMore: false,
  ownerName: 'Subsocial',
  postLink: '/@subsocial/Your-comment-is-a-post-188',
  repliesCount: 0,
  sharesCount: 0,
  spaceId: '1',
  spaceName: 'Subsocial',
  summary:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ... ',
  tags: ['FAQ', 'SEO', 'UX', 'Feature'],
  title: 'Anonouncing The Subsocial Spacers Program 2.0',
  upvotesCount: 2,
  visibleRepliesCount: 0,
  ownerImageUrl: 'QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd'
}

export default {
  title: 'Post/Shared Post Item',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PostListItemSharedComponent },
  data: () => ({ sharedPost }),
  template: '<PostListItemShared v-bind="$props" :sharedPost="sharedPost" />'
})

export const SharedPostItem = Template.bind({})
SharedPostItem.args = {
  currentUserId: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
  postItemData: {
    body: '',
    createdAtTime: '1632837930000',
    downvotesCount: 0,
    hiddenRepliesCount: 0,
    imageUrl: 'QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd',
    isComment: false,
    isSharedPost: false,
    isShowMore: false,
    ownerName: 'Subsocial',
    postLink: '/@subsocial/Your-comment-is-a-post-188',
    repliesCount: 0,
    sharesCount: 0,
    spaceId: '1',
    spaceName: 'Subsocial',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ... ',
    tags: ['FAQ', 'SEO', 'UX', 'Feature'],
    title: 'Anonouncing The Subsocial Spacers Program 2.0',
    upvotesCount: 2,
    visibleRepliesCount: 0,
    ownerImageUrl: 'QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd'
  },
  noReactions: true,
  sharedPost
}
