import styled from 'styled-components';

const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #004bfc;
  --primary-color: #004bfc;
  --border-color: #32496a;
  --supply-bg-color: rgba(78, 133, 255, 0.2);
  --borrow-bg-color: rgba(196, 71, 217, 0.2);
  --supply-color: #85abff;
  --borrow-color: #e88eff;
  --withdraw-bg-color: rgba(0, 75, 252, 0.2);
  --withdraw-bg-hover-color: #004bfc;
  --withdraw-border-color: #004bfc;
  --repay-bg-color: rgba(196, 71, 217, 0.2);
  --repay-bg-hover-color: #c447d9;
  --repay-border-color: #c447d9;
  --switch-color: #004bfc;
  --switch-border-color: #32496a;
  --secondary-border-color: #3f577b;
  --yours-table-title: #ffffff;
  --claim-bg-hover-color: #004bfc;
  --claim-bg-color: rgba(0, 75, 252, 0.2);
  --claim-border-color: #004bfc;
  --withdraw-color: #fff;
  --replay-color: #fff;
  --claim-color: #fff;
`;

export default {
  title: 'Base',
  path: 'base',
  icon: '/images/chains/base_white.svg',
  bgColor: '#0038FF',
  bgIcon: '/images/chains/base_white.svg',
  selectBgColor: '#0038FF',
  textColor: '#fff',
  chainId: 8453,
  rpcUrls: ['https://developer-access-mainnet.base.org'],
  defaultTab: 'Bridge',
  theme: {
    button: {
      bg: '#0038FF',
      text: '#FFFFFF'
    }
  },
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Base.Bridge',
      description: 'Intuitively bridge from different networks to Base, and vice versa.'
    },
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Base.BaseDex',
      description: 'Trade efficiently across any assets on Base.'
    },
    Liquidity: {
      tab: 'Liquidity',
      path: 'bluebiu.near/widget/Liquidity.ALL',
      description: 'Seamlessly adding LP to any pair'
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Base.Lending',
      description: 'Maximize asset utilization across Base markets',
      Theme
    }
  }
};
