import { ethereum } from '@/config/tokens/ethereum';
import { tokens } from '../config';
import { useEffect, useMemo, useState } from 'react';

export default function useTokens(token0?: any) {
  const [outputCurrency, setOutputCurrency] = useState<any>();

  const inputCurrency = useMemo(() => {
    if (!token0) return null;
    return { ...token0, tokenIcon: token0.icon, ...tokens[token0.symbol] };
  }, [token0]);

  useEffect(() => {
    if (!inputCurrency) return;
    const token1 = inputCurrency.isLST
      ? inputCurrency.key === 'rETH'
        ? 'stETH'
        : 'rETH'
      : inputCurrency.key === 'inmETH'
        ? 'mmETH'
        : 'inmETH';
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
