import Big from 'big.js';
import { useMemo } from 'react';

import useFunctions from './useFunctions';
type ModeType = 'general' | 'stable' | 'nonStable';
export default function useData(props: any) {
  const { data, dexConfig, depositDataList, borrowDataList, underlyingPrices } = props;

  const { STABLE_FACTOR, NON_STABLE_FACTOR } = dexConfig;
  const { getMode, getCollateralCredit, getBorrowCredit } = useFunctions();

  const currMode: any = useMemo(() => getMode(depositDataList, borrowDataList), [depositDataList, borrowDataList]);
  const collateralFactor = useMemo(() => {
    const _collateralFactorMapping: any = {
      stable: STABLE_FACTOR?.[data?.address]?.[0],
      nonStable: NON_STABLE_FACTOR?.[data?.address]?.[0]
    };
    return _collateralFactorMapping[currMode] || data?.collateralFactor;
  }, [data, currMode]);

  const borrowFactor = useMemo(() => {
    const _borrowFactorMapping: any = {
      stable: STABLE_FACTOR?.[data?.address]?.[1],
      nonStable: NON_STABLE_FACTOR?.[data?.address]?.[1]
    };
    return _borrowFactorMapping[currMode] || data?.borrowFactor;
  }, [data, currMode]);

  const currHealthFactor: any = useMemo(() => {
    if (depositDataList?.length > 0 && borrowDataList?.length > 0) {
      const CollateralCredit = getCollateralCredit(depositDataList, currMode, underlyingPrices);
      const BorrowCredit = getBorrowCredit(borrowDataList, currMode, underlyingPrices);
      return Big(CollateralCredit)
        .div(BorrowCredit ? BorrowCredit : 1)
        .toFixed();
    } else {
      return Infinity;
    }
  }, [depositDataList, borrowDataList]);
  const getLatestHealthFactor = (_amount: string, _actionText: any, prices: any) => {
    if (Big(_amount ? _amount : 0).gt(0)) {
      const CollateralCredit = getCollateralCredit(depositDataList, currMode, underlyingPrices);
      const BorrowCredit = getBorrowCredit(borrowDataList, currMode, underlyingPrices);

      if (_actionText === 'Deposit') {
        const currCollateralCredit = Big(CollateralCredit).plus(
          Big(_amount).times(prices[data?.address]).times(collateralFactor)
        );
        return Big(currCollateralCredit)
          .div(BorrowCredit ? BorrowCredit : 1)
          .toFixed();
      }
      if (_actionText === 'Withdraw') {
        const currCollateralCredit = Big(CollateralCredit).minus(
          Big(_amount).times(prices[data?.address]).times(collateralFactor)
        );
        if (Big(BorrowCredit).eq(0)) {
          return Infinity;
        } else {
          return Big(currCollateralCredit)
            .div(BorrowCredit ? BorrowCredit : 1)
            .toFixed();
        }
      }
      if (_actionText === 'Borrow') {
        const currBorrowCredit = Big(BorrowCredit).plus(Big(_amount).times(prices[data?.address]).times(borrowFactor));
        return Big(CollateralCredit)
          .div(currBorrowCredit ? currBorrowCredit : 1)
          .toFixed();
      }
      if (_actionText === 'Repay') {
        const latestBorrowCredit = Big(BorrowCredit).minus(
          Big(_amount).times(prices[data?.address]).times(borrowFactor)
        );
        return Big(latestBorrowCredit).gt(0) ? Big(CollateralCredit).div(latestBorrowCredit).toFixed() : Infinity;
      }
    } else {
      return Infinity;
    }
  };
  return {
    currMode,
    collateralFactor,
    borrowFactor,
    currHealthFactor,
    getLatestHealthFactor
    // getMode,
    // getCollateralCredit,
    // getBorrowCredit,
    // getHealthFactor
  };
}
