import FollowButtonComponent from '../FollowButton'

export default {
  title: 'Button/Follow Button',
  component: FollowButtonComponent,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FollowButtonComponent },
  template: '<follow-button v-bind="$props" />'
})

export const FollowButton = Template.bind({})
FollowButton.args = {
  follow: false
}
