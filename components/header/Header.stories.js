import HeaderComponent from '~/components/header/Header'
const user = {
  avatar: 'QmWRGfA1MwTzF4RRXUv9QqPZTrbzRP7CQGNfTgSgj342w4',
  id: 'bafyreigcayr4dfjmeu6l4phdip3gdymq7zflzt7ojifdc6iyxqn7wkkhuy',
  image: 'QmWRGfA1MwTzF4RRXUv9QqPZTrbzRP7CQGNfTgSgj342w4',
  name: 'Banana Republic',
  followersCount: 5,
  followingAccountsCount: 4,
  followingSpacesCount: 13,
  hasProfile: true
}

const balance = '10.000'

export default {
  title: 'Header/Header',
  argTypes: {
    balance: {
      control: {
        type: 'text'
      }
    },

    user: {
      control: {
        type: 'object'
      },
      defaultValue: user
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { HeaderComponent },
  data: () => ({ user, balance }),
  template: '<Header v-bind="$props" :user="user" :balance="balance" />'
})

export const Header = Template.bind({ })
Header.args = {
  balance
}
