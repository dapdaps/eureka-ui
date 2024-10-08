import _ from 'lodash'
import { useEffect, useState } from 'react';

import { chains as configChains, tokens as configTokens } from '@/config/bridge';

import type { Chain, Token } from '../types';
import { getLifiChains, getLifiTokens } from './useLifi'

const nativeToken = _.groupBy(Object.values(configTokens), chain => chain.chainId)

export default function useTokensAndChains() {
  const [tokens, setTokens] = useState<{ [key: string]: Token }>(configTokens);
  const [chains, setChains] = useState<{ [key: number]: Chain }>(configChains);
  const [lifiTokens, setLifiTokens] = useState<{ [key: number]: Token[] }>({});

  useEffect(() => {
    const _chains: { [key: number]: Chain } = {};

    Object.values(configChains).forEach((chain) => {
      _chains[chain.chainId] = chain;
    });

    setChains(_chains);


    // getLifiChains().then((lifiChains) => {
    //   lifiChains.forEach(chain => {
    //     _chains[chain.chainId] = chain;
    //   })
    //   setChains(_chains);
    // })
  }, []);

  useEffect(() => {
    setTokens(configTokens);
  }, []);

  useEffect(() => {
    getLifiTokens().then((resLifiTokens) => {
      Object.assign(lifiTokens, nativeToken, resLifiTokens)
      setLifiTokens(lifiTokens);
    })
  }, []);

  return { tokens, chains, lifiTokens };
}
