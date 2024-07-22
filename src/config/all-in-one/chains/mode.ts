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
      path: 'bluebiu.near/widget/Mode.BridgeAuthority.Index',
    },
    Swap: {
      tab: 'Trade',
      path: 'bluebiu.near/widget/Mode.Swap',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Linea.Lending',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Linea.Lending',
    },
  },
};
