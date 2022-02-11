import {
  AnyId,
  EntityId,
  PostData, 
  SharedPostStruct,
  SpaceData
} from '@subsocial/types/dto'
import slug from 'slugify'
import BN from 'bn.js'

import { SubmittableResult } from '@polkadot/api'
import dayjs from 'dayjs'
import { TransformDataArray } from '~/types/transform-dto'
import { Content } from '~/types/content'
import { config } from '~/config/config'

export function getNewIdFromEvent (txResult: SubmittableResult): BN | undefined {
  const [newId] = getNewIdsFromEvent(txResult)
  return newId
}

export const transformEntityDataArray = (
  array: Array<SpaceData> | Array<PostData>
): TransformDataArray => {
  const structs: any[] = []
  const contents: Content[] = []
  array.map((data: SpaceData | PostData) => {
    if (data.content && data.struct.contentId) {
      structs.push(data.struct)
      contents.push({ id: data.struct.contentId, ...data.content })
    }
  })

  return { structs, contents }
}

export const getPostLink = (
  spaceHandle: string,
  title: string,
  id: string,
  isHandle: boolean
): string => {
  return title ? `/${isHandle ? '@' : ''}${spaceHandle}/${slug(title)}-${id}` : ''
}

export function idToBn (id: AnyId): BN {
  return BN.isBN(id) ? id : new BN(id)
}

export function bnsToIds (bnIds: BN[]): EntityId[] {
  return bnIds.map(bnToId)
}

export function bnToId (bnId: BN): EntityId {
  return bnId.toString()
}

export function convertToBNArray (array: string[]) {
  return array.map(el => new BN(el))
}

export function routerParamsLength (value: object) {
  return Object.keys(value).length
}

export function getNewIdsFromEvent (txResult: SubmittableResult): BN[] {
  const newIds: BN[] = []
  txResult.events.find((event) => {
    const { event: { data, method } } = event
    if (method.includes('Created')) {
      const [, ...ids] = data.toArray()
      newIds.push(...ids as unknown as BN[])
      return true
    }
    return false
  })

  return newIds
}

export function getPostIdFromLink (link: string | null) {
  return link ? link.trim().split('-').pop() : ''
}

export function getIsPostOwner (ownerId: string, currentUseId: string | undefined): boolean {
  if (currentUseId) {
    return ownerId === currentUseId
  }
  return false
}

export function selectPostStructByIds (ids: string[], state: SharedPostStruct[]): SharedPostStruct[] {
  const structs: SharedPostStruct[] = []
  ids.forEach((id) => {
    const struct: any = state.find(i => i.id === id)
    if (struct) {
      structs.push(struct)
    }
  })
  return structs
}

export function isMobile () {
  if (process.browser) {
    if (window.innerWidth <= config.mobileScreenWidth) {
      return true
    } else {
      return false
    }
  } else { return false }
}

export function toDate (date: number | string) {
  const diff = dayjs().diff(dayjs(date), 'days')

  if (diff < config.weekDays) {
    return dayjs(date).fromNow().toLowerCase()
  } else if (diff > config.weekDays && diff < config.yearDays) {
    return dayjs(date).format('D MMM')
  } else {
    return dayjs(date).format('D MMM YY')
  }
}
