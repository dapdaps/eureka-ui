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
    MAI: linea['mai'].icon
  }
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
        decimals0: 18,
        decimals1: 8,
        vaultAddress: '0x8c0919AE1fAcD6695Ad236Ea618d1018e5c4d42c'
      },
      {
        id: 'lynex-gamma-usdt-weth',
        strategy: 'LYNEX (GAMMA)',
        token0: 'ETH',
        token1: 'USDT',
        vaultAddress: '0x7168464Ac7330EC5177694005e60FBe319DC40c2'
      },
      {
        id: 'sushi-cow-linea-usdc-weth-rp',
        strategy: 'LYNEX (GAMMA)',
        token0: 'WETH',
        token1: 'USDC',
        vaultAddress: '0xe269c87F85C725bb9BF642aAeE1650bf5796B73B'
      },
      {
        id: 'lynex-wsteth-weth',
        strategy: 'LYNEX',
        token0: 'wstETH',
        token1: 'WETH',
        vaultAddress: '0x4859ac3c9aC0A9c35Dc807f79B78f7b9a6F4e7E4'
      },
      {
        id: 'lynex-gamma-wsteth-weth',
        strategy: 'LYNEX (GAMMA)',
        token0: 'wstETH',
        token1: 'WETH',
        vaultAddress: '0xcaf1a883e63bb8c3e6f099c7a2044c07112883ca'
      },
      {
        id: 'lynex-usdc-usdt',
        strategy: 'LYNEX',
        token0: 'USDC',
        token1: 'USDT',
        vaultAddress: '0x5730Ba155FD95903c2706f1B2F8DBbBFB5e0a94c'
      },
      {
        id: 'lynex-gamma-ezeth-weth',
        strategy: 'LYNEX (GAMMA)',
        token0: 'ezETH',
        token1: 'WETH',
        vaultAddress: '0x35884E8C569b9f7714A35EDf056A82535A43F5AD'
      },
      {
        id: 'lynex-usdc-mai',
        strategy: 'LYNEX',
        token0: 'USDC',
        token1: 'MAI',
        vaultAddress: '0xc8F789da67E392e0C14dcD6C81404884199d9849'
      }
    ],
    tokenList: [linea['usdt'], linea['usdc'], linea['wsteth'], linea['weth'], linea['eth']],
    addresses: {
      USDC: '0x176211869cA2b568f2A7D4EE941E073a821EE1ff',
      USDT: '0xA219439258ca9da29E9Cc4cE5596924745e12B93',
      WBTC: '0x3aAB2285ddcDdaD8edf438C1bAB47e1a9D05a9b4'
    }
  }
};

export default { basic, networks };
