import { FeeAmount } from '@uniswap/v3-sdk';
import JSBI from 'jsbi';

export const ZOOM_LEVELS: Record<FeeAmount, ZoomLevels> = {
  [FeeAmount.LOWEST]: {
    initialMin: 0.999,
    initialMax: 1.001,
    min: 0.00001,
    max: 1.5,
  },
  [FeeAmount.LOW]: {
    initialMin: 0.999,
    initialMax: 1.001,
    min: 0.00001,
    max: 1.5,
  },
  [FeeAmount.MEDIUM]: {
    // initialMin: 0.5,
    // initialMax: 2,
    initialMin: 0.00001,
    initialMax: 2.5,
    min: 0.00001,
    max: 20,
  },
  [FeeAmount.HIGH]: {
    initialMin: 0.5,
    initialMax: 2,
    min: 0.00001,
    max: 20,
  },
}

export interface ZoomLevels {
  initialMin: number
  initialMax: number
  min: number
  max: number
}

export interface TickProcessed {
  tick: number
  liquidityActive: JSBI
  liquidityNet: JSBI
  price0: string
}
export interface ChartEntry {
  activeLiquidity: number
  price0: number
}
export type Ticks = Array<{ __typename?: 'Tick', liquidityNet: any, price0: any, price1: any, tick: any }>;
