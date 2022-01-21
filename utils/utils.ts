import {
  AnyId,
  EntityId,
  PostData,
  SpaceData
} from '@subsocial/api/flat-subsocial/dto'
import slug from 'slugify'
import BN from 'bn.js'

import { SubmittableResult } from '@polkadot/api'
import { SharedPostStruct } from '@subsocial/api/flat-subsocial/flatteners'
import { TransformDataArray } from '~/types/transform-dto'
import { Content } from '~/types/content'

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

export const sliceEntityArray = (
  entityArray: Array<any>,
  contentEntities: any,
  start: number,
  end: number
) => {
  const entityData: any[] = []

  entityArray.slice(start, end).map((struct) => {
    if (struct.contentId) {
      const content = contentEntities[struct.contentId]
      content ? entityData.push({ struct, content }) : null
    }
  })

  return entityData
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

export function convertBN (value: BN) {
  return value.toString()
}

export function convertToBNArray (array: string[]) {
  return array.map(el => new BN(el))
}

export function convertToBN (value: string) {
  return new BN(value)
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
    const struct = state.find(i => i.id === id)
    if (struct) {
      structs.push(struct)
    }
  })
  return structs
}

export function isMobile () {
  if (process.browser) {
    if (window.innerWidth <= 760) {
      return true
    } else {
      return false
    }
  } else { return false }
}
