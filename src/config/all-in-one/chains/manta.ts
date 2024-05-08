export default {
  title: 'Manta',
  path: 'manta',
  icon: '/images/chains/manta.svg',
  bgColor: '#fff',
  bgIcon: '/images/chains/manta_white.svg',
  selectBgColor: '#35bde3',
  chainId: 169,
  rpcUrls: ['https://1rpc.io/manta'],
  defaultTab: 'Swap',
  menuConfig: {
    Swap: {
      tab: 'Trade',
      path: 'bluebiu.near/widget/Manta.Swap',
      description: 'Trade by best price on Manta',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Manta.Lending',
      description: 'Trade by best price on Manta',
    },
  },
};
