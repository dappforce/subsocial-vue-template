import NotificationItemComponent from '~/components/shared/NotificationItem'

export default {
  title: 'Shared/Notification Item',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { NotificationItemComponent },
  template: '<notification-item v-bind="$props" />'
})

export const NotificationItem = Template.bind({})
NotificationItem.args = {
  notification: {
    avatarSrc: 'https://app.subsocial.network/ipfs/ipfs/Qmasp4JHhQWPkEpXLHFhMAQieAH1wtfVRNHWZ5snhfFeBe',
    account: '3osmnRNnrcScHsgkTJH1xyBF5kGjpbWHsGrqM31BJpy4vwn8',
    userName: 'Poco',
    date: '2021-10-20T22:00:30.000Z',
    event: "CommentCreated",
    isOwnerPost: true,
    isOwnerSpace: false,
    postName: '(webpack)-hot-middleware/client.js?reload=true&quiet=false&noInfo=undefined',
    spaceName: ''
  }
}
