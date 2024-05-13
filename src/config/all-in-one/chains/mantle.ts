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
  title: 'Mantle',
  path: 'mantle',
  icon: 'https://assets.dapdap.net/images/bafkreiboehkc3sfdmzzsv7abvhssavcicom3mjjm4wje3zgm3nzg5w4kbu.svg',
  bgColor: '#000000',
  bgIcon: '/images/chains/mantle_white.svg',
  selectBgColor: 'rgb(0,255,224)',
  chainId: 5000,
  rpcUrls: ['https://mantle-mainnet.public.blastapi.io'],
  defaultTab: 'Swap',
  menuConfig: {
    Swap: {
      tab: 'Trade',
      path: 'bluebiu.near/widget/Mantle.Swap.Dex',
      description: 'Trade by best price on Mantle',
    },
    Liquidity: {
      tab: 'Liquidity',
      path: 'bluebiu.near/widget/Mantle.GAMMA',
      description: 'Trade by best price on Mantle',
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Mantle.Lending',
      description: 'Trade by best price on Mantle',
      Theme
    },
  },
};
