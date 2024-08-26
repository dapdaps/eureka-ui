import { useContext } from 'react';

import { LiquidityContext } from '../context';

export default function useDappConfig() {
  const context = useContext(LiquidityContext);

  return context;
}
