import AddressComponent from '~/components/shared/Address'
import ProfileItemComponent from '~/components/profile/ProfileItem'

export default {
  title: 'Profile Item',
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ProfileItemComponent },
  template: '<ProfileItem v-bind="$props" />'
})

export const ProfileItem = Template.bind({})
ProfileItem.args = {
  profileData: {
    id: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
    contentId: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
    followersCount: 10,
    followingAccountsCount: 54,
    followingCount: 20,
    followingSpacesCount: 23,
    hasProfile: true,
    reputation: 100,
    name: 'Oliver King',
    avatar: 'QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd',
    summary: '',
    about: ''
  }
}
