import { Contract, providers, utils } from 'ethers';
import { useEffect, useState } from 'react';

import chains from '@/config/chains';
import type { Token } from '@/types';

import useAccount from './useAccount';

const rpcs: any = {
  11155111: 'https://ethereum-sepolia-rpc.publicnode.com',
  421614: 'https://endpoints.omniatech.io/v1/arbitrum/sepolia/public'
};

export default function useTokenBalance({
  currency,
  updater,
  isNative,
  isPure
}: {
  currency?: Token;
  updater?: number;
  isNative?: boolean;
  isPure?: boolean;
}) {
  const [balance, setBalance] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const { account, chainId } = useAccount();
  useEffect(() => {
    if (!currency && !isNative) {
      return;
    }

    const _chainId = currency?.chainId || chainId;

    if (!_chainId || !chains || (!chains[_chainId] && !rpcs[_chainId])) {
      console.error('Invalid _chainId or chains is undefined');
      return;
    }

    // const rpcUrl = _chainId ? chains[_chainId].rpcUrls[0] : '';
    const rpcUrl = chainId ? (rpcs[_chainId] ? rpcs[_chainId] : chains[_chainId]?.rpcUrls[0]) : '';

    console.log('rpcUrl:', rpcUrl);

    const getBalance = async () => {
      if (!currency || !rpcUrl || !account || !currency.address) return;
      setLoading(true);
      try {
        const provider = new providers.JsonRpcProvider(rpcUrl);
        const TokenContract = new Contract(
          currency.address,
          [
            {
              constant: true,
              inputs: [
                {
                  name: '_owner',
                  type: 'address'
                }
              ],
              name: 'balanceOf',
              outputs: [
                {
                  name: 'balance',
                  type: 'uint256'
                }
              ],
              payable: false,
              stateMutability: 'view',
              type: 'function'
            }
          ],
          provider
        );
        const res = await TokenContract.balanceOf(account);
        setBalance(isPure ? res.toString() : utils.formatUnits(res.toString(), currency.decimals).toString());
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    const getNativeBalance = async () => {
      if (!rpcUrl || !account) return;
      setLoading(true);
      setBalance('0');
      try {
        const provider = new providers.JsonRpcProvider(rpcUrl);
        const amount = await provider.getBalance(account);
        setBalance(isPure ? amount.toString() : utils.formatUnits(amount.toString(), currency?.decimals).toString());
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    if (!!(currency?.address || currency?.isNative || isNative) && account) {
      currency?.address && !currency?.isNative ? getBalance() : getNativeBalance();
    }
  }, [currency, account, updater, chainId]);

  return { balance, loading };
}
