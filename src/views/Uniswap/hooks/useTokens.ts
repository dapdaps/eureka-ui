import { useState, useEffect } from 'react';
import config from '@/config/uniswap/linea';
import { Token } from '@/types';

export default function useTokens() {
  const [tokens, setTokens] = useState<{ [key: string]: Token }>({});

  const getTokens = (): { [key: string]: Token } => {
    let _importTokens = {};
    try {
      _importTokens = JSON.parse(window.localStorage.getItem('importTokens') || '{}');
    } catch (err) {}
    setTokens({ ...config.tokens, ..._importTokens });
    return { ...config.tokens, ..._importTokens };
  };
  const importToken = (token: { address: string }) => {
    let _importTokens = {} as { [key: string]: object };
    try {
      _importTokens = JSON.parse(window.localStorage.getItem('importTokens') || '{}');
    } catch (err) {}
    _importTokens[token.address] = token;
    window.localStorage.setItem('importTokens', JSON.stringify(_importTokens));
    setTokens({ ...config.tokens, ..._importTokens });
  };

  useEffect(() => {
    getTokens();
  }, []);

  return { tokens, getTokens, importToken };
}
