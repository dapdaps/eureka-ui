import Big from 'big.js';
import { utils } from 'ethers';

import { mantle } from '@/config/tokens/mantle';
import { get } from '@/utils/http';

const getBorrowAvailable = async (data: any, options: any) => {
  try {
    const transactionRes = await get(
      `https://mantle.minterest.com/api/user/max/${data.localConfig.currentMarket.symbol}/${data.localConfig.currentMarket.underlyingToken.symbol}/borrow/${options.account}`
    );
    const userValue = utils.formatUnits(
      transactionRes.userValue,
      data.localConfig.currentMarket.underlyingToken.decimals
    );
    const balanceUsd = Big(userValue).times(data.underlyingPrice).toString();
    return {
      balance: userValue,
      balanceUsd: balanceUsd
    };
  } catch (err: any) {
    console.log(err);
  }
};
const getUserTotalBorrow = async (data: any, options: any) => {
  try {
    const transactionRes = await get(
      `https://mantle.minterest.com/api/user/max/${data.localConfig.currentMarket.symbol}/${data.localConfig.currentMarket.underlyingToken.symbol}/repayBorrow/${options.account}`
    );
    const userValue = utils.formatUnits(
      transactionRes.userValue,
      data.localConfig.currentMarket.underlyingToken.decimals
    );
    const balanceUsd = Big(userValue).times(data.underlyingPrice).toString();
    return {
      balance: userValue,
      balanceUsd: balanceUsd
    };
  } catch (err: any) {
    console.log(err);
  }
};
const getRedeemUnderlying = async (data: any, options: any) => {
  try {
    const transactionRes = await get(
      `https://mantle.minterest.com/api/user/max/${data.localConfig.currentMarket.symbol}/${data.localConfig.currentMarket.underlyingToken.symbol}/redeemUnderlying/${options.account}`
    );
    const userValue = utils.formatUnits(
      transactionRes.userValue,
      data.localConfig.currentMarket.underlyingToken.decimals
    );
    const balanceUsd = Big(userValue).times(data.underlyingPrice).toString();
    return {
      balance: userValue,
      balanceUsd: balanceUsd
    };
  } catch (err: any) {
    console.log(err);
  }
};
const getDisableCollateralDisabled = (data: any, options: any) => {
  return Big(data.userBorrowUSD).gt(0);
};

const basic = {
  name: 'Minterest',
  icon: '/images/apps/minterest.png',
  data: 'bluebiu.near/widget/Lending.Data.Lendle',
  handler: 'bluebiu.near/widget/Lending.Handler.Radiant',
  handlerClaim: 'bluebiu.near/widget/Mantle.Lending.LendleClaimHandler',
  loaderName: 'Minterest'
};

const networks = {
  5000: {
    collateralAddress: '0xe53a90EFd263363993A3B41Aa29f7DaBde1a932D',
    marketsAddress: 'https://mantle.minterest.com/api/markets',
    oracleAddress: 'https://mantle.minterest.com/api/utils/oracle-price',
    userDataAddress: 'https://mantle.minterest.com/api/user/data',
    usdyApyAddress: 'https://mantle.minterest.com/api//utils/token-specific-apy/usdy',
    methApyAddress: '/api/meth.mantle.xyz/stats/apy',
    onTabChangeBefore: async (tab: any, data: any, options: any) => {
      if (tab === 'Borrow') {
        return getBorrowAvailable(data, options);
      }
    },
    getBorrowAvailable,
    getUserTotalBorrow,
    getRedeemUnderlying,
    getDisableCollateralDisabled,
    markets: {
      [mantle['meth'].address]: {
        decimals: 8,
        symbol: 'mMETH',
        address: '0x5aA322875a7c089c1dB8aE67b6fC5AbD11cf653d',
        underlyingToken: mantle['meth']
      },
      [mantle['weth'].address]: {
        decimals: 8,
        symbol: 'mWETH',
        address: '0xfa1444aC7917d6B96Cac8307E97ED9c862E387Be',
        underlyingToken: mantle['weth']
      },
      [mantle['usdt'].address]: {
        decimals: 8,
        symbol: 'mUSDT',
        address: '0x66DBC77A4E6F3290493894Fc8e18F91C4F0ca854',
        underlyingToken: mantle['usdt']
      },
      [mantle['usdc'].address]: {
        decimals: 8,
        symbol: 'mUSDC',
        address: '0xEcbE4A2519f1e26df8Dfde95a4a2b89DE832896C',
        underlyingToken: mantle['usdc']
      },
      [mantle['usdy'].address]: {
        decimals: 8,
        symbol: 'mUSDY',
        address: '0x5edBD8808F48Ffc9e6D4c0D6845e0A0B4711FD5c',
        underlyingToken: mantle['usdy']
      },
      [mantle['wmnt'].address]: {
        decimals: 8,
        symbol: 'mWMNT',
        address: '0x6Cc1560EFe633E8799226c87c45981ef93cFa617',
        underlyingToken: mantle['wmnt']
      },
      // [mantle['mnt'].address]: {
      //   decimals: 8,
      //   symbol: 'mMNT',
      //   address: '0x6Cc1560EFe633E8799226c87c45981ef93cFa617',
      //   underlyingToken: mantle['mnt'],
      // },
      [mantle['fbtc'].address]: {
        decimals: 8,
        symbol: 'mFBTC',
        address: '0x27272698e0962a4BDF33F70a53D6AEa3fEF217C4',
        underlyingToken: mantle['fbtc'],
        type: 'OnlySupply'
      }
    },
    rewardTokens: {
      [mantle['minty'].address]: mantle['minty'],
      [mantle['mnt'].address]: mantle['mnt'],
      [mantle['meth'].address]: mantle['meth'],
      [mantle['usdy'].address]: mantle['usdy']
    }
  }
};

export default { basic, networks };
