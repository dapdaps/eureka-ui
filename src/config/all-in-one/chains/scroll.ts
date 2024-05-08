export default {
  title: 'Scroll',
  path: 'scroll',
  icon: '/images/chains/scroll.svg',
  bgIcon: '/images/chains/scroll_white.svg',
  bgColor: '#fff',
  selectBgColor: '#EBC28E',
  chainId: 534352,
  rpcUrls: ['https://rpc.scroll.io'],
  defaultTab: 'Swap',
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Scroll.Bridge.Index',
      description: 'Trade by best price on Scroll',
    },
    Swap: {
      tab: 'Trade',
      path: 'bluebiu.near/widget/Scroll.Swap',
      description: 'Trade by best price on Scroll',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Scroll.Lending',
      description: 'Trade by best price on Scroll',
    },
  },
};
