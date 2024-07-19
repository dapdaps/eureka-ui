import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';

import { BALANCER_ABI, rETH_ABI, STAKE_ABI } from '../../../../config/abi/rooket-pool';

const RocketSwapRouter_ADDR = '0x16d5a408e807db8ef7c578279beeee6b228f1c1c';
const BalancerQueries_ADDR = '0xE39B5e3B6D74016b2F6A9673D7d7493B6DF549d5';
const RocketDepositPool_ADDR = '0xdd3f50f8a6cafbe9b31a427582963f465e745af8';

const useRocketPool = ({ actionType, token0, token1, provider, account, gem, dapp, onSuccess }: any) => {
  const toast = useToast();
  const { addAction } = useAddAction('lrts');
  const [data, setData] = useState<any>(null);
  const [inAmount, setInAmount] = useState<number | string>('');
  const [outAmount, setOutAmount] = useState<number | string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [approved, setApproved] = useState(true);
  const [approving, setApproving] = useState(false);

  const leastAmount = 0.01
  const inToken = useMemo(
    () => (['stake', 'restake'].includes(actionType) ? token0 : token1),
    [actionType, token0, token1],
  );
  const outToken = useMemo(
    () => (['stake', 'restake'].includes(actionType) ? token1 : token0),
    [actionType, token0, token1],
  );

  const isInSufficient = useMemo(() => {
    if (['stake', 'restake'].includes(actionType)) {
      return Number(inAmount) > Number(data?.availableAmount);
    } else {
      return Number(inAmount) > Number(data?.stakedAmount);
    }
  }, [data, inAmount, actionType]);

  const handleQueryData = useCallback(async () => {
    const handleQueryApy = async () => {
      const res = await fetch('https://stake.rocketpool.net/api/mainnet/payload');
      return res.json();
    };
    const handleQueryAvailableAmount = async () => {
      return await provider.getBalance(account);
    };
    const handleQueryStakedAmount = async () => {
      const contract = new ethers.Contract(token1.address, rETH_ABI, provider.getSigner());
      return await contract.balanceOf(account);
    };
    const handleQueryExchangeRate = async () => {
      const contract = new ethers.Contract(token1.address, rETH_ABI, provider.getSigner());
      return await contract.getExchangeRate();
    };

    const apyResult = await handleQueryApy();
    const availableAmountResult = await handleQueryAvailableAmount();
    const stakedAmountResult = await handleQueryStakedAmount();
    const exchangeRateResult = await handleQueryExchangeRate();

    setData({
      availableAmount: ethers.utils.formatUnits(availableAmountResult, 18),
      stakedAmount: ethers.utils.formatUnits(stakedAmountResult, 18),
      apy: Big(apyResult.rethAPR).toFixed(2),
      exchangeRate: Big(1).div(ethers.utils.formatUnits(exchangeRateResult, 18)).toFixed(4),
    });
  }, [provider, account, token1]);

  const handleCheckApproval = useCallback(
    async (amount: any) => {
      const contract = new ethers.Contract(token1.address, rETH_ABI, provider.getSigner());
      const wei = ethers.utils.parseUnits(Big(amount).toFixed(18), 18);
      const allowance = await contract.allowance(account, token1.address);
      setApproved(!new Big(allowance.toString()).lt(wei.toString()));
    },
    [provider, account, token1],
  );

  const handleApprove = useCallback(async () => {
    const contract = new ethers.Contract(token1.address, rETH_ABI, provider.getSigner());
    const wei = ethers.utils.parseUnits(Big(inAmount).toFixed(18), 18);
    const toastId = toast.loading({ title: `Approve ${inToken.symbol}` });
    setApproving(true);
    setIsLoading(true);
    try {
      const tx = await contract.approve(token1.address, wei);
      await tx.wait();
      setApproved(true);
      setApproving(false);
      setIsLoading(false);
      toast.dismiss(toastId);
      toast.success({ title: 'Approve Successfully!', text: `Approve ${inToken.symbol}`, tx: tx.hash });
    } catch (error) {
      setIsLoading(false);
      toast.dismiss(toastId);
      toast.fail({ title: 'Approve Failed!' });
    }
  }, [provider, token1, inToken, inAmount, toast]);

  const getOutAmount = async (amount: any) => {
    try {
      const wei = Big(amount).mul(1e18).toFixed(0);
      const contract = new ethers.Contract(token1.address, rETH_ABI, provider.getSigner());
      if (['stake', 'restake'].includes(actionType)) {
        const result = await contract.getRethValue(wei);
        setOutAmount(ethers.utils.formatUnits(result, 18));
      } else {
        const result = await contract.getEthValue(wei);
        setOutAmount(ethers.utils.formatUnits(result, 18));
        handleCheckApproval(ethers.utils.formatUnits(result, 18));
      }
    } catch (error) {
      console.error('error: ', error);
    }
  };

  const { run: runGetOutAmount } = useDebounceFn(
    (amount) => {
      getOutAmount(amount);
    },
    {
      wait: 500,
    },
  );

  const handleAmountChange = async (amount: any) => {
    setInAmount(amount);
    if (Big(amount || 0).eq(0)) {
      setOutAmount('');
      return;
    }
    runGetOutAmount(amount);
  };

  const handleBalancerQuery = async function () {
    const contract = new ethers.Contract(BalancerQueries_ADDR, BALANCER_ABI, provider?.getSigner());
    const singleSwap = {
      poolId: '0x1e19cf2d73a72ef1332c882f20534b6519be0276000200000000000000000112',
      kind: 0,
      assetIn: ethers.constants.AddressZero,
      assetOut: '0xae78736Cd615f374D3085123A210448E74Fc6393',
      amount: ethers.utils.parseEther(inAmount.toString()),
      userData: '0x',
    };
    const fundManagement = {
      sender: account,
      fromInternalBalance: false,
      recipient: RocketDepositPool_ADDR,
      toInternalBalance: false,
    };
    setIsLoading(true);
    const toastId = toast?.loading({
      title: 'Balancer Query...',
    });
    try {
      const result = await contract.callStatic.querySwap(singleSwap, fundManagement);
      return result;
    } catch (error) {
      toast?.fail({
        title: 'Balancer Query Failed!',
      });
      return null;
    } finally {
      toastId && toast?.dismiss(toastId);
      setIsLoading(false);
    }
  };

  const handleMax = function () {
    setInAmount(data?.availableAmount ?? 0)
    setOutAmount(data?.availableAmount ?? 0);
  }
  const handleStake = async function () {
    const balancerValue = await handleBalancerQuery();
    if (!balancerValue) return;
    setIsLoading(true);
    const amount = Big(inAmount).mul(1e18).toFixed(0);
    const stake_contract = new ethers.Contract(RocketSwapRouter_ADDR, STAKE_ABI, provider?.getSigner());


    const contract = new ethers.Contract(token1.address, rETH_ABI, provider.getSigner());
    const rethAmount = await contract.getRethValue(amount);


    const stake_contract_args = [
      0,
      10,
      Big(balancerValue).times(0.999).toFixed(0),
      Big(rethAmount).times(0.999).toFixed(0),
    ];

    const unstake_contract = new ethers.Contract(token1?.address, rETH_ABI, provider?.getSigner());

    const contractMethod = ['stake', 'restake'].includes(actionType) ? stake_contract.swapTo : unstake_contract.burn;

    const contractArguments = ['stake', 'restake'].includes(actionType) ? stake_contract_args : [amount];

    const toastId = toast?.loading({
      title: ['stake', 'restake'].includes(actionType) ? `Staking...` : 'UnStaking...',
    });

    try {
      const tx = await contractMethod(...contractArguments, {
        gasLimit: ethers.utils.hexlify(300000),
        value: amount
      })
      const { status, transactionHash, ...rest } = await tx.wait();
      await handleQueryData();
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
      setInAmount("")
      onSuccess && onSuccess(actionType)
    } catch (error) {
      toast?.fail({
        title: ['stake', 'restake'].includes(actionType) ? 'Stake Failed!' : 'UnStake Failed!',
      });
    } finally {
      setIsLoading(false);
      toast?.dismiss(toastId);
    }
  };

  useEffect(() => {
    if (provider) handleQueryData();
  }, [provider, handleQueryData]);

  return {
    data,
    inAmount,
    outAmount,
    isLoading,
    approved,
    approving,
    leastAmount,
    inToken,
    outToken,
    isInSufficient,
    handleApprove,
    handleAmountChange,
    handleMax,
    handleStake,
  };
};

export default useRocketPool;
