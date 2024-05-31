
export default {
  title: 'Mode',
  path: 'mode',
  icon: '/images/chains/mode_black.svg',
  bgColor: '#DFFE00',
  bgIcon: '/images/chains/mode_white.svg',
  selectBgColor: '#DFFE00',
  textColor: '#000',
  chainId: 34443,
  rpcUrls: ['https://mainnet.mode.network'],
  defaultTab: 'Swap',
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Linea.Bridge',
      description: 'Bridge assets from other chains to Mode',
    },
    Swap: {
      tab: 'Trade',
      path: 'bluebiu.near/widget/Mode.Swap',
      description: 'Trade by best price on Swap',
    },
  },
};
