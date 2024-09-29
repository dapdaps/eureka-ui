import styled from 'styled-components';

const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #783bf0;
  --primary-color: #783bf0;
  --border-color: #292c42;
  --supply-bg-color: rgba(84, 101, 255, 0.2);
  --borrow-bg-color: rgba(199, 71, 171, 0.2);
  --supply-color: #5465ff;
  --borrow-color: #c747ab;
  --withdraw-bg-color: rgba(84, 101, 255, 0.2);
  --withdraw-bg-hover-color: #5465ff;
  --withdraw-border-color: #5465ff;
  --repay-bg-color: rgba(196, 71, 217, 0.2);
  --repay-bg-hover-color: #c747ab;
  --repay-border-color: #c747ab;
  --switch-color: #5465ff;
  --switch-border-color: #32496a;
  --secondary-border-color: #32496a;
  --yours-table-title: #ffffff;
  --claim-bg-hover-color: #5465ff;
  --claim-bg-color: rgba(84, 101, 255, 0.2);
  --claim-border-color: #5465ff;
  --withdraw-color: #fff;
  --replay-color: #fff;
  --claim-color: #fff;
`;

export default {
  title: 'Polygon PoS',
  path: 'polygon',
  icon: '/images/chains/polygon_white.svg',
  bgColor: '#5C28D8',
  bgIcon: '/images/chains/polygon_white.svg',
  selectBgColor: '#5C28D8',
  textColor: '#fff',
  chainId: 137,
  rpcUrls: ['https://polygon.llamarpc.com'],
  defaultTab: 'Bridge',
  theme: {
    button: {
      bg: '#5C28D8',
      text: '#FFF'
    }
  },
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Polygon.Bridge',
      description: 'Intuitively bridge from different networks to Polygon, and vice versa.'
    },
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Polygon.Swap.Dex',
      description: 'Trade efficiently across any assets on Polygon.'
    },
    Liquidity: {
      tab: 'Liquidity',
      path: 'bluebiu.near/widget/Liquidity.ALL',
      description: 'Seamlessly adding LP to any pair'
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Polygon.Lending',
      description: 'Maximize asset utilization across Polygon markets',
      Theme
    }
  }
};
