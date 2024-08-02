export const CategoryList = [
  { key: 1, label: 'Bridge', colorRgb: '247,255,154' },
  { key: 2, label: 'Dex', colorRgb: '172,252,237' },
  { key: 3, label: 'Lending', colorRgb: '173,255,181' },
  { key: 4, label: 'Liquidity', colorRgb: '170,214,255' },
  { key: 5, label: 'Staking', colorRgb: '193,191,255' },
  { key: 6, label: 'Yield', colorRgb: '249,181,230' },
  { key: 7, label: 'Launchpad', colorRgb: '153,114,238' },
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
  { key: 1, value: 'volume', label: 'Sort by Volume' },
  { key: 2, value: 'users', label: 'Sort by users' },
  { key: 3, value: 'a-z', label: 'A-Z' },
  { key: 4, value: 'z-a', label: 'Z-A' },
  { key: 5, value: 'launched', label: 'New launched' },
];

export const AllNetworks = {
  chain_id: -1,
  id: -1,
  name: 'All Networks',
};

export const PageSize = 18;


export const TrueString = '1';