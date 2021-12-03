import TabsComponent from '~/components/shared/Tabs'

export default {
  title: 'Shared/Tabs',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TabsComponent },
  template: '<Tabs v-bind="$props" />'
})

export const Tabs = Template.bind({})
Tabs.args = {
  tabLinks: ['posts', 'spaces']
}
