import weth from '@/config/contract/weth';
import { arbitrum, CHAIN_ID as arbitrumId } from '@/config/tokens/arbitrum';
import { base, CHAIN_ID as baseId } from '@/config/tokens/base';
import { CHAIN_ID as optimismId, optimism } from '@/config/tokens/optimism';
import { CHAIN_ID as polygonId, polygon } from '@/config/tokens/polygon';
import { CHAIN_ID as scrollId, scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'Compound V3',
  icon: '/assets/dapps/compoundv3.png',
  data: 'bluebiu.near/widget/Lending.Data.CompoundV3',
  handler: 'bluebiu.near/widget/Lending.Handler.CompoundV3',
  type: 'compound v3',
  loaderName: 'CompoundV3'
};

const CommonData = {
  bulkerActionCodes: {
    ACTION_CLAIM_REWARD: '0x414354494f4e5f434c41494d5f52455741524400000000000000000000000000',
    ACTION_SUPPLY_ASSET: '0x414354494f4e5f535550504c595f415353455400000000000000000000000000',
    ACTION_SUPPLY_NATIVE_TOKEN: '0x414354494f4e5f535550504c595f4e41544956455f544f4b454e000000000000',
    ACTION_TRANSFER_ASSET: '0x414354494f4e5f5452414e534645525f41535345540000000000000000000000',
    ACTION_WITHDRAW_ASSET: '0x414354494f4e5f57495448445241575f41535345540000000000000000000000',
    ACTION_WITHDRAW_NATIVE_TOKEN: '0x414354494f4e5f57495448445241575f4e41544956455f544f4b454e00000000'
  },
  rewardsApi: 'https://v3-api.compound.finance/market/all-networks/all-contracts/rewards/dapp-data'
};

