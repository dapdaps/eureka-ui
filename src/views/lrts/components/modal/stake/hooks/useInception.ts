import { useCallback, useEffect, useMemo, useState } from 'react';
import useTokenBalance from '@/hooks/useTokenBalance';
import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { ethers } from 'ethers';
import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import useAddAction from '@/hooks/useAddAction';
import abi from '../../../../config/abi/inception';

export const contracts: Record<number, any> = {
  1: {
    RestakingPool: '0x46199cAa0e453971cedf97f926368d9E5415831a',
    vault: {
      stETH: '0x814CC6B8fd2555845541FB843f37418b05977d8d',
      mETH: '0xd0ee89d82183D7Ddaef14C6b4fC0AA742F426355',
      sfrxETH: '0x295234B7E370a5Db2D2447aCA83bc7448f151161',
      rETH: '0x1Aa53BC4Beb82aDf7f5EDEE9e3bBF3434aD59F12',
    },
  },
};

export default function useInception({ token0, token1, actionType, dapp }: any) {
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
    const vault = contracts[token0.chainId].vault[token0.symbol];
    const Contract = new ethers.Contract(vault, abi, provider?.getSigner());
    const result = await Contract.ratio();
    const ratio = Big(result?.toString() || 0)
      .div(1e18)
      .toString();

    setOutAmount(['stake', 'restake'].includes(actionType) ? ratio : Big(amount).mul(amount).div(ratio).toString());
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
    setInAmount(tokenBalance ?? 0);
  };
  const handleStake = async () => {
    let method = '';
    let Contract = null;
    const isStake = ['stake', 'restake'].includes(actionType);
    if (token0.isNative) {
      method = isStake ? 'stake' : 'unstake';
      Contract = new ethers.Contract(contracts[token0.chainId].RestakingPool, abi, provider?.getSigner());
    } else {
      method = isStake ? 'deposit' : 'withdraw';
      Contract = new ethers.Contract(contracts[token0.chainId].vault[token0.symbol], abi, provider?.getSigner());
    }
    if (!Contract) return;
    setLoading(true);
    let toastId = toast.loading({ title: 'Confirming...' });

    try {
      const amount = Big(inAmount).mul(1e18).toFixed(0);

      let params: any = [];
      let options: any = {};
      if (method === 'stake') {
        params = [];
        options = {
          value: amount,
        };
      }
      if (method === 'unstake') {
        params = [account, amount];
      }
      if (method === 'deposit') {
        params = [amount, account];
      }
      if (method === 'withdraw') {
        params = [amount, account];
      }

      const tx = await Contract[method](...params, options);

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
        type: 'Staking',
        action: actionType,
        amount: inAmount,
        template: dapp.name,
        token: inToken,
        status,
        transactionHash,
        add: 0,
        extra_data: JSON.stringify({
          action: actionType,
          amount0: inAmount,
          amount1: outAmount,
          token0: inToken.symbol,
          token1: outToken.symbol,
        }),
      });
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
      const Contract = new ethers.Contract(contracts[token0.chainId].RestakingPool, abi, provider?.getSigner());
      const result = await Contract.claimableOf(account);
      const claimable = Big(result).div(1e18).toFixed(4);
      const progress = Big(stakedAmount).minus(claimable).toFixed(4);
      setRequests([
        {
          amount: progress,
          endTime: 'In Progress',
          symbol: token0.symbol,
        },
        {
          amount: claimable,
          endTime: 'Claimable',
          symbol: token0.symbol,
        },
      ]);
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

  useEffect(() => {
    if (!account) return;
    getStakedAmount();
    // getWithdrawlRequests();
  }, [account]);

  return {
    data,
    inAmount,
    outAmount,
    isLoading: loading,
    inToken,
    outToken,
    isInSufficient,
    spender: contracts[token0.chainId].vault[token0.symbol],
    requestLoading,
    requests,
    getWithdrawlRequests,
    handleAmountChange,
    handleMax,
    handleStake,
  };
}
