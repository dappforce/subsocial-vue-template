import EditSpaceButtonComponent from '~/components/shared/buttons/EditSpaceButton'

export default {
  title: 'Button/Edit Space Button',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { EditSpaceButtonComponent },
  template: '<EditSpaceButton v-bind="$props" />'
})

export const EditSpaceButton = Template.bind({})
