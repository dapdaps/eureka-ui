import { beraB } from '@/config/tokens/bera-bArtio';
import { polygonZkevm } from '@/config/tokens/polygonZkevm';

const basic = {
  name: 'Dolomite',
  icon: '/images/apps/dolomite.png',
  data: 'bluebiu.near/widget/Lending.Data.Cream',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
  type: 'borrow and earn',
  loaderName: 'Dolomite'
};

const networks = {
  1101: {
    depositWithdrawalProxy: '0xDfB6BAA334712cBBeb26B7537f62B81C2a87B1E8',
    borrowPositionProxyV1: '0xc28A4EC9f09E4071E3707eAACa5c3754fA4f5Faa',
    oracleAddress: '0xcE29B273fdd21cef1cE4dfd104dD608941D781a0',
    marginAddress: '0x836b557Cf9eF29fcF49C776841191782df34e4e5',
    markets: {
      [polygonZkevm['weth'].address]: {
        ...polygonZkevm['eth'],
        address: polygonZkevm['weth'].address,
        marketId: '0',
        underlyingToken: polygonZkevm['eth']
      },
      [polygonZkevm['dai'].address]: {
        ...polygonZkevm['dai'],
        underlyingToken: polygonZkevm['dai']
      },
      [polygonZkevm['link'].address]: {
        ...polygonZkevm['link'],
        underlyingToken: polygonZkevm['link']
      },
      [polygonZkevm['wbtc'].address]: {
        ...polygonZkevm['wbtc'],
        underlyingToken: polygonZkevm['wbtc']
      },
      [polygonZkevm['usdt'].address]: {
        ...polygonZkevm['usdt'],
        underlyingToken: polygonZkevm['usdt']
      },
      [polygonZkevm['matic'].address]: {
        ...polygonZkevm['matic'],
        underlyingToken: polygonZkevm['matic']
      },
      [polygonZkevm['usdc.e'].address]: {
        ...polygonZkevm['usdc.e'],
        underlyingToken: polygonZkevm['usdc.e']
      }
    }
  },
  80084: {
    unitrollerAddress: '0xbadaC56c9aca307079e8B8FC699987AAc89813ee',
    oracleAddress: '0x4E4d9AA828a4597D82e3F02F9181668aAb82B9F5',
    markets: {
      '0xd5794ea7b269dB3a0CCB396774Cc2D0936FFBD86': {
        decimals: 8,
        symbol: 'crUSDC',
        address: '0xd5794ea7b269dB3a0CCB396774Cc2D0936FFBD86',
        underlyingToken: beraB['usdc.e']
      }
    }
  }
};

export default { basic, networks };
