import { SpaceEntity } from '~/models/entities/space-entity.model'
import { Entity } from '~/models/entities/entity.model'

export interface SpaceData {
  ids: Array<string>;
  entities: Entity<SpaceEntity>;
}
