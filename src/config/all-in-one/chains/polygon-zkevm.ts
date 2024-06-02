export default {
  title: 'Polygon zkEVM',
  path: 'polygon-zkevm',
  icon: 'https://assets.dapdap.net/images/bafkreielam3balduseacp3gulszhxiwzf7hcyoaau6goxdwgsavqfou5hi.svg',
  bgColor: '#A55FFF',
  bgIcon: '/images/chains/polygon_zkevm_white.svg',
  selectBgColor: '#A55FFF',
  textColor: '#fff',
  chainId: 1101,
  rpcUrls: ['https://zkevm-rpc.com'],
  defaultTab: 'Bridge',
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'guessme.near/widget/ZKEVMSwap.zkevm-bridge',
      description: 'Intuitively across different network to Polygon zkEVM',
    },
    Swap: {
      tab: 'Trade',
      path: 'bluebiu.near/widget/PolygonZkevm.Swap.Dex',
      description: 'Efficiently from/to any assets on Polygon zkEVM',
    },
    Liquidity: {
      tab: 'Liquidity',
      path: 'bluebiu.near/widget/ZKEVM.GAMMA',
      description: 'Seamlessly adding LP to any pair',
    },
  },
};
