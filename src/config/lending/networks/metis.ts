import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';

import aave from '../dapps/aave';
import GranaryFinance from '../dapps/granary-finance';

const CHAIN_ID = 1088;
const CHAIN_NAME = 'Metis';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: 'Metis Lending Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Metis Chain.',
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME
  },
  defaultDapp: 'Granary Finance',
  dapps: {
    'Granary Finance': {
      ...GranaryFinance.basic,
      ...GranaryFinance.networks[CHAIN_ID]
    },
    'AAVE V3': {
      ...aave.basic,
      ...aave.networks[CHAIN_ID]
    }
  }
};
