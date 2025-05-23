import { linea } from '@/config/tokens/linea';
import { mantle } from '@/config/tokens/mantle';

const basic = {
  name: 'INIT',
  icon: '/assets/dapps/init.png',
  data: 'bluebiu.near/widget/Lending.Data.Cream',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
  type: 'init-capital',
  loaderName: 'InitCapital'
};

const networks = {
  5000: {
    unitrollerAddress: '0xa55A591f91103D84106ba79EdA446eBDbfe26F7A',
    // oracleAddress: '0x4E195A32b2f6eBa9c4565bA49bef34F23c2C0350',

    distributionAddress: '0x5D06067f86946620C326713b846DdC8B97470957',
    defaultMarket: '0x51ab74f8b03f0305d8dce936b473ab587911aec4',

    INIT_ORACLE: '0x4E195A32b2f6eBa9c4565bA49bef34F23c2C0350',
    POS_MANAGER: '0x0e7401707CD08c03CDb53DAEF3295DDFb68BBa92',
    MONEY_MARKET_HOOK: '0xf82CBcAB75C1138a8F1F20179613e7C0C8337346',

    NARROW_DECIMALS: {
      WETH: 18,
      WBTC: 30,
      WMNT: 18,
      USDC: 30,
      USDT: 30,
      mETH: 18
    },
    NON_STABLE_FACTOR: {
      '0x51AB74f8B03F0305d8dcE936B473AB587911AEC4': [0.9, 1.07],
      '0x9c9F28672C4A8Ad5fb2c9Aca6d8D68B02EAfd552': [0.85, 1.1],
      '0x44949636f778fAD2b139E665aee11a2dc84A2976': [0.85, 1.1],
      '0x5071c003bB45e49110a905c1915EbdD2383A89dF': [0.85, 1.1]
    },
    STABLE_FACTOR: {
      '0x00A55649E597d463fD212fBE48a3B40f0E227d06': [0.95, 1.05],
      '0xadA66a8722B5cdfe3bC504007A5d793e7100ad09': [0.92, 1.08]
    },

    markets: {
      '0x51AB74f8B03F0305d8dcE936B473AB587911AEC4': {
        decimals: 18,
        symbol: 'mWETH',
        address: '0x51AB74f8B03F0305d8dcE936B473AB587911AEC4',
        collateralFactor: 0.85,
        borrowFactor: 1.15,
        underlyingToken: mantle['weth']
      },
      '0x9c9F28672C4A8Ad5fb2c9Aca6d8D68B02EAfd552': {
        decimals: 8,
        symbol: 'mWBTC',
        address: '0x9c9F28672C4A8Ad5fb2c9Aca6d8D68B02EAfd552',
        collateralFactor: 0.8,
        borrowFactor: 1.2,
        underlyingToken: mantle['wbtc']
      },
      '0x44949636f778fAD2b139E665aee11a2dc84A2976': {
        decimals: 18,
        symbol: 'mMNT',
        address: '0x44949636f778fAD2b139E665aee11a2dc84A2976',
        collateralFactor: 0.8,
        borrowFactor: 1.2,
        underlyingToken: mantle['mnt']
      },
      '0x00A55649E597d463fD212fBE48a3B40f0E227d06': {
        decimals: 6,
        symbol: 'mUSDC',
        address: '0x00A55649E597d463fD212fBE48a3B40f0E227d06',
        collateralFactor: 0.93,
        borrowFactor: 1.07,
        underlyingToken: mantle['usdc']
      },
      '0xadA66a8722B5cdfe3bC504007A5d793e7100ad09': {
        decimals: 6,
        symbol: 'mUSDT',
        address: '0xadA66a8722B5cdfe3bC504007A5d793e7100ad09',
        collateralFactor: 0.9,
        borrowFactor: 1.1,
        underlyingToken: mantle['usdt']
      },
      '0x5071c003bB45e49110a905c1915EbdD2383A89dF': {
        decimals: 18,
        symbol: 'mMETH',
        address: '0x5071c003bB45e49110a905c1915EbdD2383A89dF',
        collateralFactor: 0.8,
        borrowFactor: 1.2,
        underlyingToken: mantle['meth']
      }
    }
    // rewardToken: mantle['lab']
  }
};

export default { basic, networks };
