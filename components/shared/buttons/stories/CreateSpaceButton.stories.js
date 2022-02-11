import CreateSpaceButtonComponent from '~/components/shared/buttons/CreateSpaceButton'

export default {
  title: 'Button/Create Space Button',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { CreateSpaceButtonComponent },
  template: '<CreateSpaceButton v-bind="$props" />'
})

export const CreateSpaceButton = Template.bind({})
