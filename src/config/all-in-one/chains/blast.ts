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
      description: 'Intuitively across different network to Blast',
    },
    Swap: {
      tab: 'Trade',
      path: 'bluebiu.near/widget/Blast.Swap',
      description: 'Efficiently from/to any assets on Blast',
    },
    // Lending: {
    //   tab: 'Lending',
    //   path: 'bluebiu.near/widget/Arbitrum.Lending',
    // },
  },
};
