import Big from 'big.js';
import { useCallback, useEffect, useState } from 'react';

export default function useChartData() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`
      https://api.thruster.finance/v2/indexer/v3-pool-ticks?pool=0xf00da13d2960cf113edcef6e3f30d92e52906537&tickLower=-887272&tickUpper=887272&chainId=81457`);

      const result = await response.json();
      // setData(
      //   result.map((item: any) => ({
      //     liquidityNet: new Big(item.liquidityNet).abs().toNumber(),
      //     price: 1.0001 ** item.tick,
      //   })),
      // );
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setData([]);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
}
