import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';
import steakhut from '../dapps/steakhut';
const CHAIN_ID = 43114;
const CHAIN_NAME = 'Avalanche';

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
  defaultDapp: 'Steakhut',
  dapps: {
    Steakhut: {
      ...steakhut.basic,
      ...steakhut.networks[CHAIN_ID]
    }
  },
};
