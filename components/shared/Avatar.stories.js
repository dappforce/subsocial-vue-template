import AvatarComponent from '~/components/shared/Avatar'

export default {
  title: 'Shared/Avatar',
  argTypes: {
    size: {
      control: 'number'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AvatarComponent },
  template: '<avatar v-bind="$props" />'
})

export const AvatarWithPhoto = Template.bind({})
AvatarWithPhoto.args = {
  src: 'QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd',
  size: 40
}
