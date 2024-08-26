import type { Token } from '@/types';

import { arbitrumTokens } from './arbitrum';
import { avalancheTokens } from './avalanche';
import { baseTokens } from './base';
import { blastTokens } from './blast';
import { bscTokens } from './bsc';
import { ethereumTokens } from './ethereum';
import { gnosisTokens } from './gnosis';
import { lineaTokens } from './linea';
import { mantaTokens } from './manta';
import { mantleTokens } from './mantle';
import { metisTokens } from './metis';
import { optimismTokens } from './optimism';
import { polygonTokens } from './polygon';
import { polygonZkevmTokens } from './polygonZkevm';
import { scrollTokens } from './scroll';
import { zkSyncTokens } from './zkSync';

export default {
  42161: arbitrumTokens,
  8453: baseTokens,
  1: ethereumTokens,
  43114: avalancheTokens,
  56: bscTokens,
  59144: lineaTokens,
  1088: metisTokens,
  10: optimismTokens,
  137: polygonTokens,
  100: gnosisTokens,
  1101: polygonZkevmTokens,
  324: zkSyncTokens,
  5000: mantleTokens,
  534352: scrollTokens,
  169: mantaTokens,
  81457: blastTokens,
} as { [key: number]: { [key: string]: Token } };
