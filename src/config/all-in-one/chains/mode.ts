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
  theme: {
    button: {
      bg: '#DFFE00',
      text: '#000000',
    },
  },
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Mode.BridgeAuthority.Index',
      description: 'Intuitively bridge from different networks to Mode, and vice versa.',
    },
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Mode.Swap',
      description: 'Trade efficiently across any assets on Mode.',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Linea.Lending',
      description: 'Maximize asset utilization across Mode markets',
    },
  },
};
