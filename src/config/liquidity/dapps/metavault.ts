import { bsc } from '@/config/tokens/bsc';
import { linea } from '@/config/tokens/linea';
import { metis } from '@/config/tokens/metis';
import { optimism } from '@/config/tokens/optimism';

const basic = {
  name: 'Metavault',
  icon: '/images/apps/gamma.png',
  logo: 'https://ipfs.near.social/ipfs/bafkreibgmu62fb5o3n3s54srlzyf7ppn2c42racp5q3gnukcjgkfwkzuse',
  amountOutFn: 'bluebiu.near/widget/Liquidity.Gamma',
  ICON_VAULT_MAP: {
  },
};
const networks = {
  // Linea
  59144: {
    ALL_DATA_URL: 'https://wire2.gamma.xyz/lynex/linea/hypervisors/allData',
    USER_DATA_BASE: 'https://wire2.gamma.xyz/lynex/linea/user/',
    LAST_SNAP_SHOT_DATA_URL: 'https://wire2.gamma.xyz/database/lynex/linea/hypervisors/lastSnapshot',
    ammName: 'Lynex',
    ammImage: 'https://app.gamma.xyz/_next/static/media/icon.d7465888.svg',
    defaultPair: 'N WBTC-WETH-0',
    pairs: [
      {
        id: "N WBTC-WETH-0",
        strategy: "Dynamic",
        strategy2: "Narrow",
        token0: "WBTC",
        token1: "WETH",
        decimals0: 8,
        decimals1: 18,
        poolAddress: "0x8e80016b025c89a6a270b399f5ebfb734be58ada",
      },
      
    ],
    addresses: {
      USDC: "0x176211869ca2b568f2a7d4ee941e073a821ee1ff",
      WETH: "0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f",
      USDT: "0xa219439258ca9da29e9cc4ce5596924745e12b93",
      MATIC: "0x265b25e22bcd7f10a5bd6e6410f10537cc7567e8",
      WBTC: "0x3aab2285ddcddad8edf438c1bab47e1a9d05a9b4",
      LYNX: "0x1a51b19ce03dbe0cb44c1528e34a7edd7771e9af",

      "N USDC-WETH-0": "0x0b15a5e3ca0d4b492c3b476d0f807535f9b72079",
      "N WBTC-WETH-0": "0x8a9570ec97534277ade6e46d100939fbce4968f0",
      "N USDT-WETH-0": "0xf3b1125c8505f038503e002e61a78253610d4f60",
      "N MATIC-WETH-0": "0x8421c6102ee8a147facc01977df3b159f7921d54",
      "W USDC-LYNX-0": "0xcc86572ce5a6eee74c76c57e9ea7b08221f06bb9"
    },
    proxyAddress: '0xFc13Ebe7FEB9595D70195E9168aA7F3acE153621'
  },
};

export default { basic, networks };
