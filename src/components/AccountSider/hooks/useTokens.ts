import { useMemo } from 'react';
import config from '@/config/uniswap';
import useTokensBalance from '@/views/Uniswap/hooks/useTokensBalance';

export default function () {
  const { balances, loading } = useTokensBalance(config.tokens, 1);

  const tokens = useMemo<any[]>(() => {
    if (Object.keys(balances).length !== Object.values(config.tokens).length) return [];
    const _tokens = Object.values(config.tokens || {}).map((token) => ({ ...token, balance: balances[token.address] }));
    _tokens.sort((a, b) => Number(b.balance) - Number(a.balance));
    return _tokens;
  }, [balances]);

  return { loading, tokens };
}
