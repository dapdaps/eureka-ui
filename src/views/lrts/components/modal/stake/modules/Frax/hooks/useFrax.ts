import Big from 'big.js';
import { ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import { ENTER_QUEUE_ABI, FRAX_REDEEM_ABI, FRAXETH_ABI } from '@/views/lrts/config/abi/frax';

import { useTabStore } from './useTab';

const sfrxETH_ADDR = '0xac3E018457B222d93114458476f3E3416Abbe38F';

// spender 地址
const FraxEtherRedemptionQueue_ADDR = '0x82bA8da44Cd5261762e629dd5c605b17715727bd'

const useFrax = ({ token0, token1 }: any) => {
  const toast = useToast();
  const [data, setData] = useState<any>(null);
  const [inAmount, setInAmount] = useState<number | string>('');
  const [outAmount, setOutAmount] = useState<number | string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [approved, setApproved] = useState(true);
  const [approving, setApproving] = useState(false);
  const [availableAmount, setAvailableAmount] = useState<any>();
  
  const { account, provider } = useAccount();
  const actionType = useTabStore(store => store.tab)

  
  const leastAmount = useMemo(() => (['stake', 'restake'].includes(actionType) ? 0.02 : 0.01), [actionType]);
  const inToken = useMemo(
    () => (['stake', 'restake'].includes(actionType) ? token0 : token1),
    [actionType, token0, token1],
  );
  const outToken = useMemo(
    () => (['stake', 'restake'].includes(actionType) ? token1 : token0),
    [actionType, token0, token1],
  );

  const queryAvailableAmount = async () => {
    const data = await provider.getBalance(account);
    setAvailableAmount(ethers.utils.formatEther(data))
  };


  // 获取列表
  const getUserRedeemTickets = async (userAddress: string) => {
    const url = `https://api.frax.finance/v2/frxeth/user/${userAddress}/frxeth-redemptions?chain=ethereum`;
    try {
      const response = await fetch(url);
      return response.json();
    } catch (error) {
      console.error('Error fetching redeem tickets:', error);
      return [];
    }
  }

  // claims
  const burnRedemptionTicketNft = async (nftId: string, recipient: string) => {
    try {
      const redemptionQueueContract = new ethers.Contract(FraxEtherRedemptionQueue_ADDR, ENTER_QUEUE_ABI, provider.getSigner());
      const tx = await redemptionQueueContract.burnRedemptionTicketNft(nftId, recipient);
      await tx.wait();
      console.log('ETH claimed successfully');
    } catch (error) {
      console.error('Error claiming ETH:', error);
    }
  }

  const isInSufficient = useMemo(() => {
    if (['stake', 'restake'].includes(actionType)) {
      return Number(inAmount) > Number(data?.availableAmount);
    } else {
      return Number(inAmount) > Number(data?.stakedAmount);
    }
  }, [data, inAmount, actionType]);


  console.log(token1.address, 'token1.address');
  
  const handleQueryData = useCallback(async () => {
    const handleQueryApy = async () => {
      const res = await fetch("https://api.frax.finance/v2/frxeth/summary/latest");
      return res.json();
    };
    const handleQueryAvailableAmount = async () => {
      return await provider.getBalance(account);
    };
    const handleQueryStakedAmount = async () => {
      const contract = new ethers.Contract(token1.address, FRAX_REDEEM_ABI, provider.getSigner());
      return await contract.balanceOf(account);
    };

    const apyResult = await handleQueryApy();
    const availableAmountResult = await handleQueryAvailableAmount();
    const stakedAmountResult = await handleQueryStakedAmount();
    console.log(apyResult, 'apyResult');
    
    setData({
      availableAmount: ethers.utils.formatUnits(availableAmountResult, 18),
      stakedAmount: ethers.utils.formatUnits(stakedAmountResult, 18),
      apy: Big(apyResult.sfrxethApr).toFixed(2),
      exchangeRate: 1
    });
  }, [provider, account, token1]);

  const handleApprove = async () => {
    const contract = new ethers.Contract(token1.address, FRAX_REDEEM_ABI, provider.getSigner());
    const wei = ethers.utils.parseUnits(Big(inAmount).toFixed(18), 18);
    const toastId = toast.loading({ title: `Approve ${inToken.symbol}` });
    setApproving(true);
    setIsLoading(true);
    try {
      const tx = await contract.approve(sfrxETH_ADDR, wei);
      await tx.wait();
      setApproved(true);
      setApproving(false);
      setIsLoading(false);
      toast.dismiss(toastId);
      toast.success({ title: "Approve Successfully!", text: `Approve ${inToken.symbol}`, tx: tx.hash });
    } catch (error) {
      setIsLoading(false);
      toast.dismiss(toastId);
      toast.fail({ title: "Approve Failed!" });
    }
  };

  
  const handleStake = async function () {
    setIsLoading(true)
    const contract = new ethers.Contract(sfrxETH_ADDR, FRAXETH_ABI, provider?.getSigner())
    const contractMethord = ['stake', 'restake'].includes(actionType) ?
    contract.deposit :
    contract.redeem

      const amount = Big(inAmount)
      .mul(1e18)
      .toFixed(0)

    const contractArguments = ['stake', 'restake'].includes(actionType) ?
      [amount, account] :
      [amount, account, account]

    try {

      handleApprove()

      const toastId = toast?.loading({
        title: ['stake', 'restake'].includes(actionType) ? `Staking...` : 'UnStaking...',
      });
      
      contractMethord(...contractArguments)
      .then((tx: any) => tx.wait())
      .then(() => {
        setIsLoading(false)
        handleQueryData()
        toast?.dismiss(toastId);
        toast?.success({
          title: ['stake', 'restake'].includes(actionType) ? "Stake Successfully!" : "UnStake Successfully",
        });
      })
      .catch(() => {
        setIsLoading(false)
        toast?.dismiss(toastId);
        toast?.fail({
          title: ['stake', 'restake'].includes(actionType) ? "Stake Failed!" : "UnStake Failed!",
        });
      })
    } catch (error) {
      console.log(error, "---error");
    }
  }


  const handleAmountChange = (amount: any) => {
    setInAmount(amount);
    setOutAmount(
      Big(amount || 0)
        .mul(0.99)
        .toFixed(4),
    );
  };



  useEffect(() => {
    queryAvailableAmount()
    handleQueryData()
  }, [provider])

  return {
    data,
    inAmount,
    outAmount,
    isLoading,
    approved,
    approving,
    leastAmount,
    availableAmount,
    inToken,
    outToken,
    toast,
    account, 
    provider,
    isInSufficient,
    handleApprove,
    handleAmountChange,
    handleStake,
    getUserRedeemTickets,
    burnRedemptionTicketNft,
  };
};

export default useFrax;
