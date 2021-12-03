import CommentMessageComponent from '~/components/shared/CommentMessage'

export default {
  title: 'Shared/Comment Message',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CommentMessageComponent },
  template: '<CommentMessage v-bind="$props" />'
})

export const CommentMessage = Template.bind({})
CommentMessage.args = {
  id: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
  avatarSrc: 'QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd',
  comment: {
    ownerId: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
    ownerName: 'Ricki',
    id: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
    createdAtTime: '1621448028000',
    ownerImageUrl: 'QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd',
    body: 'Dotmarketcap is a website where you can find data of prices, charts, capitalization as well as the latest information and analysis of entire projects on the Polkadot ecosystem. The #DotEcoCap concept is the most accurate and general indicator to measure the overall development of the Polkado'
  }
}
