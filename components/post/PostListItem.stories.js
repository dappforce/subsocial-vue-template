import avatar from '../../assets/image/avatar1.png'
import imageURL from '../../assets/image/post-image-example.png'
import PostListItemComponent from '~/components/post/PostListItem'

export default {
  title: 'Post Item',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PostListItemComponent },
  template: '<PostListItem v-bind="$props" />'
})

export const PostItem = Template.bind({})
PostItem.args = {
  postItemData: {
    id: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
    body: '',
    createdAtTime: '1632837930000',
    downvotesCount: 0,
    hiddenRepliesCount: 0,
    imageUrl: imageURL,
    isComment: false,
    isSharedPost: false,
    isShowMore: false,
    ownerId: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
    ownerName: 'Subsocial',
    postLink: '/@subsocial/Your-comment-is-a-post-188',
    repliesCount: 0,
    sharesCount: 0,
    spaceId: '1',
    spaceName: 'subsocial',
    summary:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ... ',
    tags: ['FAQ', 'SEO', 'UX', 'Feature'],
    title: 'Anonouncing The Subsocial Spacers Program 2.0',
    upvotesCount: 2,
    visibleRepliesCount: 0,
    ownerImageUrl: 'QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd'
  }
}
