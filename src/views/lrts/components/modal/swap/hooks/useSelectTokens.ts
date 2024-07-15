import { useMemo } from 'react';
import { ethereum } from '@/config/tokens/ethereum';
import { tokens } from '../config';

export default function useSelectTokens(token: any) {
  return useMemo(() => {
    const filteredTokens = Object.values(tokens).filter(
      (item) => (token.isLST ? item.isLST : !item.isLST) && token.key !== item.key,
    );
    return filteredTokens.map((item) => {
      const _token = ethereum[item.key];
      return { ..._token, tokenIcon: _token.icon, ...item };
    });
  }, [token]);
}
