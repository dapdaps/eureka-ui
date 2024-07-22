import { useEffect, useState } from 'react';

import { ethereum } from '@/config/tokens/ethereum';
import useTokensBalance from '@/hooks/useTokensBalance';

import LSTS_DATA from '../config/data';

const useAllTokensBalance = (updater?: number) => {
  const [allTokens, setAllTokens] = useState<any[]>([]);

  useEffect(() => {
    const lstTokens = LSTS_DATA.map((item) => item.token);
    const lrTokens = LSTS_DATA.map((item) => item.lrtTokens)
      .flat()
      .map((item) => item.token);

    const allTokens = [ethereum.eth, ...lstTokens, ...lrTokens];
    setAllTokens(allTokens);
  }, [updater]);

  const { loading, balances } = useTokensBalance(allTokens);

  return { loading, balances };
};

export default useAllTokensBalance;
