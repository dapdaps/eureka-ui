import { useContext, useMemo } from 'react';
import config from '../config';
import { LiquidityContext } from '../context';

export default function useDappConfig() {
  const { dapp } = useContext(LiquidityContext);
  return useMemo(() => {
    if (!dapp) return {};
    return config[dapp] ? config[dapp] : {};
  }, [dapp]);
}
