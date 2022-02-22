<script lang="ts">
import { Vue } from 'vue-property-decorator'
import { SubmittableResult } from '@polkadot/api'
import TransactionService from '~/services/transaction.service'
import { MESSAGES } from '~/constants/messages'

const transactionService = new TransactionService()
const waitingSnackbarConfig = {
  show: true,
  text: MESSAGES.WAITING_TX_COMPLETE,
  timeout: -1
}

export type ExtrinsicProps = {
  pallet: string
  method: string
  params: any[]
};

export default abstract class TransactionButton extends Vue {
  extrinsic: any
  signer: any
  accountId: string | undefined
  txUnsub: any
  isSending: boolean = false
  isAuthRequired: boolean = true
  isFreeTx: boolean = false

  abstract onSuccess(result: SubmittableResult): void;
  abstract onFailed(result: SubmittableResult | null): void;
  abstract validate(): boolean;

  async initExtrinsic (props: ExtrinsicProps) {
    if (this.$store.state.profiles.myBalance < 1) {
      this.$nuxt.$emit('isShowTokenAlert', true);
      return
    }
    this.signer = this.$store.state.profiles.signer
    this.accountId = this.$store.state.profiles.currentUser ? this.$store.state.profiles.currentUser.id : undefined
    this.extrinsic = await transactionService.getExtrinsic(props)
  }

  doOnSuccess (result: SubmittableResult) {
    this.onSuccess(result)
  }

  doOnFailed (result: SubmittableResult | null) {
    this.onFailed(result)
    this.setIsSending(false)
    this.$nuxt.$emit('isShowSnackbar', { show: true, text: 'Tx failed' })
  }

  async sentTransaction () {
    this.unsubscribe()
    if (!this.validate()) {
      console.warn('Cannot send a tx because validate() returned false')
      return
    }

    const txType = this.accountId ? 'signed' : 'unsigned'
    console.debug(`Sending ${txType} tx...`)

    this.setIsSending(true)

    if (txType === 'unsigned') {
      if (this.isAuthRequired && !this.isFreeTx) {
        await this.$nuxt.$emit('isShowLoginModal', { isOpen: true, isLoginClicked: false })

        return this.setIsSending(false)
      }
      await this.sendUnsignedTx()
    } else {
      await this.sendSignedTx()
    }
  }

  async onSuccessHandler (result: SubmittableResult) {
    if (!result || !result.status) {
      return
    }

    const { status } = result

    if (status.isFinalized || status.isInBlock) {
      this.setIsSending(false)
      this.unsubscribe()

      const blockHash = status.isFinalized
        ? status.asFinalized
        : status.asInBlock

      console.warn(`✅ Tx finalized. Block hash: ${blockHash.toString()}`)

      result.events
        .filter(({ event: { section } }): boolean => section === 'system')
        .forEach(({ event: { method } }): void => {
          if (method === 'ExtrinsicSuccess') {
            this.doOnSuccess(result)
          } else if (method === 'ExtrinsicFailed') {
            this.doOnFailed(result)
          }
        })
    } else if (result.isError) {
      this.doOnFailed(result)
    } else {
      console.warn(`⏱ Current tx status: ${status.type}`)
    }
  }

  onFailedHandler (err: Error) {
    if (err) {
      const errMsg = `Tx failed: ${err.toString()}`
      console.warn(`❌ ${errMsg}`)
      this.$nuxt.$emit('isShowSnackbar', { show: true, text: errMsg })
      
      if (errMsg.includes('account balance too low')) {
        this.$nuxt.$emit('isShowTokenAlert', true)
      }
    }

    this.doOnFailed(null)
  }

  async sendSignedTx () {
    if (!this.accountId) {
      throw new Error('No account id provided')
    }

    if (!this.signer) {
      throw new Error('No signer provided')
    }

    try {
      const tx = await this.extrinsic.signAsync(this.accountId, {
        signer: this.signer
      })
      this.txUnsub = await tx.send(this.onSuccessHandler.bind(this))
      this.$nuxt.$emit('isShowSnackbar', waitingSnackbarConfig)
    } catch (err: any) {
      this.onFailedHandler(err)
      console.error(err)
    }
  }

  async sendUnsignedTx () {
    try {
      this.txUnsub = await this.extrinsic.send(
        this.onSuccessHandler.bind(this)
      )
      this.$nuxt.$emit('isShowSnackbar', waitingSnackbarConfig)
    } catch (err: any) {
      this.onFailedHandler(err)
    }
  }

  setIsSending (value: boolean) {
    this.isSending = value
  }

  setIsAuthRequired (value: boolean) {
    this.isAuthRequired = value
  }

  setIsFreeTx (value: boolean) {
    this.isFreeTx = value
  }

  unsubscribe () {
    if (this.txUnsub) {
      this.$nuxt.$emit('isShowSnackbar', { show: false })
      this.txUnsub()
    }
  }
}

</script>
