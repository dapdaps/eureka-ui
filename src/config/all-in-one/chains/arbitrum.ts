export default {
  title: 'Arbitrum',
  path: 'arbitrum',
  icon: 'https://assets.dapdap.net/images/bafkreicxdjysr5urjg2hfpfts2b7ptb6q3fge7ncuhzw4puqybi4dwlbdu.svg',
  bgColor: '#3564AB',
  bgIcon: '/images/chains/arbitrum_white.svg',
  selectBgColor: '#3564AB',
  chainId: 42161,
  rpcUrls: ['https://arb1.arbitrum.io/rpc'],
  defaultTab: 'Bridge',
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Arbitrum.Bridge',
      description: 'Trade by best price on Arbitrum',
    },
    Swap: {
      tab: 'Trade',
      path: 'bluebiu.near/widget/Arbitrum.Swap.Dex',
      description: 'Trade by best price on Arbitrum',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Arbitrum.Lending',
      description: 'Trade by best price on Arbitrum',
    },
  },
};
