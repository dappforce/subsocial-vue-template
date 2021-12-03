import OptionButtonComponent from '~/components/shared/OptionButton'

export default {
  title: 'Shared/Button/Option',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { OptionButtonComponent },
  template: '<OptionButton v-bind="$props" />'
})

export const OptionButton = Template.bind({})
