import Big from 'big.js';
import { differenceInDays, format, startOfDay } from 'date-fns';
import { ethers } from 'ethers';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import Empty from '@/components/Empty';
import Modal from '@/components/Modal';
import { linea } from '@/config/tokens/linea';
import useAccount from '@/hooks/useAccount';
import useTokenBalance from '@/hooks/useTokenBalance';
import { usePriceStore } from '@/stores/price';
import { StyledFlex, StyledFont } from '@/styled/styles';
import { multicall, multicallAddresses } from '@/utils/multicall';

import veLockABI from './abi/veLock.json';
import CreateNewLockContent from './CreateNewLockContent';

export const veLYNX = '0x8D95f56b0Bac46e8ac1d3A3F12FB1E5BC39b4c0c';

const LockModal = ({ show, onClose }: any) => {
  const { tokenBalance, update } = useTokenBalance(veLYNX, linea['lynx'].decimals);

  const [veIds, setVeIds] = useState<string[]>([]);
  const [lockValues, setLockValues] = useState<any[]>([]);
  const [lockDetails, setLockDetails] = useState<any[]>([]);
  const [updater, setUpdater] = useState(0);

  const prices = usePriceStore((store) => store.price);

  const { account, provider, chainId } = useAccount();

  const lockList = useMemo(
    () => tokenBalance && new Big(tokenBalance).mul(10 ** 18).toString(),
    [tokenBalance, updater]
  );

  const getTokenOfOwnerByIndex = async () => {
    if (!chainId) return;

    const calls = Array.from({ length: Number(lockList) }, (_, index) => ({
      address: veLYNX,
      name: 'tokenOfOwnerByIndex',
      params: [account, index]
    }));

    const multicallAddress = multicallAddresses[chainId];
    return multicall({
      abi: veLockABI,
      calls,
      options: {},
      multicallAddress,
      provider: provider
    })
      .then((results) => {
        if (results) {
          const ids = results
            .map((arr: any[]) => {
              if (arr && arr.length > 0 && arr[0]) {
                return arr[0].toString();
              }
              return null;
            })
            .filter(Boolean);
          setVeIds(ids);
          getLockValue(ids);
          getLockDetail(ids);
        }
      })
      .catch((error: any) => {
        console.log(error, 'getTokenOfOwnerByIndex: error');
      });
  };

  const getLockValue = async (ids: any) => {
    if (!chainId) return;
    const calls = ids.map((veId: any) => ({
      address: veLYNX,
      name: 'balanceOfNFT',
      params: [veId]
    }));
    const multicallAddress = multicallAddresses[chainId];
    return multicall({
      abi: veLockABI,
      calls,
      options: {},
      multicallAddress,
      provider: provider
    })
      .then((results) => {
        console.log(results, 'getLockValue: results');

        if (results) {
          const value = results
            .map((arr: any[]) => {
              if (arr && arr.length > 0 && arr[0]) {
                return Number(ethers.utils.formatUnits(arr[0].toString(), 18)).toFixed(3);
              }
              return '0';
            })
            .filter(Boolean);
          setLockValues(value);
        }
      })
      .catch((error: any) => {
        console.log(error, 'lockValue: error');
      });
  };

  const getLockDetail = async (ids: any) => {
    if (!chainId) return;
    const calls = ids.map((veId: any) => ({
      address: veLYNX,
      name: '_lockDetails',
      params: [veId]
    }));
    const multicallAddress = multicallAddresses[chainId];
    return multicall({
      abi: veLockABI,
      calls,
      options: {},
      multicallAddress,
      provider
    })
      .then((results) => {
        if (results) {
          console.log(results, 'results');

          const data = results
            .map((arr: any[], index: any) => {
              if (arr && arr.length > 0 && arr[0]) {
                const [amount, startTime, endTime, isPermanent] = arr;
                return {
                  amount: Number(ethers.utils.formatUnits(amount.toString(), 18)),
                  endTime: format(Number(endTime.toString() * 1000), 'MMM dd, yyyy'),
                  startTime: Number(startTime.toString()),
                  isPermanent,
                  id: index,
                  expiresDays: differenceInDays(startOfDay(new Date(Number(endTime * 1000))), startOfDay(new Date()))
                };
              }
              return null;
            })
            .filter(Boolean);
          setLockDetails(data);
        }
      })
      .catch((error: any) => {
        console.log(error, 'lockDetail: error');
      });
  };

  const init = async () => {
    await getTokenOfOwnerByIndex();
  };

  useEffect(() => {
    if (!account || !chainId) return;
    init();
  }, [account, lockList, updater, chainId]);

  const onSuccess = () => {
    onClose();
    setUpdater(Date.now());
    update();
  };

  return (
    <Modal
      display={show}
      title={() => {
        return (
          <StyledFlex gap="12px">
            <StyledFont color="#FFF" fontSize="20px" fontWeight="600">
              Stake zLP (ZERO/ETH)
            </StyledFont>
            <img src="/images/alldapps/zeroland.png" alt="zeroland" className="w-[135px] h-[39px] mr-3" />
          </StyledFlex>
        );
      }}
      onClose={onClose}
      portal={true}
      width={500}
      headerStyle={{ padding: '26px 20px 0' }}
      titleStyle={{ fonwWeight: 'bold', fontSize: '22px' }}
      content={<CreateNewLockContent onSuccess={onSuccess} />}
    />
  );
};

export default LockModal;
