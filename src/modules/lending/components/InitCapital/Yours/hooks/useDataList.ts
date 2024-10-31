import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

import { OTOKEN_ABI, POS_MANAGER_ABI } from '@/modules/lending/components/InitCapital/Abi';
interface IProps {
  updater: number;
  dexConfig: any;
}

export default function useDataList(props: IProps) {
  const { updater, dexConfig, markets, account, provider, multicall, multicallAddress } = props;
  const { POS_MANAGER, NARROW_DECIMALS } = dexConfig;

  const [dataList, setDataList] = useState(null);
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
    const calls = [];
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
    const calls = [];
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
    const calls = [];
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

  const getBebtShareToAmtStored = async (posBorrInfos: any) => {
    const calls = [];
    const notAmtArray = [];
    posBorrInfos?.forEach((posBorrInfo, index) => {
      const [pools, amts] = posBorrInfo;
      if (pools?.length > 0) {
        calls.push({
          address: pools?.[0],
          name: 'debtShareToAmtStored',
          params: [amts[0]]
        });
      } else {
        notAmtArray.push(index);
      }
    });

    const amts = (
      await multicall({
        abi: OTOKEN_ABI,
        calls,
        options: {},
        multicallAddress,
        provider
      })
    ).map((res: any, index) => {
      const oToken = markets[calls?.[index]?.address];
      return [oToken?.address, res && res[0] ? ethers.utils.formatUnits(res[0]._hex, oToken?.decimals) : '0'];
    });
    notAmtArray.forEach((idx) => {
      amts.splice(idx, 0, ['', '']);
    });
    return amts;
  };

  const getAmts = async (posCollInfos) => {
    const calls = [];
    const notAmtArray = [];
    posCollInfos?.forEach((posCollInfo, index) => {
      const [pools, amts] = posCollInfo;
      if (pools?.length > 0) {
        calls.push({
          address: pools?.[0],
          name: 'toAmt',
          params: [amts[0]]
        });
      } else {
        notAmtArray.push(index);
      }
    });

    const amts = (
      await multicall({
        abi: OTOKEN_ABI,
        calls,
        options: {},
        multicallAddress,
        provider
      })
    ).map((res: any, index) => {
      const oToken = markets[calls?.[index]?.address];
      return [oToken?.address, res && res[0] ? ethers.utils.formatUnits(res[0]._hex, oToken?.decimals) : '0'];
    });
    notAmtArray.forEach((idx) => {
      amts.splice(idx, 0, ['', '']);
    });
    return amts;
  };

  const getDataList = async () => {
    try {
      const posIdsLength = await getPosIdsLength();
      const posIds = await getPosIds(posIdsLength);
      const posCollInfos = await getPosCollInfos(posIds);
      const posBorrInfos = await getPosBorrInfos(posIds);
      const amts = await getAmts(posCollInfos);
      const borrowAmts = await getBebtShareToAmtStored(posBorrInfos);

      console.log('===posCollInfos', posCollInfos);
      console.log('===amts', amts);
      const _dataList = [];
      for (let i = 0; i < posIdsLength; i++) {
        const amt = amts[i];
        const borrowAmt = borrowAmts[i];

        console.log('====amt', amt);
        const [underlyingAddress, amount] = amt;
        const [borrowAddress, borrowAmount] = borrowAmt;

        _dataList.push({
          sequence: i + 1,
          posId: posIds[i],
          underlyingAddress,
          amount,
          borrowAddress,
          borrowAmount
        });
      }
      setDataList(_dataList);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  useEffect(() => {
    getDataList();
  }, [updater]);

  return {
    loading,
    dataList
  };
}
