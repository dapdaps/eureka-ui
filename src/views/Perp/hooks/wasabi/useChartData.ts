import { useState } from 'react';
export default function useChartData() {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<any>([])

  const queryChartData = async function (variables: any) {
    const response = await fetch("https://graph.defined.fi/graphql", {
      method: "POST",
      headers: {
        Authorization: "3548c26089e62641ab7973cc619cbdb5df65c464",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        variables,
        "operationName": "GetBars",
        "query": "query GetBars($symbol: String!, $from: Int!, $to: Int!, $resolution: String!, $currencyCode: String, $quoteToken: QuoteToken, $statsType: TokenPairStatisticsType, $removeLeadingNullValues: Boolean) {\n  getBars(\n    symbol: $symbol\n    from: $from\n    to: $to\n    resolution: $resolution\n    currencyCode: $currencyCode\n    quoteToken: $quoteToken\n    statsType: $statsType\n    removeLeadingNullValues: $removeLeadingNullValues\n  ) {\n    s\n    o\n    h\n    l\n    c\n    t\n    volume\n    volumeNativeToken\n    buys\n    buyers\n    buyVolume\n    sells\n    sellers\n    sellVolume\n    liquidity\n    traders\n    transactions\n    __typename\n  }\n}"
      })
    })
    const result = await response.json()
    const data = []
    const {
      h,
      l,
      t,
      o,
      c,
      volume
    } = result?.data?.getBars
    for (let i = 0; i < t.length; i++) {
      data.push({
        "high": h[i],
        "low": l[i],
        "open": o[i],
        "close": c[i],
        "time": t[i]
      })
    }
    setChartData(data)
  }

  return {
    loading,
    chartData,
    queryChartData
  }
}