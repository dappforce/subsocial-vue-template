import AddressComponent from '~/components/shared/Address'

export default {
  title: 'Shared/Address',
  argTypes: {}
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AddressComponent },
  template: '<Address @onClick="click" v-bind="$props" />'
})

export const Address = Template.bind({})
Address.args = {
  address: '5H9VtZCcLbxdfawD8n8N23ox4juj3RsbmAgge3mkLZGdT72H',
  length: 17
}
