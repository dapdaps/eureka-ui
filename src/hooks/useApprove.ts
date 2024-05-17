import Big from 'big.js';
import { Contract, providers, utils } from 'ethers';
import { useEffect, useState } from 'react';

import useAccount from './useAccount';
import useToast from './useToast';
import { useTransactionsStore } from '@/stores/transactions';

import type { Chain, Token } from '@/types';

const { JsonRpcProvider } = providers;

export default function useApprove({
  token,
  amount,
  chain,
  spender,
}: {
  token?: Token;
  amount?: string;
  chain?: Chain;
  spender?: string;
}) {
  const [approved, setApproved] = useState(false);
  const [approving, setApproving] = useState(false);
  const [checking, setChecking] = useState(false);
  const { account, provider } = useAccount();
  const toast = useToast();
  const addTransaction = useTransactionsStore((store: any) => store.addTransaction);

  const checkApproved = async () => {
    if (!token?.address || !amount || !spender) return;

    try {
      setChecking(true);
      const _provider = chain ? new JsonRpcProvider(chain?.rpcUrls[0]) : provider;

      const TokenContract = new Contract(
        token.address,
        [
          {
            inputs: [
              { internalType: 'address', name: '', type: 'address' },
              { internalType: 'address', name: '', type: 'address' },
            ],
            name: 'allowance',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        _provider,
      );
      const allowanceRes = await TokenContract.allowance(account, spender);
      const needApproved = new Big(utils.formatUnits(allowanceRes.toString(), token.decimals)).lt(amount);
      setApproved(!needApproved);
      setChecking(false);
    } catch (err) {
      setChecking(false);
    }
  };

  const approve = async () => {
    if (!token?.address || !amount || !provider || !spender) return;
    setApproving(true);
    try {
      const signer = provider.getSigner(account);
      const TokenContract = new Contract(
        token.address,
        [
          {
            inputs: [
              { internalType: 'address', name: 'spender', type: 'address' },
              { internalType: 'uint256', name: 'value', type: 'uint256' },
            ],
            name: 'approve',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
        ],
        signer,
      );
      const tx = await TokenContract.approve(spender, new Big(amount).mul(10 ** token.decimals).toFixed(0));
      const res = await tx.wait();
      if (res.status === 1) {
        setApproved(true);
        toast.success({
          title: 'Transaction Successful!',
          text: `Approved ${token.symbol}`,
        });
      } else {
        toast.fail({
          title: 'Transaction Failed!',
          text: `Approved ${token.symbol}`,
        });
      }
      setApproving(false);
      addTransaction({
        icons: [token.icon],
        failed: res.status !== 1,
        tx: tx.hash,
        handler: 'Approved',
        desc: token.symbol,
        time: Date.now(),
      });
    } catch (err: any) {
      if (err.code === 'ACTION_REJECTED') {
        toast.fail({
          title: 'Transaction Failed',
          text: `User rejected the request. Details: 
          MetaMask Tx Signature: User denied transaction signature. `,
        });
      }
      setApproving(false);
    }
  };

  useEffect(() => {
    if (token?.isNative || token?.address === 'native' || !amount) {
      setApproved(true);
      return;
    }
    if (token && amount && (chain || provider) && spender) checkApproved();
  }, [token, amount, chain, spender]);

  return { approved, approve, approving, checking };
}
