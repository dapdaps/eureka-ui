import { zkSync } from '@/config/tokens/zkSync';

import { basic as muteBasic, networks as muteNetworks } from '../dapps/mute';
import { basic as spaceFiBasic, networks as spaceFiNetworks } from '../dapps/space-fi';
import { basic as syncSwapBasic, networks as syncSwapNetworks } from '../dapps/sync-swap';
import { basic as veSyncBasic, networks as veSyncNetworks } from '../dapps/ve-sync';
import { basic as velocoreV2Basic, networks as velocoreV2Networks } from '../dapps/velocore-v2';
import { basic as zkSwapBasic, networks as zkSwapNetworks } from '../dapps/zk-swap';

const CHAIN_ID = 324;

export default {
  chainId: CHAIN_ID,
  defalutInputCurrency: zkSync['eth'],
  dexs: {
    SyncSwap: {
      ...syncSwapBasic,
      ...syncSwapNetworks[CHAIN_ID],
    },
    Mute: {
      ...muteBasic,
      ...muteNetworks[CHAIN_ID],
    },
    'zkSwap Finance': {
      ...zkSwapBasic,
      ...zkSwapNetworks[CHAIN_ID],
    },
    'Velocore V2': {
      ...velocoreV2Basic,
      ...velocoreV2Networks[CHAIN_ID],
    },
    SpaceFi: {
      ...spaceFiBasic,
      ...spaceFiNetworks[CHAIN_ID],
    },
    veSync: {
      ...veSyncBasic,
      ...veSyncNetworks[CHAIN_ID],
    },
  },
};
