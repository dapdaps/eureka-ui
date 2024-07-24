import { useCallback, useEffect, useMemo, useState } from 'react';
import useTokenBalance from '@/hooks/useTokenBalance';
import Big from 'big.js';
import { ethers } from 'ethers';
import useAccount from '@/hooks/useAccount';
import useToast from '@/hooks/useToast';
import useAddAction from '@/hooks/useAddAction';
import abi from '../../../../config/abi/karak';

const contracts: Record<number, any> = {
  1: {
    Vault: '0x46c64C1630f320b890d765E7C6F901574924b0C7',
    VaultSupervisor: '0x54e44DbB92dBA848ACe27F44c0CB4268981eF1CC',
    DelegationSupervisor: '0xAfa904152E04aBFf56701223118Be2832A4449E0',
  },
};

export default function useKarak({ token0, token1, actionType, gem, dapp, onSuccess }: any) {
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
    const balance = ['stake', 'restake'].includes(actionType) ? tokenBalance : stakedAmount;
    return Big(inAmount || 0).gt(balance || 0);
  }, [inAmount]);

  const handleAmountChange = (amount: any) => {
    setInAmount(amount);
    setOutAmount(
      Big(amount || 0)
        .mul(0.99)
        .toFixed(4),
    );
  };

  const getStakedAmount = useCallback(async () => {
    const Contract = new ethers.Contract(contracts[token0.chainId].VaultSupervisor, abi, provider?.getSigner());
    const result = await Contract.getDeposits(account);

    setStakedAmount(
      Big(result.assets[0] || 0)
        .div(1e18)
        .toFixed(4),
    );
  }, [account]);

  const handleMax = function () {
    const _amount = ['stake', 'restake'].includes(actionType) ? tokenBalance ?? 0 : stakedAmount;
    handleAmountChange(_amount);
  };
  const handleStake = async () => {
    setLoading(true);
    let toastId = toast.loading({ title: 'Confirming...' });
    const method = ['stake', 'restake'].includes(actionType) ? 'deposit' : 'startWithdraw';
    try {
      const amount = Big(inAmount).mul(1e18).toFixed(0);
      const otherAmount = Big(outAmount).mul(0.99).mul(1e18).toFixed(0);
      const Contract = new ethers.Contract(
        contracts[token0.chainId][method === 'deposit' ? 'VaultSupervisor' : 'DelegationSupervisor'],
        abi,
        provider?.getSigner(),
      );

      let params: any = [];
      if (method === 'deposit') {
        params = [token1.address, amount, otherAmount];
      } else {
        const ValutContract = new ethers.Contract(contracts[token0.chainId].Vault, abi, provider?.getSigner());
        const shares = await ValutContract.convertToShares(amount);

        params = [
          [
            {
              vaults: [inToken.address],
              shares: [shares],
              withdrawer: account,
            },
          ],
        ];
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
    spender: token1.address,
    handleAmountChange,
    handleMax,
    handleStake,
  };
}
