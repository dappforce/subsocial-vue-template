import VoteButtonComponent from '~/components/shared/buttons/VoteButton'

export default {
  title: 'Button/Vote Button',
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
  template: '<VoteButtonComponent v-bind="$props" :voteCount="count"  />'
})

export const VoteButton = Template.bind({})
VoteButton.args = {
  type: 'upvote',
  active: false,
  isShowLabel: false,
  count: 0
}
