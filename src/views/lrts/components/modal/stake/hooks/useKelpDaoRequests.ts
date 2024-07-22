import multicallAddresses from '@/config/contract/multicall';
import { ethereum } from '@/config/tokens/ethereum';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';
import { useCompletedRequestMappingStore } from '@/stores/lrts';
import { multicall } from '@/utils/multicall';
import abi from '@/views/lrts/config/abi/kelp-dao';
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

const UNSTAKE_ADDRESS = "0x62De59c08eB5dAE4b7E6F7a8cAd3006d6965ec16"
const LRT_DEPOSIT_POOL = "0x036676389e48133B63a802f8635AD39E752D375D"
const {
  UNSTAKE_ADDRESS_ABI,
  LRT_DEPOSIT_POOL_ABI,
  FIRST_TOKEN_ABI,
  SECOND_TOKEN_ABI,
} = abi

const dappName: string = "KelpDao"
export default function useInceptionRequests() {
  const { account, chainId, provider } = useAccount();
  const completedRequestMappingStore: any = useCompletedRequestMappingStore()
  const [requests, setRequests] = useState<Record[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { addAction } = useAddAction('lrts');

  const token0 = ethereum['stETH']
  const token1 = ethereum['rsETH']

  const queryRequests = useCallback(
    async (asset?: any) => {
      if (!chainId) return;
      setLoading(true);
      try {
        const _asset = asset ? asset : "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84"
        const contract = new ethers.Contract(UNSTAKE_ADDRESS, UNSTAKE_ADDRESS_ABI, provider)
        const noncesResult = await contract.userAssociatedNonces(_asset, account)
        const nextNonceResult = await contract.nextLockedNonce(_asset)
        const delayBlocksResult = await contract.withdrawalDelayBlocks()

        const blockNumber = await provider.getBlockNumber()
        const _begin: any = ethers.utils.formatUnits(noncesResult[0], 0)
        const _end: any = ethers.utils.formatUnits(noncesResult[1], 0)
        const multicallAddress = multicallAddresses[chainId]
        const calls = []
        for (let i = _begin; i < _end; i++) {
          calls.push({
            address: UNSTAKE_ADDRESS,
            name: 'getUserWithdrawalRequest',
            params: [_asset, account, i],
          })
        }
        console.log('===calls', calls)

        console.log('=multicallAddress', multicallAddress)
        console.log('=UNSTAKE_ADDRESS_ABI', UNSTAKE_ADDRESS_ABI)
        const requestResult = await multicall({
          abi: UNSTAKE_ADDRESS_ABI,
          options: {},
          calls,
          multicallAddress,
          provider,
        });
        console.log('===blockNumber', blockNumber)
        console.log('===requestResult', requestResult)
        setRequests(requestResult.map((request: any, index: number) => {
          return {
            amount: ethers.utils.formatUnits(request?.rsETHAmount, 18),
            token0,
            token1,
            status: Big(blockNumber).gt(Big(request.withdrawalStartBlock).plus(delayBlocksResult)) && Big(request.userNonce).lt(nextNonceResult) ? 'Claimable' : 'In Progress',
            data: {
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

  const handleCompleted = function (record: Record) {
    const completedRequestMapping = completedRequestMappingStore.completedRequestMapping
    const completedRequests = completedRequestMapping[dappName] || []
    completedRequests.push(record)
    completedRequestMapping[dappName] = completedRequests
    completedRequestMappingStore.set({ completedRequestMapping })
  }
  const claim = useCallback(
    async (record: any, onLoading: any) => {
      if (!chainId) return;
      const contract = new ethers.Contract(UNSTAKE_ADDRESS, UNSTAKE_ADDRESS_ABI, provider?.getSigner())
      onLoading(true);
      let toastId = toast.loading({ title: 'Confirming...' });
      try {
        const tx = await contract.completeWithdrawal();
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
          // amount: record.amount,
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
