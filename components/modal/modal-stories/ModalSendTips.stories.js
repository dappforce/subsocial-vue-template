import ModalSendTipsComponent from '~/components/modal/ModalSendTips'

export default {
  title: 'Modal/Modal Send Tips',
  argTypes: {
    isModal: {
      name: 'Open modal',
      control: 'boolean',
      defaultValue: false
    }
  },
  myBalance: {
    control: {
      type: 'text'
    }
  }
}

const fromAccount = 'bafyreigcayr4dfjmeu6l4phdip3gdymq7zflzt7ojifdc6iyxqn7wkkhuy'
const myBalance = '10000.000'

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ModalSendTipsComponent },
  data: () => ({ myBalance, fromAccount }),
  template: '<ModalSendTips v-bind="$props" :fromAccount="fromAccount" :myBalance="myBalance"/>'
})

export const ModalSendTips = Template.bind({})

ModalSendTips.args = {
  isModal: false,
  myBalance,
  userInfo: {
    avatar: 'QmWRGfA1MwTzF4RRXUv9QqPZTrbzRP7CQGNfTgSgj342w4',
    id: 'bafyreigcayr4dfjmeu6l4phdip3gdymq7zflzt7ojifdc6iyxqn7wkkhuy',
    image: 'QmWRGfA1MwTzF4RRXUv9QqPZTrbzRP7CQGNfTgSgj342w4',
    name: 'Banana Republic',
    followersCount: 5,
    followingAccountsCount: 4,
    followingSpacesCount: 13,
    hasProfile: true
  }
}
