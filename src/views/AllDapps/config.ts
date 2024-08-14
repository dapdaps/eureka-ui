import { random } from 'lodash';

export const CategoryList = [
  { key: 1, label: 'Bridge', name: 'Bridge', colorRgb: '247,255,154' },
  { key: 2, label: 'Dex', name: 'Swap', colorRgb: '172,252,237' },
  { key: 3, label: 'Lending', name: 'Lending', colorRgb: '173,255,181' },
  { key: 4, label: 'Liquidity', name: 'Liquidity', colorRgb: '170,214,255' },
  { key: 5, label: 'Staking', name: 'Staking', colorRgb: '193,191,255' },
  { key: 6, label: 'Yield', name: 'Yield', colorRgb: '249,181,230' },
  { key: 7, label: 'Launchpad', name: 'Launchpad', colorRgb: '153,114,238' },
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
  { key: '4', position: 'right', width: 72, height: 72, x: -8, y: 10, rotate: random(-45, 45) },
  { key: '2', position: 'left', width: 72, height: 72, x: 19, y: 0, rotate: random(-45, 45) },
  { key: '5', position: 'right', width: 72, height: 72, x: -11, y: 116, rotate: random(-45, 45) },
  { key: '3', position: 'left', width: 72, height: 72, x: -19, y: 116, rotate: random(-45, 45) },
  { key: '6', position: 'right', width: 72, height: 72, x: 30, y: 36, rotate: random(-45, 45) },
];

export const SortList = [
  { key: 1, value: 'volume', label: 'Sort by Volume' },
  { key: 2, value: 'users', label: 'Sort by users' },
  { key: 3, value: 'a-z', label: 'A-Z' },
  { key: 4, value: 'z-a', label: 'Z-A' },
  { key: 5, value: 'create_time', label: 'New launched' },
];

export const PageSize = 18;


export const TrueString = '1';