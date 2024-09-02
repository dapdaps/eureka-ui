import styled from 'styled-components';

const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #ea3431;
  --primary-color: #e84142;
  --border-color: #292c42;
  --supply-bg-color: rgba(39, 197, 187, 0.2);
  --borrow-bg-color: rgba(202, 85, 85, 0.2);
  --supply-color: #62fff6;
  --borrow-color: #ff6767;
  --withdraw-bg-color: #505260;
  --withdraw-bg-hover-color: rgba(255, 255, 255, 0.17);
  --withdraw-border-color: #e1e1e1;
  --repay-bg-color: rgba(202, 85, 85, 0.2);
  --repay-bg-hover-color: rgba(202, 85, 85, 0.2);
  --repay-border-color: #ca5555;
  --switch-color: #5baea9;
  --switch-border-color: #32496a;
  --secondary-border-color: #3f577b;
  --yours-table-title: #ffffff;
  --claim-bg-hover-color: rgba(255, 255, 255, 0.17);
  --claim-bg-color: #505260;
  --claim-border-color: #e1e1e1;
  --withdraw-color: #fff;
  --replay-color: #fff;
  --claim-color: #fff;
`;
export default {
  title: 'Avalanche',
  path: 'avalanche',
  icon: 'https://assets.dapdap.net/images/bafkreifdm3vpor4xyh2y7ibcr4dsy262qgesegy7slrfjbo4imohqd4sfq.svg',
  bgColor: '#AF1616',
  bgIcon: '/images/chains/avalanche_white.svg',
  selectBgColor: '#AF1616',
  textColor: '#fff',
  chainId: 43114,
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  defaultTab: 'Bridge',
  theme: {
    button: {
      bg: '#AF1616',
      text: '#FFF',
    },
  },
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Avalanche.Bridge',
      description: 'Intuitively bridge from different networks to Avalanche, and vice versa.',
    },
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Avalanche.Swap',
      description: 'Trade efficiently across any assets on Avalanche.',
    },
    // Liquidity: {
    //   tab: 'Liquidity',
    //   path: 'bluebiu.near/widget/Liquidity.ALL',
    //   description: 'Seamlessly adding LP to any pair',
    // },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Avalanche.Lending',
      description: 'Maximize asset utilization across Avalanche markets',
      Theme,
    },
  },
};
