import YoutubeComponent from '~/components/shared/Youtube'

export default {
  title: 'Shared/Youtube',
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { YoutubeComponent },
  template: '<Youtube v-bind="$props" />'
})

export const Youtube = Template.bind({})
Youtube.args = {
  link: 'https://www.youtube.com/watch?v=E9f-j2JAUFI'
}
