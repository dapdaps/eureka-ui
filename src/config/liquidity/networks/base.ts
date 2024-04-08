import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';
import gamma from '../dapps/gamma';
const CHAIN_ID = 8453;
const CHAIN_NAME = 'Base';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: 'Base Liquidity Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Base Chain.',
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME,
  },
  defalutDex: 'Gamma',
  dapps: {
    Gamma: {
      ...gamma.basic,
      ...gamma.networks[CHAIN_ID],
    },
  },
};
