import SnackbarComponent from '~/components/shared/Snackbar'

export default {
  title: 'Shared/Snackbar',
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SnackbarComponent },
  template: '<Snackbar v-bind="$props" />'
})

export const Snackbar = Template.bind({})
Snackbar.args = {
  defaultTimeout: 20000000000,
  defaultText: 'Lorem ip sum',
  defaultShow: true
}
