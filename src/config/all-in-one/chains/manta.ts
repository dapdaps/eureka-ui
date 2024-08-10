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
  theme: {
    button: {
      bg: 'linear-gradient(89deg, #29CCB9 0%, #0091FF 49%, #FF66B7 100%)',
      text: '#FFF',
    },
  },
  menuConfig: {
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Manta.Swap',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Manta.Lending',
    },
  },
};
