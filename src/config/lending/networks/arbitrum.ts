import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';

import aave from '../dapps/aave';
import compoundv3 from '../dapps/compoundv3';
import cream from '../dapps/cream';
import dolomite from '../dapps/dolomite';
import filda from '../dapps/filda';
import granaryFinance from '../dapps/granary-finance';
import loadestar from '../dapps/lodestar-v1';
import radiant from '../dapps/radiant';
import tenderFinance from '../dapps/tender-finance';
import wePiggy from '../dapps/we-piggy';

const CHAIN_ID = 42161;
const CHAIN_NAME = 'Arbitrum';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: `${CHAIN_NAME} Lending Collection`,
    wrongNetworkTips: `To proceed, kindly switch to ${CHAIN_NAME} Chain.`,
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME
  },
  defaultDapp: 'Granary Finance',
  dapps: {
    // Official website can not be opened
    // Radiant: {
    //   ...radiant.basic,
    //   ...radiant.networks[CHAIN_ID]
    // },
    'Granary Finance': {
      ...granaryFinance.basic,
      ...granaryFinance.networks[CHAIN_ID]
    },
    'C.R.E.A.M.': {
      ...cream.basic,
      ...cream.networks[CHAIN_ID]
    },
    'Tender Finance': {
      ...tenderFinance.basic,
      ...tenderFinance.networks[CHAIN_ID]
    },
    FilDA: {
      ...filda.basic,
      ...filda.networks[CHAIN_ID]
    },
    WePiggy: {
      ...wePiggy.basic,
      ...wePiggy.networks[CHAIN_ID]
    },
    'Lodestar V1': {
      ...loadestar.basic,
      ...loadestar.networks[CHAIN_ID]
    },
    'Compound V3': {
      ...compoundv3.basic,
      ...compoundv3.networks[CHAIN_ID]
    },
    Dolomite: {
      ...dolomite.basic,
      ...dolomite.networks[CHAIN_ID]
    },
    'AAVE V3': {
      ...aave.basic,
      ...aave.networks[CHAIN_ID]
    }
  }
};
