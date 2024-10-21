import weth from '@/config/contract/weth';
import { arbitrum, CHAIN_ID as arbitrumId } from '@/config/tokens/arbitrum';
import { CHAIN_ID as scrollId, scroll } from '@/config/tokens/scroll';

const basic = {
  name: 'Compound V3',
  icon: '/assets/dapps/compoundv3.png',
  data: 'bluebiu.near/widget/Lending.Data.CompoundV3',
  handler: 'bluebiu.near/widget/Lending.Handler.CompoundV3',
  type: 'compound v3',
  loaderName: 'CompoundV3'
};

const networks = {
  [scrollId]: {
    compPriceFeed: '',
    bulkerAddress: '0x53C6D04e3EC7031105bAeA05B36cBc3C987C56fA',
    bulkerActionCodes: {
      ACTION_CLAIM_REWARD: '0x414354494f4e5f434c41494d5f52455741524400000000000000000000000000',
      ACTION_SUPPLY_ASSET: '0x414354494f4e5f535550504c595f415353455400000000000000000000000000',
      ACTION_SUPPLY_NATIVE_TOKEN: '0x414354494f4e5f535550504c595f4e41544956455f544f4b454e000000000000',
      ACTION_TRANSFER_ASSET: '0x414354494f4e5f5452414e534645525f41535345540000000000000000000000',
      ACTION_WITHDRAW_ASSET: '0x414354494f4e5f57495448445241575f41535345540000000000000000000000',
      ACTION_WITHDRAW_NATIVE_TOKEN: '0x414354494f4e5f57495448445241575f4e41544956455f544f4b454e00000000'
    },
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
    bulkerActionCodes: {
      ACTION_CLAIM_REWARD: '0x414354494f4e5f434c41494d5f52455741524400000000000000000000000000',
      ACTION_SUPPLY_ASSET: '0x414354494f4e5f535550504c595f415353455400000000000000000000000000',
      ACTION_SUPPLY_NATIVE_TOKEN: '0x414354494f4e5f535550504c595f4e41544956455f544f4b454e000000000000',
      ACTION_TRANSFER_ASSET: '0x414354494f4e5f5452414e534645525f41535345540000000000000000000000',
      ACTION_WITHDRAW_ASSET: '0x414354494f4e5f57495448445241575f41535345540000000000000000000000',
      ACTION_WITHDRAW_NATIVE_TOKEN: '0x414354494f4e5f57495448445241575f4e41544956455f544f4b454e00000000'
    },
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
        baseToken: { ...arbitrum['weth'], priceFeed: '0xdB7EdFa090061D9367CbEAF6bE16ECbDE596676C' },
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
  }
};

export default { basic, networks };
