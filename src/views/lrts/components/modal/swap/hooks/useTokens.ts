import { ethereum } from '@/config/tokens/ethereum';
import { tokens } from '../config';
import { useEffect, useMemo, useState } from 'react';

export default function useTokens(token0?: string) {
  const [outputCurrency, setOutputCurrency] = useState<any>();

  const inputCurrency = useMemo(() => {
    if (!token0) return null;
    const _token0 = ethereum[token0] || ethereum[token0.toLowerCase()];
    if (!_token0) return null;
    return { ..._token0, tokenIcon: _token0.icon, ...tokens[token0] };
  }, [token0]);

  useEffect(() => {
    if (!inputCurrency) return;
    const token1 = inputCurrency.isLST
      ? inputCurrency.key === 'rEth'
        ? 'stEth'
        : 'rEth'
      : inputCurrency.key === 'inmEth'
        ? 'mmEth'
        : 'inmEth';
    const _token1 = ethereum[token1] || ethereum[token1.toLowerCase()];
    if (!_token1) return;
    setOutputCurrency({ ..._token1, tokenIcon: _token1.icon, ...tokens[token1] });
  }, [inputCurrency]);

  return {
    inputCurrency,
    outputCurrency,
    setOutputCurrency,
  };
}
