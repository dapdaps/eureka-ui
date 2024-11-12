import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import { OTOKEN_ABI, POS_MANAGER_ABI } from '@/modules/lending/components/InitCapital/Abi';

export default function useDataList(props: any) {
  const { updater, dexConfig, markets, usdcPrice, account, provider, underlyingPrices, multicall, multicallAddress } =
    props;
  const { POS_MANAGER, NARROW_DECIMALS, STABLE_FACTOR, NON_STABLE_FACTOR } = dexConfig;

  const [dataList, setDataList] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  console.log('===props', props);
  const getPosIdsLength = async () => {
    if (!POS_MANAGER) return;
    const contract = new ethers.Contract(POS_MANAGER, POS_MANAGER_ABI, provider?.getSigner());
    try {
      return await contract.getViewerPosIdsLength(account);
    } catch (error) {
      console.log('getPosIdsLength---error:', error);
    }
  };
  const getPosIds = async (posIdsLength: number) => {
    if (!POS_MANAGER) return;
    const calls: any = [];
    for (let i = 0; i < posIdsLength; i++) {
      calls.push({
        address: POS_MANAGER,
        name: 'getViewerPosIdsAt',
        params: [account, i]
      });
    }
    try {
      return (
        await multicall({
          abi: POS_MANAGER_ABI,
          calls,
          options: {},
          multicallAddress,
          provider
        })
      ).map((res: any) => (res[0] ? res[0] : '0'));
    } catch (error) {
      console.log('getPosIds---error:', error);
    }
  };
  const getPosCollInfos = async (posIds: any) => {
    if (!POS_MANAGER) return;
    const calls: any = [];
    for (let i = 0; i < posIds?.length; i++) {
      calls.push({
        address: POS_MANAGER,
        name: 'getPosCollInfo',
        params: [posIds[i]]
      });
    }
    return await multicall({
      abi: POS_MANAGER_ABI,
      calls,
      options: {},
      multicallAddress,
      provider
    });
  };
  const getPosBorrInfos = async (posIds: any) => {
    if (!POS_MANAGER) return;
    const calls: any = [];
    for (let i = 0; i < posIds?.length; i++) {
      calls.push({
        address: POS_MANAGER,
        name: 'getPosBorrInfo',
        params: [posIds[i]]
      });
    }
    return await multicall({
      abi: POS_MANAGER_ABI,
      calls,
      options: {},
      multicallAddress,
      provider
    });
  };
  const getAmts = async (_collInfos: any, _method: 'toAmt' | 'debtShareToAmtStored') => {
    const calls: any = [];
    const notAmtArray: any = [];
    const subscript: any = [];
    _collInfos?.forEach((collInfo: any, index: number) => {
      const [pools, amts] = collInfo;
      if (pools?.length > 0) {
        for (let i = 0; i < pools.length; i++) {
          const pool = pools[i];
          calls.push({
            address: pool,
            name: _method,
            params: [amts[i]]
          });
          subscript.push([index, i]);
        }
      } else {
        notAmtArray.push(index);
      }
    });

    const result = await multicall({
      abi: OTOKEN_ABI,
      calls,
      options: {},
      multicallAddress,
      provider
    });
    const amts: any = [];
    result?.forEach((res: any, index: number) => {
      const oToken = markets?.[calls?.[index]?.address];
      const [firstIndex, secondIndex] = subscript[index];
      amts[firstIndex] = amts[firstIndex] || [];
      amts[firstIndex][secondIndex] = [
        oToken?.address,
        res && res[0] ? ethers.utils.formatUnits(res[0]._hex, oToken?.decimals) : '0'
      ];
    });

    notAmtArray.forEach((idx: number) => {
      amts.splice(idx, 1, null);
    });
    return amts;
  };

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
  const getCollateralCredit = (_depositDataList: any, _mode: any) => {
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
  const getBorrowCredit = (_borrowDataList: any, _mode: any) => {
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
  const getHealthFactor = (depositDataList: any, borrowDataList: any) => {
    if (depositDataList?.length > 0 && borrowDataList?.length > 0) {
      const mode = getMode(depositDataList, borrowDataList);
      console.log('===mode', mode);
      const CollateralCredit = getCollateralCredit(depositDataList, mode);
      const BorrowCredit = getBorrowCredit(borrowDataList, mode);
      return Big(CollateralCredit)
        .div(BorrowCredit ? BorrowCredit : 1)
        .toFixed();
    } else {
      return Infinity;
    }
  };

  const getWeightedAverageAPY = (totalBalanceUSD: any, tokens: any, type: 'deposit' | 'borrow') => {
    // const totalBalanceUSD = tokens?.reduce((accumulator: any, curr: any) => Big(accumulator).plus(curr?.[1] ?? 0), 0)
    let weightedAverageAPY = Big(0);
    tokens?.forEach((token: any) => {
      const [address, amount] = token;
      const market = markets[address];
      const positionBalanceUSD = Big(amount).times(underlyingPrices[address]).div(usdcPrice);
      console.log('==market', market, '===type', type, '==positionBalanceUSD', positionBalanceUSD);
      const positionAPY = Big(type === 'deposit' ? market?.supplyApy : market?.borrowApy);

      console.log('=positionAPY', positionAPY.toString());
      weightedAverageAPY = Big(weightedAverageAPY).plus(
        Big(totalBalanceUSD).eq(0) ? 0 : Big(positionBalanceUSD).times(positionAPY).div(totalBalanceUSD)
      );
    });
    return weightedAverageAPY.toFixed();
  };
  const getNetApy = (collaterals: any, borrows: any) => {
    if (collaterals?.length > 0) {
      const totalSuppliedUSD = collaterals?.reduce(
        (accumulator: any, curr: any) =>
          Big(accumulator).plus(
            Big(curr?.[1] ?? 0)
              .times(underlyingPrices[curr?.[0]])
              .div(usdcPrice)
          ),
        0
      );
      const weightedAverageSupplyAPY = getWeightedAverageAPY(totalSuppliedUSD, collaterals, 'deposit');
      const totalBorrowedUSD =
        borrows?.reduce(
          (accumulator: any, curr: any) =>
            Big(accumulator).plus(
              Big(curr?.[1] ?? 0)
                .times(underlyingPrices[curr?.[0]])
                .div(usdcPrice)
            ),
          0
        ) ?? 0;

      if (Big(totalSuppliedUSD).eq(0)) {
        return NaN;
      } else if (Big(totalBorrowedUSD).eq(0)) {
        return Big(weightedAverageSupplyAPY).toFixed();
      } else {
        const weightedAverageBorrowAPY = getWeightedAverageAPY(totalBorrowedUSD, borrows, 'borrow');
        return Big(weightedAverageSupplyAPY)
          .minus(Big(weightedAverageBorrowAPY).times(Big(totalBorrowedUSD).div(totalSuppliedUSD)))
          .toFixed();
      }
    } else {
      return NaN;
    }
  };

  const getDataList = async () => {
    try {
      setLoading(true);
      const posIdsLength = await getPosIdsLength();
      const posIds = await getPosIds(posIdsLength);
      const posCollInfos = await getPosCollInfos(posIds);
      const posBorrInfos = await getPosBorrInfos(posIds);
      const amts = await getAmts(posCollInfos, 'toAmt');
      const borrowAmts = await getAmts(posBorrInfos, 'debtShareToAmtStored');
      const _dataList = [];
      console.log('=posCollInfos', posCollInfos);
      console.log('=posBorrInfos', posBorrInfos);
      console.log('=amts', amts);
      console.log('=borrowAmts', borrowAmts);
      for (let i = 0; i < posIdsLength; i++) {
        const collaterals = amts[i];
        const borrows = borrowAmts[i];
        const amount = collaterals?.reduce(
          (accumulator: any, curr: any) =>
            Big(accumulator).plus(Big(underlyingPrices?.[curr?.[0] ?? 0] ?? 0).times(curr?.[1] ?? 0)),
          0
        );
        const borrowAmount = borrows?.reduce(
          (accumulator: any, curr: any) =>
            Big(accumulator).plus(Big(underlyingPrices?.[curr?.[0] ?? 0] ?? 0).times(curr?.[1] ?? 0)),
          0
        );
        const depositDataList =
          collaterals?.map((collateral: any) => {
            return {
              ...markets[collateral?.[0]],
              amount: collateral?.[1]
            };
          }) ?? [];
        const borrowDataList =
          borrows?.map((borrow: any) => {
            return {
              ...markets[borrow?.[0]],
              amount: borrow?.[1]
            };
          }) ?? [];
        const healthFactor = getHealthFactor(depositDataList, borrowDataList);

        const netApy = getNetApy(collaterals, borrows);

        console.log('=netApy', netApy);
        _dataList.push({
          sequence: i + 1,
          posId: posIds[i],
          amount,
          borrows,
          borrowAmount,
          collaterals,
          healthFactor,
          netApy
        });
      }
      setLoading(false);
      setDataList(_dataList);
    } catch (error) {
      console.log('error:', error);
      setTimeout(() => {
        getDataList();
      }, 1500);
    }
  };

  useEffect(() => {
    account && markets && getDataList();
  }, [account, updater, markets]);

  return {
    loading,
    dataList
  };
}
