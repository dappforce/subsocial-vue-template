import { Entity } from '~/models/entities/entity.model'
import { PostEntity } from '~/models/entities/post-entity.model'

export interface PostData {
  ids: Array<string>;
  entities: Entity<PostEntity>;
}
