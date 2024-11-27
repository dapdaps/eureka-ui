import styled from 'styled-components';

const Theme = styled.div`
  --button-text-color: #000;
  --button-color: #fff267;
  --primary-color: #fff267;
  --border-color: #292c42;
  --supply-bg-color: rgba(86, 218, 255, 0.2);
  --borrow-bg-color: rgba(196, 71, 217, 0.2);
  --supply-color: #fff267;
  --borrow-color: #e88eff;
  --withdraw-bg-color: #fff267;
  --withdraw-bg-hover-color: #fff267;
  --withdraw-border-color: #fff267;
  --repay-bg-color: rgba(196, 71, 217, 0.2);
  --repay-bg-hover-color: #c447d9;
  --repay-border-color: #c447d9;
  --switch-color: #fff267;
  --switch-border-color: #3f577b;
  --secondary-border-color: #32496a;
  --yours-table-title: #ffffff;
  --claim-bg-hover-color: #fff267;
  --claim-bg-color: #fff267;
  --claim-border-color: #fff267;
  --withdraw-color: #000;
  --replay-color: #fff;
  --claim-color: #000;
`;
export default {
  title: 'Linea',
  path: 'linea',
  icon: '/images/chains/linea_color.svg',
  bgColor: 'rgb(255, 242, 103)',
  bgIcon: '/images/chains/linea_white.svg',
  textColor: '#000',
  selectBgColor: '#FFF267',
  chainId: 59144,
  rpcUrls: ['https://linea.blockpi.network/v1/rpc/public'],
  defaultTab: 'Bridge',
  theme: {
    button: {
      bg: '#FFF267',
      text: '#000000'
    }
  },
  menuConfig: {
    Bridge: {
      tab: 'Bridge',
      path: 'bluebiu.near/widget/Linea.Bridge',
      description: 'Intuitively bridge from different networks to Linea, and vice versa.'
    },
    Swap: {
      tab: 'Swap',
      path: 'bluebiu.near/widget/Linea.Swap.Dex',
      description: 'Trade efficiently across any assets on Linea.'
    },
    Liquidity: {
      tab: 'Liquidity',
      path: 'bluebiu.near/widget/Liquidity.ALL',
      description: 'Seamlessly adding LP to any pair'
    },
    Lending: {
      tab: 'Lending',
      path: 'bluebiu.near/widget/Linea.Lending',
      description: 'Maximize asset utilization across Linea markets',
      Theme
    }
  }
};
