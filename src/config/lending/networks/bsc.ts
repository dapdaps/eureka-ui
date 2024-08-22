import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';

import cream from '../dapps/cream';
import filda from '../dapps/filda';
import granary from '../dapps/granary-finance';
import liqee from '../dapps/liqee';
import radiant from '../dapps/radiant';
import venus from '../dapps/venus';

const CHAIN_ID = 56;
const CHAIN_NAME = 'BNB';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: 'BNB Chain Lending Collection',
    wrongNetworkTips: 'To proceed, kindly switch to BNB Chain.',
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME,
  },
  defaultDapp: 'Venus',
  dapps: {
    Venus: {
      ...venus.basic,
      ...venus.networks[CHAIN_ID],
    },
    'C.R.E.A.M.': {
      ...cream.basic,
      ...cream.networks[CHAIN_ID],
    },
    Radiant: {
      ...radiant.basic,
      ...radiant.networks[CHAIN_ID],
    },
    'Granary Finance': {
      ...granary.basic,
      ...granary.networks[CHAIN_ID],
    },
    FilDA: {
      ...filda.basic,
      ...filda.networks[CHAIN_ID],
    },
    Liqee: {
      ...liqee.basic,
      ...liqee.networks[CHAIN_ID],
    },
  },
};
