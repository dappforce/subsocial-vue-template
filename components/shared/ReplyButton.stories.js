import ReplyButtonComponent from '~/components/shared/ReplyButton'

export default {
  title: 'Shared/Button/Reply',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ReplyButtonComponent },
  template: '<ReplyButton v-bind="$props" />'
})

export const ReplyButton = Template.bind({})
ReplyButton.args = {
  isShowLabel: false
}
