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
    ezETH: linea['ezeth'].icon,
    MAI: linea['mai'].icon,
  },
};

const networks = {
  // Linea
  59144: {
    pairs: [
      {
        id: 'lynex-gamma-wbtc-weth',
        strategy: 'LYNEX (GAMMA)',
        token0: 'ETH',
        token1: 'WBTC',
        vaultAddress: '0x8c0919AE1fAcD6695Ad236Ea618d1018e5c4d42c',
      },
      {
        id: 'lynex-gamma-usdt-weth',
        strategy: 'LYNEX (GAMMA)',
        token0: 'WETH',
        token1: 'USDT',
        vaultAddress: '0x7168464Ac7330EC5177694005e60FBe319DC40c2',
      },
      {
        id: 'lynex-gamma-usdc-weth',
        strategy: 'LYNEX (GAMMA)',
        token0: 'WETH',
        token1: 'USDC',
        vaultAddress: '0xe269c87F85C725bb9BF642aAeE1650bf5796B73B',
      },
      {
        id: 'lynex-wsteth-weth',
        strategy: 'LYNEX',
        token0: 'wstETH',
        token1: 'WETH',
        vaultAddress: '0xcAF1A883e63bb8C3E6f099C7A2044c07112883ca',
      },
      {
        id: 'lynex-gamma-wsteth-weth',
        strategy: 'LYNEX (GAMMA)',
        token0: 'wstETH',
        token1: 'WETH',
        vaultAddress: '0x4859ac3c9aC0A9c35Dc807f79B78f7b9a6F4e7E4',
      },
      {
        id: 'lynex-usdc-usdt',
        strategy: 'LYNEX',
        token0: 'USDC',
        token1: 'USDT',
        vaultAddress: '0x5730Ba155FD95903c2706f1B2F8DBbBFB5e0a94c',
      },
      {
        id: 'lynex-gamma-ezeth-weth',
        strategy: 'LYNEX (GAMMA)',
        token0: 'ezETH',
        token1: 'WETH',
        vaultAddress: '0x35884E8C569b9f7714A35EDf056A82535A43F5AD',
      },
      {
        id: 'lynex-usdc-mai',
        strategy: 'LYNEX',
        token0: 'USDC',
        token1: 'MAI',
        vaultAddress: '0xc8F789da67E392e0C14dcD6C81404884199d9849',
      },
    ],
    tokenList: [linea['usdt'], linea['usdc'], linea['wsteth'], linea['weth'], linea['eth']],
  },
};

export default { basic, networks };
