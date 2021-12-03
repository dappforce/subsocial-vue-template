import TokensComponent from '~/components/shared/Tokens'

export default {
  title: 'Shared/Tokens',
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TokensComponent },
  template: '<Tokens v-bind="$props" />'
})

export const Tokens = Template.bind({})
Tokens.args = {
  balance: '100,0030'
}
