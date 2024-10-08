import type { Token as LiFiToken, TokenAmount } from '@lifi/sdk';
import { useEffect, useState } from 'react';

import useAccount from '@/hooks/useAccount';

import { excludeChain } from '../config/chain'
import type { Token } from '../types';
import { getLifiTokens, lifi } from './useLifi';

export default function useTokenBalance({ tokensByChain }: { tokensByChain?: Token }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<string>('0');
  const { account } = useAccount();

  const getBalance = async function () {
    setLoading(true);
    setBalance('0');
    if (account && tokensByChain && tokensByChain.address) {
      if (excludeChain(tokensByChain.chainId)) {
        setLoading(false);
        setBalance('0');
        return;
      }

      const chainTokens = await getLifiTokens()
      let address = tokensByChain.address ? tokensByChain.address : '';
      if (tokensByChain.isNative) {
        const tokens: Token[] = chainTokens[tokensByChain.chainId] || [];
        const lifiTokens = tokens.filter((_token) => _token.symbol.toUpperCase() === tokensByChain.symbol.toUpperCase());
        if (lifiTokens && lifiTokens.length) {
          address = lifiTokens[0].address;
        }
      }

      const lifiToken: LiFiToken =  {
        symbol: tokensByChain.symbol,
        decimals: tokensByChain.decimals,
        name: tokensByChain.name ? tokensByChain.name : '',
        priceUSD: '',
        address,
        chainId: tokensByChain.chainId,
      };

      lifi
        .getTokenBalancesForChains(account, {
          [lifiToken.chainId]: [lifiToken],
        })
        .then((res) => {
          const vals: TokenAmount[] = res[tokensByChain.chainId];
          if (vals && vals.length) {
            const amount = vals[0].amount;
            setBalance(amount);
            setLoading(false);
          }
        })
        .catch((e) => {
          setLoading(false);
          setBalance('0');
        });
    } else {
      setLoading(false);
      setBalance('0');
    }
  }

  useEffect(() => {
    getBalance()
  }, [tokensByChain?.address, tokensByChain?.chainId])


  return { loading, balance, getBalance };
}

export interface balance {
  symbol: string;
  amount: string;
  address: string;
}

export function useTokensBalance({ tokensByChain }: { tokensByChain?: Token[] }) {
  const defaultVals: balance[] = [];
  const [loading, setLoading] = useState<boolean>(false);
  const [balances, setBalances] = useState<balance[]>(defaultVals);
  const { account } = useAccount();

  useEffect(() => {
    setLoading(true);
    setBalances(defaultVals);
    if (account && tokensByChain && tokensByChain.length) {
      const chainId = tokensByChain[0].chainId;

      if (excludeChain(chainId)) {
        setLoading(false);
        setBalances(defaultVals);
        return;
      }

      getLifiTokens().then((chainTokens) => {
        const lifiTokens: LiFiToken[] = tokensByChain.map((item) => {
          let address = item.address ? item.address : '';
          if (item.isNative) {
            const tokens: Token[] = chainTokens[item.chainId] || [];
            const lifiTokens = tokens.filter((_token) => _token.symbol.toUpperCase() === item.symbol.toUpperCase());
            if (lifiTokens && lifiTokens.length) {
              address = lifiTokens[0].address;
            }
          }

          return {
            symbol: item.symbol,
            decimals: item.decimals,
            name: item.name ? item.name : '',
            priceUSD: '',
            address,
            chainId: item.chainId,
          };
        });

        lifi
          .getTokenBalancesForChains(account, {
            [chainId]: lifiTokens,
          })
          .then((res) => {
            const vals: TokenAmount[] = res[chainId];
            const amountBigThan0 = vals.filter((token) => Number(token.amount) > 0);
            if (amountBigThan0 && amountBigThan0.length) {
              setBalances(
                amountBigThan0.map((token) => ({
                  symbol: token.symbol,
                  amount: token.amount,
                  address: token.address,
                })),
              );
            } else {
              setBalances(defaultVals);
            }
            setLoading(false);
          })
          .catch((e) => {
            setLoading(false);
            setBalances(defaultVals);
          });
      });
    } else {
      setLoading(false);
      setBalances(defaultVals);
    }
  }, [tokensByChain]);

  return { loading, balances };
}
