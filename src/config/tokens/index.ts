import type { Token } from '@/types';

import { arbitrum } from './arbitrum';
import { avalanche } from './avalanche';
import { base } from './base';
import { blast } from './blast';
import { bsc } from './bsc';
import { ethereum } from './ethereum';
import { gnosis } from './gnosis';
import { linea } from './linea';
import { manta } from './manta';
import { mantle } from './mantle';
import { metis } from './metis';
import { mode } from './mode';
import { optimism } from './optimism';
import { polygon } from './polygon';
import { polygonZkevm } from './polygonZkevm';
import { scroll } from './scroll';
import { zkSync } from './zkSync';

const tokens: Record<string, { [k: string]: Token }> = {
  42161: arbitrum,
  43114: avalanche,
  8453: base,
  81457: blast,
  56: bsc,
  1: ethereum,
  100: gnosis,
  59144: linea,
  169: manta,
  5000: mantle,
  1088: metis,
  34443: mode,
  10: optimism,
  137: polygon,
  1101: polygonZkevm,
  534352: scroll,
  324: zkSync,
};

export default tokens;

export const NativeTokenAddressMap: Record<string, string> = {
  ETH: '0x0000000000000000000000000000000000000000',
};
