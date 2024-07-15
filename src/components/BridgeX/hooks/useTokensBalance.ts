import { providers, utils } from 'ethers';
import { useCallback, useEffect, useRef, useState } from 'react';

import chains from '@/config/chains';
import multicallAddresses from '@/config/contract/multicall';
import useAccount from '@/hooks/useAccount';
import { multicall } from '@/utils/multicall';

const rpcs: any = {
  11155111: 'https://rpc2.sepolia.org',
  421614: 'https://public.stackup.sh/api/v1/node/arbitrum-sepolia',
};

export default function useTokensBalance(tokens: any) {
  console.log(3333, tokens);

  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState<any>({});
  const currentChainId = useRef<any>();
  const currentRpc = useRef<any>(0);
  const { account } = useAccount();

  const queryBalance = useCallback(async () => {
    console.log(666, account, tokens);

    if (!account || !tokens || !tokens.length) return;

    try {
      setLoading(true);
      const chainId = tokens[0].chainId;
      const rpcUrl = chainId ? (rpcs[chainId] ? rpcs[chainId] : chains[chainId]?.rpcUrls[currentRpc.current]) : '';
      currentChainId.current = chainId;
      setBalances({});
      if (!rpcUrl) {
        throw 'No rpcUrl';
      }
      const provider = new providers.JsonRpcProvider(rpcUrl);

      let hasNative = false;
      const tokensAddress = tokens.filter((token: any) => {
        if (token.isNative) hasNative = true;
        return !token.isNative && token.address;
      });

      const calls = tokensAddress.map((token: any) => ({
        address: token.address,
        name: 'balanceOf',
        params: [account],
      }));

      const multicallAddress = multicallAddresses[tokens[0].chainId];

      const requests = [
        multicall({
          abi: [
            {
              inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
              name: 'balanceOf',
              outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
              stateMutability: 'view',
              type: 'function',
            },
          ],
          options: {},
          calls,
          multicallAddress,
          provider,
        }),
      ];

      if (hasNative) requests.push(provider.getBalance(account));
      const [results, nativeBalance] = await Promise.all(requests);
      console.log(4444, results);

      const _balance: any = {};
      if (hasNative && nativeBalance) _balance.native = utils.formatUnits(nativeBalance, 18);

      for (let i = 0; i < results.length; i++) {
        const token = tokensAddress[i];
        _balance[token.address] = utils.formatUnits(results[i]?.[0] || 0, token.decimals);
      }

      if (tokens.length && tokens[0].chainId === currentChainId.current) {
        setBalances(_balance);
        setLoading(false);
      }
    } catch (err: any) {
      console.log(5555, err);

      console.log(err);
      if (currentRpc.current < 2) {
        currentRpc.current += 1;

        queryBalance();
      } else {
        setLoading(false);
        setBalances({});
      }
    }
  }, [tokens, account]);

  useEffect(() => {
    queryBalance();
  }, [tokens, account]);

  return { loading, balances, queryBalance, currentChainId: currentChainId.current };
}
