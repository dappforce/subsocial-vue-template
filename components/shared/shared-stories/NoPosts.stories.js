import NoPostsComponent from '~/components/shared/NoPosts'

export default {
  title: 'Shared/No Posts',
  argTypes: {
    message: {
      control: 'text',
      defaultValue: 'No posts yet'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { NoPostsComponent },
  template: '<NoPosts v-bind="$props" />'
})

export const NoPosts = Template.bind({})
