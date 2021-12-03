import LinkIconsComponent from '~/components/shared/LinkIcons'

export default {
  title: 'Shared/Link Icons',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LinkIconsComponent },
  template: '<LinkIcons v-bind="$props" />'
})

export const LinkIcons = Template.bind({})
LinkIcons.args = {
  links: [
    'https://rmrk.app',
    'https://twitter.com/rmrkapp',
    'https://t.me/rmrkapp',
    'https://github.com/swader',
    'https://instagram.com/rmrkapp',
    'https://www.youtube.com/channel/UCZ9dCwNm2aErxsYxDdm-AtQ'
  ]
}
