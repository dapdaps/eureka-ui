import { blast } from '@/config/tokens/blast';

const basic = {
  name: 'Orbit Protocol',
  //   icon: '/images/apps/cream.png',
  data: 'bluebiu.near/widget/Lending.Data.Orbit',
  handler: 'bluebiu.near/widget/Lending.Handler.Orbit',
};

const networks = {
  // blast
  81457: {
    unitrollerAddress: '0x1E18C3cb491D908241D0db14b081B51be7B6e652',
    oracleAddress: '0x5f3f2f65c78ea522767ae965a1c48cbc852820ce',
    markets: {
      '0x0872b71efc37cb8dde22b2118de3d800427fdba0': {
        underlyingAsset: blast['eth'].address,
        name: blast['eth'].name,
        symbol: blast['eth'].symbol,
        decimals: blast['eth'].decimals,
        icon: blast['eth'].icon,
        address: '0x0872b71efc37cb8dde22b2118de3d800427fdba0',
        underlyingToken: blast['eth'],
      },
      '0x9aECEdCD6A82d26F2f86D331B17a1C1676442A87': {
        underlyingAsset: blast['usdb'].address,
        name: blast['usdb'].name,
        symbol: blast['usdb'].symbol,
        decimals: blast['usdb'].decimals,
        icon: blast['usdb'].icon,
        address: '0x9aECEdCD6A82d26F2f86D331B17a1C1676442A87',
        underlyingToken: blast['usdb'],
      },
      '0x8c415331761063e5d6b1c8e700f996b13603fc2e': {
        underlyingAsset: blast['wbtc'].address,
        name: blast['wbtc'].name,
        symbol: blast['wbtc'].symbol,
        decimals: blast['wbtc'].decimals,
        icon: blast['wbtc'].icon,
        address: '0x8c415331761063e5d6b1c8e700f996b13603fc2e',
        underlyingToken: blast['wbtc'],
      },
    },
  },
};

export default { basic, networks };
