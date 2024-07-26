import { ethers } from 'ethers';
import { useState } from 'react';

import { ethereum } from '@/config/tokens/ethereum';
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

const dappName: string = "Frax Finance"
export default function useFraxRequests() {
  const { provider, account, chainId } = useAccount();

  const [requests, setRequests] = useState<Record[]>([]);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const toast = useToast();
  const { addAction } = useAddAction('lrts');


  // get redeem tickets
  const queryRequests = async (): Promise<IUserRedeemTicketsResponse | []> => {

    if (!account) return [];

    const address = ethers.utils.getAddress(account);

    const url = `https://api.frax.finance/v2/frxeth/user/${address}/frxeth-redemptions?chain=ethereum`;
    try {
      setRequestsLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      const currentTime = new Date(); // 获取当前时间

      if (data?.tickets.length > 0) {
        const _list = data?.tickets.map((item: ITicket) => {
          const isMatured = new Date(item.maturesAt) <= currentTime;

          return {
            amount: item.amountIn,
            startTime: item.createdAt,
            status: isMatured ? 'Claimable' : 'In Progress',
            token0: ethereum.eth,
            token1: ethereum.frxETH,
          };
        });
        setRequests(_list);
      }
      return data as IUserRedeemTicketsResponse;
    } catch (error) {
      console.error('Error fetching redeem tickets:', error);
      return [];
    } finally {
      setRequestsLoading(false);
    }
  };


  // claims
  const claim = async (request: ITicket, recipient: string) => {
    setClaiming(true);
    const toastId = toast.loading({ title: 'Confirming...' });
    const nftId = request?.transactions[0]?.nftTokenId || ''
    if (!nftId) return toast.fail({ title: `Claim data is Empty!` });
    try {
      const redemptionQueueContract = new ethers.Contract(FraxEtherRedemptionQueue_ADDR, ENTER_QUEUE_ABI, provider.getSigner());
      const tx = await redemptionQueueContract.burnRedemptionTicketNft(nftId, recipient);
      const { transactionHash } = await tx.wait();
      toast.dismiss(toastId);
      toast.success({ title: `Claim successfully!`, tx: transactionHash, chainId });
      // addAction({
      //   type: 'Staking',
      //   action: 'claim',
      //   amount: record.amount,
      //   template: dappName,
      //   status,
      //   transactionHash,
      //   add: 0,
      //   extra_data: JSON.stringify({
      //     action: 'claim',
      //     token0: record.token0.symbol,
      //     token1: record.token1.symbol,
      //   }),
      // });
      queryRequests()
    } catch (error) {
      toast.fail({ title: `Claim faily!` });
    } finally {
      setClaiming(false);
    }
  }

  return {
    requests,
    requestsLoading,
    claiming,
    queryRequests,
    claim,
  };
}
