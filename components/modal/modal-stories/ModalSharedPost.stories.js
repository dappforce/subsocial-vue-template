import ModalSharedPostComponent from '~/components/modal/ModalSharedPost'

const post = {
  id: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
  body: '',
  createdAtTime: '1632837930000',
  downvotesCount: 0,
  hiddenRepliesCount: 0,
  imageUrl: 'QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd',
  isComment: false,
  isSharedPost: false,
  isShowMore: false,
  ownerId: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
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
  title: 'Modal/Modal Shared Post',
  argTypes: {
    isModal: {
      name: 'Open modal',
      control: 'boolean',
      defaultValue: false
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ModalSharedPostComponent },
  data: () => ({ post }),
  template: '<ModalSharedPost v-bind="$props" :post="post"/>'
})

export const ModalSharedPost = Template.bind({})

ModalSharedPost.args = {
  isModal: false
}
