import { useContext } from 'react';
import PoolContext from '../context';

export default function useRequestModal() {
  const poolContext = useContext(PoolContext);
  return poolContext;
}
