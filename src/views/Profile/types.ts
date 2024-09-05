import type { NetworkOdyssey } from '@/views/networks/list/hooks/useNetworks';
export type Tab = 'InProgress' | 'FavoriteApps' | 'RewardHistory';
export type Column = {
  label: string;
  width: number;
  key: string;
  gap?: number;
  align?: Align;
};

export type Align = 'left' | 'right' | 'center';

export type PagerType = {
  page: number;
  page_size: number;
}
export type DappCategoryType = {
  dapp_id: number;
  category_name: string;
  category_id: number;
}
export type DappNetworkType = {
  dapp_id: number;
  network_id: number;
  chain_id: number;
  dapp_src: string;
}
export type CategoryType = {
  key: number;
  label: string;
  name: string;
  colorRgb: string;

}
export type NetworkType = {
  chainId: number;
  chainName: string;
  icon: string;
  nativeCurrency: NativeCurrency;
  rpcUrls: string[];
  blockExplorers: string;
}

export type NativeCurrency = {
  name: string;
  symbol: string;
  decimals: number;
}

export type DappType = {
  id: number;
  name: string;
  description: string;
  route: string;
  logo: string;
  favorite: number;
  default_chain_id: number;
  priority: number;
  tbd_token: string;
  recommend: boolean;
  recommend_icon: string;
  category_ids: string;
  network_ids: string;
  tag: string;
  native_currency: string;
  theme: string;
  status: number;
  recommend_priority: number;
  dapp_category: DappCategoryType[];
  trading_volume: string;
  trading_volume_general: string;
  tvl: string;
  total_execution: number;
  participants: number;
  trading_volume_change_percent: string;
  participants_change_percent: string;
  dapp_network: DappNetworkType[];
  categories?: CategoryType[];
  networks?: NetworkType[];
  rewards?: Partial<NetworkOdyssey>[];
}

export type FeatureType = {
  relate_id: number;
  id: number;
  account_id: number;
  category: string;
}

type MedalCategory = "dapp" | "invite" | "chain" | "check_in" | "odyssey"
export type MedalType = {
  id: number;
  category: string;
  medal_category: string;
  medal_name: string;
  relate: number;
  level: number;
  level_name: string;
  level_description: string;
  threshold: number;
  trading_volume: number;
  trading_type: null;
  logo: string;
  gem: number;
  online: number;
  completed_status: string;
  completed_percent: string | number;
  completed_threshold: number;
  completed_volume: number;
  animation_url: string;
}
export type FavoriteType = {
  total: number;
  dapps: DappType[];
  features: FeatureType[]
}
export type RewardRecordsType = {
  data: RewardType[];
  total: number;
  total_page: number;
}
export type RewardType = {
  id: number;
  created_at: Date;
  user_id: number;
  title: string;
  source: string;
  logo: string;
  rewards: string;
  category: string;
  relate_id: number;
  reward_time: number;
}

export type InviteListType = {
  data: InviteType[];
  total: number;
  total_active: number;
  medal: MedalType;
}

export type InviteType = {
  code: string;
  status: InviteStatusType;
  invited_user: InvitedUser;
}

export type InvitedUser = {
  address: string;
  avatar: string;
  username: null | string;
}

export enum InviteStatusType {
  Active = "Active",
  Pending = "Pending",
}