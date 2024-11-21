import Big from 'big.js';
import _ from 'lodash';
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
      let _depositDataList = _.cloneDeep(depositDataList);
      let _borrowDataList = _.cloneDeep(borrowDataList);

      if (_actionText === 'Deposit') {
        _depositDataList = [
          ..._depositDataList,
          {
            ...data,
            amount: _amount
          }
        ];
        // _borrowDataList = borrowDataList
      } else if (_actionText === 'Withdraw') {
        const idx = _depositDataList.findIndex(
          (depositData: any, index: number) => depositData?.address === data?.address
        );
        if (idx > -1) {
          const _depositData = _depositDataList[idx];
          _depositData.amount = Big(_depositData?.amount ?? 0)
            .minus(_amount)
            .toFixed();
          if (Big(_depositData?.amount ?? 0).eq(0)) {
            _depositDataList.splice(idx);
          }
        }
      } else if (_actionText === 'Borrow') {
        _borrowDataList = [
          ..._borrowDataList,
          {
            ...data,
            amount: _amount
          }
        ];
      } else if (_actionText === 'Repay') {
        const idx = _borrowDataList.findIndex(
          (borrowData: any, index: number) => borrowData?.address === data?.address
        );

        if (idx > -1) {
          const _borrowData = _borrowDataList[idx];
          _borrowData.amount = Big(_borrowData?.amount ?? 0)
            .minus(_amount)
            .toFixed();
          if (Big(_borrowData?.amount ?? 0).eq(0)) {
            _borrowDataList.splice(idx, 1);
          }
        }
      }
      const mode = getMode(_depositDataList, _borrowDataList);
      console.log('===_depositDataList', _depositDataList);
      console.log('===_borrowDataList', _borrowDataList);
      console.log('===mode', mode);
      const CollateralCredit = getCollateralCredit(depositDataList, mode, underlyingPrices);
      const BorrowCredit = getBorrowCredit(borrowDataList, mode, underlyingPrices);

      if (_actionText === 'Deposit') {
        const currCollateralCredit = Big(CollateralCredit).plus(
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
        console.log('====mode', mode);
        const latestBorrowCredit = Big(BorrowCredit).minus(
          Big(_amount).times(prices[data?.address]).times(borrowFactor)
        );
        console.log('borrowDataList', borrowDataList);
        console.log('====latestBorrowCredit', latestBorrowCredit.toString());
        if (_borrowDataList.length > 0) {
          return Big(latestBorrowCredit).gt(0) ? Big(CollateralCredit).div(latestBorrowCredit).toFixed() : Infinity;
        } else {
          return Infinity;
        }
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
