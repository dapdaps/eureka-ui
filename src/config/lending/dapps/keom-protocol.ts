import { polygonZkevm } from '@/config/tokens/polygonZkevm';

const basic = {
  name: 'Keom Protocol',
  icon: '/images/apps/keom-protocol.png',
  data: 'bluebiu.near/widget/Lending.Data.Cream',
  handler: 'bluebiu.near/widget/Lending.Handler.Cream',
  loaderName: 'KeomProtocol'
};

const networks = {
  1101: {
    unitrollerAddress: '0x91e9e99AC7C39d5c057F83ef44136dFB1e7adD7d',
    oracleAddress: '0x19194261d8f0599Bd079C52623C80C5150f010cF',
    rateModelSlopeAddress: '0x9008a044DDE18AFd4FfFE0f9a17e32feAa684b09',
    markets: {
      '0x8903Dc1f4736D2FcB90C1497AebBABA133DaAC76': {
        decimals: 8,
        symbol: 'kMATIC',
        address: '0x8903Dc1f4736D2FcB90C1497AebBABA133DaAC76',
        underlyingToken: polygonZkevm['matic'],
      },
      '0x68d9baA40394dA2e2c1ca05d30BF33F52823ee7B': {
        decimals: 8,
        symbol: 'kUSDC',
        address: '0x68d9baA40394dA2e2c1ca05d30BF33F52823ee7B',
        underlyingToken: polygonZkevm['usdc'],
      },
      '0xad41C77d99E282267C1492cdEFe528D7d5044253': {
        decimals: 8,
        symbol: 'kUSDT',
        address: '0xad41C77d99E282267C1492cdEFe528D7d5044253',
        underlyingToken: polygonZkevm['usdt'],
      },
      '0xbC59506A5Ce024B892776d4F7dd450B0FB3584A2': {
        decimals: 8,
        symbol: 'kWETH',
        address: '0xbC59506A5Ce024B892776d4F7dd450B0FB3584A2',
        underlyingToken: polygonZkevm['weth'],
      },
      '0x503deabad9641c5B4015041eEb0F1263E415715D': {
        decimals: 8,
        symbol: 'kwBTC',
        address: '0x503deabad9641c5B4015041eEb0F1263E415715D',
        underlyingToken: polygonZkevm['wbtc'],
      },
      '0x888b707A12205B52805d86123Fe720BA119F0632': {
        decimals: 8,
        symbol: 'kDAI',
        address: '0x888b707A12205B52805d86123Fe720BA119F0632',
        underlyingToken: polygonZkevm['dai'],
      },
      '0x4ce75412DAFceBb421E90E42b3fac6dB795e4f85': {
        decimals: 8,
        symbol: 'kUSDC.e',
        address: '0x4ce75412DAFceBb421E90E42b3fac6dB795e4f85',
        underlyingToken: polygonZkevm['usdc.e'],
      },
      '0xee1727f5074E747716637e1776B7F7C7133f16b1': {
        decimals: 8,
        symbol: 'kNative',
        address: '0xee1727f5074E747716637e1776B7F7C7133f16b1',
        underlyingToken: polygonZkevm['eth'],
      },
    },
  },
};

export default { basic, networks };
