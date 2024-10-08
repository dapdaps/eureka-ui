export default {
  title: 'Berachain bArtio',
  path: 'bera-b',
  icon: '/images/chains/bera-bArtio.svg',
  bgColor: '#875426',
  bgIcon: '/images/chains/bera-bArtio_white.svg',
  textColor: '#fff',
  selectBgColor: '#875426',
  chainId: 80084,
  rpcUrls: ['https://bartio.beratrail.io'],
  defaultTab: 'Swap',
  isHideAllInOne: true,
  isHideBridge: true,
  theme: {
    button: {
      bg: '#875426',
      text: '#fff'
    }
  },
  menuConfig: {
    Swap: {
      tab: 'Swap',
      description: 'Trade efficiently across any assets on Blast.'
    }
  }
};
