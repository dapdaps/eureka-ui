import { useCallback, useEffect, useMemo, useState } from 'react';
import useTokenBalance from '@/hooks/useTokenBalance';
import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { ethers } from 'ethers';
import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import useAddAction from '@/hooks/useAddAction';
import abi from '../../../../config/abi/renzo';

const contracts: Record<number, any> = {
  1: {
    stake: '0x74a09653A083691711cF8215a6ab074BB4e99ef5',
    unstake: '0x5efc9D10E42FB517456f4ac41EB5e2eBe42C8918',
    calculate: '0x5a12796f7e7EBbbc8a402667d266d2e65A814042',
  },
};

export default function useRenzo({ token0, token1, actionType, dapp }: any) {
  const { provider, account } = useAccount();
  const [inAmount, setInAmount] = useState('');
  const [outAmount, setOutAmount] = useState('');
  const [loading, setLoading] = useState(false);
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
    const StakeContract = new ethers.Contract(contracts[token0.chainId].stake, abi, provider?.getSigner());
    const tvls = await StakeContract.calculateTVLs();
    const CalculateContract = new ethers.Contract(contracts[token0.chainId].calculate, abi, provider?.getSigner());
    const tokenValue = await CalculateContract.lookupTokenValue(token0.address, _amount);
    const TokenContract = new ethers.Contract(token1.address, abi, provider?.getSigner());
    const totalSupply = await TokenContract.totalSupply();
    const result = await CalculateContract.calculateMintAmount(tvls[2], tokenValue, totalSupply);
    const mLRTAmountToMint = Big(result?.toString() || 0)
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

  const handleStake = async () => {
    let method = '';
    const isStake = ['stake', 'restake'].includes(actionType);
    if (token0.isNative) {
      method = isStake ? 'depositETH' : 'withdraw';
    } else {
      method = isStake ? 'deposit' : 'withdraw';
    }
    const Contract = new ethers.Contract(
      contracts[token0.chainId][isStake ? 'stake' : 'unstake'],
      abi,
      provider?.getSigner(),
    );
    if (!Contract) return;
    setLoading(true);
    let toastId = toast.loading({ title: 'Confirming...' });
    try {
      const amount = Big(inAmount).mul(1e18).toFixed(0);

      let params: any = [];
      let options: any = {};
      if (method === 'depositETH') {
        params = [];
        options = {
          value: amount,
        };
      }

      if (method === 'deposit') {
        params = [token0.address, amount];
      }

      if (method === 'withdraw') {
        params = [amount, token0.address];
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
  }, [account]);

  const spender = useMemo(
    () => contracts[token0.chainId][['stake', 'restake'].includes(actionType) ? 'stake' : 'unstake'],
    [actionType],
  );

  return {
    data,
    inAmount,
    outAmount,
    isLoading: loading,
    inToken,
    outToken,
    isInSufficient,
    spender,
    handleAmountChange,
    handleStake,
  };
}
