export default {
  title: 'Polygon zkEVM',
  path: 'polygon-zkevm',
  icon: '/images/chains/polygon_white.svg',
  bgColor: '#A55FFF',
  bgIcon: '/images/chains/polygon_white.svg',
  selectBgColor: '#A55FFF',
  textColor: '#fff',
  chainId: 1101,
  rpcUrls: ['https://zkevm-rpc.com'],
  defaultTab: 'Bridge',
  theme: {
    button: {
      bg: '#6C00F6',
      text: '#FFF'
    }
  },
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'guessme.near/widget/ZKEVMSwap.zkevm-bridge',
      description: 'Intuitively bridge from different networks to Polygon zkEVM, and vice versa.'
    },
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/PolygonZkevm.Swap.Dex',
      description: 'Trade efficiently across any assets on Polygon zkEVM.'
    },
    Liquidity: {
      tab: 'Liquidity',
      path: 'bluebiu.near/widget/Liquidity.ALL',
      description: 'Seamlessly adding LP to any pair'
    }
  }
};
