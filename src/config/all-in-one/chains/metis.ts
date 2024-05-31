export default {
  title: 'Metis',
  path: 'metis',
  icon: 'https://assets.dapdap.net/images/bafkreiaekamkcbf7ixg3w6wl25zd4orgkmshxkz36vncpomenfu3ryymty.svg',
  bgColor: '#000000',
  bgIcon: '/images/chains/metis_white.svg',
  selectBgColor: '#00dacc',
  textColor: '#000',
  chainId: 1088,
  rpcUrls: ['https://andromeda.metis.io/?owner=1088'],
  defaultTab: 'Bridge',
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Metis.Bridge',
      description: 'Trade by best price on Metis',
    },
    Swap: {
      tab: 'Trade',
      path: 'bluebiu.near/widget/Metis.Swap.Dex',
      description: 'Trade by best price on Metis',
    },
  },
};
