import ModalLoginComponent from '~/components/modal/ModalLogin'
import { ACCOUNT_STATUS } from '~/models/enum/account-status.enum'

export default {
  title: 'Modal/Modal Login',
  argTypes: {
    isLoginText: {
      name: 'Show sign-in title',
      control: 'boolean',
      defaultValue: true
    },
    isModal: {
      name: 'Open modal',
      control: 'boolean',
      defaultValue: false
    },
    status: {
      options: [ACCOUNT_STATUS.EXTENSION_NOT_FOUND, ACCOUNT_STATUS.ACCOUNTS_NOT_FOUND, ACCOUNT_STATUS.UNAUTHORIZED],
      control: {
        type: 'select',
        labels: {
          1: 'EXTENSION NOT FOUND',
          2: 'ACCOUNTS NOT FOUND',
          3: 'UNAUTHORIZED'
        }
      }

    }

  }
}

const status = ACCOUNT_STATUS.EXTENSION_NOT_FOUND
const isLoginText = true

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ModalLoginComponent },
  data: () => ({ status, isLoginText }),
  template: '<ModalLogin v-bind="$props" :status="status" :isLoginText="isLoginText" />'
})

export const ModalLogin = Template.bind({})

ModalLogin.args = {
  isModal: false,
  status
}
