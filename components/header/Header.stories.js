import HeaderComponent from '~/components/header/Header'

export default {
  title: 'Header',
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HeaderComponent },
  template: '<Header v-bind="$props" />'
})

export const Header = Template.bind({})
Header.args = {
  socialName: 'Subsocial',
  showTabs: false,
  tabLinks: ['posts', 'spaces']
}
