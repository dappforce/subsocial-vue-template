import { SpaceContent, SpaceStruct } from '@subsocial/types/dto'
import { EntityListData } from '../../types/entity-data.type'

export type HasHandle = {
  handle: string;
  id: string
}

export type SpaceContentExtend = SpaceContent & HasHandle;

export type SpaceListItemData = EntityListData<SpaceStruct, SpaceContentExtend>;