const networks = {
  [scrollId]: {
    compPriceFeed: '',
    bulkerAddress: '0x53C6D04e3EC7031105bAeA05B36cBc3C987C56fA',
    ...CommonData,
    ethPriceFeed: '0x6bF14CB0A831078629D993FDeBcB182b21A8774C',
    comets: [
      {
        address: '0xB2f97c1Bd3bf02f5e74d13f02E3e26F93D77CE44',
        baseToken: { ...scroll['usdc'], priceFeed: '0x43d12fb3afcad5347fa764eeab105478337b7200' },
        collateralAssets: [
          {
            ...scroll['eth'],
            address: weth[scrollId],
            priceFeed: '0x6bF14CB0A831078629D993FDeBcB182b21A8774C',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          },
          {
            ...scroll['wsteth'],
            priceFeed: '0x709cef91Dd5d162d7047b678334d1Be41fe92843',
            borrowCollateralFactor: 75,
            liquidateCollateralFactor: 80
          }
        ]
      }
    ]
  },
  [arbitrumId]: {
    compPriceFeed: '',
    bulkerAddress: '0xbdE8F31D2DdDA895264e27DD990faB3DC87b372d',
    ...CommonData,
    ethPriceFeed: '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612',
    comets: [
      {
        address: '0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf',
        baseToken: { ...arbitrum['usdc'], priceFeed: '0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3' },
        collateralAssets: [
          {
            ...arbitrum['eth'],
            address: weth[arbitrumId],
            priceFeed: '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612',
            borrowCollateralFactor: 83,
            liquidateCollateralFactor: 90
          },
          {
            ...arbitrum['wbtc'],
            priceFeed: '0xd0C7101eACbB49F3deCcCc166d238410D6D46d57',
            borrowCollateralFactor: 75,
            liquidateCollateralFactor: 85
          },
          {
            ...arbitrum['wst-eth'],
            priceFeed: '0xe165155c34fe4cbfc55fc554437907bdb1af7e3e',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          },
          {
            ...arbitrum['arb'],
            priceFeed: '0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6',
            borrowCollateralFactor: 70,
            liquidateCollateralFactor: 80
          },
          {
            ...arbitrum['ezeth'],
            priceFeed: '0xc49399814452b41da8a7cd76a159f5515cb3e493',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          },
          {
            ...arbitrum['gmx'],
            priceFeed: '0xDB98056FecFff59D032aB628337A4887110df3dB',
            borrowCollateralFactor: 60,
            liquidateCollateralFactor: 75
          }
        ]
      },
      {
        address: '0xA5EDBDD9646f8dFF606d7448e414884C7d905dCA',
        baseToken: { ...arbitrum['usdc.e'], priceFeed: '0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3' },
        minimumBorrow: 100,
        collateralAssets: [
          {
            ...arbitrum['eth'],
            address: weth[arbitrumId],
            priceFeed: '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612',
            borrowCollateralFactor: 78,
            liquidateCollateralFactor: 85
          },
          {
            ...arbitrum['wbtc'],
            priceFeed: '0xd0C7101eACbB49F3deCcCc166d238410D6D46d57',
            borrowCollateralFactor: 70,
            liquidateCollateralFactor: 77
          },
          {
            ...arbitrum['arb'],
            priceFeed: '0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6',
            borrowCollateralFactor: 55,
            liquidateCollateralFactor: 60
          },
          {
            ...arbitrum['gmx'],
            priceFeed: '0xDB98056FecFff59D032aB628337A4887110df3dB',
            borrowCollateralFactor: 40,
            liquidateCollateralFactor: 45
          }
        ]
      },
      {
        address: '0x6f7D514bbD4aFf3BcD1140B7344b32f063dEe486',
        baseToken: {
          ...arbitrum['eth'],
          address: weth[arbitrumId],
          priceFeed: '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612'
        },
        collateralAssets: [
          {
            ...arbitrum['ezeth'],
            priceFeed: '0xc49399814452b41da8a7cd76a159f5515cb3e493',
            borrowCollateralFactor: 88,
            liquidateCollateralFactor: 91
          },
          {
            ...arbitrum['we-eth'],
            // weETH / ETH
            priceFeed: '0xE141425bc1594b8039De6390db1cDaf4397EA22b',
            isToEthPrice: true,
            borrowCollateralFactor: 90,
            liquidateCollateralFactor: 93
          },
          {
            ...arbitrum['rseth'],
            // RSETH / ETH
            priceFeed: '0xb0EA543f9F8d4B818550365d13F66Da747e1476A',
            isToEthPrice: true,
            borrowCollateralFactor: 88,
            liquidateCollateralFactor: 91
          },
          {
            ...arbitrum['wst-eth'],
            priceFeed: '0xe165155c34fe4cbfc55fc554437907bdb1af7e3e',
            borrowCollateralFactor: 88,
            liquidateCollateralFactor: 93
          },
          {
            ...arbitrum['reth'],
            // RETH / ETH
            priceFeed: '0xD6aB2298946840262FcC278fF31516D39fF611eF',
            isToEthPrice: true,
            borrowCollateralFactor: 90,
            liquidateCollateralFactor: 93
          },
          {
            ...arbitrum['wbtc'],
            priceFeed: '0xd0C7101eACbB49F3deCcCc166d238410D6D46d57',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          },
          {
            ...arbitrum['usdc'],
            priceFeed: '0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          },
          {
            ...arbitrum['usdt'],
            priceFeed: '0x3f3f5dF88dC9F13eac63DF89EC16ef6e7E25DdE7',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          }
        ]
      },
      {
        address: '0xd98Be00b5D27fc98112BdE293e487f8D4cA57d07',
        baseToken: { ...arbitrum['usdt'], priceFeed: '0x3f3f5dF88dC9F13eac63DF89EC16ef6e7E25DdE7' },
        collateralAssets: [
          {
            ...arbitrum['wst-eth'],
            priceFeed: '0xe165155c34fe4cbfc55fc554437907bdb1af7e3e',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          },
          {
            ...arbitrum['wbtc'],
            priceFeed: '0xd0C7101eACbB49F3deCcCc166d238410D6D46d57',
            borrowCollateralFactor: 70,
            liquidateCollateralFactor: 80
          },
          {
            ...arbitrum['eth'],
            address: weth[arbitrumId],
            priceFeed: '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612',
            borrowCollateralFactor: 85,
            liquidateCollateralFactor: 90
          },
          {
            ...arbitrum['arb'],
            priceFeed: '0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6',
            borrowCollateralFactor: 70,
            liquidateCollateralFactor: 80
          },
          {
            ...arbitrum['gmx'],
            priceFeed: '0xDB98056FecFff59D032aB628337A4887110df3dB',
            borrowCollateralFactor: 60,
            liquidateCollateralFactor: 70
          }
        ]
      }
    ]
  },
  [baseId]: {
    compPriceFeed: '',
    bulkerAddress: '0x78D0677032A35c63D142a48A2037048871212a8C',
    ...CommonData,
    ethPriceFeed: '0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70',
    comets: [
      {
        address: '0xb125E6687d4313864e53df431d5425969c15Eb2F',
        baseToken: { ...base['usdc'], priceFeed: '0x7e860098F58bBFC8648a4311b374B1D669a2bc6B' },
        collateralAssets: [
          {
            ...base['eth'],
            address: weth[baseId],
            priceFeed: '0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70',
            borrowCollateralFactor: 85,
            liquidateCollateralFactor: 90
          },
          {
            ...base['cbeth'],
            priceFeed: '0xd7818272B9e248357d13057AAb0B417aF31E817d',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          },
          {
            ...base['cbbtc'],
            priceFeed: '0x07DA0E54543a844a80ABE69c8A12F22B3aA59f9D',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          },
          {
            ...base['wsteth'],
            // WSTETH / ETH
            priceFeed: '0x43a5C292A453A3bF3606fa856197f09D7B74251a',
            isToEthPrice: true,
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          }
        ]
      },
      {
        address: '0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf',
        baseToken: { ...base['usdbc'], priceFeed: '0x7e860098f58bbfc8648a4311b374b1d669a2bc6b' },
        collateralAssets: [
          {
            ...base['eth'],
            address: weth[baseId],
            priceFeed: '0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70',
            borrowCollateralFactor: 69,
            liquidateCollateralFactor: 74
          },
          {
            ...base['cbeth'],
            priceFeed: '0xd7818272B9e248357d13057AAb0B417aF31E817d',
            borrowCollateralFactor: 65,
            liquidateCollateralFactor: 70
          }
        ]
      },
      {
        address: '0x46e6b214b524310239732D51387075E0e70970bf',
        baseToken: { ...base['eth'], address: weth[baseId], priceFeed: '0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70' },
        collateralAssets: [
          {
            ...base['ezeth'],
            // ezETH / ETH
            priceFeed: '0x960BDD1dFD20d7c98fa482D793C3dedD73A113a3',
            isToEthPrice: true,
            borrowCollateralFactor: 88,
            liquidateCollateralFactor: 91
          },
          {
            ...base['cbeth'],
            priceFeed: '0xd7818272B9e248357d13057AAb0B417aF31E817d',
            borrowCollateralFactor: 90,
            liquidateCollateralFactor: 93
          },
          {
            ...base['weeth'],
            // weETH / ETH
            priceFeed: '0xFC1415403EbB0c693f9a7844b92aD2Ff24775C65',
            isToEthPrice: true,
            borrowCollateralFactor: 90,
            liquidateCollateralFactor: 93
          },
          {
            ...base['wrseth'],
            // wrsETH-ETH Exchange Rate
            priceFeed: '0xe8dD07CCf5BC4922424140E44Eb970F5950725ef',
            isToEthPrice: true,
            borrowCollateralFactor: 88,
            liquidateCollateralFactor: 91
          },
          {
            ...base['usdc'],
            priceFeed: '0x7e860098F58bBFC8648a4311b374B1D669a2bc6B',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          },
          {
            ...base['wsteth'],
            // WSTETH / ETH
            priceFeed: '0x43a5C292A453A3bF3606fa856197f09D7B74251a',
            isToEthPrice: true,
            borrowCollateralFactor: 90,
            liquidateCollateralFactor: 93
          },
          {
            ...base['cbbtc'],
            priceFeed: '0x07DA0E54543a844a80ABE69c8A12F22B3aA59f9D',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          }
        ]
      }
    ]
  },
  [optimismId]: {
    compPriceFeed: '',
    bulkerAddress: '0xcb3643CC8294B23171272845473dEc49739d4Ba3',
    ...CommonData,
    ethPriceFeed: '0x13e3Ee699D1909E989722E753853AE30b17e08c5',
    comets: [
      {
        address: '0x2e44e174f7D53F0212823acC11C01A11d58c5bCB',
        baseToken: { ...optimism['usdc'], priceFeed: '0x16a9FA2FDa030272Ce99B29CF780dFA30361E0f3' },
        collateralAssets: [
          {
            ...optimism['eth'],
            address: weth[optimismId],
            priceFeed: '0x13e3Ee699D1909E989722E753853AE30b17e08c5',
            borrowCollateralFactor: 83,
            liquidateCollateralFactor: 90
          },
          {
            ...optimism['wbtc'],
            priceFeed: '0x718A5788b89454aAE3A028AE9c111A29Be6c2a6F',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          },
          {
            ...optimism['wstETH'],
            priceFeed: '0x698B585CbC4407e2D54aa898B2600B53C68958f7',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          },
          {
            ...optimism['op'],
            priceFeed: '0x0D276FC14719f9292D5C1eA2198673d1f4269246',
            borrowCollateralFactor: 65,
            liquidateCollateralFactor: 70
          }
        ]
      },
      {
        address: '0x995E394b8B2437aC8Ce61Ee0bC610D617962B214',
        baseToken: { ...optimism['usdt'], priceFeed: '0xECef79E109e997bCA29c1c0897ec9d7b03647F5E' },
        collateralAssets: [
          {
            ...optimism['eth'],
            address: weth[optimismId],
            priceFeed: '0x13e3Ee699D1909E989722E753853AE30b17e08c5',
            borrowCollateralFactor: 83,
            liquidateCollateralFactor: 90
          },
          {
            ...optimism['wbtc'],
            priceFeed: '0x718A5788b89454aAE3A028AE9c111A29Be6c2a6F',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          },
          {
            ...optimism['wstETH'],
            priceFeed: '0x698B585CbC4407e2D54aa898B2600B53C68958f7',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          },
          {
            ...optimism['op'],
            priceFeed: '0x0D276FC14719f9292D5C1eA2198673d1f4269246',
            borrowCollateralFactor: 65,
            liquidateCollateralFactor: 70
          }
        ]
      },
      {
        address: '0xE36A30D249f7761327fd973001A32010b521b6Fd',
        baseToken: {
          ...optimism['eth'],
          address: weth[optimismId],
          priceFeed: '0x13e3Ee699D1909E989722E753853AE30b17e08c5'
        },
        collateralAssets: [
          {
            ...optimism['ezeth'],
            // ezETH / ETH Exchange Rate
            priceFeed: '0xFAD40C0e2BeF93c6a822015863045CAAeAAde4d3',
            isToEthPrice: true,
            borrowCollateralFactor: 88,
            liquidateCollateralFactor: 91
          },
          {
            ...optimism['wstETH'],
            priceFeed: '0x698B585CbC4407e2D54aa898B2600B53C68958f7',
            borrowCollateralFactor: 88,
            liquidateCollateralFactor: 93
          },
          {
            ...optimism['wrseth'],
            // wrsETH-ETH Exchange Rate
            priceFeed: '0x73b8BE3b653c5896BC34fC87cEBC8AcF4Fb7A545',
            isToEthPrice: true,
            borrowCollateralFactor: 88,
            liquidateCollateralFactor: 91
          },
          {
            ...optimism['weeth'],
            // weETH / ETH
            priceFeed: '0xb4479d436DDa5c1A79bD88D282725615202406E3',
            isToEthPrice: true,
            borrowCollateralFactor: 90,
            liquidateCollateralFactor: 93
          },
          {
            ...optimism['usdc'],
            priceFeed: '0x16a9FA2FDa030272Ce99B29CF780dFA30361E0f3',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          },
          {
            ...optimism['usdt'],
            priceFeed: '0xECef79E109e997bCA29c1c0897ec9d7b03647F5E',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          },
          {
            ...optimism['reth'],
            // RETH / ETH
            priceFeed: '0xb429DE60943a8e6DeD356dca2F93Cd31201D9ed0',
            isToEthPrice: true,
            borrowCollateralFactor: 90,
            liquidateCollateralFactor: 93
          },
          {
            ...optimism['wbtc'],
            priceFeed: '0x718A5788b89454aAE3A028AE9c111A29Be6c2a6F',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          }
        ]
      }
    ]
  },
  [polygonId]: {
    compPriceFeed: '',
    bulkerAddress: '0x59e242D352ae13166B4987aE5c990C232f7f7CD6',
    ...CommonData,
    ethPriceFeed: '0xF9680D99D6C9589e2a93a78A04A279e509205945',
    comets: [
      {
        address: '0xF25212E676D1F7F89Cd72fFEe66158f541246445',
        baseToken: { ...polygon['usdc.e'], priceFeed: '0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7' },
        minimumBorrow: 100,
        collateralAssets: [
          {
            ...polygon['weth'],
            priceFeed: '0xF9680D99D6C9589e2a93a78A04A279e509205945',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          },
          {
            ...polygon['wbtc'],
            priceFeed: '0xDE31F8bFBD8c84b5360CFACCa3539B938dd78ae6',
            borrowCollateralFactor: 75,
            liquidateCollateralFactor: 85
          },
          {
            ...polygon['stmatic'],
            priceFeed: '0x97371dF4492605486e23Da797fA68e55Fc38a13f',
            borrowCollateralFactor: 60,
            liquidateCollateralFactor: 65
          },
          {
            ...polygon['matic'],
            address: polygon['wmatic'].address,
            priceFeed: '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0',
            borrowCollateralFactor: 65,
            liquidateCollateralFactor: 80
          },
          {
            ...polygon['maticx'],
            priceFeed: '0x5d37E4b374E6907de8Fc7fb33EE3b0af403C7403',
            borrowCollateralFactor: 55,
            liquidateCollateralFactor: 60
          }
        ]
      },
      {
        address: '0xaeB318360f27748Acb200CE616E389A6C9409a07',
        baseToken: { ...polygon['usdt'], priceFeed: '0x0A6513e40db6EB1b165753AD52E80663aeA50545' },
        collateralAssets: [
          {
            ...polygon['weth'],
            priceFeed: '0xF9680D99D6C9589e2a93a78A04A279e509205945',
            borrowCollateralFactor: 80,
            liquidateCollateralFactor: 85
          },
          {
            ...polygon['wbtc'],
            priceFeed: '0xDE31F8bFBD8c84b5360CFACCa3539B938dd78ae6',
            borrowCollateralFactor: 75,
            liquidateCollateralFactor: 85
          },
          {
            ...polygon['maticx'],
            priceFeed: '0x5d37E4b374E6907de8Fc7fb33EE3b0af403C7403',
            borrowCollateralFactor: 60,
            liquidateCollateralFactor: 70
          },
          {
            ...polygon['matic'],
            address: polygon['wmatic'].address,
            priceFeed: '0xAB594600376Ec9fD91F8e885dADF0CE036862dE0',
            borrowCollateralFactor: 65,
            liquidateCollateralFactor: 80
          },
          {
            ...polygon['stmatic'],
            priceFeed: '0x97371dF4492605486e23Da797fA68e55Fc38a13f',
            borrowCollateralFactor: 60,
            liquidateCollateralFactor: 70
          }
        ]
      }
    ]
  }
};

export default { basic, networks };
