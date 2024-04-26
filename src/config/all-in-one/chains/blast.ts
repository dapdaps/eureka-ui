export default {
  title: 'Blast',
  path: 'blast',
  icon: '/images/chains/blast.svg',
  bgIcon: '/images/chains/blast_white.svg',
  bgColor: '#fff',
  selectBgColor: '#FCFC03',
  chainId: 81457,
  rpcUrls: ['https://rpc.blast.io'],
  defaultTab: 'Bridge',
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Blast.BridgeAuthority.Index',
    },
  },
};
