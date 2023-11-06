import { useMemo } from 'react';
import useTokens from './useTokens';
import { getTokenAddress } from '../utils';

export default function useToken(address: string) {
  const { getTokens } = useTokens();

  return useMemo(() => {
    const tokens = getTokens();
    return tokens[getTokenAddress(address)];
  }, [address]);
}
