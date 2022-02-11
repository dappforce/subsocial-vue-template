import SignInButtonComponent from '~/components/shared/buttons/SignInButton'

export default {
  title: 'Button/Sign In Button',
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SignInButtonComponent },
  template: '<SignInButton v-bind="$props" />'
})

export const SignInButton = Template.bind({})
