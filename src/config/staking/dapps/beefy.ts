import { linea } from '@/config/tokens/linea';

const basic = {
  name: 'Beefy',
  //   data: 'bluebiu.near/widget/Staking.Teahouse.Data',
  ICON_VAULT_MAP: {
    ETH: linea['eth'].icon,
    USDC: linea['usdc'].icon,
    USDT: linea['usdt'].icon,
    WBTC: linea['wbtc'].icon,
    WETH: linea['weth'].icon,
    wrsETH: linea['wrseth'].icon,
    wstETH: linea['wsteth'].icon,
  },
};

const networks = {
  // Linea
  59144: {
    pairs: [
      {
        id: 'lynex-gamma-wbtc-weth',
        strategy: 'Lynex (Gamma)',
        token0: 'ETH',
        token1: 'WBTC',
        // decimals0: 18,
        // decimals1: 8,
        vaultAddress: '0x8c0919AE1fAcD6695Ad236Ea618d1018e5c4d42c',
      },
    ],
    addresses: {
      ETH: linea['eth'].address,
      USDC: linea['usdc'].address,
      USDT: linea['usdt'].address,
      WBTC: linea['wbtc'].address,
      WETH: linea['weth'].address,
      wrsETH: linea['wrseth'].address,
      wstETH: linea['wsteth'].address,
    },
  },
};

export default { basic, networks };
