import weths from '../../contract/weth';
import { basic as IziSwapBasic, networks as IziSwapNetworks } from '../dapps/izi-swap';
import { basic as kimExchangeBasic, networks as kimExchangeNetworks } from '../dapps/kim-exchange';
import { basic as supSwapBasic, networks as supSwapNetworks } from '../dapps/sup-swap';
import { basic as swapModeBasic, networks as swapModeNetworks } from '../dapps/swap-mode';

const CHAIN_ID = 34443;

export default {
  chainId: CHAIN_ID,
  chainName: 'Mode',
  displayChainName: 'MODE',
  wethAddress: weths[CHAIN_ID],
  connectProps: {
    noAccountTips: 'Mode Dex Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Mode Chain.',
  },
  defalutDex: 'iZiSwap',
  dexs: {
    iZiSwap: {
      ...IziSwapBasic,
      ...IziSwapNetworks[CHAIN_ID],
    },
    KimExchange: {
      ...kimExchangeBasic,
      ...kimExchangeNetworks[CHAIN_ID],
    },
    SwapMode: {
      ...swapModeBasic,
      ...swapModeNetworks[CHAIN_ID],
    },
    SupSwap: {
      ...supSwapBasic,
      ...supSwapNetworks[CHAIN_ID],
    },
  },
};
