import { useEffect, useMemo } from 'react';

import useTokensBalance from '@/hooks/useTokensBalance';
import { useLrtDataStore } from '@/stores/lrts';

import LSTS_DATA from '../config/data';

const useAllTokensBalance = () => {
  const lrtsData = useLrtDataStore((store: any) => store.data);
  const setLrtDataStore = useLrtDataStore((store: any) => store.set);
  const lstTokens = useMemo(() => LSTS_DATA.map((item) => item.token), []);

  const { loading, balances } = useTokensBalance(lstTokens);

  //TODO
  //   const lrtTokens = LSTS_DATA.map((item) => item.lrtTokens)
  //     .flat()
  //     .map((item) => item.token);
  //   const allTokens = [...lstTokens, ...lrtTokens];

  useEffect(() => {
    const _data = [...lrtsData];
    _data.forEach((lst: any) => {
      lst.token.balance = balances[lst.token.address] || 0;
      if (Array.isArray(lst.lrtTokens)) {
        lst.lrtTokens.forEach((lrt: any) => {
          if (lrt.token) {
            lrt.token.balance = balances[lrt.token?.address] || 0;
          }
        });
      }
    });
    setLrtDataStore({
      data: _data,
    });
  }, [balances]);

  return { loading, balances };
};

export default useAllTokensBalance;
