import styled from 'styled-components';

const Theme = styled.div`
  --button-text-color: #fff;
  --button-color: #3b6bdc;
  --primary-color: #3b6bdc;
  --border-color: #292c42;
  --supply-bg-color: rgba(78, 133, 255, 0.2);
  --borrow-bg-color: rgba(196, 71, 217, 0.2);
  --supply-color: #85abff;
  --borrow-color: #e88eff;
  --withdraw-bg-color: rgba(59, 107, 220, 0.2);
  --withdraw-bg-hover-color: #3b6bdc;
  --withdraw-border-color: #3b6bdc;
  --repay-bg-color: rgba(196, 71, 217, 0.2);
  --repay-bg-hover-color: #c447d9;
  --repay-border-color: #c447d9;
  --switch-color: #3b6bdc;
  --switch-border-color: #32496a;
  --secondary-border-color: #32496a;
  --yours-table-title: #ffffff;
  --claim-bg-hover-color: #3b6bdc;
  --claim-bg-color: rgba(59, 107, 220, 0.2);
  --claim-border-color: #3b6bdc;
  --withdraw-color: #fff;
  --replay-color: #fff;
  --claim-color: #fff;
`;

export default {
  title: 'zkSync',
  path: 'zksync',
  icon: 'https://assets.dapdap.net/images/bafkreicwo7gbj23ay4r6w5wwdwllyaxd6eo4w2cngr64sp26z5wmke7xju.svg',
  bgColor: '#FFFFFF',
  bgIcon: '/images/chains/zksync_white.svg',
  selectBgColor: '#3b6bdc',
  textColor: '#000',
  chainId: 324,
  rpcUrls: ['https://mainnet.era.zksync.io'],
  defaultTab: 'Swap',
  theme: {
    button: {
      bg: '#0469FF',
      text: '#ffffff',
    },
  },
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/zkSync.Bridge.Index',
      description: 'Intuitively bridge from different networks to zkSync, and vice versa.',
    },
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/zkSync.Swap.Dex',
      description: 'Trade efficiently across any assets on zkSync.',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/zkSync.Lending',
      description: 'Maximize asset utilization across zkSync markets',
      Theme,
    },
  },
};
