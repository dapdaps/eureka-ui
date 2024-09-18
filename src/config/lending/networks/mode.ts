import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';

import Ionic from '../dapps/ionic';
import IroncladFinance from '../dapps/ironclad-finance';
import layerBank from '../dapps/layer-bank';
import Sturdy from '../dapps/sturdy';

const CHAIN_ID = 34443;
const CHAIN_NAME = 'Mode';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: 'Mode Lending Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Mode Chain.',
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME
  },
  defaultDapp: 'LayerBank',
  dapps: {
    LayerBank: {
      ...layerBank.basic,
      ...layerBank.networks[CHAIN_ID]
    },
    'Ironclad Finance': {
      ...IroncladFinance.basic,
      ...IroncladFinance.networks[CHAIN_ID]
    },
    Ionic: {
      ...Ionic.basic,
      ...Ionic.networks[CHAIN_ID]
    },
    Sturdy: {
      ...Sturdy.basic,
      ...Sturdy.networks[CHAIN_ID]
    }
  }
};
