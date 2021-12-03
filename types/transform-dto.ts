import {
  PostStruct,
  ProfileStruct,
  SpaceStruct
} from '@subsocial/api/flat-subsocial/flatteners'
import { Content } from './content'

export type TransformSpaceData = {
  spaces: Array<SpaceStruct>;
  contents: Array<Content>;
};

export type TransformDataArray = {
  structs: Array<SpaceStruct> | Array<PostStruct>;
  contents: Array<Content>;
};

export type TransformData = {
  struct: SpaceStruct | PostStruct | ProfileStruct;
  content: Content;
};

export type TransformPostWithAllDetails = {
  posts: Array<PostStruct>;
  spaces: Array<SpaceStruct>;
  profiles: Array<ProfileStruct>;
  contents: Array<Content>;
};
