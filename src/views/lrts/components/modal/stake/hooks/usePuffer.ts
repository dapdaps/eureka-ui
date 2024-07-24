import { useCallback, useEffect, useMemo, useState } from 'react';
import useTokenBalance from '@/hooks/useTokenBalance';
import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { ethers } from 'ethers';
import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import useAddAction from '@/hooks/useAddAction';
import abi from '../../../../config/abi/puffer';

const contracts: Record<number, any> = {
  1: {
    PufferVault: '0xD9A442856C234a39a81a089C06451EBAa4306a72',
    PufferDepositor: '0x4aA799C5dfc01ee7d790e3bf1a7C2257CE1DcefF',
  },
};

export default function usePuffer({ token0, token1, actionType, gem, dapp, onSuccess }: any) {
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
  } = useTokenBalance(token0.address, token1.decimals);
  const [inToken, outToken] = useMemo(() => {
    return ['stake', 'restake'].includes(actionType) ? [token0, token1] : [token1, token0];
  }, [token0, token1, actionType]);

  const isInSufficient = useMemo(() => {
    const balance = tokenBalance;
    return Big(inAmount || 0).gt(balance || 0);
  }, [inAmount]);

  const getOutAmount = async (amount: any) => {
    const _amount = Big(amount || 0)
      .mul(1e18)
      .toFixed(0);
    const Contract = new ethers.Contract(contracts[token0.chainId].PufferDepositor, abi, provider?.getSigner());
    const result = await Contract.convertToShares(_amount);
    const _amountOut = Big(result?.toString() || 0)
      .div(1e18)
      .toString();

    setOutAmount(_amountOut);
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

    setStakedAmount(Big(result).div(1e18).toString());
  }, [account]);

  const handleMax = function () {
    const _amount = ['stake', 'restake'].includes(actionType) ? tokenBalance ?? 0 : stakedAmount;
    handleAmountChange(_amount);
  };
  const handleStake = async () => {
    let method = '';
    if (token0.isNative) {
      method = 'depositETH';
    }
    if (token0.symbol === 'stETH') {
      method = 'depositStETH';
    }

    if (!method) return;

    setLoading(true);
    let toastId = toast.loading({ title: 'Confirming...' });

    try {
      const amount = Big(inAmount).mul(1e18).toFixed(0);
      const Contract = new ethers.Contract(
        contracts[token0.chainId][method === 'depositETH' ? 'PufferVault' : 'PufferDepositor'],
        abi,
        provider?.getSigner(),
      );

      let params: any = [];
      let options: any = {};
      if (method === 'depositETH') {
        params = [account];
        options = {
          value: amount,
        };
      }

      if (method === 'depositStETH') {
        const signer = provider?.getSigner(account);
        const TokenContract = new ethers.Contract(token0.address, abi, signer);
        const nonce = await TokenContract.nonces(account);
        const eip712Domain = await TokenContract.eip712Domain();
        console.log({
          nonce,
          eip712Domain,
        });
        const deadline = Math.floor(new Date().getTime() / 1000) + 3600;
        const signature = await signer._signTypedData(
          {
            name: eip712Domain.name,
            version: eip712Domain.version,
            chainId: eip712Domain.chainId,
            verifyingContract: eip712Domain.verifyingContract,
          },
          {
            Permit: [
              { name: 'owner', type: 'address' },
              { name: 'spender', type: 'address' },
              { name: 'value', type: 'uint256' },
              { name: 'nonce', type: 'uint256' },
              { name: 'deadline', type: 'uint256' },
            ],
          },
          {
            owner: account,
            spender: contracts[token0.chainId].PufferDepositor,
            value: amount,
            nonce,
            deadline,
          },
        );
        const { v, r, s } = ethers.utils.splitSignature(signature);

        params = [[deadline, amount, v, r, s], account];
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
        }),
      });
      setLoading(false);
      setInAmount('');
      onSuccess && onSuccess(actionType);
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

  return {
    data,
    inAmount,
    outAmount,
    isLoading: loading,
    inToken,
    outToken,
    isInSufficient,
    handleAmountChange,
    handleMax,
    handleStake,
  };
}
