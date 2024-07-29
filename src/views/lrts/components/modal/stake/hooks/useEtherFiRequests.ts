import { ethers } from 'ethers';
import { useCallback, useState } from 'react';

import { ethereum } from '@/config/tokens/ethereum';
import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';
import abi from '@/views/lrts/config/abi/ether-fi';
type Record = {
  amount: number;
  token0: any;
  token1: any;
  txId?: string;
  startTime: string;
  status: 'In Progress' | 'Claimable';
  data: any;
};

const WITHDRAW_REQUEST_NFT = '0x7d5706f6ef3F89B3951E23e557CDFBC3239D4E2c';
const UNSTAKE_ADDRESS = '0x62De59c08eB5dAE4b7E6F7a8cAd3006d6965ec16';
const STAKE_ADDRESS = '0x9FFDF407cDe9a93c47611799DA23924Af3EF764F';
const LIQUIDITY_POOL = '0x308861A430be4cce5502d0A12724771Fc6DaF216';
const {
  UNSTAKE_ADDRESS_ABI,
  STAKE_ADDRESS_ABI,
  LIQUIDITY_POOL_ABI,
  FIRST_TOKEN_ABI,
  SECOND_TOKEN_ABI,
  WITHDRAW_REQUEST_NFT_ABI,
} = abi;

const dappName: string = 'EtherFi';
export default function useMantleRequests(onClaimSuccess?: VoidFunction) {
  const { account, chainId, provider } = useAccount();
  const [requests, setRequests] = useState<Record[]>([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { addAction } = useAddAction('lrts');

  const token0 = ethereum['eth'];
  const token1 = ethereum['eETH'];

  const handleGetClaimableAmount = async function (tokenId: any) {
    const contract = new ethers.Contract(WITHDRAW_REQUEST_NFT, WITHDRAW_REQUEST_NFT_ABI, provider?.getSigner());

    try {
      return await contract.getClaimableAmount(tokenId);
    } catch (error) {
      return false;
    }
  };

  const queryRequests = useCallback(async () => {
    if (!chainId) return;
    setLoading(true);
    try {
      const query = `query MyQuery {
          withdrawRequestNFTs(where: {owner: "${account}"}) {
          amountOfEEth
          id
          owner
          isClaimed
          fee
          }
        }`;
      const response = await fetch(
        'https://ded76165a2fb6f7887260a3a0f626de7.thegraph.chainnodes.org/subgraphs/name/etherfi/etherfi-subgraph-v0-8-2',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
          }),
        },
      );
      const result = await response.json();
      const _requests = result?.data?.withdrawRequestNFTs.filter((nft: any) => !nft.isClaimed);
      console.log('=_requests', _requests);
      const promiseArray: any[] = [];
      _requests.forEach((request: any) => {
        promiseArray.push(handleGetClaimableAmount(request.id));
      });
      Promise.all(promiseArray).then((getClaimableAmountResults) => {
        setRequests(
          _requests.map((request: any, index: number) => {
            const getClaimableAmountResult = getClaimableAmountResults[index];
            return {
              amount: ethers.utils.formatUnits(request?.amountOfEEth, 18),
              token0,
              token1,
              status: getClaimableAmountResult ? 'Claimable' : 'In Progress',
              data: {
                requestId: request.id,
              },
            };
          }),
        );
        setLoading(false);
      });
    } catch (err) {
      console.log('err', err);
      setLoading(false);
      setRequests([]);
    }
  }, [account, chainId]);

  const claim = useCallback(
    async (record: any, onLoading: any) => {
      if (!chainId) return;
      const contract = new ethers.Contract(WITHDRAW_REQUEST_NFT, WITHDRAW_REQUEST_NFT_ABI, provider?.getSigner());
      onLoading(true);
      let toastId = toast.loading({ title: 'Confirming...' });
      try {
        const tx = await contract.claimWithdraw(record?.data?.requestId);
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
        queryRequests();
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
