import { gnosis } from '@/config/tokens/gnosis';

import { basic as balancerBasic, networks as balancerNetworks } from '../dapps/balancer';
import { basic as elkBasic, networks as elkNetworks } from '../dapps/elk';
import { basic as honeySwapBasic, networks as honeySwapNetworks } from '../dapps/honey-swap';
import { basic as sushiBasic, networks as sushiNetworks } from '../dapps/sushi-swap';
import { basic as swaprBasic, networks as swaprNetworks } from '../dapps/swapr';
const CHAIN_ID = 100;

export default {
  chainId: CHAIN_ID,
  defalutInputCurrency: gnosis['xdai'],
  dexs: {
    Balancer: {
      ...balancerBasic,
      ...balancerNetworks[CHAIN_ID],
    },
    Honeyswap: {
      ...honeySwapBasic,
      ...honeySwapNetworks[CHAIN_ID],
    },
    Swapr: {
      ...swaprBasic,
      ...swaprNetworks[CHAIN_ID],
    },
    Elk: {
      ...elkBasic,
      ...elkNetworks[CHAIN_ID],
    },
    SushiSwap: {
      ...sushiBasic,
      ...sushiNetworks[CHAIN_ID],
    },
  },
};
