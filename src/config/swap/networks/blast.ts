import { basic as thrusterBasic, networks as thrusterNetworks } from '../dapps/thruster-finance';
import { basic as mimswapBasic, networks as mimswapNetworks } from '../dapps/mimswap';
import { basic as monoswapV3Basic, networks as monoswapV3Networks } from '../dapps/monoswap-v3';
import { basic as monoswapV2Basic, networks as monoswapV2Networks } from '../dapps/monoswap-v2';
import { basic as ringBasic, networks as ringNetworks } from '../dapps/ring-protocol';
import { basic as ambientBasic, networks as ambientNetworks } from '../dapps/ambient';
import { blast } from '@/config/tokens/blast';
const CHAIN_ID = 81457;

export default {
  chainId: CHAIN_ID,
  defalutInputCurrency: blast['eth'],
  dexs: {
    'Thruster Finance': {
      ...thrusterBasic,
      ...thrusterNetworks[CHAIN_ID],
    },
    'Ring Protocol': {
      ...ringBasic,
      ...ringNetworks[CHAIN_ID],
    },
    Ambient: {
      ...ambientBasic,
      ...ambientNetworks[CHAIN_ID],
    },
    'MonoSwap V3': {
      ...monoswapV3Basic,
      ...monoswapV3Networks[CHAIN_ID],
    },
    'MonoSwap V2': {
      ...monoswapV2Basic,
      ...monoswapV2Networks[CHAIN_ID],
    },
    MimSwap: {
      ...mimswapBasic,
      ...mimswapNetworks[CHAIN_ID],
    },
  },
};
