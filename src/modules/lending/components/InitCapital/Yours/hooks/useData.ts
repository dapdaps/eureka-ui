import Big from 'big.js';
import { useMemo } from 'react';
type ModeType = 'general' | 'stable' | 'nonStable';
export default function useData(props: any) {
  const { data, dexConfig, depositDataList, borrowDataList, underlyingPrices } = props;

  const { STABLE_FACTOR, NON_STABLE_FACTOR } = dexConfig;
  const getFactorsMode = (_depositDataList: any, _borrowDataList: any, factors: any) => {
    if (_depositDataList?.length > 0 && _borrowDataList?.length > 0) {
      const keys = Object.keys(factors);
      for (let i = 0; i < _depositDataList?.length; i++) {
        if (!keys.includes(_depositDataList[i]?.address)) return false;
      }
      for (let i = 0; i < _borrowDataList?.length; i++) {
        if (!keys.includes(_borrowDataList[i]?.address)) return false;
      }
      return true;
    } else {
      return false;
    }
  };

  const getMode = (_depositDataList: any, _borrowDataList: any) => {
    if (getFactorsMode(_depositDataList, _borrowDataList, STABLE_FACTOR)) {
      return 'stable';
    }
    if (getFactorsMode(_depositDataList, _borrowDataList, NON_STABLE_FACTOR)) {
      return 'nonStable';
    }
    return 'general';
  };

  const getCollateralCredit = (_depositDataList: any, _mode: ModeType) => {
    let total: any = 0;
    _depositDataList?.forEach((currentData: any, index: number) => {
      const _collateralFactorMapping: any = {
        stable: STABLE_FACTOR?.[currentData?.address]?.[0],
        nonStable: NON_STABLE_FACTOR?.[currentData?.address]?.[0]
      };
      const _collateralFactor = _collateralFactorMapping[_mode] || currentData?.collateralFactor;
      total = Big(total).plus(
        Big(currentData?.amount).times(underlyingPrices[currentData?.address]).times(_collateralFactor)
      );
    });
    return total;
  };
  const getBorrowCredit = (_borrowDataList: any, _mode: ModeType) => {
    let total: any = 0;
    _borrowDataList?.forEach((currentData: any, index: number) => {
      const _borrowFactorMapping: any = {
        stable: STABLE_FACTOR?.[currentData?.address]?.[1],
        nonStable: NON_STABLE_FACTOR?.[currentData?.address]?.[1]
      };
      const _borrowFactor = _borrowFactorMapping[_mode] || currentData?.borrowFactor;

      total = Big(total).plus(
        Big(currentData?.amount).times(underlyingPrices[currentData?.address]).times(_borrowFactor)
      );
    });
    return total;
  };

  const getHealthFactor = (_amount: string, _actionText: any) => {
    if (Big(_amount ? _amount : 0).gt(0)) {
      const CollateralCredit = getCollateralCredit(depositDataList, currMode);
      const BorrowCredit = getBorrowCredit(borrowDataList, currMode);

      if (_actionText === 'Deposit') {
        const currCollateralCredit = Big(CollateralCredit).plus(
          Big(_amount).times(underlyingPrices[data?.address]).times(collateralFactor)
        );
        return Big(currCollateralCredit)
          .div(BorrowCredit ? BorrowCredit : 1)
          .toFixed();
      }
      if (_actionText === 'Withdraw') {
        const currCollateralCredit = Big(CollateralCredit).minus(
          Big(_amount).times(underlyingPrices[data?.address]).times(collateralFactor)
        );
        return Big(currCollateralCredit)
          .div(BorrowCredit ? BorrowCredit : 1)
          .toFixed();
      }
      if (_actionText === 'Borrow') {
        const currBorrowCredit = Big(BorrowCredit).plus(
          Big(_amount).times(underlyingPrices[data?.address]).times(borrowFactor)
        );
        return Big(CollateralCredit)
          .div(currBorrowCredit ? currBorrowCredit : 1)
          .toFixed();
      }
      if (_actionText === 'Repay') {
        const latestBorrowCredit = Big(BorrowCredit).minus(
          Big(_amount).times(underlyingPrices[data?.address]).times(borrowFactor)
        );
        return Big(latestBorrowCredit).gt(0) ? Big(CollateralCredit).div(latestBorrowCredit).toFixed() : Infinity;
      }
    } else {
      return Infinity;
    }
  };

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
      const CollateralCredit = getCollateralCredit(depositDataList, currMode);
      const BorrowCredit = getBorrowCredit(borrowDataList, currMode);
      return Big(CollateralCredit)
        .div(BorrowCredit ? BorrowCredit : 1)
        .toFixed();
    } else {
      return Infinity;
    }
  }, [depositDataList, borrowDataList]);
  return {
    currMode,
    collateralFactor,
    borrowFactor,
    currHealthFactor,
    getMode,
    getCollateralCredit,
    getBorrowCredit,
    getHealthFactor
  };
}
