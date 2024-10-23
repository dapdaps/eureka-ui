import styled from 'styled-components';

const Theme = styled.div`
  --button-text-color: #000;
  --button-color: #fdfe03;
  --primary-color: #fdfe03;
  --border-color: #32496a;
  --supply-bg-color: rgba(217, 159, 71, 0.2);
  --borrow-bg-color: rgba(217, 71, 124, 0.2);
  --supply-color: #fdfe03;
  --borrow-color: #d9477c;
  --withdraw-bg-color: rgba(243, 186, 47, 0.2);
  --withdraw-bg-hover-color: #fdfe03;
  --withdraw-border-color: #fdfe03;
  --repay-bg-color: rgba(217, 71, 124, 0.2);
  --repay-bg-hover-color: #d9477c;
  --repay-border-color: #d9477c;
  --switch-color: #fdfe03;
  --switch-border-color: #32496a;
  --secondary-border-color: #32496a;
  --yours-table-title: #ffffff;
  --claim-bg-hover-color: #fdfe03;
  --claim-bg-color: rgba(243, 186, 47, 0.2);
  --claim-border-color: #fdfe03;
  --withdraw-color: #fff;
  --replay-color: #fff;
  --claim-color: #fff;
`;

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
      description: 'Maximize asset utilization across Blast markets',
      Theme
    }
  }
};
