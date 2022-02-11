import { ProfileData } from '@subsocial/types/dto'

export type PolkadotAccount = {
  address: string;
  name: string;
};

export type Meta = {
  name: string
}

export type PolkadotAccountWithMeta = {
  address: string;
  meta: Meta;
};

export type Balance = {
  accountId: any;
  freeBalance: any;
};

export type AccountData = {
  id: string;
  balance: string;
  name: string;
  avatar?: string;
};

export type AccountRawData = {
  accounts: Array<PolkadotAccountWithMeta>;
  balances: Array<Balance>;
  profiles: Array<ProfileData>;
};
