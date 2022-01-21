import axios from 'axios'
import { Activity } from '@subsocial/types'
import { environment } from '~/environments/environment'

const { offchainUrl } = environment

function getOffchainUrl (subUrl: string): string {
  return `${offchainUrl}/v1/offchain${subUrl}`
}

export const createActivitiesUrlByAddress = (address: string, entity: 'feed' | 'notifications' | 'activities') =>
  getOffchainUrl(`/${entity}/${address}`)

const axiosRequest = async (url: string) => {
  try {
    const res = await axios.get(url)
    if (res.status !== 200) {
      console.error('Failed request to offchain with status', res.status)
    }

    return res
  } catch (err) {
    console.error('Failed request to offchain with error', err)
    return err
  }
}

export const getActivity = async (url: string, offset: number, limit: number): Promise<Activity[]> => {
  try {
    const res = await axiosRequest(`${url}?offset=${offset}&limit=${limit}`)
    const { data } = res
    return data
  } catch (err) {
    console.error('Failed to get activities from offchain with error', err)
    return []
  }
}

export const getCount = async (url: string): Promise<number> => {
  try {
    const res = await axiosRequest(`${url}/count`)
    const { data } = res
    return data
  } catch (err) {
    console.error('Failed to get count of activities from offchain with error', err)
    return 0
  }
}
