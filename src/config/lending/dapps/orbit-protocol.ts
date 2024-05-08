import { blast } from '@/config/tokens/blast';

const basic = {
  name: 'Orbit Protocol',
  data: 'bluebiu.near/widget/Lending.Orbit.Data',
  handler: 'bluebiu.near/widget/Lending.Orbit.Handler',
  handlerClaim: 'bluebiu.near/widget/Lending.Orbit.RewardClaim',
};

// reward 0x42e12d42b3d6c4a74a88a61063856756ea2db357

const networks = {
  // blast
  81457: {
    // oracleAddress: '0x5f3f2f65c78ea522767ae965a1c48cbc852820ce',
    ORBIT_ADDRESS: '0x1E18C3cb491D908241D0db14b081B51be7B6e652',
    REOZO_ADDRESS: '0x273683ca19d9cf827628ee216e4a9604efb077a3',
    KELP_ADDRESS: '0xe9266ae95bb637a7ad598cb0390d44262130f433',
    ORBIT_MARKETS: {
      '0x0872b71efc37cb8dde22b2118de3d800427fdba0': {
        underlyingAsset: blast['eth'].address, // underlyingToken
        name: blast['eth'].name,
        symbol: blast['eth'].symbol,
        decimals: blast['eth'].decimals,
        icon: blast['eth'].icon,
        address: '0x0872b71efc37cb8dde22b2118de3d800427fdba0', // CTOKEN oToken
        underlyingToken: blast['eth'],
        loanToValue: 0.75,
        isCollateral: false,
        canBorrow: true,
      },
      '0x9aECEdCD6A82d26F2f86D331B17a1C1676442A87': {
        underlyingAsset: blast['usdb'].address,
        name: blast['usdb'].name,
        symbol: blast['usdb'].symbol,
        decimals: blast['usdb'].decimals,
        icon: blast['usdb'].icon,
        address: '0x9aECEdCD6A82d26F2f86D331B17a1C1676442A87',
        underlyingToken: blast['usdb'],
        loanToValue: 0.75,
        isCollateral: false,
        canBorrow: true,
      },
      '0x8c415331761063e5d6b1c8e700f996b13603fc2e': {
        underlyingAsset: blast['wbtc'].address,
        name: blast['wbtc'].name,
        symbol: blast['wbtc'].symbol,
        decimals: blast['wbtc'].decimals,
        icon: blast['wbtc'].icon,
        address: '0x8c415331761063e5d6b1c8e700f996b13603fc2e',
        underlyingToken: blast['wbtc'],
        loanToValue: 0.75,
        isCollateral: false,
        canBorrow: true,
      },
    },
    RENZO_MARKETS: {
      '0x795dCD51EaC6eb3123b7a4a1f906992EAA54Cb0e': {
        underlyingAsset: blast['eth'].address,
        name: blast['eth'].name,
        symbol: blast['eth'].symbol,
        decimals: blast['eth'].decimals,
        icon: blast['eth'].icon,
        address: '0x795dCD51EaC6eb3123b7a4a1f906992EAA54Cb0e',
        underlyingToken: blast['eth'],
        loanToValue: 0.75,
        isCollateral: false,
        canBorrow: true,
      },
      '0x4991b902F397dC16b0BBd21b0057a20b4B357AE2': {
        underlyingAsset: blast['ezeth'].address,
        name: blast['ezeth'].name,
        symbol: blast['ezeth'].symbol,
        decimals: blast['ezeth'].decimals,
        icon: blast['ezeth'].icon,
        address: '0x4991b902F397dC16b0BBd21b0057a20b4B357AE2',
        underlyingToken: blast['ezeth'],
        loanToValue: 0.75,
        isCollateral: false,
        canBorrow: false,
      },

      '0xb51b76c73fb24f472e0dd63bb8195bd2170bc65d': {
        underlyingAsset: blast['fwweth'].address,
        name: blast['fwweth'].name,
        symbol: blast['fwweth'].symbol,
        decimals: blast['fwweth'].decimals,
        icon: blast['fwweth'].icon,
        address: '0xb51b76c73fb24f472e0dd63bb8195bd2170bc65d',
        underlyingToken: blast['fwweth'],
        loanToValue: 0.75,
        isCollateral: false,
        canBorrow: true,
      },
    },
    KELP_MARKETS: {
      '0xAFAbd582E82042f4A8574f75c36409abEa916Ac5': {
        underlyingAsset: blast['eth'].address,
        name: blast['eth'].name,
        symbol: blast['eth'].symbol,
        decimals: blast['eth'].decimals,
        icon: blast['eth'].icon,
        address: '0xAFAbd582E82042f4A8574f75c36409abEa916Ac5',
        underlyingToken: blast['eth'],
        loanToValue: 0.75,
        isCollateral: false,
        canBorrow: true,
      },
      '0x9bbba6322fe5f3968c1f27c8b860727d683194c8': {
        underlyingAsset: blast['wrseth'].address,
        name: blast['wrseth'].name,
        symbol: blast['wrseth'].symbol,
        decimals: blast['wrseth'].decimals,
        icon: blast['wrseth'].icon,
        address: '0x9bbba6322fe5f3968c1f27c8b860727d683194c8',
        underlyingToken: blast['wrseth'],
        loanToValue: 0.75,
        isCollateral: false,
        canBorrow: false,
      },
      '0xd55634a79e571dc4c7cdd2f2c0a5857bf7a8a782': {
        underlyingAsset: blast['fwweth'].address,
        name: blast['fwweth'].name,
        symbol: blast['fwweth'].symbol,
        decimals: blast['fwweth'].decimals,
        icon: blast['fwweth'].icon,
        address: '0xd55634a79e571dc4c7cdd2f2c0a5857bf7a8a782',
        underlyingToken: blast['fwweth'],
        loanToValue: 0.75,
        isCollateral: false,
        canBorrow: true,
      },
    },
  },
};

export default { basic, networks };
