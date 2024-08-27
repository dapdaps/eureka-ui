import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';

import gamma from '../dapps/gamma';
import rangeprotocol from '../dapps/rangeprotocol';
const CHAIN_ID = 56;
const CHAIN_NAME = 'BNB';

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
  defalutDex: 'gamma',
  dapps: {
    gamma: {
      ...gamma.basic,
      ...gamma.networks[CHAIN_ID],
    },
    rangeprotocol: {
      ...rangeprotocol.basic,
      ...rangeprotocol.networks[CHAIN_ID]
    }
  },
};
