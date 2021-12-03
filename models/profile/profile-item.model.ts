export interface ProfileItem {
  id: string;
  contentId: string;
  followersCount: number;
  followingAccountsCount: number;
  followingSpacesCount: number;
  hasProfile: boolean;
  reputation: number;
  name?: string;
  avatarSrc?: string;
  summary?: string;
  about?: string;
}
