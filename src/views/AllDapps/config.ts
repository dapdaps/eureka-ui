import { random } from 'lodash';

export const CategoryList = [
  { key: 1, label: 'Bridge', name: 'Bridge', colorRgb: '247,255,154' },
  { key: 2, label: 'Dex', name: 'Swap', colorRgb: '172,252,237' },
  { key: 3, label: 'Lending', name: 'Lending', colorRgb: '173,255,181' },
  { key: 4, label: 'Liquidity', name: 'Liquidity', colorRgb: '170,214,255' },
  { key: 5, label: 'Staking', name: 'Staking', colorRgb: '193,191,255' },
  { key: 6, label: 'Yield', name: 'Yield', colorRgb: '249,181,230' },
  { key: 7, label: 'Launchpad', name: 'Launchpad', colorRgb: '153,114,238' }
];

export interface TitleDapp {
  key: string;
  logo: string;
  width: number;
  height: number;
  position: 'left' | 'right';
  x: number;
  y: number;
  rotate?: number;
}

export const TitleDappList: Omit<TitleDapp, 'logo'>[] = [
  { key: '1', position: 'left', width: 72, height: 72, x: 0, y: 99, rotate: random(-45, 45) },
  { key: '4', position: 'right', width: 72, height: 72, x: -250, y: 10, rotate: random(-45, 45) },
  { key: '2', position: 'left', width: 72, height: 72, x: 100, y: 0, rotate: random(-45, 45) },
  { key: '5', position: 'right', width: 72, height: 72, x: -200, y: 116, rotate: random(-45, 45) },
  { key: '3', position: 'left', width: 72, height: 72, x: 150, y: 116, rotate: random(-45, 45) },
  { key: '6', position: 'right', width: 72, height: 72, x: -80, y: 36, rotate: random(-45, 45) }
];

export const SortList: {
  key: number;
  value: string;
  label: string;
  variable: any;
}[] = [
  { key: 1, value: 'volume', label: 'Sort by Volume', variable: 'trading_volume_general' },
  { key: 2, value: 'tvl', label: 'Sort by TVL', variable: 'tvl' },
  { key: 3, value: 'a-z', label: 'A-Z', variable: 'name' },
  { key: 4, value: 'z-a', label: 'Z-A', variable: 'name' },
  { key: 5, value: 'create_time', label: 'New launched', variable: 'id' }
];

export const PageSize = 18;

export const TrueString = '1';
