export default {
  title: 'Polygon',
  path: 'polygon',
  icon: 'https://assets.dapdap.net/images/bafkreicq7b2rylubg6pli3mgxjdpml4rdju2upxq25a6nd35xepiqakgfy.svg',
  bgColor: '#5C28D8',
  bgIcon: '/images/chains/polygon_white.svg',
  selectBgColor: '#5C28D8',
  chainId: 137,
  rpcUrls: ['https://polygon.llamarpc.com'],
  defaultTab: 'Bridge',
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Polygon.Bridge',
      description: 'Trade by best price on Polygon',
    },
    Swap: {
      tab: 'Trade',
      path: 'bluebiu.near/widget/Polygon.Swap.Dex',
      description: 'Trade by best price on Polygon',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Polygon.Lending',
      description: 'Trade by best price on Polygon',
    },
  },
};
