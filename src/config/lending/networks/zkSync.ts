import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';

import aave from '../dapps/aave';
import reactorFusion from '../dapps/reactor-fusion';
import venus from '../dapps/venus';
import zerolend from '../dapps/zerolend';

const CHAIN_ID = 324;
const CHAIN_NAME = 'zkSync';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: 'zkSync Lending Collection',
    wrongNetworkTips: 'To proceed, kindly switch to zkSync Chain.',
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME
  },
  defaultDapp: 'Reactorfusion',
  dapps: {
    Reactorfusion: {
      ...reactorFusion.basic,
      ...reactorFusion.networks[CHAIN_ID]
    },
    ZeroLend: {
      ...zerolend.basic,
      ...zerolend.networks[CHAIN_ID]
    },
    Venus: {
      ...venus.basic,
      ...venus.networks[CHAIN_ID]
    },
    'AAVE V3': {
      ...aave.basic,
      ...aave.networks[CHAIN_ID]
    }
  }
};
