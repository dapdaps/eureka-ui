import { useState } from 'react';

export default function useAddLiquidity() {
  const [token0, setToken0] = useState<any>();
  const [token1, setToken1] = useState<any>();
  const [detail, setDetail] = useState<any>();

  const onCleanAll = () => {
    setDetail(null);
    setToken0(null);
    setToken1(null);
  };
  const onSelectToken = (token: any, type: number) => {
    if (type === 0) {
      setToken0(token);
      if (token.address === token1?.address) {
        setToken1(null);
      }
    } else {
      setToken1(token);
      if (token.address === token0?.address) {
        setToken0(null);
      }
    }
  };

  return { token0, token1, detail, onCleanAll, onSelectToken };
}
