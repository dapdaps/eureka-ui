import { base } from '@/config/tokens/base';

const basic = {
  name: 'Compound V3',
  icon: '/images/apps/cream.png',
  data: 'bluebiu.near/widget/Lending.Data.CompoundV3',
  type: 'compound v3',
};

const networks = {
  8453: {
    compPriceFeed: '0x9DDa783DE64A9d1A60c49ca761EbE528C35BA428',
    actions: {
      ACTION_CLAIM_REWARD: '0x414354494f4e5f434c41494d5f52455741524400000000000000000000000000',
      ACTION_SUPPLY_ASSET: '0x414354494f4e5f535550504c595f415353455400000000000000000000000000',
      ACTION_SUPPLY_NATIVE_TOKEN: '0x414354494f4e5f535550504c595f4e41544956455f544f4b454e000000000000',
      ACTION_TRANSFER_ASSET: '0x414354494f4e5f5452414e534645525f41535345540000000000000000000000',
      ACTION_WITHDRAW_ASSET: '0x414354494f4e5f57495448445241575f41535345540000000000000000000000',
      ACTION_WITHDRAW_NATIVE_TOKEN: '0x414354494f4e5f57495448445241575f4e41544956455f544f4b454e00000000',
    },
    comets: [
      {
        address: '0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf',
        baseToken: { ...base['usdbc'], priceFeed: '0x7e860098F58bBFC8648a4311b374B1D669a2bc6B' },
        collateralAssets: [
          {
            ...base['cbeth'],
            priceFeed: '0x4687670f5f01716fAA382E2356C103BaD776752C',
            borrowCollateralFactor: 75,
            liquidateCollateralFactor: 80,
          },
          {
            ...base['weth'],
            priceFeed: '0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70',
            borrowCollateralFactor: 79,
            liquidateCollateralFactor: 84,
          },
        ],
      },
      // {
      //   address: '0x46e6b214b524310239732D51387075E0e70970bf',
      // },
    ],
  },
};

export default { basic, networks };
