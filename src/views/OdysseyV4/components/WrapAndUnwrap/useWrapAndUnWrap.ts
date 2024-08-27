import Big from 'big.js';
import { Contract } from 'ethers';
import { useCallback, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useAddAction from '@/hooks/useAddAction';
import useToast from '@/hooks/useToast';

export default function useWrapAndUnwrap(
  tab: string,
  amount: string,
  onSuccess: VoidFunction,
  onError: (text: string) => void,
) {
  const [loading, setLoading] = useState(false);
  const { provider, account, chainId } = useAccount();
  const toast = useToast();
  const { addAction } = useAddAction('dapp');

  const onWrapOrUnwrap = useCallback(async () => {
    setLoading(true);
    let toastId: any = null;
    try {
      const signer = provider.getSigner(account);
      const WethContract = new Contract(
        '0x4300000000000000000000000000000000000004',
        [
          {
            constant: false,
            inputs: [],
            name: 'deposit',
            outputs: [],
            payable: true,
            stateMutability: 'payable',
            type: 'function',
          },
          {
            constant: false,
            inputs: [{ internalType: 'uint256', name: 'wad', type: 'uint256' }],
            name: 'withdraw',
            outputs: [],
            payable: false,
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        signer,
      );
      const _amount = Big(amount).mul(1e18).toFixed(0);
      const method = tab === 'Wrap' ? 'deposit' : 'withdraw';
      const value = tab === 'Wrap' ? _amount : '0';
      const params = tab === 'Wrap' ? [] : [_amount];

      let estimateGas: any = 300000;

      try {
        estimateGas = await WethContract.estimateGas[method](...params, { value });
      } catch (err) {}

      const gasPrice = await provider.getGasPrice();
      const rawBalance = await provider.getBalance(account);
      if (Big(gasPrice).mul(estimateGas).add(value).gt(Big(rawBalance))) {
        onError('Gas not enough');
        setLoading(false);
        return;
      }
      toastId = toast.loading({ title: 'Confirming...' });

      const tx = await WethContract[method](...params, { value });

      toast.dismiss(toastId);
      toastId = toast.loading({ title: 'Pending...', tx: tx.hash, chainId });

      const { status, transactionHash } = await tx.wait();
      setLoading(false);
      toast.dismiss(toastId);

      if (status === 1) {
        toast.success({ title: `${tab} successfully!`, tx: transactionHash, chainId });
        onSuccess();
      } else {
        toast.fail({ title: `${tab} faily!` });
      }
      addAction({
        type: 'Swap',
        inputCurrencyAmount: amount,
        inputCurrency: tab === 'Wrap' ? { symbol: 'ETH' } : { symbol: 'WETH' },
        outputCurrencyAmount: amount,
        outputCurrency: tab !== 'Wrap' ? { symbol: 'ETH' } : { symbol: 'WETH' },
        template: 'Wrap and Unwrap',
        status,
        transactionHash,
        add: 0,
        token_in_currency: {
          address: tab === 'Wrap' ? 'native' : '0x4300000000000000000000000000000000000004',
          symbol: tab === 'Wrap' ? 'ETH' : 'WETH',
          decimals: 18,
        },
        token_out_currency: {
          address: tab === 'Wrap' ? '0x4300000000000000000000000000000000000004' : 'native',
          symbol: tab === 'Wrap' ? 'WETH' : 'ETH',
          decimals: 18,
        },
      });
    } catch (err: any) {
      toastId && toast.dismiss(toastId);
      setLoading(false);
      toast.fail({
        title: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : `${tab} faily!`,
      });
    }
  }, [tab, amount]);

  return { loading, onWrapOrUnwrap };
}
