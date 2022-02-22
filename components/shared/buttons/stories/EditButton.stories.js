import EditButtonComponent from '~/components/shared/buttons/EditButton'

export default {
  title: 'Button/Edit Button',
  component: EditButtonComponent,
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EditButtonComponent },
  template: '<edit-button v-bind="$props" />'
})

export const EditButton = Template.bind({})
EditButton.args = {
  link: '/edit',
}
