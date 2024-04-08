import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';
const CHAIN_ID = 169;
const CHAIN_NAME = 'Manta';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: 'Manta Liquidity Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Manta Chain.',
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME,
  },
  defaultDapp: '',
  dapps: {

  },
};
