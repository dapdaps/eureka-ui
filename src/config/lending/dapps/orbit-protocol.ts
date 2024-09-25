import { blast } from '@/config/tokens/blast';

const basic = {
  name: 'Orbit Protocol',
  icon: 'https://s3.amazonaws.com/dapdap.main/images/pac.png',
  data: 'bluebiu.near/widget/Lending.Orbit.Data',
  handler: 'bluebiu.near/widget/Lending.Orbit.Handler',
  handlerClaim: 'bluebiu.near/widget/Lending.Orbit.RewardClaim',
  loaderName: 'OrbitProtocol'
};

// reward 0x42e12d42b3d6c4a74a88a61063856756ea2db357

const networks = {
  // blast
  81457: {
    // oracleAddress: '0x5f3f2f65c78ea522767ae965a1c48cbc852820ce',
    ORBIT_ADDRESS: '0x1E18C3cb491D908241D0db14b081B51be7B6e652',
    REOZO_ADDRESS: '0x273683ca19d9cf827628ee216e4a9604efb077a3',
    // KELP_ADDRESS: '0xe9266ae95bb637a7ad598cb0390d44262130f433',
    MOON_ADDRESS: '0xe9266ae95bB637A7Ad598CB0390d44262130F433',
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
        userMerberShip: false,
        canBorrow: true
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
        userMerberShip: false,
        canBorrow: true
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
        userMerberShip: false,
        canBorrow: true
      }
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
        userMerberShip: false,
        canBorrow: true
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
        userMerberShip: false,
        canBorrow: false
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
        userMerberShip: false,
        canBorrow: true
      }
    },
    // KELP_MARKETS: {
    //   '0xAFAbd582E82042f4A8574f75c36409abEa916Ac5': {
    //     underlyingAsset: blast['eth'].address,
    //     name: blast['eth'].name,
    //     symbol: blast['eth'].symbol,
    //     decimals: blast['eth'].decimals,
    //     icon: blast['eth'].icon,
    //     address: '0xAFAbd582E82042f4A8574f75c36409abEa916Ac5',
    //     underlyingToken: blast['eth'],
    //     loanToValue: 0.75,
    //     userMerberShip: false,
    //     canBorrow: true,
    //   },
    //   '0x9bbba6322fe5f3968c1f27c8b860727d683194c8': {
    //     underlyingAsset: blast['wrseth'].address,
    //     name: blast['wrseth'].name,
    //     symbol: blast['wrseth'].symbol,
    //     decimals: blast['wrseth'].decimals,
    //     icon: blast['wrseth'].icon,
    //     address: '0x9bbba6322fe5f3968c1f27c8b860727d683194c8',
    //     underlyingToken: blast['wrseth'],
    //     loanToValue: 0.75,
    //     userMerberShip: false,
    //     canBorrow: false,
    //   },
    //   '0xd55634a79e571dc4c7cdd2f2c0a5857bf7a8a782': {
    //     underlyingAsset: blast['fwweth'].address,
    //     name: blast['fwweth'].name,
    //     symbol: blast['fwweth'].symbol,
    //     decimals: blast['fwweth'].decimals,
    //     icon: blast['fwweth'].icon,
    //     address: '0xd55634a79e571dc4c7cdd2f2c0a5857bf7a8a782',
    //     underlyingToken: blast['fwweth'],
    //     loanToValue: 0.75,
    //     userMerberShip: false,
    //     canBorrow: true,
    //   },
    // },
    MOON_MARKETS: {
      '0x7732e29e35e8A8b26E7f026c0865C7c2d88CF853': {
        underlyingAsset: blast['usde'].address,
        name: blast['usde'].name,
        symbol: blast['usde'].symbol,
        decimals: blast['usde'].decimals,
        icon: blast['usde'].icon,
        address: '0x7732e29e35e8A8b26E7f026c0865C7c2d88CF853',
        underlyingToken: blast['usde'],
        loanToValue: 0.75,
        userMerberShip: false,
        canBorrow: false
      },
      '0x3a61f4bF054cdFaC3a3436A21c4463C6D85C2408': {
        underlyingAsset: blast['usdb'].address,
        name: blast['usdb'].name,
        symbol: blast['usdb'].symbol,
        decimals: blast['usdb'].decimals,
        icon: blast['usdb'].icon,
        address: '0x3a61f4bF054cdFaC3a3436A21c4463C6D85C2408',
        underlyingToken: blast['usdb'],
        loanToValue: 0.75,
        userMerberShip: false,
        canBorrow: true
      },
      '0xa3135b76c28b3971B703a5e6CD451531b187Eb5A': {
        underlyingAsset: blast['deth'].address,
        name: blast['deth'].name,
        symbol: blast['deth'].symbol,
        decimals: blast['deth'].decimals,
        icon: blast['deth'].icon,
        address: '0xa3135b76c28b3971B703a5e6CD451531b187Eb5A',
        underlyingToken: blast['deth'],
        loanToValue: 0.75,
        userMerberShip: false,
        canBorrow: true
      },
      '0x4ADF85E2e760c9211894482DF74BA535BCae50A4': {
        underlyingAsset: blast['dusd'].address,
        name: blast['dusd'].name,
        symbol: blast['dusd'].symbol,
        decimals: blast['dusd'].decimals,
        icon: blast['dusd'].icon,
        address: '0x4ADF85E2e760c9211894482DF74BA535BCae50A4',
        underlyingToken: blast['dusd'],
        loanToValue: 0.75,
        userMerberShip: false,
        canBorrow: true
      },
      '0x9bbbA6322Fe5F3968C1F27C8B860727d683194C8': {
        underlyingAsset: blast['wrseth'].address,
        name: blast['wrseth'].name,
        symbol: blast['wrseth'].symbol,
        decimals: blast['wrseth'].decimals,
        icon: blast['wrseth'].icon,
        address: '0x9bbbA6322Fe5F3968C1F27C8B860727d683194C8',
        underlyingToken: blast['wrseth'],
        loanToValue: 0.75,
        userMerberShip: false,
        canBorrow: false
      },
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
        canBorrow: true
      },
      '0xD55634a79E571dc4C7CDD2F2C0a5857bf7a8a782': {
        underlyingAsset: blast['fwweth'].address,
        name: blast['fwweth'].name,
        symbol: blast['fwweth'].symbol,
        decimals: blast['fwweth'].decimals,
        icon: blast['fwweth'].icon,
        address: '0xD55634a79E571dc4C7CDD2F2C0a5857bf7a8a782',
        underlyingToken: blast['fwweth'],
        loanToValue: 0.75,
        isCollateral: false,
        canBorrow: true
      },
      '0xfB661cdcfCB62b4ed7bBEf6f70068863E213Cb6B': {
        underlyingAsset: blast['weeth'].address,
        name: blast['weeth'].name,
        symbol: blast['weeth'].symbol,
        decimals: blast['weeth'].decimals,
        icon: blast['weeth'].icon,
        address: '0xfB661cdcfCB62b4ed7bBEf6f70068863E213Cb6B',
        underlyingToken: blast['weeth'],
        loanToValue: 0.75,
        isCollateral: false,
        canBorrow: false
      }
    },
    // for new ui
    pools: [
      { key: 'ORBIT', label: 'ORBIT' },
      { key: 'MOON', label: 'MOON' },
      { key: 'RENZO', label: 'RENZO' }
    ]
  }
};

export default { basic, networks };
