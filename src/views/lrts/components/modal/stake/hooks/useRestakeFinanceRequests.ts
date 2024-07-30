import { ethers } from 'ethers';
import { useCallback, useState } from 'react';

import multicallAddresses from '@/config/contract/multicall';
import { ethereum } from '@/config/tokens/ethereum';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';
import { multicall } from '@/utils/multicall';
import abi from '@/views/lrts/config/abi/restake-finance';
import Big from 'big.js';
type Record = {
  amount: number;
  token0: any;
  token1: any;
  txId?: string;
  startTime: string;
  status: 'In Progress' | 'Claimable';
  data: any;
};

// const UNSTAKE_ADDRESS = "0x62De59c08eB5dAE4b7E6F7a8cAd3006d6965ec16"
// const LRT_DEPOSIT_POOL = "0x036676389e48133B63a802f8635AD39E752D375D"

const CONTRACT_ADDRESS_MAPPING: any = {
  stETH: '0xe384251B5f445A006519A2197bc6bD8E5fA228E5',
  mETH: '0x0448FddC3f4D666eC81DAc8172E60b8e5852386c',
  osETH: '0x357DEeD02020b73F8A124c4ea2bE3B6A725aaeC2',
  sfrxETH: '0xD7BC2FE1d0167BD2532587e991abE556E3a66f3b',
}
const {
  CONTRACT_ADDRESS_ABI,
  FIRST_TOKEN_ABI,
  SECOND_TOKEN_ABI
} = abi
const TOKENS_MAPPING = {
  [ethereum['stETH'].address]: [ethereum['mETH'], ethereum['rstETH']],
  [ethereum['mETH'].address]: [ethereum['mETH'], ethereum['rmETH']],
  [ethereum['sfrxETH'].address]: [ethereum['sfrxETH'], ethereum['rsfrxETH']],
}
const dappName: string = "RestakeFinance"
export default function useRestakeFinanceRequests(onClaimSuccess?: VoidFunction) {
  const { account, chainId, provider } = useAccount();
  const [requests, setRequests] = useState<Record[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { addAction } = useAddAction('lrts');

  const queryRequests = useCallback(
    async (asset?: any) => {
      if (!chainId) return;
      const tokens = asset ? [TOKENS_MAPPING[asset]] : Object.values(TOKENS_MAPPING)
      setLoading(true);
      try {
        const multicallAddress = multicallAddresses[chainId];
        const getLastRedeemableIdCalls = tokens.map(token => {
          return {
            address: CONTRACT_ADDRESS_MAPPING[token[0]?.symbol ?? "stETH" as string],
            name: 'getLastRedeemableId',
          }
        })
        const getLastRedeemableIdResult = await multicall({
          abi: CONTRACT_ADDRESS_ABI,
          options: {},
          calls: getLastRedeemableIdCalls,
          multicallAddress,
          provider,
        })
        const getAllQueuePositionsForAddressCalls = tokens.map(token => {
          return {
            address: CONTRACT_ADDRESS_MAPPING[token[0]?.symbol ?? "stETH" as string],
            name: 'getAllQueuePositionsForAddress',
            params: [account]
          }
        })
        const getAllQueuePositionsForAddressResult = await multicall({
          abi: CONTRACT_ADDRESS_ABI,
          options: {},
          calls: getAllQueuePositionsForAddressCalls,
          multicallAddress,
          provider,
        })

        if (!getLastRedeemableIdResult && !getAllQueuePositionsForAddressResult) throw Error('');
        const _requests: any = []
        tokens.forEach((token, index) => {
          const [token0, token1] = token
          const lastRedeemableId = getLastRedeemableIdResult[index][0]
          const allQueuePositionsForAddress = getAllQueuePositionsForAddressResult[index][0]
          allQueuePositionsForAddress.forEach((request: any) => {
            _requests.push({
              amount: ethers.utils.formatUnits(request?.currentValue, 18),
              token0,
              token1,
              status: Big(lastRedeemableId).gt(request.id) ? 'In Progress' : 'Claimable',
              data: {
                requestId: request.id,
              },
            })
          })
        })
        setRequests(_requests);
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
      const contract = new ethers.Contract(CONTRACT_ADDRESS_MAPPING[record?.token0.symbol ?? "stETH"], CONTRACT_ADDRESS_ABI, provider?.getSigner());
      onLoading(true);
      let toastId = toast.loading({ title: 'Confirming...' });
      try {
        const tx = await contract.redeemUnderlying(record?.data?.requestId);
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
