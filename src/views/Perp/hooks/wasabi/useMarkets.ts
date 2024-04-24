import { useState } from 'react';
export default function useMarkets() {
  const [loading, setLoading] = useState(false);
  const [markets, setMarkets] = useState<any>([{
    poolAddress: "0x20fe91f17ec9080e3cac2d688b4ecb48c5ac3a9c",
    token0: "YES",
    token1: "ETH",
    decimals0: 18,
    decimals1: 18,
  }, {
    poolAddress: "0x4300000000000000000000000000000000000003",
    token0: "ETH",
    token1: "USDB",
    decimals0: 18,
    decimals1: 18,
  }, {
    poolAddress: "0x5ffd9EbD27f2fcAB044c0f0a26A45Cb62fa29c06",
    token0: "PAC",
    token1: "ETH",
    decimals0: 18,
    decimals1: 18,
  }, {
    poolAddress: "0x67fa2887914fa3729e9eed7630294fe124f417a0",
    token0: "YIELD",
    token1: "ETH",
    decimals0: 18,
    decimals1: 18,
  }, {
    poolAddress: "0x818a92bc81Aad0053d72ba753fb5Bc3d0C5C0923",
    token0: "JUICE",
    token1: "ETH",
    decimals0: 18,
    decimals1: 18,
  }, {
    poolAddress: "0x999f220296b5843b2909cc5f8b4204aaca5341d8",
    token0: "mwstETH-WPUNKS:40",
    token1: "ETH",
    decimals0: 18,
    decimals1: 18,
  }])

  const queryMarkets = async function () {
    const response = await fetch("https://backend-blast-perps.wasabi.xyz/api/tokens/list")
    const result = await response.json()
    setMarkets(markets.map((market: any) => {
      const index = result.items.findIndex((item: any) => item.token.address === market.poolAddress)
      market.data = result.items[index]
      return market
    }))
  }

  return {
    loading,
    markets,
    queryMarkets
  }
}