import VoteButtonComponent from '~/components/shared/VoteButton'

export default {
  title: 'Shared/Button/Vote',
  argTypes: {
    type: {
      options: ['upvote', 'downvote'],
      control: 'select'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { VoteButtonComponent },
  template: '<VoteButtonComponent v-bind="$props" />'
})

export const VoteButton = Template.bind({})
VoteButton.args = {
  type: 'upvote',
  active: false,
  isShowLabel: false,
  count: 0
}
