import AccountListItemComponent from '~/components/profile/AccountListItem'

export default {
  title: 'Profile/Account List Item',
  argTypes: {
    type: {
      options: ['follow', 'account'],
      control: 'select'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AccountListItemComponent },
  template: '<ProfileAccountListItem v-bind="$props" />'
})

export const AccountListItem = Template.bind({})
AccountListItem.args = {
  userInfo: {
    avatar: 'QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd',
    name: 'Gbaci',
    id: '3pZ46SkYQdFRhnarSuP89drBCv5wNhtxX1rq9Y1uDFnQbddz',
    isFollowing: true
  },
  type: 'follow'
}
