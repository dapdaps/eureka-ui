import { useEffect, useState } from 'react';

import { ethereum } from '@/config/tokens/ethereum';
import useAccount from '@/hooks/useAccount';
import useTokensBalance from '@/hooks/useTokensBalance';

import useKarakBalance from '../components/modal/stake/hooks/useKarakBalance';
import LSTS_DATA from '../config/data';

const useAllTokensBalance = (updater?: number) => {
  const [allTokens, setAllTokens] = useState<any[]>([]);
  const [balances, setBalances] = useState<any>({});
  const { balances: karakBalances } = useKarakBalance(1);

  const { chainId, account } = useAccount();

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
  }, [updater, account, chainId]);

  const { loading, balances: tokenBalances } = useTokensBalance(allTokens);

  useEffect(() => {
    setBalances({ ...(karakBalances || {}), ...(tokenBalances || {}) });
  }, [karakBalances, tokenBalances, account, chainId]);

  return { loading, balances };
};

export default useAllTokensBalance;
