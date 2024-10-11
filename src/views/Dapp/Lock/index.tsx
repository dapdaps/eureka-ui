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
import { multicall, multicallAddresses } from '@/utils/multicall';

import veLockABI from './abi/veLock.json';
import CreateNewLockContent from './CreateNewLockContent';
interface IProps {
  dapp: string;
  chainId: number;
  currentChain: string;
  localConfig: any;
  chains: string[];
}

const Container = styled.div`
  background-color: #000000;
  color: #ffffff;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const CreateLockButton = styled.button`
  background-color: #ebf479;
  color: #000000;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr 1.5fr;
  gap: 10px;
  align-items: center;
`;

const GridHeader = styled(Grid)`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
  padding: 0 20px 10px 20px;
  color: #979abe;
`;

const GridRow = styled(Grid)`
  background: #262836;
  border: 1px solid #373a53;
  border-radius: 16px;
  overflow: hidden;
  padding: 20px;
  margin-bottom: 10px;
`;

const GridCell = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainText = styled.div`
  font-family: Montserrat;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
`;

const SmallText = styled.div`
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 500;
  line-height: 17.07px;
  text-align: left;
  margin-top: 4px;
  color: #979abe;
`;

export const veLYNX = '0x8D95f56b0Bac46e8ac1d3A3F12FB1E5BC39b4c0c';

const LockPanel = () => {
  const { tokenBalance, update } = useTokenBalance(veLYNX, linea['lynx'].decimals);

  const [visible, setVisible] = useState(false);

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

  const computedLocks = useMemo(
    () =>
      veIds.map((id, index) => {
        const lockValue = lockValues[index];
        const lockDetail = lockDetails[index];

        return {
          ...lockDetail,
          lockValue,
          id
        };
      }),
    [veIds, lockValues, lockDetails, updater]
  );

  const onSuccess = () => {
    setVisible(false);
    setUpdater(Date.now());
    update();
  };

  const formatAmount = (lockValue: string | number, price: string | number, precision: number = 3): string => {
    if (!lockValue || !price) {
      return '0';
    }

    const amount = new Big(lockValue).mul(price);

    if (amount.lt(0.001)) {
      return '< 0.001';
    }

    return amount.toFixed(precision);
  };
  return (
    <Container>
      <Header>
        <Title>Lock</Title>
        <CreateLockButton onClick={() => setVisible(true)}>+ Create Lock</CreateLockButton>
      </Header>
      <GridHeader>
        <div>veLYNX ID</div>
        <div>Lock Value</div>
        <div>Locked Amount</div>
        <div>Lock Expire</div>
      </GridHeader>
      {computedLocks.length > 0 ? (
        computedLocks.map((lock) => (
          <GridRow key={lock.id}>
            <GridCell>
              <MainText>#{lock.id}</MainText>
            </GridCell>
            <GridCell>
              <MainText>{lock.lockValue || 0} veLYNX</MainText>
              {lock.lockValue ? (
                <SmallText>${formatAmount(lock.lockValue, prices[linea['lynx'].symbol])}</SmallText>
              ) : (
                '-'
              )}
            </GridCell>
            <GridCell>
              <MainText>{lock.amount || 0} LYNX</MainText>
              {lock.amount ? <SmallText>${formatAmount(lock.amount, prices[linea['lynx'].symbol])}</SmallText> : '-'}
            </GridCell>
            <GridCell>
              <MainText>{lock.endTime}</MainText>
              <SmallText>Expires in {lock.expiresDays} days</SmallText>
            </GridCell>
          </GridRow>
        ))
      ) : (
        <Empty size={48} tips="No Lock Data" />
      )}

      <Modal
        display={visible}
        title="Create New Lock"
        onClose={() => setVisible(false)}
        portal={true}
        width={680}
        titleStyle={{ fonwWeight: 'bold', fontSize: '22px' }}
        content={<CreateNewLockContent onSuccess={onSuccess} />}
      />
    </Container>
  );
};

export default LockPanel;
