import SnackbarComponent from '~/components/shared/Snackbar'

export default {
  title: 'Shared/Snackbar',
  argTypes: {}
}

const snackbar = true
const defaultTimeout = 20000000000

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SnackbarComponent },
  data: () => ({ snackbar, defaultTimeout }),
  template: '<Snackbar v-bind="$props" :snackbar="snackbar" :defaultTimeout="defaultTimeout" />'
})

export const Snackbar = Template.bind({})
Snackbar.args = {
  defaultTimeout: 20000000000,
  defaultText: 'Lorem ip sum',
  defaultShow: true
}
