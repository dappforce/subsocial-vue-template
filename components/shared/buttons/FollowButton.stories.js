import FollowButtonComponent from './FollowButton'

export default {
  title: 'Shared/Button/Follow',
  component: FollowButtonComponent,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { FollowButtonComponent },
  template: '<follow-button @onClick="click" v-bind="$props" />'
})

export const FollowButton = Template.bind({})
FollowButton.args = {
  follow: false
}
