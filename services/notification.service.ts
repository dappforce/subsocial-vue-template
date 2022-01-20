import { Activity } from '@subsocial/types'
import { createActivitiesUrlByAddress, getActivity, getCount } from '~/utils/offchainUtils'

const createNotificationsUrlByAddress = (address: string) => createActivitiesUrlByAddress(address, 'notifications')

export default class NotificationService {
  async getNotifications (myAddress: string, offset: number, limit: number): Promise<Activity[]> {
    return await getActivity(createNotificationsUrlByAddress(myAddress), offset, limit)
  }

  async getNotificationsCount (myAddress: string) {
    return await getCount(createNotificationsUrlByAddress(myAddress))
  }
}
