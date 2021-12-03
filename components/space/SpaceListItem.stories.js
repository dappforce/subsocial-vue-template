import SpaceListItemComponent from '~/components/space/SpaceListItem'

export default {
  title: 'Space Item',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SpaceListItemComponent },
  template: '<SpaceListItem v-bind="$props" />'
})

export const SpaceItem = Template.bind({})
SpaceItem.args = {
  spaceItemData: {
    content: {
      about: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ' +
        'Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      tags: ['subsocial', 'polkadot', 'substrate', 'sofi', 'chain', 'ipfs'],
      isShowMore: true,
      name: 'Subsocial',
      summary: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. ' +
        'Velit officia consequat duis enim velit mollit.',
      image: 'QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd',
      links: [
        'https://rmrk.app',
        'https://twitter.com/rmrkapp',
        'https://t.me/rmrkapp',
        'https://github.com/swader',
        'https://instagram.com/rmrkapp',
        'https://www.youtube.com/channel/UCZ9dCwNm2aErxsYxDdm-AtQ'
      ]
    },
    struct: {
      id: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
      postsCount: 25,
      followersCount: 11,
      handle: 'Subsocial'
    },
    isSpaceView: true,

    id: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8'
  }
}
