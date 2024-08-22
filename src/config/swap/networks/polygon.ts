import { polygon } from '@/config/tokens/polygon';

import { basic as apeBasic, networks as apeNetworks } from '../dapps/ape';
import { basic as honeyBasic, networks as honeyNetworks } from '../dapps/honey-swap';
import { basic as pearlFiBasic, networks as pearlFiNetworks } from '../dapps/pearl-fi';
import { basic as quickSwapBasic, networks as quickSwapNetworks } from '../dapps/quick-swap';
import { basic as retroBasic, networks as retroNetworks } from '../dapps/retro';
import { basic as sushiBasic, networks as sushiNetworks } from '../dapps/sushi-swap';

const CHAIN_ID = 137;

export default {
  chainId: CHAIN_ID,
  defalutInputCurrency: polygon['matic'],
  dexs: {
    QuickSwap: {
      ...quickSwapBasic,
      ...quickSwapNetworks[CHAIN_ID],
    },
    Retro: {
      ...retroBasic,
      ...retroNetworks[CHAIN_ID],
    },
    Apeswap: {
      ...apeBasic,
      ...apeNetworks[CHAIN_ID],
    },
    SushiSwap: {
      ...sushiBasic,
      ...sushiNetworks[CHAIN_ID],
    },
    PearlFi: {
      ...pearlFiBasic,
      ...pearlFiNetworks[CHAIN_ID],
    },
    Honeyswap: {
      ...honeyBasic,
      ...honeyNetworks[CHAIN_ID],
    },
  },
};
