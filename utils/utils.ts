import {
  AnyId,
  EntityId,
  PostData,
  SpaceData
} from '@subsocial/api/flat-subsocial/dto'
import slug from 'slugify'
import BN from 'bn.js'

import { TransformDataArray } from '~/types/transform-dto'
import { Content } from '~/types/content'

// export const getStateEntityFromArray = <T>(
//   array: Array<AnySubsocialData>,
//   type: 'struct' | 'content' = 'struct'
// ): StateEntity<T> => {
//   const ids: string[] = []
//   const entities: Entity<any> = {}
//   array.map((elem) => {
//     const id: string | undefined =
//       type === 'struct' ? elem.struct.id.toString() : elem.struct.contentId
//     if (id) {
//       ids.push(id)
//       entities[id] = elem[type]
//     }
//   })
//   return { ids, entities }
// }

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
  id: string
): string => {
  return title ? `/@${spaceHandle}/${slug(title)}-${id}` : ''
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
