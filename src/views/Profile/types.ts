export type Tab = 'InProgress' | 'FavoriteApps' | 'RewardHistory';
export type Column = {
  label: string;
  width: number;
  key: string;
  gap?: number;
  align?: Align;
};

export type Align = 'left' | 'right' | 'center';

export type MedalType = {
  "id": number;
  "category": string;
  "medal_category": "dapp";
  "medal_name": string;
  "relate": number;
  "level": number;
  "level_name": string;
  "level_description": string;
  "threshold": number;
  "trading_volume": number;
  "trading_type": string;
  "chain_id": number;
  "logo": string;
  "completed_percent": string;
  "completed_status": string;
  "gem": number;
  "online": number
}
export type FavoriteType = {
  
}