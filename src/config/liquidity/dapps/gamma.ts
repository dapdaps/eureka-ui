import { bsc } from '@/config/tokens/bsc';
import { linea } from '@/config/tokens/linea';
import { metis } from '@/config/tokens/metis';
import { optimism } from '@/config/tokens/optimism';

const basic = {
  name: 'Gamma',
  icon: 'https://s3.amazonaws.com/dapdap.main/images/gamma-1.png',
  logo: 'https://ipfs.near.social/ipfs/bafkreibgmu62fb5o3n3s54srlzyf7ppn2c42racp5q3gnukcjgkfwkzuse',
  dappSrc: 'bluebiu.near/widget/Liquidity.GAMMA',
  ICON_VAULT_MAP: {
    USDC: 'https://app.gamma.xyz/_next/static/media/icon.4435c0e9.svg',
    'USDC.e': 'https://app.gamma.xyz/_next/static/media/icon.4435c0e9.svg',
    USDbC: 'https://app.gamma.xyz/_next/static/media/icon.4435c0e9.svg',
    WETH: 'https://app.gamma.xyz/_next/static/media/icon.dddcef40.svg',
    USDT: 'https://app.gamma.xyz/_next/static/media/icon.16fadc1b.svg',
    WBTC: 'https://app.gamma.xyz/_next/static/media/icon.eb6c5d98.svg',
    BUSD: 'https://app.gamma.xyz/_next/static/media/icon.6be491a5.svg',
    MATIC: 'https://app.gamma.xyz/_next/static/media/icon.fe758f26.svg',
    WBNB: 'https://app.gamma.xyz/_next/static/media/icon.ca2e2bd7.svg',
    BTCB: 'https://app.gamma.xyz/_next/static/media/icon.eb6c5d98.svg',
    BNBx: 'https://app.gamma.xyz/_next/static/media/icon.ca2e2bd7.svg',
    OP: '	https://app.gamma.xyz/_next/static/media/icon.3468b9ee.svg',
    SNX: 'https://app.gamma.xyz/_next/static/media/icon.b8aa30c1.svg',
    ERN: 'https://app.gamma.xyz/_next/static/media/icon.5571c161.svg',
    WMNT: 'https://app.gamma.xyz/_next/static/media/icon.d80ccc43.svg',
    LYNX: 'https://app.gamma.xyz/_next/static/media/icon.4098f714.svg',
    ankrBNB: 'https://app.gamma.xyz/_next/static/media/icon.e48c2ef6.svg',
    WMATIC: 'https://app.gamma.xyz/_next/static/media/icon.fe758f26.svg',
    stMATIC: 'https://app.gamma.xyz/_next/static/media/icon.11f91d3b.svg',
    MINU: 'https://app.gamma.xyz/_next/static/media/icon.89124599.svg',
    ASTR: 'https://app.gamma.xyz/_next/static/media/icon.c81c9103.svg',
    wstETH: 'https://app.gamma.xyz/_next/static/media/icon.bc5ee36b.svg',
    USDB: 'https://app.gamma.xyz/_next/static/media/icon.cfaa50e0.svg',
    PAC: 'https://app.gamma.xyz/_next/static/media/icon.e887599d.svg',
    ANDY: 'https://app.gamma.xyz/_next/static/media/icon.4092b0ba.svg',
    wrsETH: 'https://app.gamma.xyz/_next/static/media/icon.033f3c7d.svg',
    BLAST: 'https://app.gamma.xyz/_next/static/media/icon.5bbd66a9.svg'
  }
};
const networks = {
  // base
  8453: {
    ALL_DATA_URL: 'https://wire2.gamma.xyz/sushi/base/hypervisors/allData',
    USER_DATA_BASE: 'https://wire2.gamma.xyz/sushi/base/user/',
    LAST_SNAP_SHOT_DATA_URL: 'https://wire2.gamma.xyz/database/sushi/base/hypervisors/lastSnapshot',
    ammName: 'Sushi',
    ammImage: 'https://app.gamma.xyz/_next/static/media/icon.615337dd.svg',
    defaultPair: 'WETH-USDbC-500',
    pairs: [
      {
        id: 'WETH-USDbC-500',
        strategy: 'Dynamic',
        strategy2: '',
        token0: 'WETH',
        token1: 'USDbC',
        decimals0: 18,
        decimals1: 6,
        poolAddress: '0x22ca6d83ab887a535ae1c6011cc36ea9d1255c31'
      }
    ],
    addresses: {
      USDbC: '0xd9aaec86b65d86f6a7b5b1b0c42ffa531710b6ca',
      WETH: '0x4200000000000000000000000000000000000006',
      'WETH-USDbC-500': '0x11c4011772594c5f124a027da35329559447853d'
    },
    proxyAddress: '0xc40F63879630dFF5b69dd6d287f7735E65e90702'
  },
  // bsc
  56: {
    ALL_DATA_URL: 'https://wire2.gamma.xyz/thena/bsc/hypervisors/allData',
    USER_DATA_BASE: 'https://wire2.gamma.xyz/thena/bsc/user/',
    LAST_SNAP_SHOT_DATA_URL: 'https://wire2.gamma.xyz/database/thena/bsc/hypervisors/lastSnapshot',
    ammName: 'Thena',
    ammImage: 'https://app.gamma.xyz/_next/static/media/icon.d0ece9b9.svg',
    defaultPair: 'N WETH-WBNB-0',
    pairs: [
      {
        id: 'N WETH-WBNB-0',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'WETH',
        token1: 'WBNB',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x1123e75b71019962cd4d21b0f3018a6412edb63c',
        gaugeV2Address: '0xD777E84b0D29128351A35045D7AE728780dEf54D'
      },
      {
        id: 'N BTCB-WBNB-0',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'BTCB',
        token1: 'WBNB',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x6b67112aa7b45e8cdc0a93b8d66a6a36e68ae8e5',
        gaugeV2Address: '0x65E40E779560199F5e68126Bc95bdc03083e5AA4'
      },
      {
        id: 'P ankrBNB-WBNB-0',
        strategy: 'Dynamic',
        strategy2: 'Pegged Price',
        token0: 'ankrBNB',
        token1: 'WBNB',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x2f6c6e00e517944ee5efe310cd0b98a3fc61cb98',
        gaugeV2Address: '0x8782fA8e2C973f7Cc19ce28DDf549fD9114F69dA'
      },
      {
        id: 'P BNBx-WBNB-0',
        strategy: 'Dynamic',
        strategy2: 'Pegged Price',
        token0: 'BNBx',
        token1: 'WBNB',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0xf2a4e4261fcdfbb891bcf703640fbe713c6cd0fe',
        gaugeV2Address: '0xf50Af14BC4953Dcf9d27EbCA8BB3625855F5B42d'
      },
      {
        id: 'N USDT-WBNB-0',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'USDT',
        token1: 'WBNB',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0xd405b976ac01023c9064024880999fc450a8668b',
        gaugeV2Address: '0xf50Af14BC4953Dcf9d27EbCA8BB3625855F5B42d'
      }
    ],
    addresses: {
      WETH: '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
      WBNB: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
      BTCB: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
      ankrBNB: '0x52f24a5e03aee338da5fd9df68d2b6fae1178827',
      BNBx: '0x1bdd3cf7f79cfb8edbb955f20ad99211551ba275',
      USDT: '0x55d398326f99059ff775485246999027b3197955',

      'N WETH-WBNB-0': '0x10bf6e7b28b1cffb1c047d7f815953931e5ee947',
      'N BTCB-WBNB-0': '0xd3c480ec7a47596ff8d63396227d1f7dc728a7f0',
      'P ankrBNB-WBNB-0': '0x754fd74e22255780a58f125300008781d8318e3a',
      'P BNBx-WBNB-0': '0x2ecbd508c00bbc8aa0cdc9100bf3956fcabe7677',
      'N USDT-WBNB-0': '0x3ec1ffd5dc29190588608ae9fd4f93750e84cda2'
    },
    proxyAddress: '0xF75c017E3b023a593505e281b565ED35Cc120efa'
  },
  // op
  10: {
    ALL_DATA_URL: 'https://wire2.gamma.xyz/optimism/hypervisors/allData',
    USER_DATA_BASE: 'https://wire2.gamma.xyz/optimism/user/',
    LAST_SNAP_SHOT_DATA_URL: 'https://wire2.gamma.xyz/database/uniswap/optimism/hypervisors/lastSnapshot',
    ammName: 'Uniswap',
    ammImage: 'https://app.gamma.xyz/_next/static/media/icon.3afe0f51.svg',
    defaultPair: 'N WETH-OP-3000',
    pairs: [
      {
        id: 'N WETH-OP-3000',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'WETH',
        token1: 'OP',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x68f5c0a2de713a54991e01858fd27a3832401849'
      },
      {
        id: 'N WETH-WBTC-500',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'WETH',
        token1: 'WBTC',
        decimals0: 18,
        decimals1: 8,
        poolAddress: '0x85c31ffa3706d1cce9d525a00f1c7d4a2911754c'
      },
      {
        id: 'N WETH-SNX-3000',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'WETH',
        token1: 'SNX',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x0392b358ce4547601befa962680bede836606ae2'
      },
      {
        id: 'W WETH-OP-3000',
        strategy: 'Dynamic',
        strategy2: 'Wide',
        token0: 'WETH',
        token1: 'OP',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x68f5c0a2de713a54991e01858fd27a3832401849'
      },
      {
        id: 'N OP-USDC.e-3000',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'OP',
        token1: 'USDC.e',
        decimals0: 18,
        decimals1: 6,
        poolAddress: '0x1c3140ab59d6caf9fa7459c6f83d4b52ba881d36'
      }
    ],
    addresses: {
      WETH: '0x4200000000000000000000000000000000000006',
      OP: '0x4200000000000000000000000000000000000042',
      WBTC: '0x68f180fcce6836688e9084f035309e29bf0a2095',
      SNX: '0x8700daec35af8ff88c16bdf0418774cb3d7599b4',
      'USDC.e': '0x7f5c764cbc14f9669b88837ca1490cca17c31607',
      ERN: '0xc5b001dc33727f8f26880b184090d3e252470d45',

      'N WETH-OP-3000': '0xbcfa4cfa97f74a6abf80b9901569bbc8654f4315',
      'N WETH-WBTC-500': '0x34d4112d180e9faf06f77c8c550ba20c9f61ae31',
      'N WETH-SNX-3000': '0x1392698b2f2ca87e6329c1ca502c5d4ba938d1b8',
      'W WETH-OP-3000': '0x8480199e5d711399abb4d51bda329e064c89ad77',
      'N OP-USDC.e-3000': '0x2102bef0d9727ea50ba844e7658e38480961835c'
    },
    proxyAddress: '0x1E97925c365cd96D74Ec55A04569915c4D65e5e0'
  },
  // polygon
  137: {
    ALL_DATA_URL: 'https://wire2.gamma.xyz/quickswap/polygon/hypervisors/allData',
    USER_DATA_BASE: 'https://wire2.gamma.xyz/quickswap/polygon/user/',
    LAST_SNAP_SHOT_DATA_URL: 'https://wire2.gamma.xyz/database/quickswap/polygon/hypervisors/lastSnapshot',
    FEE_APR_DATA_URL: 'https://wire2.gamma.xyz/quickswap/polygon/hypervisors/feeReturns/daily',
    ammName: 'QuickSwap',
    ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg',
    defaultPair: 'N WBTC-WETH-0',
    pairs: [
      {
        id: 'N WBTC-WETH-0',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'WBTC',
        token1: 'WETH',
        decimals0: 8,
        decimals1: 18,
        poolAddress: '0xac4494e30a85369e332bdb5230d6d694d4259dbc'
      },
      {
        id: 'N WMATIC-WETH-0',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'WMATIC',
        token1: 'WETH',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x479e1b71a702a595e19b6d5932cd5c863ab57ee0'
      },
      {
        id: 'N USDC.e-WETH-0',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'USDC.e',
        token1: 'WETH',
        decimals0: 6,
        decimals1: 18,
        poolAddress: '0x55caabb0d2b704fd0ef8192a7e35d8837e678207'
      },
      {
        id: 'N WMATIC-USDC.e-0',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'WMATIC',
        token1: 'USDC.e',
        decimals0: 18,
        decimals1: 6,
        poolAddress: '0xae81fac689a1b4b1e06e7ef4a2ab4cd8ac0a087d'
      },
      {
        id: 'S USDC.e-USDT-0',
        strategy: 'Dynamic',
        strategy2: 'Stabel',
        token0: 'USDC.e',
        token1: 'USDT',
        decimals0: 18,
        decimals1: 6,
        poolAddress: '0x7b925e617aefd7fb3a93abe3a701135d7a1ba710'
      }
    ],
    addresses: {
      WBTC: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
      WETH: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
      WMATIC: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
      'USDC.e': '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      USDT: '0xc2132d05d31c914a87c6611c10748aeb04b58e8f',

      'N WBTC-WETH-0': '0x4b9e26a02121a1c541403a611b542965bd4b68ce',
      'N WMATIC-WETH-0': '0x02203f2351e7ac6ab5051205172d3f772db7d814',
      'N USDC.e-WETH-0': '0x3cc20a6795c4b57d9817399f68e83e71c8626580',
      'N WMATIC-USDC.e-0': '0x04d521e2c414e6d898c6f2599fdd863edf49e247',
      'S USDC.e-USDT-0': '0x795f8c9b0a0da9cd8dea65fc10f9b57abc532e58'
    },
    proxyAddress: '0xA42d55074869491D60Ac05490376B74cF19B00e6'
  },
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
        id: 'N WBTC-WETH-0',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'WBTC',
        token1: 'WETH',
        decimals0: 8,
        decimals1: 18,
        poolAddress: '0x8e80016b025c89a6a270b399f5ebfb734be58ada'
      },
      {
        id: 'N USDC-WETH-0',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'USDC',
        token1: 'WETH',
        decimals0: 6,
        decimals1: 18,
        poolAddress: '0x3Cb104f044dB23d6513F2A6100a1997Fa5e3F587'
      },
      {
        id: 'N USDT-WETH-0',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'USDT',
        token1: 'WETH',
        decimals0: 6,
        decimals1: 18,
        poolAddress: '0x8611456f845293edd3f5788277f00f7c05ccc291'
      },
      {
        id: 'N MATIC-WETH-0',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'MATIC',
        token1: 'WETH',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x1203688929f72c459007508b1da79a5eb20a6165'
      },
      {
        id: 'W USDC-LYNX-0',
        strategy: 'Dynamic',
        strategy2: 'Wide',
        token0: 'USDC',
        token1: 'LYNX',
        decimals0: 6,
        decimals1: 18,
        poolAddress: '0xdda5ec5af00ab99dc80c33e08881eb80c027d498'
      }
    ],
    addresses: {
      USDC: '0x176211869ca2b568f2a7d4ee941e073a821ee1ff',
      WETH: '0xe5d7c2a44ffddf6b295a15c148167daaaf5cf34f',
      USDT: '0xa219439258ca9da29e9cc4ce5596924745e12b93',
      MATIC: '0x265b25e22bcd7f10a5bd6e6410f10537cc7567e8',
      WBTC: '0x3aab2285ddcddad8edf438c1bab47e1a9d05a9b4',
      LYNX: '0x1a51b19ce03dbe0cb44c1528e34a7edd7771e9af',

      'N USDC-WETH-0': '0x0b15a5e3ca0d4b492c3b476d0f807535f9b72079',
      'N WBTC-WETH-0': '0x8a9570ec97534277ade6e46d100939fbce4968f0',
      'N USDT-WETH-0': '0xf3b1125c8505f038503e002e61a78253610d4f60',
      'N MATIC-WETH-0': '0x8421c6102ee8a147facc01977df3b159f7921d54',
      'W USDC-LYNX-0': '0xcc86572ce5a6eee74c76c57e9ea7b08221f06bb9'
    },
    proxyAddress: '0xFc13Ebe7FEB9595D70195E9168aA7F3acE153621'
  },
  // mantle
  5000: {
    ALL_DATA_URL: 'https://wire2.gamma.xyz/fusionx/mantle/hypervisors/allData',
    USER_DATA_BASE: 'https://wire2.gamma.xyz/fusionx/mantle/user/',
    LAST_SNAP_SHOT_DATA_URL: 'https://wire2.gamma.xyz/database/fusionx/mantle/hypervisors/lastSnapshot',
    ammName: 'FusionX',
    ammImage: 'https://app.gamma.xyz/_next/static/media/icon.a0ab20e5.svg',
    defaultPair: 'N USDT-WMNT-500',
    pairs: [
      {
        id: 'N USDT-WMNT-500',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'USDT',
        token1: 'WMNT',
        decimals0: 6,
        decimals1: 18,
        poolAddress: '0x262255f4770aebe2d0c8b97a46287dcecc2a0aff'
      },
      {
        id: 'W USDT-WMNT-500',
        strategy: 'Dynamic',
        strategy2: 'Wide',
        token0: 'USDT',
        token1: 'WMNT',
        decimals0: 6,
        decimals1: 18,
        poolAddress: '0x262255f4770aebe2d0c8b97a46287dcecc2a0aff'
      },
      {
        id: 'W USDC-USDT-100',
        strategy: 'Dynamic',
        strategy2: 'Wide',
        token0: 'USDC',
        token1: 'USDT',
        decimals0: 6,
        decimals1: 6,
        poolAddress: '0x16867d00d45347a2ded25b8cdb7022b3171d4ae0'
      },
      {
        id: 'W MINU-WMNT-10000',
        strategy: 'Dynamic',
        strategy2: 'Wide',
        token0: 'MINU',
        token1: 'WMNT',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x3bfb98c0af1aca0e66d96624c7e545eb131f285e'
      },
      {
        id: 'N USDT-WETH-500',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'USDT',
        token1: 'WETH',
        decimals0: 6,
        decimals1: 18,
        poolAddress: '0xa125af1a4704044501fe12ca9567ef1550e430e8'
      }
    ],
    addresses: {
      USDT: '0x201eba5cc46d216ce6dc03f6a759e8e766e956ae',
      MINU: '0x51cfe5b1e764dc253f4c8c1f19a081ff4c3517ed',
      WMNT: '0x78c1b0c915c4faa5fffa6cabf0219da63d7f4cb8',
      WBTC: '0xcabae6f6ea1ecab08ad02fe02ce9a44f09aebfa2',
      USDC: '0x09bc4e0d864854c6afb6eb9a9cdf58ac190d0df9',
      WETH: '0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111',

      'N USDT-WMNT-500': '0x6e9d701fb6478ed5972a37886c2ba6c82a4cbb4c',
      'W USDT-WMNT-500': '0x1ee3ae551188661553882fdc75f8f62eaa6726ad',
      'W USDC-USDT-100': '0x561f5cf838429586d1f8d3826526891b289270ee',
      'W MINU-WMNT-10000': '0xf8a02496bd84bd7f7ab9f1a000044fc482d729ca',
      'N USDT-WETH-500': '0xde7421f870ffb2b99998d9ed07c4d9b22e783922'
    },
    proxyAddress: '0xFc13Ebe7FEB9595D70195E9168aA7F3acE153621'
  },
  // Polygon zkEVM
  1101: {
    ALL_DATA_URL: 'https://wire2.gamma.xyz/quickswap/polygon-zkevm/hypervisors/allData',
    USER_DATA_BASE: 'https://wire2.gamma.xyz/quickswap/polygon-zkevm/user/',
    LAST_SNAP_SHOT_DATA_URL: 'https://wire2.gamma.xyz/database/quickswap/polygon-zkevm/hypervisors/lastSnapshot',
    FEE_APR_DATA_URL: 'https://wire2.gamma.xyz/quickswap/polygon-zkevm/hypervisors/feeReturns/daily',
    ammName: 'QuickSwap',
    ammImage: 'https://app.gamma.xyz/_next/static/media/icon.ea1fec4d.svg',
    defaultPair: 'N WETH-WBTC-0',
    pairs: [
      {
        id: 'N WETH-WBTC-0',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'WETH',
        token1: 'WBTC',
        decimals0: 18,
        decimals1: 8,
        poolAddress: '0xfc4a3a7dc6b62bd2ea595b106392f5e006083b83'
      },
      {
        id: 'N WETH-MATIC-0',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'WETH',
        token1: 'MATIC',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0xb73abfb5a2c89f4038baa476ff3a7942a021c196'
      },
      {
        id: 'S USDT-USDC-0',
        strategy: 'Dynamic',
        strategy2: 'Stable',
        token0: 'USDT',
        token1: 'USDC',
        decimals0: 6,
        decimals1: 6,
        poolAddress: '0x9591b8a30c3a52256ea93e98da49ee43afa136a8'
      },

      {
        id: 'N WETH-USDC-0',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'WETH',
        token1: 'USDC',
        decimals0: 18,
        decimals1: 6,
        poolAddress: '0xc44ad482f24fd750caeba387d2726d8653f8c4bb'
      }
    ],
    addresses: {
      WETH: '0x4f9a0e7fd2bf6067db6994cf12e4495df938e6e9',
      WBTC: '0xea034fb02eb1808c2cc3adbc15f447b93cbe08e1',
      MATIC: '0xa2036f0538221a77a3937f1379699f44945018d0',
      USDT: '0x1e4a5963abfd975d8c9021ce480b42188849d41d',
      USDC: '0xa8ce8aee21bc2a48a5ef670afcc9274c7bbbc035',
      stMATIC: '0x83b874c1e09d316059d929da402dcb1a98e92082',

      'N WETH-WBTC-0': '0x1cc4ee0cb063e9db36e51f5d67218ff1f8dbfa0f',
      'N WETH-MATIC-0': '0x2f39293c9ed046822c014143fb18d5ae0479be93',
      'S USDT-USDC-0': '0x145d55ae4848f9782efcac785a655e3e5dce1bcd',
      'N WETH-USDC-0': '0x04c6b11e1ffe1f1032bd62adb343c9d07767489c'
    },
    proxyAddress: '0x8480199e5d711399abb4d51bda329e064c89ad77'
  },
  // Blast
  81457: {
    ALL_DATA_URL: 'https://wire2.gamma.xyz/thruster/blast/hypervisors/allData',
    USER_DATA_BASE: 'https://wire2.gamma.xyz/thruster/blast/user/',
    LAST_SNAP_SHOT_DATA_URL: 'https://wire2.gamma.xyz/database/thruster/blast/hypervisors/lastSnapshot',
    ammName: 'Thruster',
    ammImage: 'https://app.gamma.xyz/_next/static/media/icon.31124d7b.svg',
    defaultPair: 'N USDB-WETH-500',
    pairs: [
      {
        id: 'N USDB-WETH-500',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'USDB',
        token1: 'WETH',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x7f0db0d77d0694f29c3f940b5b1f589fff6ef2e0'
      },
      {
        id: 'W WETH-PAC-3000',
        strategy: 'Dynamic',
        strategy2: 'Wide',
        token0: 'WETH',
        token1: 'PAC',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x14c5766f8556683af2d8023e389837044794795a'
      },
      {
        id: 'N WETH-BLAST-3000',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'WETH',
        token1: 'BLAST',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x9a0aa28d999a21d3cf6f2703cdbba9feaf4a32f7'
      },
      {
        id: 'W WETH-ANDY-3000',
        strategy: 'Dynamic',
        strategy2: 'Wide',
        token0: 'WETH',
        token1: 'ANDY',
        decimals0: 18,
        decimals1: 9,
        poolAddress: '0x7573ab0e80f8b264f6bc2ac37401f0adbe491759'
      },
      {
        id: 'N WETH-WBTC-3000',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'WETH',
        token1: 'WBTC',
        decimals0: 18,
        decimals1: 8,
        poolAddress: '0xecb1c17a51d782ac2757e2ab568d159854b9b4bd'
      },
      {
        id: 'N USDB-BLAST-3000',
        strategy: 'Dynamic',
        strategy2: 'Narrow',
        token0: 'USDB',
        token1: 'BLAST',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0xe3a5f46667461e35eece4e39e2177b438af6b7f7'
      },
      {
        id: 'P WETH-wrsETH-500',
        strategy: 'Dynamic',
        strategy2: 'Pegged Price',
        token0: 'WETH',
        token1: 'wrsETH',
        decimals0: 18,
        decimals1: 18,
        poolAddress: '0x4cc9959ae7a4d380c1100b271bc63d9961ca162f'
      }
    ],
    addresses: {
      USDB: '0x4300000000000000000000000000000000000003',
      WETH: '0x4300000000000000000000000000000000000004',
      PAC: '0x5ffd9ebd27f2fcab044c0f0a26a45cb62fa29c06',
      ANDY: '0xd43d8adac6a4c7d9aeece7c3151fca8f23752cf8',
      WBTC: '0xf7bc58b8d8f97adc129cfc4c9f45ce3c0e1d2692',
      wrsETH: '0xe7903b1f75c534dd8159b313d92cdcfbc62cb3cd',
      BLAST: '0xb1a5700fa2358173fe465e6ea4ff52e36e88e2ad',

      'N USDB-WETH-500': '0xd6cc4a33da7557a629e819c68fb805ddb225f517',
      'W WETH-PAC-3000': '0xe7b2260660f094b10f3902dc3f12061721176a49',
      'N WETH-BLAST-3000': '0x4c8e3238bdafa58e0e92a64790450ddbea733dff',
      'W WETH-ANDY-3000': '0xf8a02496bd84bd7f7ab9f1a000044fc482d729ca',
      'N WETH-WBTC-3000': '0x1ee3ae551188661553882fdc75f8f62eaa6726ad',
      'N USDB-BLAST-3000': '0x20be921c6d8bd92a4f52b5aeea56c369c1e5f92f',
      'P WETH-wrsETH-500': '0x75332530af3871aa3224e8ea5d33e79b52388b1a'
    },
    proxyAddress: '0xca8759814695516C34168BBedd86290964D37adA'
  }
};

export default { basic, networks };
