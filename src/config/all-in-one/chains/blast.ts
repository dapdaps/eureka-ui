export default {
  title: 'Blast',
  path: 'blast',
  icon: '/images/chains/blast.svg',
  bgColor: '#FDFE03',
  bgIcon: '/images/chains/blast_white.svg',
  textColor: '#000',
  selectBgColor: '#FDFE03',
  chainId: 81457,
  rpcUrls: ['https://rpc.blast.io'],
  defaultTab: 'Swap',
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Blast.BridgeAuthority.Index',
      description: 'Trade by best price on Blast',
    },
    Swap: {
      tab: 'Trade',
      path: 'bluebiu.near/widget/Blast.Swap',
      description: 'Trade by best price on Blast',
    },
    // Lending: {
    //   tab: 'Lending',
    //   path: 'bluebiu.near/widget/Arbitrum.Lending',
    // },
  },
};
