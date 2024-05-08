export default {
  title: 'Avalanche',
  path: 'avalanche',
  icon: 'https://assets.dapdap.net/images/bafkreifdm3vpor4xyh2y7ibcr4dsy262qgesegy7slrfjbo4imohqd4sfq.svg',
  bgColor: '#AF1616',
  bgIcon: '/images/chains/avalanche_white.svg',
  selectBgColor: '#AF1616',
  chainId: 43114,
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  defaultTab: 'Bridge',
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Avalanche.Bridge',
      description: 'Trade by best price on Avalanche',
    },
    Swap: {
      tab: 'Trade',
      path: 'bluebiu.near/widget/Avalanche.Swap',
      description: 'Trade by best price on Avalanche',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Avalanche.Lending',
      description: 'Trade by best price on Avalanche',
    },
  },
};
