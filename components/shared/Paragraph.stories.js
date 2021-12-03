import ParagraphComponent from '~/components/shared/Paragraph'

export default {
  title: 'Shared/Paragraph',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ParagraphComponent },
  template: '<Paragraph v-bind="$props" />'
})

export const Paragraph = Template.bind({})
Paragraph.args = {
  text: 'Dotmarketcap is a website where you can find data of prices, charts, capitalization as well as the latest information and analysis of entire projects on the Polkadot ecosystem. The #DotEcoCap concept is the most accurate and general indicator to measure the overall development of the Polkadot...',
  isShowMore: true,
  marginTop: '10',
  link: '/'
}
