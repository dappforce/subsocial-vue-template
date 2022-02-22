import SpacesDropdownComponent from '~/components/space/SpacesDropdown'

const spaces = [
  {
    id: '1005',
    image: 'QmUktkVTRb6egWVMj4JoBGvSggDnkLKz1xPBiL2iPTMaui',
    name: 'React space',
    ownerId: '3shk6xYyNwwL5yvDVCUoUVoa8iUu3QmsR64kVqi2jL25kyzf',
  }, {
    id: '1006',
    avatar: 'QmPEbKvcptxTmECW2RktS2nvKy4oZZ6KfGqZSJSyNJDbWB',
    image: 'QmPEbKvcptxTmECW2RktS2nvKy4oZZ6KfGqZSJSyNJDbWB',
    name: 'Vue space',
    ownerId: '3shk6xYyNwwL5yvDVCUoUVoa8iUu3QmsR64kVqi2jL25kyzf',
  }, {
    id: '1009',
    avatar: 'QmPWSvVRFPEpd8wfGR4BUMVThYqASd5pAN2AybaKcKw8nV',
    image: 'QmPWSvVRFPEpd8wfGR4BUMVThYqASd5pAN2AybaKcKw8nV',
    name: 'Angular space',
    ownerId: '3shk6xYyNwwL5yvDVCUoUVoa8iUu3QmsR64kVqi2jL25kyzf',
  }
]

export default {
  title: 'Space/Select Space',
  argTypes: {
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { SpacesDropdownComponent },
  data: () => ({ spaces }),
  template: '<SpaceSpacesDropdown v-bind="$props" :spaces="spaces" />'
})

export const SelectSpace = Template.bind({})
SelectSpace.args = {
  isEdit: false
}
