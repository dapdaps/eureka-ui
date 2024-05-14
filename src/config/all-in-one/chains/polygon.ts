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
  title: 'Polygon',
  path: 'polygon',
  icon: 'https://assets.dapdap.net/images/bafkreicq7b2rylubg6pli3mgxjdpml4rdju2upxq25a6nd35xepiqakgfy.svg',
  bgColor: '#5C28D8',
  bgIcon: '/images/chains/polygon_white.svg',
  selectBgColor: '#5C28D8',
  chainId: 137,
  rpcUrls: ['https://polygon.llamarpc.com'],
  defaultTab: 'Bridge',
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Polygon.Bridge',
      description: 'Trade by best price on Polygon',
    },
    Swap: {
      tab: 'Trade',
      path: 'bluebiu.near/widget/Polygon.Swap.Dex',
      description: 'Trade by best price on Polygon',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Polygon.Lending',
      description: 'Trade by best price on Polygon',
      Theme
    },
  },
};
