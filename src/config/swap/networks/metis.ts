import { metis } from '@/config/tokens/metis';

import { basic as hummusBasic, networks as hummusNetworks } from '../dapps/hummus';
import { basic as maiaBasic, networks as maiaNetworks } from '../dapps/maia-v3';
import { basic as netSwap3Basic, networks as netSwapNetworks } from '../dapps/net-swap';

const CHAIN_ID = 1088;

export default {
  chainId: CHAIN_ID,
  defalutInputCurrency: metis['metis'],
  dexs: {
    Netswap: {
      ...netSwap3Basic,
      ...netSwapNetworks[CHAIN_ID],
    },
    'Maia V3': {
      ...maiaBasic,
      ...maiaNetworks[CHAIN_ID],
    },
    Hummus: {
      ...hummusBasic,
      ...hummusNetworks[CHAIN_ID],
    },
  },
};
