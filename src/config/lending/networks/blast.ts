import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';

import OrbitProtocol from '../dapps/orbit-protocol';
import PacFinance from '../dapps/pac-finance';

const CHAIN_ID = 81457;
const CHAIN_NAME = 'Blast';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: 'Blast Lending Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Blast Chain.',
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME
  },
  defaultDapp: 'Pac Finance',
  dapps: {
    'Pac Finance': {
      ...PacFinance.basic,
      ...PacFinance.networks[CHAIN_ID]
    },
    'Orbit Protocol': {
      ...OrbitProtocol.basic,
      ...OrbitProtocol.networks[CHAIN_ID]
    }
  }
};
