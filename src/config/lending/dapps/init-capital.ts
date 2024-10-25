import { linea } from '@/config/tokens/linea';
import { mantle } from '@/config/tokens/mantle';

const basic = {
  name: 'InitCapital',
  icon: '/assets/dapps/init-capital.png',
  data: 'bluebiu.near/widget/Lending.Data.LayerBank',
  handler: 'bluebiu.near/widget/Lending.Handler.LayerBank',
  handlerClaim: 'bluebiu.near/widget/Linea.Lending.LayerBankHandlerClaim',
  loaderName: 'InitCapital'
};

const networks = {
  5000: {
    unitrollerAddress: '0xa55A591f91103D84106ba79EdA446eBDbfe26F7A',
    oracleAddress: '0x4E195A32b2f6eBa9c4565bA49bef34F23c2C0350',
    distributionAddress: '0x5D06067f86946620C326713b846DdC8B97470957',
    defaultMarket: '0x51ab74f8b03f0305d8dce936b473ab587911aec4',

    POS_MANAGER: '0x0e7401707CD08c03CDb53DAEF3295DDFb68BBa92',
    markets: {
      '0x51ab74f8b03f0305d8dce936b473ab587911aec4': {
        decimals: 18,
        symbol: 'mWETH',
        address: '0x51ab74f8b03f0305d8dce936b473ab587911aec4',
        collateralFactor: 0.85,
        borrowFactor: 1.15,
        underlyingToken: mantle['weth']
      },
      '0x9c9f28672c4a8ad5fb2c9aca6d8d68b02eafd552': {
        decimals: 8,
        symbol: 'mWBTC',
        address: '0x9c9f28672c4a8ad5fb2c9aca6d8d68b02eafd552',
        collateralFactor: 0.8,
        borrowFactor: 1.2,
        underlyingToken: mantle['wbtc']
      },
      '0x44949636f778fAD2b139E665aee11a2dc84A2976': {
        decimals: 18,
        symbol: 'mWMNT',
        address: '0x44949636f778fAD2b139E665aee11a2dc84A2976',
        collateralFactor: 0.8,
        borrowFactor: 1.2,
        underlyingToken: mantle['wmnt']
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
