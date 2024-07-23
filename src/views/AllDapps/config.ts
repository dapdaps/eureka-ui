export const CategoryList = [
  { key: 1, label: 'Bridge', value: 41, colorRgb: '247,255,154' },
  { key: 2, label: 'Dex', value: 69, colorRgb: '172,252,237' },
  { key: 3, label: 'Lending', value: 29, colorRgb: '173,255,181' },
  { key: 4, label: 'Liquidity', value: 10, colorRgb: '170,214,255' },
  { key: 5, label: 'Staking', value: 41, colorRgb: '193,191,255' },
  { key: 6, label: 'Yield', value: 41, colorRgb: '249,181,230' },
  { key: 7, label: 'Launchpad', value: 41, colorRgb: '153,114,238' },
];

export interface TitleDapp {
  key: number;
  logo: string;
  width: number;
  height: number;
  position: 'left' | 'right';
  x: number;
  y: number;
}

export const TitleDappList: Omit<TitleDapp, 'logo'>[] = [
  { key: 1, position: 'left', width: 93, height: 93, x: 0, y: 99 },
  { key: 2, position: 'left', width: 89, height: 89, x: 19, y: 0 },
  { key: 3, position: 'left', width: 86, height: 86, x: -19, y: 116 },
  { key: 4, position: 'right', width: 88, height: 88, x: -8, y: 10 },
  { key: 5, position: 'right', width: 86, height: 86, x: -11, y: 116 },
  { key: 6, position: 'right', width: 89, height: 89, x: 30, y: 36 },
];

export const SortList = [
  { key: 1, value: 1, label: 'Sort by TVL' },
  { key: 2, value: 2, label: 'Sort by users' },
  { key: 3, value: 3, label: 'A-Z' },
  { key: 4, value: 4, label: 'Z-A' },
];

export const AllNetworks = {
  chain_id: -1,
  name: 'All Networks',
};

export const PageSize = 18;
