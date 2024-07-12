import { useDefaultLayout } from '@/hooks/useLayout';
import { ComponentWrapperPage } from '@/components/near-org/ComponentWrapperPage';
import { VmComponent } from '@/components/vm/VmComponent';
import { multicall } from '@/utils/multicall';
import multicallAddress from '@/config/contract/multicall';
import { base } from '@/config/tokens/base';
import StakeModal from '@/components/Modal/Stake'

const Test = () => {
  return (
    // <VmComponent
    // src="bluebiu.near/widget/Lending.Data.CompoundV3"
    //   props={{
    //     wethAddress: '0x4200000000000000000000000000000000000006',
    //     bulkerAddress: '0x78D0677032A35c63D142a48A2037048871212a8C',
    //     account: '0xC25d79fc4970479B88068Ce8891eD9bE5799210D',
    //     actions: [
    //       {
    //         type: 'Withdraw',
    //         asset: base['usdbc'],
    //         amount: 0.0001,
    //       },
    //       {
    //         type: 'Supply',
    //         asset: base['eth'],
    //         amount: 0.0001,
    //       },
    //     ],
    //     bulkerActionCodes: {
    //       ACTION_CLAIM_REWARD: '0x414354494f4e5f434c41494d5f52455741524400000000000000000000000000',
    //       ACTION_SUPPLY_ASSET: '0x414354494f4e5f535550504c595f415353455400000000000000000000000000',
    //       ACTION_SUPPLY_NATIVE_TOKEN: '0x414354494f4e5f535550504c595f4e41544956455f544f4b454e000000000000',
    //       ACTION_TRANSFER_ASSET: '0x414354494f4e5f5452414e534645525f41535345540000000000000000000000',
    //       ACTION_WITHDRAW_ASSET: '0x414354494f4e5f57495448445241575f41535345540000000000000000000000',
    //       ACTION_WITHDRAW_NATIVE_TOKEN: '0x414354494f4e5f57495448445241575f4e41544956455f544f4b454e00000000',
    //     },
    //     update: true,
    //     comet: {
    //       address: '0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf',
    //     },
    //     onLoad(data: any) {
    //       console.log('data', data);
    //     },
    //   }}
    // />
    // <VmComponent
    //   src="bluebiu.near/widget/Lending.Data.CompoundV3"
    //   props={{
    //     multicall,
    //     multicallAddress: multicallAddress[8453],
    //     compPriceFeed: '0x9DDa783DE64A9d1A60c49ca761EbE528C35BA428',
    //     bulkerAddress: '0x78D0677032A35c63D142a48A2037048871212a8C',
    //     account: '0xC25d79fc4970479B88068Ce8891eD9bE5799210D',
    //     bulkerActionCodes: {
    //       ACTION_CLAIM_REWARD: '0x414354494f4e5f434c41494d5f52455741524400000000000000000000000000',
    //       ACTION_SUPPLY_ASSET: '0x414354494f4e5f535550504c595f415353455400000000000000000000000000',
    //       ACTION_SUPPLY_NATIVE_TOKEN: '0x414354494f4e5f535550504c595f4e41544956455f544f4b454e000000000000',
    //       ACTION_TRANSFER_ASSET: '0x414354494f4e5f5452414e534645525f41535345540000000000000000000000',
    //       ACTION_WITHDRAW_ASSET: '0x414354494f4e5f57495448445241575f41535345540000000000000000000000',
    //       ACTION_WITHDRAW_NATIVE_TOKEN: '0x414354494f4e5f57495448445241575f4e41544956455f544f4b454e00000000',
    //     },
    //     comets: [
    //       {
    //         address: '0x9c4ec768c28520B50860ea7a15bd7213a9fF58bf',
    //         baseToken: { ...base['usdbc'], priceFeed: '0x7e860098F58bBFC8648a4311b374B1D669a2bc6B' },
    //         collateralAssets: [
    //           {
    //             ...base['cbeth'],
    //             priceFeed: '0x4687670f5f01716fAA382E2356C103BaD776752C',
    //             borrowCollateralFactor: 75,
    //             liquidateCollateralFactor: 80,
    //           },
    //           {
    //             ...base['weth'],
    //             priceFeed: '0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70',
    //             borrowCollateralFactor: 79,
    //             liquidateCollateralFactor: 84,
    //           },
    //         ],
    //       },
    //       // {
    //       //   address: '0x46e6b214b524310239732D51387075E0e70970bf',
    //       // },
    //     ],
    //   }}
    // />

    <StakeModal />
  );
};

Test.getLayout = useDefaultLayout;

export default Test;
