import { Activity } from '@subsocial/types'
import { createActivitiesUrlByAddress, getActivity, getCount } from '~/utils/offchainUtils'

const createFeedUrlByAddress = (address: string) => createActivitiesUrlByAddress(address, 'feed')

export default class FeedService {
  async getFeedCount (myAddress: string) {
    return await getCount(createFeedUrlByAddress(myAddress))
  }

  async getNewsFeed (myAddress: string, offset: number, limit: number): Promise<Activity[]> {
    return await getActivity(createFeedUrlByAddress(myAddress), offset, limit)
  }
}
