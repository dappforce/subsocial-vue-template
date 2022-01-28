import TagComponent from '~/components/shared/Tag'

export default {
  title: 'Shared/Tag',
  argTypes: {
    size: {
      options: ['small', 'medium', 'large', 'huge'],
      control: 'select'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TagComponent },
  template: '<tag v-bind="$props" />'
})

export const Tag = Template.bind({})
Tag.args = {
  tagName: 'subsocial',
  size: 'medium'
}
