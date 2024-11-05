import styled from 'styled-components';

const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #ea3431;
  --primary-color: #ea3431;
  --border-color: #32496a;
  --supply-bg-color: rgba(39, 197, 187, 0.2);
  --borrow-bg-color: rgba(202, 85, 85, 0.2);
  --supply-color: #62fff6;
  --borrow-color: #ff6767;
  --withdraw-bg-color: #505260;
  --withdraw-bg-hover-color: rgba(255, 255, 255, 0.17);
  --withdraw-border-color: #e1e1e1;
  --repay-bg-color: #4a2b37;
  --repay-bg-hover-color: rgba(202, 85, 85, 0.2);
  --repay-border-color: #ca5555;
  --switch-color: #ea3431;
  --switch-border-color: #32496a;
  --secondary-border-color: #32496a;
  --yours-table-title: #7c7f96;
  --claim-bg-hover-color: rgba(255, 255, 255, 0.17);
  --claim-bg-color: #505260;
  --claim-border-color: #e1e1e1;
  --withdraw-color: #fff;
  --replay-color: #fff;
  --claim-color: #fff;
`;

export default {
  title: 'Optimism',
  path: 'optimism',
  icon: '/images/chains/optimism_white.svg',
  bgColor: '#CA0C0C',
  bgIcon: '/images/chains/optimism_white.svg',
  selectBgColor: '#CA0C0C',
  textColor: '#fff',
  chainId: 10,
  rpcUrls: ['https://rpc.ankr.com/optimism'],
  defaultTab: 'Bridge',
  theme: {
    button: {
      bg: '#CA0C0C',
      text: '#FFF'
    }
  },
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Optimism.Bridge',
      description: 'Intuitively bridge from different networks to Optimism, and vice versa.'
    },
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Optimism.Dex',
      description: 'Trade efficiently across any assets on Optimism.'
    },
    Liquidity: {
      tab: 'Liquidity',
      path: 'bluebiu.near/widget/Liquidity.ALL',
      description: 'Seamlessly adding LP to any pair'
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Optimism.Lending',
      description: 'Maximize asset utilization across Optimism markets',
      Theme
    }
  }
};
