import UserItemComponent from '~/components/shared/UserItem'

export default {
  title: 'Shared/User Item',
  argTypes: {
    type: {
      options: ['follow', 'account'],
      control: 'select'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { UserItemComponent },
  template: '<UserItem v-bind="$props" />'
})

export const UserItem = Template.bind({})
UserItem.args = {
  userInfo: {
    content: {
      avatar: 'QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd',
      name: 'Gbaci',
      id: '3pZ46SkYQdFRhnarSuP89drBCv5wNhtxX1rq9Y1uDFnQbddz',
      isFollowing: true
    },
    id: '3pZ46SkYQdFRhnarSuP89drBCv5wNhtxX1rq9Y1uDFnQbddz'
  },
  type: 'follow'
}
