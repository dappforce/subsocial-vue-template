import SeeMoreComponent from '~/components/shared/SeeMore'

export default {
  title: 'Shared/See More',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SeeMoreComponent },
  template: '<SeeMore v-bind="$props" />'
})

export const SeeMore = Template.bind({})
SeeMore.args = {
  link: '/'
}
