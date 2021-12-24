import SignInButtonComponent from '~/components/shared/buttons/SignInButton'

export default {
  title: 'Shared/Button/SignInButton',
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SignInButtonComponent },
  template: '<SignInButton v-bind="$props" />'
})

export const SignInButton = Template.bind({})
