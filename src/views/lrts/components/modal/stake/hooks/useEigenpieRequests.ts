import { ethereum } from '@/config/tokens/ethereum';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';
import { useCompletedRequestMappingStore } from '@/stores/lrts';
import Big from 'big.js';
import { ethers } from 'ethers';
import { useCallback, useState } from 'react';
import abi from '../../../../config/abi/eigenpie';

type Record = {
  amount: number;
  token0: any;
  token1: any;
  txId?: string;
  startTime: string;
  status: 'In Progress' | 'Claimable';
  data: any;
};

const contracts: { [key: number]: any } = {
  1: {
    eigenStaking: '0x24db6717db1c75b9db6ea47164d8730b63875db7',
    withdrawManager: '0x98083e22d12497c1516d3c49e7cc6cd2cd9dcba4',
  },
};

const tokens: { [key: string]: any } = {
  [ethereum.stETH.address]: {
    from: ethereum.mstETH,
    to: ethereum.stETH,
  },
  [ethereum.mETH.address]: {
    from: ethereum.mmETH,
    to: ethereum.mETH,
  },
  [ethereum.sfrxETH.address]: {
    from: ethereum.msfrxETH,
    to: ethereum.sfrxETH,
  },
  [ethereum.rETH.address]: {
    from: ethereum.mrETH,
    to: ethereum.rETH,
  },
};
const dappName: string = "Eigenpie"
export default function useEigenpieRequests() {
  const { account, chainId, provider } = useAccount();
  const completedRequestMappingStore: any = useCompletedRequestMappingStore()
  const [requests, setRequests] = useState<Record[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { addAction } = useAddAction('lrts');

  const queryRequests = useCallback(
    async (asset?: any) => {
      if (!chainId || !contracts[chainId]) return;
      setLoading(true);

      try {
        const Contract = new ethers.Contract(contracts[chainId].withdrawManager, abi, provider?.getSigner());
        const _tokens = asset ? [asset] : Object.keys(tokens);
        const result = await Contract.getUserQueuedWithdraw(account, _tokens);
        if (!result) throw Error('');

        const _list: any = [];

        _tokens.forEach((token: any, i: number) => {
          const claimableAmount = result.claimableAmounts[i];
          const queuedAmount = result.queuedAmounts[i];
          if (claimableAmount && claimableAmount.gt(0)) {
            _list.push({
              amount: Big(claimableAmount).div(1e18).toString(),
              token0: tokens[token].from,
              token1: tokens[token].to,
              status: 'Claimable',
              data: {
                asset: token,
              },
            });
          }
          if (queuedAmount && queuedAmount.gt(0)) {
            _list.push({
              amount: Big(queuedAmount).div(1e18).toString(),
              token0: tokens[token].from,
              token1: tokens[token].to,
              status: 'In Progress',
              data: {
                asset: token,
              },
            });
          }
        });
        setRequests(_list);

        setLoading(false);
      } catch (err) {
        console.log('err', err);
        setLoading(false);
        setRequests([]);
      }
    },
    [account, chainId],
  );
  const handleCompleted = function (record: Record) {
    const completedRequestMapping = completedRequestMappingStore.completedRequestMapping
    const completedRequests = completedRequestMapping[dappName] || []
    completedRequests.push(record)
    completedRequestMapping[dappName] = completedRequests
    completedRequestMappingStore.set({ completedRequestMapping })
  }
  const claim = useCallback(
    async (record: any, onLoading: any) => {
      if (!chainId || !contracts[chainId]) return;
      onLoading(true);
      let toastId = toast.loading({ title: 'Confirming...' });
      try {
        const Contract = new ethers.Contract(contracts[chainId].withdrawManager, abi, provider?.getSigner());

        const tx = await Contract.userWithdrawAsset([record.data.asset]);
        toast.dismiss(toastId);
        toastId = toast.loading({ title: 'Pending...', tx: tx.hash, chainId });

        const { status, transactionHash } = await tx.wait();
        toast.dismiss(toastId);

        if (status === 1) {
          toast.success({ title: `Claim successfully!`, tx: transactionHash, chainId });
        } else {
          toast.fail({ title: `Claim faily!` });
        }
        addAction({
          type: 'Staking',
          action: 'claim',
          amount: record.amount,
          template: dappName,
          status,
          transactionHash,
          add: 0,
          extra_data: JSON.stringify({
            action: 'claim',
            token0: record.token0.symbol,
            token1: record.token1.symbol,
          }),
        });
        handleCompleted({
          ...record,
          status: 'completed'
        })
        onLoading(false);
      } catch (err: any) {
        console.log('err', err);
        toast.dismiss(toastId);
        toast.fail({
          title: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : `Claim faily!`,
        });
        onLoading(false);
      }
    },
    [account],
  );

  return {
    requests,
    loading,
    queryRequests,
    claim,
  };
}
