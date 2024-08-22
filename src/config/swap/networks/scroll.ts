import { scroll } from '@/config/tokens/scroll';

import weths from '../../contract/weth';
import { basic as ambientBasic, networks as ambientNetworks } from '../dapps/ambient';
import { basic as dodoBasic, networks as dodoNetworks } from '../dapps/dodo';
import { basic as IziSwapBasic, networks as IziSwapNetworks } from '../dapps/izi-swap';
import { basic as metavaultV3Basic, networks as metavaultV3Networks } from '../dapps/metavault-v3';
import { basic as skydromeBasic, networks as skydromeNetworks } from '../dapps/skydrome';
import { basic as spaceFiBasic, networks as spaceFiNetworks } from '../dapps/space-fi';
import { basic as sushiBasic, networks as sushiNetworks } from '../dapps/sushi-swap';
import { basic as SyncSwapBasic, networks as SyncSwapNetworks } from '../dapps/sync-swap';
import { basic as univ3Basic, networks as univ3Networks } from '../dapps/uniswapv3';
import { basic as xyBasic, networks as xyNetworks } from '../dapps/xy-finance';
import { basic as zebraBasic, networks as zebraNetworks } from '../dapps/zebra';

const CHAIN_ID = 534352;

export default {
  chainId: CHAIN_ID,
  defalutInputCurrency: scroll['eth'],
  dexs: {
    Ambient: {
      ...ambientBasic,
      ...ambientNetworks[CHAIN_ID],
    },
    'Uniswap V3': {
      ...univ3Basic,
      ...univ3Networks[CHAIN_ID],
    },
    SyncSwap: {
      ...SyncSwapBasic,
      ...SyncSwapNetworks[CHAIN_ID],
    },
    iZiSwap: {
      ...IziSwapBasic,
      ...IziSwapNetworks[CHAIN_ID],
    },
    Zebra: {
      ...zebraBasic,
      ...zebraNetworks[CHAIN_ID],
    },
    DODO: {
      ...dodoBasic,
      ...dodoNetworks[CHAIN_ID],
    },
    SushiSwap: {
      ...sushiBasic,
      ...sushiNetworks[CHAIN_ID],
    },
    SpaceFi: {
      ...spaceFiBasic,
      ...spaceFiNetworks[CHAIN_ID],
    },
    Skydrome: {
      ...skydromeBasic,
      ...skydromeNetworks[CHAIN_ID],
    },
    'Metavault V3': {
      ...metavaultV3Basic,
      ...metavaultV3Networks[CHAIN_ID],
    },
    'XY Finance': {
      ...xyBasic,
      ...xyNetworks[CHAIN_ID],
    },
  },
};
