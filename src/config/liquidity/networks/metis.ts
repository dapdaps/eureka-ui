import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';

import steer from '../dapps/steer';

const CHAIN_ID = 1088;
const CHAIN_NAME = 'Metis';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: `${CHAIN_NAME} Liquidity Collection`,
    wrongNetworkTips: `To proceed, kindly switch to ${CHAIN_NAME} Chain.`,
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME,
  },
  defaultDapp: 'steer',
  dapps: {
    steer: {
      ...steer.basic,
      ...steer.networks[CHAIN_ID],
    },
  },
};
