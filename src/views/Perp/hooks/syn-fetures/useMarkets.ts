import { useState } from 'react';
export default function useMarkets() {
  const [loading, setLoading] = useState(false);
  const [markets, setMarkets] = useState<any>([{
    amm: "0xeb9e8822142fc10c38faab7bb6c635d22eb20ff8-4294967295",
    token0: "WETH",
    token1: "USDB",
    decimals0: 18,
    decimals1: 18,
  }])
  const addresses = {
    "WETH": 
  }

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