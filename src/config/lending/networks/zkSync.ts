import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';

import reactorFusion from '../dapps/reactor-fusion';
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
    }
  }
};
