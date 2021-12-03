import AccountDrawerComponent from '~/components/shared/AccountDrawer'

export default {
  title: 'Shared/Account Drawer',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AccountDrawerComponent },
  template: '<AccountDrawer v-bind="$props" />'
})

export const AccountDrawer = Template.bind({})
AccountDrawer.args = {
  isOpen: false,
  user: {
    avatar: 'QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd',
    name: 'Gbaci',
    id: '3pZ46SkYQdFRhnarSuP89drBCv5wNhtxX1rq9Y1uDFnQbddz',
    address: '3pZ46SkYQdFRhnarSuP89drBCv5wNhtxX1rq9Y1uDFnQbddz',
    followingCount: 10,
    followersCount: 10
  },
  accounts: [
    {
      name: 'Gbaci',
      id: '3pZ46SkYQdFRhnarSuP89drBCv5wNhtxX1rq9Y1uDFnQbddz',
      avatar: 'QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd'
    }
  ]
}
