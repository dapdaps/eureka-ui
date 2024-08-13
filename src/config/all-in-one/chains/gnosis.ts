import styled from 'styled-components';

const Theme = styled.div`
  --button-text-color: #ffffff;
  --button-color: #04795b;
  --primary-color: #04795b;
  --border-color: #292c42;
  --supply-bg-color: rgba(4, 121, 91, 0.2);
  --borrow-bg-color: rgba(217, 71, 124, 0.2);
  --supply-color: #00c391;
  --borrow-color: #ff6767;
  --withdraw-bg-color: rgba(4, 121, 91, 0.2);
  --withdraw-bg-hover-color: rgba(4, 121, 91, 1);
  --withdraw-border-color: rgba(4, 121, 91, 1);
  --repay-bg-color: rgba(217, 71, 124, 0.2);
  --repay-bg-hover-color: rgba(217, 71, 124, 1);
  --repay-border-color: rgba(217, 71, 124, 1);
  --switch-color: #04795b;
  --switch-border-color: #32496a;
  --secondary-border-color: #3f577b;
  --yours-table-title: #ffffff;
  --claim-bg-hover-color: rgba(4, 121, 91, 1);
  --claim-bg-color: rgba(4, 121, 91, 0.2);
  --claim-border-color: rgba(4, 121, 91, 1);
  --withdraw-color: #fff;
  --replay-color: #fff;
  --claim-color: #fff;
`;

export default {
  title: 'Gnosis',
  path: 'gnosis',
  icon: 'https://assets.dapdap.net/images/bafkreiazsyndhevopspbjue3ztz5r5mypuzpa5gjragm3hdg6ey33rfheu.svg',
  bgColor: '#04795B',
  bgIcon: '/images/chains/gnosis_white.svg',
  selectBgColor: '#04795B',
  textColor: '#fff',
  chainId: 100,
  rpcUrls: ['https://rpc.ankr.com/gnosis'],
  defaultTab: 'Swap',
  theme: {
    button: {
      bg: '#0C532D',
      text: '#FFF',
    },
  },
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: '',
      description: 'Intuitively bridge from different networks to Gnosis, and vice versa.',
    },
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Gnosis.Swap.Dex',
      description: 'Trade efficiently across any assets on Gnosis.',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Gnosis.Lending',
      description: 'Maximize asset utilization across Gnosis markets',
      Theme,
    },
  },
};
