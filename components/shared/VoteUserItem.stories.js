import VoteUserItemComponent from '~/components/shared/VoteUserItem'

export default {
  title: 'Shared/Vote User Item',
  argTypes: {
    type: {
      options: ['follow', 'account'],
      control: 'select'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { VoteUserItemComponent },
  template: '<VoteUserItem v-bind="$props" />'
})

export const VoteUserItem = Template.bind({})
VoteUserItem.args = {
  userInfo: {
    avatar: 'QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd',
    name: 'Gbaci',
    id: '3pZ46SkYQdFRhnarSuP89drBCv5wNhtxX1rq9Y1uDFnQbddz',
    isFollowing: true
  },
  type: 'follow'
}
