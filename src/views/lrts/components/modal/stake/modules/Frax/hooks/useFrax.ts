import Big from 'big.js';
import { ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ethereum } from '@/config/tokens/ethereum';

import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import { FRAX_REDEEM_ABI, FRAXETH_ABI, TOKEN_ABI } from '@/views/lrts/config/abi/frax';

import { ITab, useTabStore } from './useTab';
import useAddAction from '@/hooks/useAddAction';
export const sfrxETH_ADDR = '0xac3E018457B222d93114458476f3E3416Abbe38F';

const useFrax = ({ gem, dapp, token0, token1, onSuccess }: any) => {
  const { account, provider } = useAccount();
  const { addAction } = useAddAction('lrts');
  const toast = useToast();
  const [data, setData] = useState<any>(null);
  const [inAmount, setInAmount] = useState<number | string>('');
  const [outAmount, setOutAmount] = useState<number | string>('');
  const [tokenLoading, setTokenLoading] = useState(false);
  const [sfrxBalance, setSfrxBalance] = useState<any>()
  const [isLoading, setIsLoading] = useState(false);
  const [approved, setApproved] = useState(true);
  const [approving, setApproving] = useState(false);
  const [availableAmount, setAvailableAmount] = useState<any>();
  const [getAddrAvailableAmount, setGetAddrAvailableAmount] = useState<any>();
  const actionType = useTabStore(store => store.tab)

  const leastAmount = 0.0001;

  const inToken = useMemo(
    () => (['stake', 'restake'].includes(actionType) ? ethereum['frxETH'] : ethereum['sfrxETH']),
    [actionType],
  );
  const outToken = useMemo(
    () => (['stake', 'restake'].includes(actionType) ? ethereum['sfrxETH'] : ethereum['frxETH']),
    [actionType, token0, token1],
  );

  const queryAvailableAmount = async () => {
    const data = await provider.getBalance(account);
    setAvailableAmount(ethers.utils.formatEther(data))
  };

  const isInSufficient = useMemo(() => {
    const balance = ['stake', 'restake'].includes(actionType) ? data?.stakedAmount : sfrxBalance;
    return Big(inAmount || 0).gt(balance || 0);
  }, [data, inAmount, actionType]);


  const getBalance = async (address: string) => {
    if (!account) return;
    try {
      setTokenLoading(true)
      if (address === 'native') {
        const rawBalance = await provider.getBalance(account);
        setGetAddrAvailableAmount(ethers.utils.formatEther(rawBalance));
        return ethers.utils.formatEther(rawBalance)
      } else {
        const TokenContract = new ethers.Contract(address, TOKEN_ABI, provider.getSigner());
        const rawBalance = await TokenContract.balanceOf(account);
        setGetAddrAvailableAmount(ethers.utils.formatEther(rawBalance));
        return ethers.utils.formatEther(rawBalance)
      }
    } catch (error: any) {
      console.info('useTokenBalance_ERROR', error);
      return '0.0'

    } finally {
      setTokenLoading(false)
    }
  };

  const handleQueryData = async () => {
    // const handleQueryApy = async () => {
    //   const res = await fetch("https://api.frax.finance/v2/frxeth/summary/latest");
    //   return res.json();
    // };
    const handleQueryAvailableAmount = async () => {
      return await provider.getBalance(account);
    };
    const handleQueryStakedAmount = async () => {
      const address = [ITab.STAKE].includes(actionType) ? ethereum['frxETH'].address : sfrxETH_ADDR
      const contract = new ethers.Contract(address, FRAX_REDEEM_ABI, provider.getSigner());
      return await contract.balanceOf(account);
    };

    // const apyResult = await handleQueryApy();
    const availableAmountResult = await handleQueryAvailableAmount();
    const stakedAmountResult = await handleQueryStakedAmount();

    setData({
      availableAmount: ethers.utils.formatUnits(availableAmountResult, 18),
      stakedAmount: ethers.utils.formatUnits(stakedAmountResult, 18),
      apy: 0,
      exchangeRate: 1
    });
  }

  const handleApprove = async () => {
    if (!provider) return false;

    if (actionType === ITab.UNSTAKE) return true;

    const contract = new ethers.Contract(token1.address, FRAX_REDEEM_ABI, provider.getSigner());
    const wei = ethers.utils.parseUnits(Big(inAmount).toFixed(18), 18);
    const toastId = toast.loading({ title: `Approve ${inToken.symbol}` });
    setApproving(true);
    setIsLoading(true);
    try {
      const tx = await contract.approve(sfrxETH_ADDR, wei);
      await tx.wait();
      setApproved(true);
      toast.dismiss(toastId);
      toast.success({ title: "Approve Successfully!", text: `Approve ${inToken.symbol}`, tx: tx.hash });
      return true
    } catch (error) {
      toast.fail({ title: "Approve Failed!" });
      return false
    } finally {
      setIsLoading(false);
      toast.dismiss(toastId);
    }
  };


  const handleStake = async function () {
    if (!provider) return;
    if (!(await handleApprove())) return;
    setIsLoading(true);
    const contract = new ethers.Contract(sfrxETH_ADDR, FRAXETH_ABI, provider?.getSigner());
    const contractMethord = ['stake', 'restake'].includes(actionType) ? contract.deposit : contract.redeem;

    const amount = Big(inAmount).mul(1e18).toFixed(0);

    const contractArguments = ['stake', 'restake'].includes(actionType)
      ? [amount, account]
      : [amount, account, account];

    const toastId = toast?.loading({
      title: ['stake', 'restake'].includes(actionType) ? `Staking...` : 'UnStaking...',
    });

    try {
      const tx = await contractMethord(...contractArguments)
      const { status, transactionHash, ...rest } = await tx.wait()
      setIsLoading(false);
      handleQueryData();
      toast?.dismiss(toastId);
      toast?.success({
        title: ['stake', 'restake'].includes(actionType) ? 'Stake Successfully!' : 'UnStake Successfully',
      });

      addAction({
        type: "Staking",
        action: actionType,
        token: [inToken.symbol, outToken.symbol],
        amount: inAmount,
        template: gem ? gem?.dapp?.name : dapp.name,
        status,
        transactionHash,
        chain_id: token0.chainId,
        extra_data: JSON.stringify({
          action: actionType,
          fromTokenSymbol: inToken.symbol,
          fromTokenAmount: inAmount,
          toTokenSymol: outToken.symbol,
          toTokenAmount: outAmount,
        })
      })
      setInAmount('');
      onSuccess && onSuccess(actionType)
    } catch (error) {
      setIsLoading(false);
      toast?.dismiss(toastId);
      toast?.fail({
        title: ['stake', 'restake'].includes(actionType) ? 'Stake Failed!' : 'UnStake Failed!',
      });
    } finally {
      setIsLoading(false);
      toast?.dismiss(toastId);
    }
  };


  const handleAmountChange = (amount: any) => {
    setInAmount(amount);
    setOutAmount(
      Big(amount || 0)
        .mul(0.99)
        .toFixed(4),
    );
  };

  const handleMax = async function () {
    const token = actionType === ITab.STAKE ? data?.stakedAmount : sfrxBalance;
    setInAmount(token ?? 0);
  };

  useEffect(() => {
    if (!provider) return;
    getBalance(sfrxETH_ADDR).then((token) => setSfrxBalance(token))
  }, [provider, actionType])


  useEffect(() => {
    if (!account || !provider) return;
    queryAvailableAmount()
    handleQueryData()
  }, [account, provider, actionType])

  return {
    data,
    inAmount,
    setInAmount,
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
    tokenLoading,
    getAddrAvailableAmount,
    sfrxBalance,
    getBalance,
    handleMax,
    handleApprove,
    handleAmountChange,
    handleStake,
  };
};

export default useFrax;
