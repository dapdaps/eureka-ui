import styled from 'styled-components';

const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #ff684b;
  --primary-color: #ff684b;
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
  title: 'Scroll',
  path: 'scroll',
  icon: '/images/chains/scroll.svg',
  bgIcon: '/images/chains/scroll_white.svg',
  bgColor: '#fff',
  selectBgColor: '#EBC28E',
  textColor: '#000',
  chainId: 534352,
  rpcUrls: ['https://rpc.scroll.io'],
  defaultTab: 'Swap',
  theme: {
    button: {
      bg: '#FFEEDA',
      text: '#000000',
    },
  },
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Scroll.Bridge.Index',
      description: 'Intuitively bridge from different networks to Scroll, and vice versa.',
    },
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Scroll.Swap',
      description: 'Trade efficiently across any assets on Scroll.',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Scroll.Lending',
      description: 'Maximize asset utilization across Scroll markets',
      Theme,
    },
  },
};
