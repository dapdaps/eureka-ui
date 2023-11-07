import { useMemo } from 'react';
import useTokens from './useTokens';
import { getTokenAddress } from '../utils';

export default function useToken(address: string) {
  const { tokens } = useTokens();

  return useMemo(() => {
    return tokens[getTokenAddress(address)];
  }, [address]);
}
