import { providers, utils } from 'ethers';
import { useCallback, useEffect, useState } from 'react';

import chains from '@/config/chains';
import multicallAddresses from '@/config/contract/multicall';
import useAccount from '@/hooks/useAccount';
import { multicall } from '@/utils/multicall';

export default function useTokensBalance(tokens: any) {
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState<any>({});
  const { account, provider: walletProvider } = useAccount();

  const queryBalance = useCallback(async () => {
    if (!account || !tokens.length) return;
    const chainId = tokens[0].chainId;
    const _provider =
      chainId && chains[chainId] ? new providers.JsonRpcProvider(chains[chainId].rpcUrls[0]) : walletProvider;
    try {
      setLoading(true);
      let hasNative = false;
      const tokensAddress = tokens.filter((token: any) => {
        if (token.address === 'native') hasNative = true;
        return token.address !== 'native';
      });
      const calls = tokensAddress.map((token: any) => ({
        address: token.address,
        name: 'balanceOf',
        params: [account]
      }));

      const multicallAddress = multicallAddresses[chainId];
      const requests = [
        multicall({
          abi: [
            {
              inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
              name: 'balanceOf',
              outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
              stateMutability: 'view',
              type: 'function'
            }
          ],
          options: {},
          calls,
          multicallAddress,
          provider: _provider
        })
      ];

      if (hasNative) requests.push(_provider.getBalance(account));

      const [results, nativeBalance] = await Promise.all(requests);

      const _balance: any = {};
      if (hasNative && nativeBalance) _balance.native = utils.formatUnits(nativeBalance, 18);

      for (let i = 0; i < results.length; i++) {
        const token = tokensAddress[i];
        _balance[token.address] = utils.formatUnits(results[i]?.[0] || 0, token.decimals);
      }
      setBalances(_balance);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [tokens, account]);

  useEffect(() => {
    queryBalance();
  }, [tokens, account]);

  return { loading, balances, queryBalance };
}
