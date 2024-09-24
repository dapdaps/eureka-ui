export default {
  title: 'Blast',
  path: 'blast',
  icon: '/images/chains/blast.svg',
  bgColor: '#FDFE03',
  bgIcon: '/images/chains/blast_white.svg',
  textColor: '#000',
  selectBgColor: '#FDFE03',
  chainId: 81457,
  rpcUrls: ['https://rpc.blast.io'],
  defaultTab: 'Swap',
  theme: {
    button: {
      bg: '#FDFE03',
      text: '#000000'
    }
  },
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Blast.BridgeAuthority.Index',
      description: 'Intuitively bridge from different networks to Blast, and vice versa.'
    },
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Blast.Swap',
      description: 'Trade efficiently across any assets on Blast.'
    },
    Liquidity: {
      tab: 'Liquidity',
      path: 'bluebiu.near/widget/Liquidity.ALL',
      description: 'Seamlessly adding LP to any pair'
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Blast.Lending',
      description: 'Maximize asset utilization across Blast markets'
    }
  }
};
