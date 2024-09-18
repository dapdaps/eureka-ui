import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';

import aave from '../dapps/aave';
import compoundv3 from '../dapps/compoundv3';
import layerBank from '../dapps/layer-bank';

const CHAIN_ID = 534352;
const CHAIN_NAME = 'Scroll';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: 'Scroll Lending Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Scroll Chain.',
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME
  },
  defaultDapp: 'LayerBank',
  dapps: {
    LayerBank: {
      ...layerBank.basic,
      ...layerBank.networks[CHAIN_ID]
    },
    'Compound V3': {
      ...compoundv3.basic,
      ...compoundv3.networks[CHAIN_ID]
    },
    'AAVE V3': {
      ...aave.basic,
      ...aave.networks[CHAIN_ID]
    }
  }
};
