import { linea } from '@/config/tokens/linea';

import { arbitrum } from '../../tokens/arbitrum';
import { ethereum } from '../../tokens/ethereum';
import { optimism } from '../../tokens/optimism';
import { polygon } from '../../tokens/polygon';

const basic = {
  name: 'Teahouse',
  icon: '/assets/images/teahouse.png',
  dappSrc: 'bluebiu.near/widget/Staking.Teahouse.Index',
  //   data: 'bluebiu.near/widget/Staking.Teahouse.Data',
  ICON_VAULT_MAP: {
    USDC: linea['usdc'].icon,
    USDT: linea['usdt'].icon,
    WBTC: linea['wbtc'].icon,
    WETH: linea['weth'].icon,
    wrsETH: linea['wrseth'].icon,
    wstETH: linea['wsteth'].icon
  },
  easyEarn: {
    pools: {
      // Arbitrum
      42161: {
        '0x0061704612f0f5138652b566bc795d50bc634099': {
          address: '0x0061704612f0f5138652b566bc795d50bc634099',
          name: 'TEAWBTC',
          decimals: 18,
          token: arbitrum['wbtc']
        },
        '0x884bdd28aa7a7e7e4b56d1a321e456794ace7238': {
          address: '0x884bdd28aa7a7e7e4b56d1a321e456794ace7238',
          name: 'TeaETHmax',
          decimals: 18,
          token: {
            ...arbitrum['eth'],
            address: arbitrum['weth'].address
          }
        },
        '0x0a0432f56be94c1dc03dc05aae1e0e306dedd91a': {
          address: '0x0a0432f56be94c1dc03dc05aae1e0e306dedd91a',
          name: 'TEAUSDC',
          decimals: 18,
          token: arbitrum['usdc']
        },
        '0x777748d630ae01445fb6f82e950c902e9d432331': {
          address: '0x777748d630ae01445fb6f82e950c902e9d432331',
          name: 'TEAUSDT',
          decimals: 18,
          token: arbitrum['usdt']
        }
      },
      // Optimism
      10: {
        '0x718e140219a2d1cd76645dfd8c45b16ca08b3454': {
          address: '0x718e140219a2d1cd76645dfd8c45b16ca08b3454',
          name: 'TEAWBTC',
          decimals: 18,
          token: optimism['wbtc']
        }
      },
      // Ethereum
      1: {
        '0x4599e4f3eea04badd41501bf79183e67f6cf569d': {
          address: '0x4599e4f3eea04badd41501bf79183e67f6cf569d',
          name: 'TeaETHmax',
          decimals: 18,
          token: {
            ...ethereum['eth'],
            address: ethereum['weth'].address
          }
        },
        '0xf31900132dff544cfe536e76c38a357ff08183d9': {
          address: '0xf31900132dff544cfe536e76c38a357ff08183d9',
          name: 'TEAUSDC',
          decimals: 18,
          token: ethereum['usdc']
        }
      },
      // Polygon
      137: {
        '0xc12db967c0139baa3f7db4f9186f5ee5cd15f2e7': {
          address: '0xc12db967c0139baa3f7db4f9186f5ee5cd15f2e7',
          name: 'TEAUSDC',
          decimals: 18,
          token: polygon['usdc']
        }
      }
    },
    shareInfoApi: (params: { account: string; chainId: number; address: string }) => {
      const { chainId, address, account } = params;
      return `https://vault-api.teahouse.finance/vaults/managed/position/${chainId}/${address}/${account}`;
    }
  }
};

const networks = {
  // Linea
  59144: {
    pairs: [
      {
        id: 'USDC-USDT-Oku',
        strategy: 'Oku',
        token0: 'USDC',
        token1: 'USDT',
        decimals0: 6,
        decimals1: 6,
        fee: '0.01',
        vaultAddress: '0x73d9ccd3017B41E9b29F1E4A49D5468B52bd17c6'
      },
      {
        id: 'USDC-USDT-PancakeSwap',
        strategy: 'PancakeSwap',
        token0: 'USDC',
        token1: 'USDT',
        decimals0: 6,
        decimals1: 6,
        fee: '0.01',
        vaultAddress: '0xd4E10dd0c0e64C5F6EB134E7D2F2D43f82D8DC00'
      },
      {
        id: '',
        strategy: 'Oku',
        token0: 'WBTC',
        token1: 'WETH',
        decimals0: 8,
        decimals1: 18,
        fee: '0.05',
        vaultAddress: '0x7d372Cc969211502D5C3a5721a85fc382f83bC8F'
      },
      {
        id: '',
        strategy: 'PancakeSwap',
        token0: 'WBTC',
        token1: 'WETH',
        decimals0: 18,
        decimals1: 18,
        fee: '0.05',
        vaultAddress: '0x0F3CC3Ea42b989323e7c7e499b5B6A343eA55c18'
      },
      {
        id: 'USDC-WETH-PancakeSwap',
        strategy: 'PancakeSwap',
        token0: 'USDC',
        token1: 'WETH',
        decimals0: 6,
        decimals1: 18,
        fee: '0.05',
        vaultAddress: '0x07811284e36fDc45f65cd56FC7c6929855d6A0cc'
      },
      {
        id: 'USDC-WETH-Oku',
        strategy: 'Oku',
        token0: 'USDC',
        token1: 'WETH',
        decimals0: 6,
        decimals1: 18,
        fee: '0.05',
        vaultAddress: '0x172Dba015dDfA642a3E3e0e8BaB040468D8D9879'
      },
      {
        id: '',
        strategy: 'Nile',
        token0: 'wrsETH',
        token1: 'WETH',
        decimals0: 18,
        decimals1: 18,
        fee: '0.05',
        vaultAddress: '0x1adC5E10933b696FA5311DB5339F9a15E959e2B5'
      },
      {
        id: '',
        strategy: 'PancakeSwap',
        token0: 'wstETH',
        token1: 'WETH',
        decimals0: 18,
        decimals1: 18,
        fee: '0.05',
        vaultAddress: '0x8FCc61e802c6356486e37d45b53D212af34Cc2ae'
      }
    ],
    addresses: {
      USDC: linea['usdc'].address,
      USDT: linea['usdt'].address,
      WBTC: linea['wbtc'].address,
      WETH: linea['weth'].address,
      wrsETH: linea['wrseth'].address,
      wstETH: linea['wsteth'].address
    }
  }
};

export default { basic, networks };
