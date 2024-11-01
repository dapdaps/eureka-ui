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

  // const getBebtShareToAmtStored = async (posBorrInfos: any) => {
  //   const calls:any = [];
  //   const notAmtArray = [];
  //   posBorrInfos?.forEach((posBorrInfo, index) => {
  //     const [pools, amts] = posBorrInfo;
  //     if (pools?.length > 0) {
  //       calls.push({
  //         address: pools?.[0],
  //         name: 'debtShareToAmtStored',
  //         params: [amts[0]]
  //       });
  //     } else {
  //       notAmtArray.push(index);
  //     }
  //   });

  //   const amts = (
  //     await multicall({
  //       abi: OTOKEN_ABI,
  //       calls,
  //       options: {},
  //       multicallAddress,
  //       provider
  //     })
  //   ).map((res: any, index) => {
  //     const oToken = markets[calls?.[index]?.address];
  //     return [oToken?.address, res && res[0] ? ethers.utils.formatUnits(res[0]._hex, oToken?.decimals) : '0'];
  //   });
  //   notAmtArray.forEach((idx) => {
  //     amts.splice(idx, 0, ['', '']);
  //   });
  //   return amts;
  // };

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
    result.forEach((res: any, index: number) => {
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
    if (collaterals && borrows) {
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
      for (let i = 0; i < posIdsLength; i++) {
        const collaterals = amts[i];
        const borrows = borrowAmts[i];
        const amount = collaterals?.reduce((accumulator: any, curr: any) => Big(accumulator).plus(curr?.[1] ?? 0), 0);
        const borrowAmount = borrows?.reduce((accumulator: any, curr: any) => Big(accumulator).plus(curr?.[1] ?? 0), 0);
        const healthFactor = getHealthFactor(collaterals, borrows);
        _dataList.push({
          sequence: i + 1,
          posId: posIds[i],
          amount,
          borrows,
          borrowAmount,
          collaterals,
          healthFactor
        });
      }
      setLoading(false);
      setDataList(_dataList);
    } catch (error) {
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
