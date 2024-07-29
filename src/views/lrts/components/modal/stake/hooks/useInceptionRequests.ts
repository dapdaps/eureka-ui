import Big from 'big.js';
import { ethers } from 'ethers';
import { useCallback, useState } from 'react';

import multicallAddresses from '@/config/contract/multicall';
import { ethereum } from '@/config/tokens/ethereum';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';
import { multicall } from '@/utils/multicall';

import abi from '../../../../config/abi/inception';
import { contracts } from './useInception';

type Record = {
  amount: number;
  token0: any;
  token1: any;
  txId?: string;
  startTime: string;
  status: 'In Progress' | 'Claimable';
  data: any;
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
const dappName: string = 'Inception';
export default function useInceptionRequests(onClaimSuccess?: VoidFunction) {
  const { account, chainId, provider } = useAccount();
  const [requests, setRequests] = useState<Record[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { addAction } = useAddAction('lrts');

  const queryRequests = useCallback(
    async (asset?: any) => {
      if (!chainId || !contracts[chainId]) return;
      setLoading(true);

      try {
        const multicallAddress = multicallAddresses[chainId];
        const _tokens = asset ? [tokens[asset]] : Object.values(tokens);
        const pendingCalls = _tokens.map((token: any) => {
          return {
            address: contracts[chainId].vault[token.to.symbol],
            name: 'getPendingWithdrawalOf',
            params: [account],
          };
        });

        const pendingResult = await multicall({
          abi,
          options: {},
          calls: pendingCalls,
          multicallAddress,
          provider,
        });

        const claimableCalls = _tokens.map((token: any) => ({
          address: contracts[chainId].vault[token.to.symbol],
          name: 'isAbleToRedeem',
          params: [account],
        }));
        const claimableResult = await multicall({
          abi,
          options: {},
          calls: claimableCalls,
          multicallAddress,
          provider,
        });

        if (!pendingResult && !claimableResult) throw Error('');

        const _list: any = [];

        _tokens.forEach((token: any, i: number) => {
          const claimableAmount = claimableResult[i]?.[1][0];
          const queuedAmount = pendingResult[i]?.[0];
          if (claimableAmount && claimableAmount.gt(0)) {
            _list.push({
              amount: Big(claimableAmount).div(1e18).toString(),
              token0: token.from,
              token1: token.to,
              status: 'Claimable',
              data: {
                asset: token,
              },
            });
          }
          if (queuedAmount && queuedAmount.gt(0)) {
            _list.push({
              amount: Big(queuedAmount).div(1e18).toString(),
              token0: token.from,
              token1: token.to,
              status: 'In Progress',
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

  const claim = useCallback(
    async (record: any, onLoading: any) => {
      if (!chainId || !contracts[chainId]) return;
      let method = '';
      let Contract = null;
      if (record.token0.isNative) {
        method = 'claimUnstake';
        Contract = new ethers.Contract(contracts[chainId].RestakingPool, abi, provider?.getSigner());
      } else {
        method = 'redeem';
        console.log('=contracts[chainId].vault[record.token1.symbol]', contracts[chainId].vault[record.token1.symbol])
        Contract = new ethers.Contract(contracts[chainId].vault[record.token1.symbol], abi, provider?.getSigner());
      }
      onLoading(true);
      let toastId = toast.loading({ title: 'Confirming...' });
      try {
        const tx = await Contract[method](account);

        toast.dismiss(toastId);
        toastId = toast.loading({ title: 'Pending...', tx: tx.hash, chainId });

        const { status, transactionHash } = await tx.wait();

        toast.dismiss(toastId);

        if (status === 1) {
          toast.success({ title: `Claim successfully!`, tx: transactionHash, chainId });
          onClaimSuccess?.();
        } else {
          toast.fail({ title: `Claim faily!` });
        }
        addAction({
          type: 'Staking',
          action: 'claim',
          token: [record?.token0?.symbol, record?.token1?.symbol],
          amount: record.amount,
          template: 'Inception',
          status,
          transactionHash,
          add: 0,
          extra_data: JSON.stringify({
            action: 'claim',
            token0: record.token0.symbol,
            token1: record.token1.symbol,
          }),
        });
        onLoading(false);
        queryRequests(record.token0.address);
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
