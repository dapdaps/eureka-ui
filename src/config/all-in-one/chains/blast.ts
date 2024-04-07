export default {
  title: 'Blast',
  path: 'blast',
  icon: '/images/chains/blast.svg',
  bgColor: '#FDFE03',
  bgIcon: '/images/chains/blast_white.svg',
  selectBgColor: '#FDFE03',
  chainId: 81457,
  rpcUrls: ['https://rpc.blast.io'],
  defaultTab: 'Swap',
  menuConfig: {
    // Bridge: {
    //   tab: 'Bridge',
    //   path: 'bluebiu.near/widget/Arbitrum.Bridge',
    // },
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Blast.Swap',
    },
    // Lending: {
    //   tab: 'Lending',
    //   path: 'bluebiu.near/widget/Arbitrum.Lending',
    // },
  },
};
