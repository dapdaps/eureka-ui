export interface Tab {
  key: TabKey;
  label: string;
  sort: number;
}

export enum TabKey {
  Market = 'market',
  Yours = 'yours'
}
