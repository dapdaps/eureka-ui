import multicallAddresses from '@/config/contract/multicall';
import { ethereum } from '@/config/tokens/ethereum';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';
import { multicall } from '@/utils/multicall';
import abi from '@/views/lrts/config/abi/mantle';
import Big from 'big.js';
import { ethers } from 'ethers';
import { useCallback, useState } from 'react';
type Record = {
  amount: number;
  token0: any;
  token1: any;
  txId?: string;
  startTime: string;
  status: 'In Progress' | 'Claimable';
  data: any;
};

const LSP_STAKING = "0xe3cBd06D7dadB3F4e6557bAb7EdD924CD1489E8f"
const {
  LSP_STAKING_ABI
} = abi

export default function useMantleRequests() {
  const { account, chainId, provider } = useAccount();
  const [requests, setRequests] = useState<Record[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { addAction } = useAddAction('lrts');

  const token0 = ethereum['eth']
  const token1 = ethereum['mETH']

  const queryRequests = useCallback(
    async () => {
      if (!chainId) return;
      setLoading(true);
      try {
        const response = await fetch('https://lsd-indexer.mantle.xyz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: "\n  query unclaimedRequests($address: String!) {\n    unstakeRequests(where: { requester: $address, isClaimed: false }) {\n      id\n      requestedAt\n      ethAmountWei\n      mEthLockedWei\n    }\n  }\n",
            variables: {
              address: account?.toLocaleLowerCase()
            }
          })
        })
        const result = await response.json()
        console.log('===response', response, '===result', result)

        const _requests = result?.data?.unstakeRequests

        const multicallAddress = multicallAddresses[chainId];
        const calls = _requests.map((request: any) => {
          return {
            address: "0xe3cBd06D7dadB3F4e6557bAb7EdD924CD1489E8f",
            name: 'unstakeRequestInfo',
            params: [request.id],
          };
        });
        console.log('=calls', calls)


        const unstakeRequestInfoResult = await multicall({
          abi: LSP_STAKING_ABI,
          options: {},
          calls,
          multicallAddress,
          provider,
        });

        console.log('==unstakeRequestInfoResult', unstakeRequestInfoResult)
        setRequests(result?.data?.unstakeRequests.map((request: any, index: number) => {
          const unstakeRequestInfo = unstakeRequestInfoResult[index]
          return {
            amount: ethers.utils.formatUnits(request?.mEthLockedWei, 18),
            startTime: request.requestedAt,
            token0,
            token1,
            status: unstakeRequestInfo[0] && Big(unstakeRequestInfo[1]).gt(0) ? 'Claimable' : 'In Progress',
            data: {
              requestId: request.id
            },
          }
        }));
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
      if (!chainId) return;
      const contract = new ethers.Contract(LSP_STAKING, LSP_STAKING_ABI, provider?.getSigner())
      onLoading(true);
      let toastId = toast.loading({ title: 'Confirming...' });
      try {
        const tx = await contract.claimUnstakeRequest(record?.data?.requestId);
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
          template: 'Lido',
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
