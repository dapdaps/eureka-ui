import { optimism } from '@/config/tokens/optimism';

import { basic as beethovenBasic, networks as beethovenNetworks } from '../dapps/beethoven-x';
import { basic as fraxBasic, networks as fraxNetworks } from '../dapps/frax-swap';
import { basic as sushiBasic, networks as sushiNetworks } from '../dapps/sushi-swap';
import { basic as velodromeBasic, networks as velodromeNetworks } from '../dapps/velodrome-v2';

const CHAIN_ID = 10;

export default {
  chainId: CHAIN_ID,
  defalutInputCurrency: optimism['eth'],
  dexs: {
    'Velodrome V2': {
      ...velodromeBasic,
      ...velodromeNetworks[CHAIN_ID]
    },
    'Beethoven X': {
      ...beethovenBasic,
      ...beethovenNetworks[CHAIN_ID]
    },
    SushiSwap: {
      ...sushiBasic,
      ...sushiNetworks[CHAIN_ID]
    },
    'Frax Swap': {
      ...fraxBasic,
      ...fraxNetworks[CHAIN_ID]
    }
  }
};
