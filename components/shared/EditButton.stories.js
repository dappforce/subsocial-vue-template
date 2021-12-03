import EditButtonComponent from '~/components/shared/EditButton'

export default {
  title: 'Shared/Button/Edit',
  component: EditButtonComponent,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EditButtonComponent },
  template: '<edit-button @onClick="click" v-bind="$props" />'
})

export const EditButton = Template.bind({})
EditButton.args = {
  link: '/edit'
}
