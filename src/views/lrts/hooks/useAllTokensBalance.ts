import { useEffect, useState } from 'react';

import useTokensBalance from '@/hooks/useTokensBalance';

import LSTS_DATA from '../config/data';

const useAllTokensBalance = () => {
  const [allTokens, setAllTokens] = useState<any[]>([]);
  useEffect(() => {
    const lstTokens = LSTS_DATA.map((item) => item.token);
    const lrTokens = LSTS_DATA.map((item) => item.lrtTokens)
      .flat()
      .map((item) => item.token);

    const allTokens = [...lstTokens, ...lrTokens];
    setAllTokens(allTokens);
  }, []);

  const { loading, balances } = useTokensBalance(allTokens);

  return { loading, balances };
};

export default useAllTokensBalance;
