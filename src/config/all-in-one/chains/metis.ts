export default {
  title: 'Metis',
  path: 'metis',
  icon: '/images/chains/metis_color.svg',
  bgColor: '#00DACC',
  bgIcon: '/images/chains/metis_white.svg',
  selectBgColor: '#00dacc',
  textColor: '#000',
  chainId: 1088,
  rpcUrls: ['https://andromeda.metis.io/?owner=1088'],
  defaultTab: 'Bridge',
  theme: {
    button: {
      bg: '#00D3FF',
      text: '#000000'
    }
  },
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Metis.Bridge',
      description: 'Intuitively bridge from different networks to Metis, and vice versa.'
    },
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Metis.Swap.Dex',
      description: 'Trade efficiently across any assets on Metis.'
    },
    Liquidity: {
      tab: 'Liquidity',
      path: 'bluebiu.near/widget/Liquidity.ALL',
      description: 'Seamlessly adding LP to any pair'
    }
    // Lending: {
    //   tab: 'Lending',
    //   path: 'bluebiu.near/widget/Metis.Lending',
    //   description: 'Maximize asset utilization across Metis markets'
    // }
  }
};
