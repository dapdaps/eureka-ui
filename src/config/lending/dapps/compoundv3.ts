import weth from '@/config/contract/weth';
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
  }
};

export default { basic, networks };
