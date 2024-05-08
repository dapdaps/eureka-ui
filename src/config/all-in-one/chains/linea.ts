export default {
  title: 'Linea',
  path: 'linea',
  icon: 'https://assets.dapdap.net/images/bafkreiek2q3da5dpzt7jlvdp5y4b7xh2tsdb5syh75b3amfwhb7x6vi7oa.svg',
  bgColor: '#131313',
  bgIcon: '/images/chains/linea_white.svg',
  iconColor: '#000',
  selectBgColor: '#00E2FF',
  chainId: 59144,
  rpcUrls: ['https://linea.blockpi.network/v1/rpc/public'],
  defaultTab: 'Bridge',
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Linea.Bridge',
      description: 'Bridge assets from other chains to Linea',
    },
    Swap: {
      tab: 'Trade',
      path: 'bluebiu.near/widget/Linea.Swap.Dex',
      description: 'Trade by best price on Linea',
    },
    Liquidity: {
      tab: 'Liquidity',
      path: 'bluebiu.near/widget/Linea.Liquidity.GAMMA',
      description: 'Trade by best price on Linea',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Linea.Lending',
      description: 'Trade by best price on Linea',
    },
  },
};
