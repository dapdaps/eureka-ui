import { polygonZkevm } from '@/config/tokens/polygonZkevm';

import chains from '../../chains';
import { basic as balancerBasic, networks as balancerNetworks } from '../dapps/balancer';
import { basic as pancakeSwapBasic, networks as pancakeSwapNetworks } from '../dapps/pancake-swap';
import { basic as quickSwapBasic, networks as quickSwapNetworks } from '../dapps/quick-swap';
import { basic as sushiBasic, networks as sushiNetworks } from '../dapps/sushi-swap';

const CHAIN_ID = 1101;

export default {
  ...chains[CHAIN_ID],
  defalutInputCurrency: polygonZkevm['eth'],
  dexs: {
    QuickSwap: {
      ...quickSwapBasic,
      ...quickSwapNetworks[CHAIN_ID],
    },
    Balancer: {
      ...balancerBasic,
      ...balancerNetworks[CHAIN_ID],
    },
    'Pancake Swap': {
      ...pancakeSwapBasic,
      ...pancakeSwapNetworks[CHAIN_ID],
    },
    SushiSwap: {
      ...sushiBasic,
      ...sushiNetworks[CHAIN_ID],
    },
  },
};
