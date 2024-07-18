import Big from 'big.js';
import { ethers } from 'ethers';
import { useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';
import { ENTER_QUEUE_ABI } from '@/views/lrts/config/abi/frax';

type Record = {
  amount: number;
  token0: any;
  token1: any;
  txId?: string;
  startTime: string;
  status: 'In Progress' | 'Claimable';
  data: any;
};


interface ITransaction {
    chain: string;
    transactionHash: string;
    blockNumber: number;
    transactionTimestamp: string;
    contractAddress: string;
    transactionType: string;
    logIndex: number;
    nftTokenId: number;
    amount: number;
    callerAddress: string;
    ownerAddress: string;
    receiverAddress: string;
  }
  
  interface ITicket {
    chain: string;
    contractAddress: string;
    nftTokenId: number;
    createdAt: string;
    maturesAt: string;
    redeemedAt: string | null;
    amountIn: number;
    fee: number;
    penalty: number;
    amountOut: number;
    callerAddress: string;
    ownerAddress: string;
    receiverAddress: string | null;
    amountE18: string;
    transactions: ITransaction[];
  }
  
  interface IUserRedeemTicketsResponse {
    userAddress: string;
    tickets: ITicket[] | null;
  }
  
// spender 地址
const FraxEtherRedemptionQueue_ADDR = '0x82bA8da44Cd5261762e629dd5c605b17715727bd'

export default function useFraxRequests() {
  const { provider, account, chainId } = useAccount();
  const [requests, setRequests] = useState<Record[]>([]);
  const [loading, setLoading] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const toast = useToast();
  const { addAction } = useAddAction('lrts');


  // get redeem tickets
  const getList = async (): Promise<IUserRedeemTicketsResponse | []> => {
    const url = `https://api.frax.finance/v2/frxeth/user/${account}/frxeth-redemptions?chain=ethereum`;
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      const currentTime = new Date(); // 获取当前时间

      if (data?.tickets.length > 0) {
        const _list: any = data?.tickets.map((item: any) => {
          const isMatured = new Date(item.maturesAt) <= currentTime;

          return {
            amount: Big(item.amountIn).div(1e18).toString(),
            startTime: item.createdAt,
            status: isMatured ? 'Claimable' : 'In Progress',
          };
        });
        setRequests(_list);
      }
      return data as IUserRedeemTicketsResponse;
    } catch (error) {
      console.error('Error fetching redeem tickets:', error);
      return [];
    } finally {
        setLoading(false);
    }
  };

  // claims
  const claims = async (nftId: string, recipient: string) => {
    setClaiming(true);
    const toastId = toast.loading({ title: 'Confirming...' });
    try {
      const redemptionQueueContract = new ethers.Contract(FraxEtherRedemptionQueue_ADDR, ENTER_QUEUE_ABI, provider.getSigner());
      const tx = await redemptionQueueContract.burnRedemptionTicketNft(nftId, recipient);
      const { transactionHash } = await tx.wait();
      toast.dismiss(toastId);
      toast.success({ title: `Claim successfully!`, tx: transactionHash, chainId });
    } catch (error) {
        toast.fail({ title: `Claim faily!` });
    } finally {
        setClaiming(false);
    }
  }



  return {
    requests,
    loading,
    claiming,
    getList,
    claims,
  };
}
