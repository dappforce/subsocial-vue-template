import ReplyButtonComponent from '~/components/shared/buttons/ReplyButton'

export default {
  title: 'Button/Reply Button',
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
