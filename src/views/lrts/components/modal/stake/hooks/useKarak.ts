import { useCallback, useEffect, useMemo, useState } from 'react';
import useTokenBalance from '@/hooks/useTokenBalance';
import Big from 'big.js';
import { ethers } from 'ethers';
import { multicall } from '@/utils/multicall';
import multicallAddresses from '@/config/contract/multicall';
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

export default function useKarak({ token0, token1, actionType }: any) {
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
        action: method,
        amount: inAmount,
        token: token0,
        template: 'LRTS',
        status,
        transactionHash,
        add: 0,
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
      const Contract = new ethers.Contract(contracts[token0.chainId].DelegationSupervisor, abi, provider?.getSigner());
      const result = await Contract.fetchQueuedWithdrawals(account);
      const calls = result.map((quest: any) => ({
        address: contracts[token0.chainId].Vault,
        name: 'convertToAssets',
        params: [quest.request.shares[0]],
      }));
      const multicallAddress = multicallAddresses[token0.chainId];
      const assetsResult = await multicall({
        abi,
        options: {},
        calls,
        multicallAddress,
        provider,
      });

      setRequests(
        assetsResult.map((asset: any, i: number) => {
          const request = result[i];
          return {
            request,
            asset: Big(asset).div(1e18).toFixed(3),
            symbol: token0.symbol,
            endTime: request + 7 * 24 * 60 * 60,
          };
        }),
      );
      setRequestsLoading(false);
    } catch (err) {
      console.log('err', err);
      setRequestsLoading(false);
    }
  }, [account, token0]);

  const handleWithdraw = useCallback(
    async (request: any) => {
      setLoading(true);
      let toastId = toast.loading({ title: 'Confirming...' });
      const method = 'finishWithdraw';
      try {
        const Contract = new ethers.Contract(
          contracts[token0.chainId].DelegationSupervisor,
          abi,
          provider?.getSigner(),
        );

        const tx = await Contract[method]([request]);

        toast.dismiss(toastId);
        toastId = toast.loading({ title: 'Pending...', tx: tx.hash, chainId: token0.chainId });

        const { status, transactionHash } = await tx.wait();
        setLoading(false);
        toast.dismiss(toastId);

        if (status === 1) {
          toast.success({ title: `${method} successfully!`, tx: transactionHash, chainId: token0.chainId });
          updateBalance();
        } else {
          toast.fail({ title: `${method} faily!` });
        }
        addAction({
          type: 'Staking',
          action: method,
          amount: inAmount,
          token: token0,
          template: 'LRTS',
          status,
          transactionHash,
          add: 0,
        });
        setLoading(false);
      } catch (err: any) {
        toast.dismiss(toastId);
        toast.fail({
          title: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : `${method} faily!`,
        });
        setLoading(false);
      }
    },
    [token0],
  );

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
    getWithdrawlRequests();
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
    requestLoading,
    requests,
    getWithdrawlRequests,
    handleAmountChange,
    handleStake,
    handleWithdraw,
  };
}
