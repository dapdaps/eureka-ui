export type Tab = 'InProgress' | 'FavoriteApps' | 'RewardHistory';
export type Column = {
  label: string;
  width: number;
  key: string;
  gap?: number;
  align?: Align;
};

export type Align = 'left' | 'right' | 'center';