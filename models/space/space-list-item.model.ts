import { SpaceContent } from '@subsocial/api/flat-subsocial/dto'
import { SpaceStruct } from '@subsocial/api/flat-subsocial/flatteners'
import { EntityListData } from '../../types/entity-data.type'

export type HasHandle = {
  handle: string;
  id: string
}

export type SpaceContentExtend = SpaceContent & HasHandle;

export type SpaceListItemData = EntityListData<SpaceStruct, SpaceContentExtend>;
