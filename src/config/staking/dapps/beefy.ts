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
        id: '',
        strategy: 'Lynex (Gamma)',
        token0: 'ETH',
        token1: 'WBTC',
        decimals0: 18,
        decimals1: 8,
        fee: '0.01',
        vaultAddress: '0x73d9ccd3017B41E9b29F1E4A49D5468B52bd17c6',
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
