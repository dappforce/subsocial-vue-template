import { Entity } from '~/models/entities/entity.model'
import { ProfileEntity } from '~/models/entities/profile-entity.model'

export interface ProfileData {
  ids: Array<string>;
  entities: Entity<ProfileEntity>;
}
