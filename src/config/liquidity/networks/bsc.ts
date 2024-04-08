import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';
import gamma from '../dapps/gamma';
const CHAIN_ID = 56;
const CHAIN_NAME = 'BNB';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: 'BNB Chain Liquidity Collection',
    wrongNetworkTips: 'To proceed, kindly switch to BNB Chain.',
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
