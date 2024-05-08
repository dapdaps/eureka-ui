export default {
  title: 'Mantle',
  path: 'mantle',
  icon: 'https://assets.dapdap.net/images/bafkreiboehkc3sfdmzzsv7abvhssavcicom3mjjm4wje3zgm3nzg5w4kbu.svg',
  bgColor: '#000000',
  bgIcon: '/images/chains/mantle_white.svg',
  selectBgColor: 'rgb(0,255,224)',
  chainId: 5000,
  rpcUrls: ['https://mantle-mainnet.public.blastapi.io'],
  defaultTab: 'Swap',
  menuConfig: {
    Swap: {
      tab: 'Trade',
      path: 'bluebiu.near/widget/Mantle.Swap.Dex',
      description: 'Trade by best price on Mantle',
    },
    Liquidity: {
      tab: 'Liquidity',
      path: 'bluebiu.near/widget/Mantle.GAMMA',
      description: 'Trade by best price on Mantle',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Mantle.Lending',
      description: 'Trade by best price on Mantle',
    },
  },
};
