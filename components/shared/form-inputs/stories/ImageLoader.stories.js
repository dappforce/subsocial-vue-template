import ImageLoaderComponent from '~/components/shared/form-inputs/ImageLoader'

export default {
  title: 'Inputs/Image Loader',
  argTypes: {
    type: {
      options: ['round', 'square'],
      control: 'select',
      defaultValue: 'round'
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ImageLoaderComponent },
  data: () => ({ }),
  template: '<ImageLoader v-bind="$props" />'
})

export const ImageLoader = Template.bind({})
ImageLoader.args = {
}
