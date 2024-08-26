import { avalanche } from '@/config/tokens/avalanche';

import { basic as pangolinBasic, networks as pangolinNetworks } from '../dapps/pangolin';
import { basic as pharaohBasic, networks as pharaohNetworks } from '../dapps/pharaoh';
import { basic as joeTraderBasic, networks as joeTraderNetworks } from '../dapps/trader-joe';

const CHAIN_ID = 43114;

export default {
  chainId: CHAIN_ID,
  defalutInputCurrency: avalanche['avax'],
  dexs: {
    'Trader Joe': {
      ...joeTraderBasic,
      ...joeTraderNetworks[CHAIN_ID],
    },
    Pangolin: {
      ...pangolinBasic,
      ...pangolinNetworks[CHAIN_ID],
    },
    Pharaoh: {
      ...pharaohBasic,
      ...pharaohNetworks[CHAIN_ID],
    },
  },
};
