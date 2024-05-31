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
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Mode.Swap',
    },
  },
};
