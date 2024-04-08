import multicall from '@/config/contract/multicall';
import weth from '@/config/contract/weth';
import gamma from '../dapps/gamma';

const CHAIN_ID = 59144;
const CHAIN_NAME = 'Linea';

export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  multicallAddress: multicall[CHAIN_ID],
  wethAddress: weth[CHAIN_ID],
  connectProps: {
    noAccountTips: 'Linea Liquidity Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Linea Chain.',
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME,
  },
  defaultDapp: 'Gamma',
  dapps: {
    Gamma: {
      ...gamma.basic,
      ...gamma.networks[CHAIN_ID],
    },
  },
};
