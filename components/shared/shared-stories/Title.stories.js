import TitleComponent from '~/components/shared/Title'

export default {
  title: 'Shared/Title',
  argTypes: {
    size: {
      options: ['medium', 'large'],
      control: 'select'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TitleComponent },
  template: '<Title v-bind="$props" />'
})

export const Title = Template.bind({})
Title.args = {
  size: 'medium',
  link: '/',
  name: 'Subsocial'
}
