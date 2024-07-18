import { useCallback, useEffect, useMemo, useState } from 'react';
import useTokenBalance from '@/hooks/useTokenBalance';
import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { ethers } from 'ethers';
import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import useAddAction from '@/hooks/useAddAction';
import abi from '../../../../config/abi/eigenpie';

const contracts: Record<number, any> = {
  1: {
    eigenStaking: '0x24db6717db1c75b9db6ea47164d8730b63875db7',
    withdrawManager: '0x98083e22d12497c1516d3c49e7cc6cd2cd9dcba4',
  },
};

export default function useEigenpie({ token0, token1, actionType, dapp }: any) {
  const { provider, account } = useAccount();
  const [inAmount, setInAmount] = useState('');
  const [outAmount, setOutAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [requestLoading, setRequestsLoading] = useState(false);
  const [requests, setRequests] = useState<any>();
  const [stakedAmount, setStakedAmount] = useState('');
  const toast = useToast();
  const { addAction } = useAddAction('lrts');

  const {
    tokenBalance,
    isLoading: balanceLoading,
    update: updateBalance,
  } = useTokenBalance(token0.address, token0.decimals);
  const [inToken, outToken] = useMemo(() => {
    return ['stake', 'restake'].includes(actionType) ? [token0, token1] : [token1, token0];
  }, [token0, token1, actionType]);

  const isInSufficient = useMemo(() => {
    const balance = ['stake', 'restake'].includes(actionType) ? tokenBalance : stakedAmount;
    return Big(inAmount || 0).gt(balance || 0);
  }, [inAmount]);

  const getOutAmount = async (amount: any) => {
    const _amount = Big(amount || 0)
      .mul(1e18)
      .toFixed(0);
    const Contract = new ethers.Contract(contracts[token0.chainId].eigenStaking, abi, provider?.getSigner());
    const result = await Contract.getMLRTAmountToMint(token0.address, _amount);
    const mLRTAmountToMint = Big(result.mLRTAmountToMint?.toString() || 0)
      .div(1e18)
      .toString();

    setOutAmount(
      ['stake', 'restake'].includes(actionType)
        ? mLRTAmountToMint
        : Big(amount).mul(amount).div(mLRTAmountToMint).toString(),
    );
  };

  const { run: runGetOutAmount } = useDebounceFn(
    (amount) => {
      getOutAmount(amount);
    },
    {
      wait: 500,
    },
  );

  const handleAmountChange = (amount: any) => {
    setInAmount(amount);
    if (Big(amount || 0).eq(0)) {
      setOutAmount('');
      return;
    }
    runGetOutAmount(amount);
  };

  const getStakedAmount = useCallback(async () => {
    const Contract = new ethers.Contract(
      token1.address,
      [
        {
          inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      provider?.getSigner(),
    );
    const result = await Contract.balanceOf(account);

    setStakedAmount(Big(result).div(1e18).toFixed(4));
  }, [account, actionType]);

  const handleMax = function () {
    const _amount = ['stake', 'restake'].includes(actionType) ? tokenBalance ?? 0 : stakedAmount
    handleAmountChange(_amount)
  };
  const handleStake = async () => {
    setLoading(true);
    let toastId = toast.loading({ title: 'Confirming...' });
    const method = ['stake', 'restake'].includes(actionType) ? 'depositAsset' : 'userQueuingForWithdraw';
    try {
      const amount = Big(inAmount).mul(1e18).toFixed(0);
      const otherAmount = Big(outAmount).mul(0.98).mul(1e18).toFixed(0);
      const Contract = new ethers.Contract(
        contracts[token0.chainId][method === 'depositAsset' ? 'eigenStaking' : 'withdrawManager'],
        abi,
        provider?.getSigner(),
      );

      let params: any = [];
      if (method === 'depositAsset') {
        params = [token0.address, amount, otherAmount, '0x0000000000000000000000000000000000000000'];
      } else {
        params = [token0.address, amount];
      }

      const tx = await Contract[method](...params);

      toast.dismiss(toastId);
      toastId = toast.loading({ title: 'Pending...', tx: tx.hash, chainId: token0.chainId });

      const { status, transactionHash, ...rest } = await tx.wait();
      setLoading(false);
      toast.dismiss(toastId);

      if (status === 1) {
        toast.success({ title: `${method} successfully!`, tx: transactionHash, chainId: token0.chainId });
        updateBalance();
        getStakedAmount();
      } else {
        toast.fail({ title: `${method} faily!` });
      }
      addAction({
        type: "Staking",
        action: actionType,
        token: [inToken.symbol, outToken.symbol],
        amount: inAmount,
        template: dapp.name,
        status,
        transactionHash,
        chain_id: token0.chainId,
        extra_data: JSON.stringify({
          fromTokenSymbol: inToken.symbol,
          fromTokenAmount: inAmount,
          toTokenSymol: outToken.symbol,
          toTokenAmount: outAmount,
        })
      })
      setLoading(false);
    } catch (err: any) {
      console.log('err', err);
      toast.dismiss(toastId);
      toast.fail({
        title: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : `${method} faily!`,
      });
      setLoading(false);
    }
  };
  const getWithdrawlRequests = useCallback(async () => {
    setRequestsLoading(true);

    try {
      const Contract = new ethers.Contract(contracts[token0.chainId].withdrawManager, abi, provider?.getSigner());
      const result = await Contract.getUserWithdrawalSchedules(account, [token0.address]);

      setRequests(
        result.queuedLstAmounts[0]?.map((amount: any, i: number) => {
          return {
            amount: Big(amount).div(1e18).toFixed(3),
            endTime: result.endTimes[0][i],
            symbol: token0.symbol,
          };
        }),
      );
      setRequestsLoading(false);
    } catch (err) {
      console.log('err', err);
      setRequestsLoading(false);
    }
  }, [account, token0]);

  const data = useMemo(
    () => ({
      availableAmount: tokenBalance || 0,
      stakedAmount: stakedAmount || 0,
      apy: 0,
      exchangeRate: 1,
    }),
    [tokenBalance, stakedAmount],
  );

  const spender = useMemo(
    () => contracts[token0.chainId][['stake', 'restake'].includes(actionType) ? 'eigenStaking' : 'withdrawManager'],
    [actionType],
  );

  useEffect(() => {
    if (!account) return;
    getStakedAmount();
  }, [account]);

  return {
    data,
    inAmount,
    outAmount,
    isLoading: loading,
    inToken,
    outToken,
    isInSufficient,
    spender,
    requestLoading,
    requests,
    getWithdrawlRequests,
    handleAmountChange,
    handleMax,
    handleStake,
  };
}
