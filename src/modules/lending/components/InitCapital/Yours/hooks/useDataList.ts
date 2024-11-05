import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import { OTOKEN_ABI, POS_MANAGER_ABI } from '@/modules/lending/components/InitCapital/Abi';

export default function useDataList(props: any) {
  const { updater, dexConfig, markets, account, provider, underlyingPrices, multicall, multicallAddress } = props;
  const { POS_MANAGER, NARROW_DECIMALS } = dexConfig;

  const [dataList, setDataList] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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
      const oToken = markets[calls?.[index]?.address];
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

  const getHealthFactor = (collaterals: any, borrows: any) => {
    if (collaterals?.length > 0 && borrows?.length > 0) {
      const CollateralCredit = collaterals?.reduce((accumulator: any, curr: any) => {
        const data = markets[curr[0]];
        const [address, amount] = curr;
        return Big(accumulator).plus(
          address ? Big(amount).times(underlyingPrices[address]).times(data?.collateralFactor) : 0
        );
      }, 0);

      const BorrowCredit = borrows?.reduce((accumulator: any, curr: any) => {
        const data = markets[curr[0]];
        const [address, amount] = curr;
        return Big(accumulator).plus(
          address ? Big(amount).times(underlyingPrices[address]).times(data?.borrowFactor) : 0
        );
      }, 0);
      return Big(BorrowCredit).eq(0) ? Infinity : Big(CollateralCredit).div(BorrowCredit).toFixed();
    } else {
      return Infinity;
    }
  };

  const getWeightedAverageAPY = (totalBalanceUSD: any, tokens: any, type: 'deposit' | 'borrow') => {
    // const totalBalanceUSD = tokens?.reduce((accumulator: any, curr: any) => Big(accumulator).plus(curr?.[1] ?? 0), 0)
    let weightedAverageAPY = Big(0);
    tokens?.forEach((token: any) => {
      const [address, positionBalanceUSD] = token;
      const market = markets[address];
      const positionAPY = Big(type === 'deposit' ? market?.supplyApy : market?.borrowApy);
      weightedAverageAPY = Big(weightedAverageAPY).plus(
        Big(positionBalanceUSD).times(positionAPY).div(totalBalanceUSD)
      );
    });
    return weightedAverageAPY.toFixed();
  };
  const getNetApy = (collaterals: any, borrows: any) => {
    if (collaterals?.length > 0 && borrows?.length > 0) {
      const totalSuppliedUSD = collaterals?.reduce(
        (accumulator: any, curr: any) => Big(accumulator).plus(curr?.[1] ?? 0),
        0
      );
      const weightedAverageSupplyAPY = getWeightedAverageAPY(totalSuppliedUSD, collaterals, 'deposit');
      const totalBorrowedUSD = borrows?.reduce(
        (accumulator: any, curr: any) => Big(accumulator).plus(curr?.[1] ?? 0),
        0
      );
      const weightedAverageBorrowAPY = getWeightedAverageAPY(totalBorrowedUSD, borrows, 'borrow');
      const netWorthUSD = Big(totalSuppliedUSD).minus(totalBorrowedUSD).toFixed();

      return Big(Big(weightedAverageSupplyAPY).times(totalSuppliedUSD))
        .minus(Big(weightedAverageBorrowAPY).times(totalBorrowedUSD))
        .div(netWorthUSD)
        .toFixed();
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
        const amount = collaterals?.reduce((accumulator: any, curr: any) => Big(accumulator).plus(curr?.[1] ?? 0), 0);
        const borrowAmount = borrows?.reduce((accumulator: any, curr: any) => Big(accumulator).plus(curr?.[1] ?? 0), 0);
        const healthFactor = getHealthFactor(collaterals, borrows);
        // const netApy = getNetApy(collaterals, borrows);
        _dataList.push({
          sequence: i + 1,
          posId: posIds[i],
          amount,
          borrows,
          borrowAmount,
          collaterals,
          healthFactor
          // netApy
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
    account && getDataList();
  }, [account, updater]);

  return {
    loading,
    dataList
  };
}
