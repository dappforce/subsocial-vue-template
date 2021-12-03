import PostImageComponent from '~/components/shared/PostImage'

export default {
  title: 'Shared/Post Image',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PostImageComponent },
  template: '<PostImage v-bind="$props" />'
})

export const PostImage = Template.bind({})
PostImage.args = {
  link: '',
  imageSrc: 'https://app.subsocial.network/ipfs/ipfs/QmYS7oGo1FNFCmik9U2mpvabjCgGMUNDe623P9djLtnhbd'
}
