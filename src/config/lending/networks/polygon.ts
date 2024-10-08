import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';

import cream from '../dapps/cream';
import filda from '../dapps/filda';
import WePiggy from '../dapps/we-piggy';

const CHAIN_ID = 137;
const CHAIN_NAME = 'Polygon';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: 'Polygon Lending Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Polygon Chain.',
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME
  },
  defaultDapp: 'C.R.E.A.M.',
  dapps: {
    'C.R.E.A.M.': {
      ...cream.basic,
      ...cream.networks[CHAIN_ID]
    },
    FilDA: {
      ...filda.basic,
      ...filda.networks[CHAIN_ID]
    },
    WePiggy: {
      ...WePiggy.basic,
      ...WePiggy.networks[CHAIN_ID]
    }
  }
};
