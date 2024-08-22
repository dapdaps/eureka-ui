import { manta } from '@/config/tokens/manta';

import { basic as apertureBasic, networks as apertureNetworks } from '../dapps/aperture-swap';
import { basic as IziSwapBasic, networks as IziSwapNetworks } from '../dapps/izi-swap';
import { basic as quickSwapBasic, networks as quickSwapNetworks } from '../dapps/quick-swap';

const CHAIN_ID = 169;

export default {
  chainId: CHAIN_ID,
  defalutInputCurrency: manta['weth'],
  dexs: {
    QuickSwap: {
      ...quickSwapBasic,
      ...quickSwapNetworks[CHAIN_ID],
    },
    ApertureSwap: {
      ...apertureBasic,
      ...apertureNetworks[CHAIN_ID],
    },
    iZiSwap: {
      ...IziSwapBasic,
      ...IziSwapNetworks[CHAIN_ID],
    },
  },
};
