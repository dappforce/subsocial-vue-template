import LeftSideMenuComponent from '~/components/shared/LeftSideMenu'

export default {
  title: 'Shared/Left Side Menu',
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LeftSideMenuComponent },
  template: '<LeftSideMenu v-bind="$props" />'
})

export const LeftSideMenu = Template.bind({})
