import { useEffect, useState } from 'react';
import config from '@/config/uniswap/linea';
import useAccount from '@/hooks/useAccount';

export default function useNetwork() {
  const { chainId } = useAccount();
  const [wrongNetwork, setWrongNetwork] = useState(false);

  useEffect(() => {
    setWrongNetwork(config.chainId !== chainId);
  }, [chainId]);
  return {
    wrongNetwork,
  };
}
