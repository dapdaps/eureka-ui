import { useContext } from 'react';
import PoolContext from '@/contexts/requestModalContext';

export default function useRequestModal() {
  const poolContext = useContext(PoolContext);
  return poolContext;
}
