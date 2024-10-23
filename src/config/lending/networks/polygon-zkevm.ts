import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';

import dolomite from '../dapps/dolomite';

const CHAIN_ID = 1101;
const CHAIN_NAME = 'Polygon zkEVM';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: 'Polygon zkEVM Lending Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Polygon zkEVM Chain.',
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME
  },
  defaultDapp: 'Dolomite',
  dapps: {
    Dolomite: {
      ...dolomite.basic,
      ...dolomite.networks[CHAIN_ID]
    }
  }
};
