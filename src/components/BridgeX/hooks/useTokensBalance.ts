import { providers, utils } from 'ethers';
import { useCallback, useEffect, useRef, useState } from 'react';

import chains from '@/config/chains';
import multicallAddresses from '@/config/contract/multicall';
import useAccount from '@/hooks/useAccount';
import type { Token } from '@/types';
import { multicall } from '@/utils/multicall';

const rpcs: any = {
  11155111: 'https://rpc2.sepolia.org',
  421614: 'https://public.stackup.sh/api/v1/node/arbitrum-sepolia'
};

const chainsTokensBalance: any = {};

async function queryBalanceByRpc(rpcUrl: string, tokens: Token[], account: string) {
  const provider = new providers.JsonRpcProvider(rpcUrl);

  let hasNative = false;
  const tokensAddress = tokens.filter((token: any) => {
    if (token.isNative) hasNative = true;
    return !token.isNative && token.address;
  });

  const calls = tokensAddress.map((token: any) => ({
    address: token.address,
    name: 'balanceOf',
    params: [account]
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
          type: 'function'
        }
      ],
      options: {},
      calls,
      multicallAddress,
      provider
    })
  ];

  if (hasNative) requests.push(provider.getBalance(account));
  const [results, nativeBalance] = await Promise.all(requests);

  const _balance: any = {};
  if (hasNative && nativeBalance) _balance.native = utils.formatUnits(nativeBalance, 18);

  for (let i = 0; i < results.length; i++) {
    const token = tokensAddress[i];
    _balance[token.address] = utils.formatUnits(results[i]?.[0] || 0, token.decimals);
  }

  if (tokens.length) {
    chainsTokensBalance[account] = chainsTokensBalance[account] || {};
    chainsTokensBalance[account][tokens[0].chainId] = _balance;
    return _balance;
  }

  return null;
}

export function usePreloadBalance(chainWithTokens: any, account: string | undefined) {
  useEffect(() => {
    if (account) {
      Object.keys(chainWithTokens).forEach(async (chainId: any) => {
        const rpc = chains[chainId]?.rpcUrls[0];
        if (rpc) {
          // console.log(chainId, rpc)
          try {
            await queryBalanceByRpc(rpc, chainWithTokens[chainId], account);
          } catch (e) {}
        }

        // queryBalanceByRpc(rpc, chainWithTokens[chainId], account)
      });
    }
  }, [account]);
}

export default function useTokensBalance(tokens: any) {
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState<any>({});
  const currentChainId = useRef<any>();
  const currentRpc = useRef<any>(0);
  // const { account } = useAccount();
  const { account, provider, chainId } = useAccount();

  const queryBalance = useCallback(async () => {
    if (!account || !tokens || !tokens.length) return;

    try {
      const chainId = tokens[0].chainId;
      const rpcUrl = chainId ? (rpcs[chainId] ? rpcs[chainId] : chains[chainId]?.rpcUrls[currentRpc.current]) : '';
      currentChainId.current = chainId;
      let balanceCacheByChainId;
      if (chainsTokensBalance[account]) {
        balanceCacheByChainId = chainsTokensBalance[account][tokens[0].chainId];
      }
      if (balanceCacheByChainId) {
        setBalances(balanceCacheByChainId);
      } else {
        setLoading(true);
        setBalances({});
      }
      if (!rpcUrl) {
        throw 'No rpcUrl';
      }

      const _balance = await queryBalanceByRpc(rpcUrl, tokens, account);

      // const provider = new providers.JsonRpcProvider(rpcUrl);

      // let hasNative = false;
      // const tokensAddress = tokens.filter((token: any) => {
      //   if (token.isNative) hasNative = true;
      //   return !token.isNative && token.address;
      // });

      // const calls = tokensAddress.map((token: any) => ({
      //   address: token.address,
      //   name: 'balanceOf',
      //   params: [account],
      // }));

      // const multicallAddress = multicallAddresses[tokens[0].chainId];

      // const requests = [
      //   multicall({
      //     abi: [
      //       {
      //         inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
      //         name: 'balanceOf',
      //         outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
      //         stateMutability: 'view',
      //         type: 'function',
      //       },
      //     ],
      //     options: {},
      //     calls,
      //     multicallAddress,
      //     provider,
      //   }),
      // ];

      // if (hasNative) requests.push(provider.getBalance(account));
      // const [results, nativeBalance] = await Promise.all(requests);

      // const _balance: any = {};
      // if (hasNative && nativeBalance) _balance.native = utils.formatUnits(nativeBalance, 18);

      // for (let i = 0; i < results.length; i++) {
      //   const token = tokensAddress[i];
      //   _balance[token.address] = utils.formatUnits(results[i]?.[0] || 0, token.decimals);
      // }

      if (tokens[0].chainId === currentChainId.current && _balance) {
        setBalances(_balance);
        setLoading(false);
      }
    } catch (err: any) {
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

  return { loading, balances, queryBalance, chainsTokensBalance, currentChainId: currentChainId.current };
}
