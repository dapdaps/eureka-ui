import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';

import compoundv3 from '../dapps/compoundv3';
import granary from '../dapps/granary-finance';
// import sonne from '../dapps/sonne';
import ironBank from '../dapps/iron-bank';
import Moonwell from '../dapps/moonwell';
import WePiggy from '../dapps/we-piggy';

const CHAIN_ID = 10;
const CHAIN_NAME = 'Optimism';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: 'Optimism Lending Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Optimism Chain.',
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME
  },
  defaultDapp: 'Iron Bank',
  dapps: {
    // Sonne: {
    //   ...sonne.basic,
    //   ...sonne.networks[CHAIN_ID],
    // },
    'Iron Bank': {
      ...ironBank.basic,
      ...ironBank.networks[CHAIN_ID]
    },
    'Granary Finance': {
      ...granary.basic,
      ...granary.networks[CHAIN_ID]
    },
    WePiggy: {
      ...WePiggy.basic,
      ...WePiggy.networks[CHAIN_ID]
    },
    'Compound V3': {
      ...compoundv3.basic,
      ...compoundv3.networks[CHAIN_ID]
    },
    Moonwell: {
      ...Moonwell.basic,
      ...Moonwell.networks[CHAIN_ID]
    }
  }
};
