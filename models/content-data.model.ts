import { Entity } from '~/models/entities/entity.model'
import { ContentEntity } from '~/models/entities/content-entity.model'

export interface ContentData {
  ids: Array<string>;
  entities: Entity<ContentEntity>;
}
