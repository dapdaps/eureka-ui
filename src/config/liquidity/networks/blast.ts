import weths from '../../contract/weth';

const CHAIN_ID = 81457;

export default {
  chainId: CHAIN_ID,
  chainName: 'Blast',
  displayChainName: 'BLAST',
  wethAddress: weths[CHAIN_ID],
  connectProps: {
    noAccountTips: 'Blast Dex Collection',
    wrongNetworkTips: 'To proceed, kindly switch to Blast Chain.',
  },
  defaultDapp: '',
  dapps: {
  },
};
