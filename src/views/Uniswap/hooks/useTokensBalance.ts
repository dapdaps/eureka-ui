import { useEffect, useState } from 'react';
import useAccount from '@/hooks/useAccount';
import { utils } from 'ethers';
import { multicallv3 } from '@/utils/multicall';
import erc20Abi from '@/config/abi/erc20';
import config from '@/config/uniswap/linea';

export default function useTokensBalance(tokens: any, updater: number) {
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState<any>({});
  const { account, provider } = useAccount();

  useEffect(() => {
    const getBalances = async () => {
      try {
        setLoading(true);
        let hasNative = false;
        const tokensAddress = Object.keys(tokens).filter((address) => {
          if (address === 'native') hasNative = true;
          return address !== 'native';
        });
        const tokenRequests = tokensAddress.map((address) => ({
          address: address,
          name: 'balanceOf',
          params: [account],
        }));
        const calls = [
          multicallv3({
            abi: erc20Abi,
            calls: tokenRequests,
            multiAddress: config.contracts.multiAddress,
            provider,
          }),
        ];
        if (hasNative) calls.push(provider.getBalance(account));
        const [results, nativeBalance] = await Promise.all(calls);
        const _balance: any = {};
        if (hasNative && nativeBalance) _balance.native = utils.formatUnits(nativeBalance, 18);
        for (let i = 0; i < results.length; i++) {
          const _address = tokenRequests[i].address;
          _balance[_address] = utils.formatUnits(results[i].balance, tokens[_address].decimals);
        }
        setBalances(_balance);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    if (account) getBalances();
  }, [tokens, account, provider, updater]);

  return { loading, balances };
}
