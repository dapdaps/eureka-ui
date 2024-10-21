import { bsc } from '@/config/tokens/bsc';
import { linea } from '@/config/tokens/linea';
import { metis } from '@/config/tokens/metis';
import { scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'Pencil',
  ICON_VAULT_MAP: {
    ETH: '/assets/images/pencil/eth.webp',
    USDT: '/assets/images/pencil/usdt.webp',
    USDC: '/assets/images/pencil/usdc.webp',
    wstETH: '/assets/images/pencil/wstETH.webp',
    Stone: '/assets/images/pencil/stone.webp',
    pufETH: '/assets/images/pencil/pufETH.webp',
    wrsETH: '/assets/images/pencil/wrsETH.webp',
    'weETH (Scroll Bridged)': '/assets/images/pencil/weETH.webp',
    WBTC: '/assets/images/pencil/wBTC.webp',
    'SolvBTC.b': '/assets/images/pencil/solvBTCB.webp',
    'weETH (Stargate Bridged)': '/assets/images/pencil/weETH.webp',
    DAPP: '/assets/images/pencil/pencils-logo-green-bg.webp',
    USDe: '/assets/images/pencil/usde.webp'
  }
};
const networks = {
  534352: {
    ALL_DATA_URL: 'https://app.pencilsprotocol.io/api/vault/list',
    pools: [
      {
        id: 'DAPP',
        rewards: ['50% promotional APR']
      },
      {
        id: 'USDC',
        rewards: ['1x Pencils', 'Scroll Marks']
      },
      {
        id: 'USDT',
        rewards: ['1x Pencils', 'Scroll Marks']
      },
      {
        id: 'USDe',
        rewards: ['1x Pencils', 'Scroll Marks']
      },
      {
        id: 'WETH',
        rewards: ['2x Pencils', 'Scroll Marks']
      },
      {
        id: 'wstETH',
        rewards: ['1.5x Pencils', 'Scroll Marks']
      },
      {
        id: 'STONE',
        rewards: ['2x Pencils', '2x Stone Points', 'Eigenlayer Points', 'Mind vFHE', 'Scroll Marks']
      },
      {
        id: 'wrsETH',
        rewards: ['2x Pencils', '2x Kelp Miles', 'Eigenlayer Points', 'Scroll Marks']
      },
      {
        id: 'pufETH',
        rewards: ['1.5x Pencils', '1.5x Puffer Points', 'Eigenlayer Points', 'Mind vFHE', 'Scroll Marks']
      },
      {
        id: 'weETH',
        rewards: ['3x Pencils', '3x Etherfi Loyalty Points', 'Eigenlayer Points', 'Scroll Marks']
      },
      {
        id: 'SolvBTC.b',
        rewards: ['4x Pencils', '8x Solv XP', 'Mind vFHE', 'Scroll Marks']
      },
      {
        id: 'WBTC',
        rewards: ['1.5x Pencils', 'Scroll Marks']
      }
    ]
  }
};

export default { basic, networks };
