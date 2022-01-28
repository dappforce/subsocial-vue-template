import SharedButtonComponent from '~/components/shared/buttons/SharedButton'

export default {
  title: 'Button/Shared Button',
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
  isShowLabel: false,
  post: {
    id: '312321'
  }
}
