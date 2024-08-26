import Big from 'big.js';
import { Contract, utils } from 'ethers';
import { useEffect, useMemo, useState } from 'react';

import useAccount from '@/hooks/useAccount';
import useConnectWallet from '@/hooks/useConnectWallet';
import useSwitchChain from '@/hooks/useSwitchChain';
import useToast from '@/hooks/useToast';

export default function useOpenInWallet(order: any, tokens: any, onSuccess: any) {
  const { account, chainId, provider } = useAccount();
  const { onConnect } = useConnectWallet();
  const { switchChain } = useSwitchChain();
  const [process, setProcess] = useState(false);
  const toast = useToast();

  const token = useMemo(
    () => (order.direction === 'from' ? tokens[order.inSymbol] : tokens[order.outSymbol]),
    [order, tokens],
  );

  const handleInWallet = async () => {
    const _chainId = token.chain;
    setProcess(true);
    if (!account) {
      onConnect();
      return;
    }
    if (_chainId !== chainId) {
      switchChain({ chainId: `0x${Number(_chainId).toString(16)}` });
      return;
    }
    const signer = await provider.getSigner(account);
    let tx = null;
    // for native token
    if (!token.address) {
      const balance = await provider.getBalance(account);
      const amount = new Big(order.direction === 'from' ? order.inAmount : order.outAmount).mul(10 ** 18);
      if (amount.plus(0.0001).gt(balance)) {
        setProcess(false);
        toast.fail({ title: `Insufficient ${token.displayName} Balance` });
        return;
      }
      tx = await signer.sendTransaction({
        to: order.senderAddress,
        value: amount.toFixed(0),
      });
    } else {
      const TokenContract = new Contract(
        token.address,
        [
          {
            inputs: [],
            name: 'decimals',
            outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
            stateMutability: 'view',
            type: 'function',
          },
          {
            inputs: [
              { internalType: 'address', name: 'to', type: 'address' },
              { internalType: 'uint256', name: 'amount', type: 'uint256' },
            ],
            name: 'transfer',
            outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
            stateMutability: 'nonpayable',
            type: 'function',
          },
          {
            inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
            name: 'balanceOf',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
          },
        ],
        signer,
      );
      const decimals = await TokenContract.decimals();
      const amount = new Big(order.direction === 'from' ? order.inAmount : order.outAmount).mul(10 ** decimals);
      const balance = await TokenContract.balanceOf(account);
      if (amount.gt(balance)) {
        setProcess(false);
        toast.fail({ title: `Insufficient ${token.displayName} Balance` });
        return;
      }
      tx = await TokenContract.transfer(order.senderAddress, amount.toFixed(0));
    }
    const res = await tx.wait();
    if (res.status === 1) {
      toast.success({ title: 'Send successfully' });
      onSuccess();
    } else {
      toast.fail({ title: 'Send failed' });
    }
  };

  useEffect(() => {
    if (process) handleInWallet();
  }, [account, chainId]);

  return { showButton: token.chain, handleInWallet };
}
