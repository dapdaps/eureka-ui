import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';

import rangeprotocol from '../dapps/rangeprotocol';
import steer from '../dapps/steer';
const CHAIN_ID = 169;
const CHAIN_NAME = 'Manta';

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
  defaultDapp: 'rangeprotocol',
  dapps: {
    rangeprotocol: {
      ...rangeprotocol.basic,
      ...rangeprotocol.networks[CHAIN_ID]
    },
    steer: {
      ...steer.basic,
      ...steer.networks[CHAIN_ID]
    }
  },
};
