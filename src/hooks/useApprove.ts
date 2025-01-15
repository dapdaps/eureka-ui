import Big from 'big.js';
import { Contract, utils } from 'ethers';
import { useEffect, useState } from 'react';

import type { Token } from '@/types';

import useAccount from './useAccount';

export default function useApprove({
  token,
  amount,
  spender,
  onSuccess
}: {
  token?: Token;
  amount?: string;
  spender?: string;
  onSuccess?: VoidFunction;
}) {
  const [approved, setApproved] = useState(false);
  const [approving, setApproving] = useState(false);
  const [checking, setChecking] = useState(false);
  const { account, provider } = useAccount();

  const checkApproved = async () => {
    if (!token?.address || !amount || !spender || amount === '0') return;
    setChecking(true);
    try {
      const TokenContract = new Contract(
        token.address,
        [
          {
            inputs: [
              { internalType: 'address', name: '', type: 'address' },
              { internalType: 'address', name: '', type: 'address' }
            ],
            name: 'allowance',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function'
          }
        ],
        provider
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
    if (!token?.address || !amount || !spender) return;
    setApproving(true);
    try {
      const signer = provider.getSigner(account);
      const TokenContract = new Contract(
        token.address,
        [
          {
            inputs: [
              { internalType: 'address', name: 'spender', type: 'address' },
              { internalType: 'uint256', name: 'value', type: 'uint256' }
            ],
            name: 'approve',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'nonpayable',
            type: 'function'
          }
        ],
        signer
      );
      const gas = await TokenContract.estimateGas.approve(
        spender,
        new Big(amount).mul(10 ** token.decimals).toFixed(0)
      );

      const tx = await TokenContract.approve(spender, new Big(amount).mul(10 ** token.decimals).toFixed(0), {
        gasLimit: Big(gas.toString()).mul(1.2).toFixed(0)
      });
      const res = await tx.wait();
      setApproving(false);
      if (res.status === 1) {
        setApproved(true);
        onSuccess?.();
      }
    } catch (err) {
      console.log(err);
      setApproving(false);
    }
  };

  useEffect(() => {
    if ((token?.isNative && token.chainId !== 1088) || Big(amount || 0).eq(0)) {
      setApproved(true);
      return;
    }
    if (token && amount && spender) checkApproved();
  }, [token, amount, spender]);

  return { approved, approve, approving, checking };
}
