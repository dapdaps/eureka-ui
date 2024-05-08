export default {
  title: 'zkSync',
  path: 'zksync',
  icon: 'https://assets.dapdap.net/images/bafkreicwo7gbj23ay4r6w5wwdwllyaxd6eo4w2cngr64sp26z5wmke7xju.svg',
  bgColor: '#FFFFFF',
  bgIcon: '/images/chains/zksync_white.svg',
  selectBgColor: '#3b6bdc',
  chainId: 324,
  rpcUrls: ['https://mainnet.era.zksync.io'],
  defaultTab: 'Swap',
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/zkSync.Bridge.Index',
      description: 'Trade by best price on zkSync',
    },
    Swap: {
      tab: 'Trade',
      path: 'bluebiu.near/widget/zkSync.Swap.Dex',
      description: 'Trade by best price on zkSync',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/zkSync.Lending',
      description: 'Trade by best price on zkSync',
    },
  },
};
