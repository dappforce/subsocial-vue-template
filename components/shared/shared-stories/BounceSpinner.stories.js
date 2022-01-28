import BounceSpinnerComponent from '~/components/shared/BounceSpinner'

export default {
  title: 'Shared/Bounce Spinner',
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { BounceSpinnerComponent },
  template: '<BounceSpinner v-bind="$props" />'
})

export const BounceSpinner = Template.bind({})
