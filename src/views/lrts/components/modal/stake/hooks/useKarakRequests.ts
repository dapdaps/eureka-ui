import { ethereum } from '@/config/tokens/ethereum';
import { useCallback, useState } from 'react';
import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import useAddAction from '@/hooks/useAddAction';
import { multicall } from '@/utils/multicall';
import multicallAddresses from '@/config/contract/multicall';
import Big from 'big.js';
import { ethers } from 'ethers';
import abi from '../../../../config/abi/karak';

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
    Vault: '0x46c64C1630f320b890d765E7C6F901574924b0C7',
    DelegationSupervisor: '0xAfa904152E04aBFf56701223118Be2832A4449E0',
  },
};

const tokens: { [key: string]: any } = {
  [ethereum.kmETH.address]: {
    to: ethereum.mETH,
    from: ethereum.kmETH,
  },
  [ethereum.ksfrxETH.address]: {
    to: ethereum.sfrxETH,
    from: ethereum.ksfrxETH,
  },
  [ethereum.krETH.address]: {
    to: ethereum.rETH,
    from: ethereum.krETH,
  },
};

export default function useKarakRequests() {
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
        const Contract = new ethers.Contract(contracts[chainId].DelegationSupervisor, abi, provider?.getSigner());
        const result = await Contract.fetchQueuedWithdrawals(account);
        const calls = result.map((quest: any) => ({
          address: contracts[chainId].Vault,
          name: 'convertToAssets',
          params: [quest.request.shares[0]],
        }));
        const multicallAddress = multicallAddresses[chainId];
        const assetsResult = await multicall({
          abi,
          options: {},
          calls,
          multicallAddress,
          provider,
        });

        if (!assetsResult) throw Error('');

        const _list = assetsResult.map((asset: any, i: number) => {
          const request = result[i];
          const token0Address = request.request[0][0].toLowerCase();
          const startTime = Number(request.start) * 1000;
          return {
            amount: Big(asset).div(1e18).toString(),
            startTime,
            token0: tokens[token0Address].from,
            token1: tokens[token0Address].to,
            status: startTime + 604800000 > Date.now() ? 'In Progress' : 'Claimable',
            data: request,
          };
        });

        setRequests(asset ? _list.filter((item: any) => item.token1.address === asset) : _list);

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
      onLoading(true);
      let toastId = toast.loading({ title: 'Confirming...' });
      try {
        const signer = provider?.getSigner(account);
        const Contract = new ethers.Contract(contracts[chainId].DelegationSupervisor, abi, signer);
        const tx = await Contract.finishWithdraw([record.data]);

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
          action: 'Claim',
          amount: record.amount,
          template: 'Karak',
          status,
          transactionHash,
          add: 0,
          extra_data: JSON.stringify({
            action: 'Claim',
            token0: record.token0.symbol,
            token1: record.token1.symbol,
          }),
        });
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
