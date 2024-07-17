import axios from 'axios';
import { ethereum } from '@/config/tokens/ethereum';
import { useCallback, useState } from 'react';
import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import useAddAction from '@/hooks/useAddAction';
import Big from 'big.js';
import { ethers } from 'ethers';
import abi from '../../../../config/abi/renzo';

type Record = {
  amount: number;
  token0: any;
  token1: any;
  txId?: string;
  startTime: string;
  status: 'In Progress' | 'Claimable';
  data: any;
};

const contracts: { [key: number]: string } = {
  1: '0x5efc9D10E42FB517456f4ac41EB5e2eBe42C8918',
};

export default function useRenzoRequests() {
  const { provider, account, chainId } = useAccount();
  const [requests, setRequests] = useState<Record[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { addAction } = useAddAction('lrts');

  const queryRequests = useCallback(async () => {
    if (!chainId || !contracts[chainId]) return;
    setLoading(true);
    try {
      const result = await axios.post(
        'https://api.goldsky.com/api/public/project_clsxzkxi8dh7o01zx5kyxdga4/subgraphs/renzo-mainnet/1.0.3/gn',
        {
          operationName: 'withdrawRequestsQuery',
          query:
            'query withdrawRequestsQuery($withdrawer: String!) {\n  withdrawRequests(\n    first: 1000\n    orderBy: createdAt\n    orderDirection: desc\n    where: { withdrawer: $withdrawer }\n  ) {\n    id\n    withdrawIndex\n    claimed\n    createdAt\n    amountToRedeem\n    amountEzETHToBurn\n    withdrawalAssetOut\n    queued\n    claimableAt\n  }\n}\n',
          variables: { withdrawer: account },
        },
      );
      const list = result.data?.data?.withdrawRequests;

      if (!list) throw Error('');

      const _list = list.map((item: any) => {
        const token1Address = item.withdrawalAssetOut;

        return {
          amount: Big(item.amountToRedeem).div(1e18).toString(),
          startTime: item.createdAt * 1000,
          status: item.queued ? 'In Progress' : 'Claimable',
          token0: ethereum.ezETH,
          token1: token1Address === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee' ? ethereum.eth : ethereum.stETH,
          data: {
            withdrawIndex: item.withdrawIndex,
          },
        };
      });

      setRequests(_list);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setRequests([]);
    }
  }, [account, chainId]);

  const claim = useCallback(
    async (record: any, onLoading: Function) => {
      if (!chainId || !contracts[chainId]) return;
      onLoading(true);
      let toastId = toast.loading({ title: 'Confirming...' });
      try {
        const signer = provider?.getSigner(account);
        const Contract = new ethers.Contract(contracts[1], abi, signer);
        const tx = await Contract.claim(record.data.withdrawIndex, account);

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
          template: 'Renzo',
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
    [account, chainId],
  );

  return {
    requests,
    loading,
    queryRequests,
    claim,
  };
}
