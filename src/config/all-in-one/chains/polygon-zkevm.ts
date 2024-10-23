import styled from 'styled-components';

const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #a55fff;
  --primary-color: #a55fff;
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
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/PolygonZkevm.Lending',
      description: 'Maximize asset utilization across Polygon zkEVM markets',
      Theme
    }
  }
};
