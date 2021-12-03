import SharedButtonComponent from '~/components/shared/SharedButton'

export default {
  title: 'Shared/Button/Shared',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SharedButtonComponent },
  template: '<SharedButton v-bind="$props" />'
})

export const SharedButton = Template.bind({})
SharedButton.args = {
  isShowLabel: false
}
