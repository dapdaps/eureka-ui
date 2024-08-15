import styled from 'styled-components';

const Theme = styled.div`
  --button-text-color: #0f1126;
  --button-color: #00ffe0;
  --primary-color: #13a69d;
  --border-color: #292c42;
  --supply-bg-color: rgba(39, 197, 187, 0.2);
  --borrow-bg-color: rgba(202, 85, 85, 0.2);
  --supply-color: #62fff6;
  --borrow-color: #ff6767;
  --withdraw-bg-color: rgba(19, 166, 157, 0.2);
  --withdraw-bg-hover-color: rgba(19, 166, 157, 1);
  --withdraw-border-color: rgba(19, 166, 157, 1);
  --repay-bg-color: rgba(217, 71, 124, 0.2);
  --repay-bg-hover-color: rgba(217, 71, 124, 1);
  --repay-border-color: rgba(217, 71, 124, 1);
  --switch-color: #5baea9;
  --switch-border-color: #32496a;
  --secondary-border-color: #3f577b;
  --yours-table-title: #ffffff;
  --claim-bg-hover-color: rgba(19, 166, 157, 1);
  --claim-bg-color: rgba(19, 166, 157, 0.2);
  --claim-border-color: rgba(19, 166, 157, 1);
  --withdraw-color: #fff;
  --replay-color: #fff;
  --claim-color: #fff;
`;

export default {
  title: 'Manta Pacific',
  path: 'manta',
  icon: '/images/chains/manta.svg',
  bgColor: '#fff',
  bgIcon: '/images/chains/manta_white.svg',
  selectBgColor: '#35bde3',
  textColor: '#000',
  chainId: 169,
  rpcUrls: ['https://1rpc.io/manta'],
  defaultTab: 'Swap',
  theme: {
    button: {
      bg: '#707EDF',
      text: '#FFF',
    },
  },
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: '',
      description: 'Intuitively bridge from different networks to Manta, and vice versa.',
    },
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Manta.Swap',
      description: 'Trade efficiently across any assets on Manta.',
    },
    Liquidity: {
      tab: 'Liquidity',
      path: 'bluebiu.near/widget/Liquidity.ALL',
      description: 'Seamlessly adding LP to any pair',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Manta.Lending',
      description: 'Maximize asset utilization across Manta markets',
      Theme,
    },
  },
};
