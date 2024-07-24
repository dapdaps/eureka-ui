import { useEffect, useState } from 'react';

import { ethereum } from '@/config/tokens/ethereum';
import useTokensBalance from '@/hooks/useTokensBalance';
import useKarakBalance from '../components/modal/stake/hooks/useKarakBalance';
import LSTS_DATA from '../config/data';

const useAllTokensBalance = (updater?: number) => {
  const [allTokens, setAllTokens] = useState<any[]>([]);
  const [balances, setBalances] = useState<any>({});
  const { balances: karakBalances } = useKarakBalance(1);

  useEffect(() => {
    const lstTokens = LSTS_DATA.map((item) => item.token);

    const lrTokens = LSTS_DATA.map((item) => item.lrtTokens)
      .flat()
      .filter((item) => {
        return !['kmETH', 'krETH', 'ksfrxETH'].includes(item.token.symbol);
      })
      .map((item) => item.token);

    const allTokens = [ethereum.eth, ...lstTokens, ...lrTokens];
    setAllTokens(allTokens);
  }, [updater]);

  const { loading, balances: tokenBalances } = useTokensBalance(allTokens);

  useEffect(() => {
    if (!Object.keys(karakBalances).length || !Object.keys(tokenBalances).length) return;
    setBalances({ ...karakBalances, ...tokenBalances });
  }, [karakBalances, tokenBalances]);

  return { loading, balances };
};

export default useAllTokensBalance;
