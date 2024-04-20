import weths from '../../contract/weth';
import { basic as thrusterBasic, networks as thrusterNetworks } from '../dapps/thruster-finance';
import { basic as mimswapBasic, networks as mimswapNetworks } from '../dapps/mimswap';
import { basic as momoswapV3Basic, networks as momoswapV3Networks } from '../dapps/momoswap-v3';
import { basic as momoswapV2Basic, networks as momoswapV2Networks } from '../dapps/momoswap-v2';
import { basic as ringBasic, networks as ringNetworks } from '../dapps/ring-protocol';
import { basic as ambientBasic, networks as ambientNetworks } from '../dapps/ambient';

const CHAIN_ID = 81457;

export default {
  chainId: CHAIN_ID,
  chainName: 'Blast',
  displayChainName: 'BLAST',
  wethAddress: weths[CHAIN_ID],
  connectProps: {
    noAccountTips: 'Blast Dex Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Blast Chain.',
  },
  defalutDex: 'Thruster Finance',
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
      ...momoswapV3Basic,
      ...momoswapV3Networks[CHAIN_ID],
    },
    'MonoSwap V2': {
      ...momoswapV2Basic,
      ...momoswapV2Networks[CHAIN_ID],
    },
    MimSwap: {
      ...mimswapBasic,
      ...mimswapNetworks[CHAIN_ID],
    },
  },
};
