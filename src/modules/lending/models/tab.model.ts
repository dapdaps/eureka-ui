export interface Tab {
  key: TabKey;
  label: string;
}

export enum TabKey {
  Market = 'market',
  Yours = 'yours',
}
