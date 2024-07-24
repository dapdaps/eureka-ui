import weths from '../../contract/weth';
import gamma from '../dapps/gamma';
import steer from '../dapps/steer';
const CHAIN_ID = 81457;
const CHAIN_NAME = 'Blast';
export default {
  chainId: CHAIN_ID,
  chainName: CHAIN_NAME,
  displayChainName: 'BLAST',
  wethAddress: weths[CHAIN_ID],
  connectProps: {
    noAccountTips: `${CHAIN_NAME} Liquidity Collection`,
    wrongNetworkTips: `To proceed, kindly switch to ${CHAIN_NAME} Chain.`,
    chainId: CHAIN_ID,
    chainName: CHAIN_NAME,
  },
  defaultDapp: 'gamma',
  dapps: {
    gamma: {
      ...gamma.basic,
      ...gamma.networks[CHAIN_ID],
    },
    steer: {
      ...steer.basic,
      ...steer.networks[CHAIN_ID]
    }
  },
};
