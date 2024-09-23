import { beraB } from '@/config/tokens/bera-bArtio';

const basic = {
  name: 'Infrared',
  ICON_VAULT_MAP: {
    'HONEY-WBERA': 'https://www.infrared.finance/_next/image?url=%2Fassets%2Ficons%2Fhoney-wbera.png&w=64&q=75',
    // "VDHONEY": "",
    BHONEY: 'https://www.infrared.finance/_next/static/media/bhoney.7829fa2c.svg',
    'HONEY-USDC': 'https://www.infrared.finance/_next/image?url=%2Fassets%2Ficons%2Fhoney-usdc.png&w=64&q=75',
    'HONEY-WETH': 'https://www.infrared.finance/_next/image?url=%2Fassets%2Ficons%2Fhoney-weth.png&w=64&q=75',
    'HONEY-WBTC': 'https://www.infrared.finance/_next/image?url=%2Fassets%2Ficons%2Fhoney-wbtc.png&w=64&q=75'
  }
};
const networks = {
  // Bera bArtio
  80084: {
    ALL_DATA_URL: 'https://api.staging.infrared.finance/v2/vaults',
    BHONEY_ADDRESS: '0x7d91Bf5851B3A8bCf8C39A69AF2F0F98A4e2202A',
    pairs: [
      {
        id: 'HONEY-WBERA',
        strategy: 'Dynamic',
        strategy2: '',
        token0: 'HONEY',
        token1: 'WBERA',
        decimals: 18,
        decimals0: 18,
        decimals1: 18,
        LP_ADDRESS: '0xd28d852cbcc68dcec922f6d5c7a8185dbaa104b7'
      },
      {
        id: 'BHONEY',
        strategy: 'Dynamic',
        strategy2: '',
        token0: 'bHONEY',
        token1: '',
        decimals: 18,
        decimals0: 18,
        decimals1: 18,
        LP_ADDRESS: '0x1306d3c36ec7e38dd2c128fbe3097c2c2449af64'
      },
      {
        id: 'HONEY-USDC',
        strategy: 'Dynamic',
        strategy2: '',
        token0: 'HONEY',
        token1: 'USDC',
        decimals: 18,
        decimals0: 18,
        decimals1: 6,
        LP_ADDRESS: '0xd69adb6fb5fd6d06e6ceec5405d95a37f96e3b96'
      },
      {
        id: 'HONEY-WETH',
        strategy: 'Dynamic',
        strategy2: '',
        token0: 'HONEY',
        token1: 'WETH',
        decimals: 18,
        decimals0: 18,
        decimals1: 18,
        LP_ADDRESS: '0x50f7d4da89f720fbfb35be369f34c6b51e2cada1'
      },
      {
        id: 'HONEY-WBTC',
        strategy: 'Dynamic',
        strategy2: '',
        token0: 'HONEY',
        token1: 'WBTC',
        decimals: 18,
        decimals0: 18,
        decimals1: 8,
        LP_ADDRESS: '0x9df84a72e6eb08ecd074626b931c93f92a134e23'
      }
    ],
    addresses: {
      HONEY: '0x0e4aaf1351de4c0264c5c7056ef3777b41bd8e03',
      WBERA: '0x7507c1dc16935b82698e4c63f2746a2fcf994df8',
      iBGT: '0x46efc86f0d7455f135cc9df501673739d513e982',
      iRED: '0xe9eea54fb348b8b4a350fe88ae8db6e1a7a39ae0',
      USDC: '0xd6d83af58a19cd14ef3cf6fe848c9a4d21e5727c',
      WETH: '0x6e1e9896e93f7a71ecb33d4386b49deed67a231a',

      'HONEY-WBERA': '0x5c5f9a838747fb83678ece15d85005fd4f558237',
      VDHONEY: '0xe1d93e7106fd449f782c58463f19e6b87cbabf89',
      BHONEY: '0x7d91bf5851b3a8bcf8c39a69af2f0f98a4e2202a',
      'HONEY-USDC': '0x675547750f4acdf64ed72e9426293f38d8138ca8',
      'HONEY-WETH': '0xA9480499b1fAeAf225cEb88ADe69de10b7f86c1e',
      'HONEY-WBTC': '0x1d7a0f63a723eff12dfb3a6944daab59840d78c8'
    }
  }
};

export default { basic, networks };
