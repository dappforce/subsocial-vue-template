import {
  PostData,
  SharedPostStruct,
  SpaceData
} from '@subsocial/types/dto'
import slug from 'slugify'
import BN from 'bn.js'
import { SubmittableResult } from '@polkadot/api'
import i18next from 'i18next'
import { SubDate } from '@subsocial/utils'
import { getNewIdsFromEvent } from '@subsocial/api'
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

export function convertToBNArray (array: string[]) {
  return array.map(el => new BN(el))
}

export function routerParamsLength (value: object) {
  return Object.keys(value).length
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
  return SubDate.formatDate(date)
}

export function toI18next (count: number, key: string, lang: string): string {
  if (i18next.services.pluralResolver) {
    return key + i18next.services.pluralResolver.getSuffix(lang, count)
  } else {
    return key + '_other'
  }
}
