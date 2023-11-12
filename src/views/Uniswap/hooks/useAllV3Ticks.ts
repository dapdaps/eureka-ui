import { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request'

export default function useAllV3Ticks(poolAddress?: string) {
  const [ticks, setTicks] = useState([]);
  const url = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3?source=uniswap';
  const document = gql`
    query AllV3Ticks($poolAddress: String, $skip: Int!) {
      ticks(
        first: 1000
        skip: $skip
        where: {poolAddress: $poolAddress}
        orderBy: tickIdx
      ) {
        liquidityNet
        liquidityGross
        price0
        price1
        tickIdx
        tick: tickIdx
      }
    }
  `;
  useEffect(() => {
    queryTicks();
  }, [])
  async function queryTicks() {
    // Ethereum链上 ETH/DAI 池子的流动性
   const result = await request({
      url,
      document,
      variables: {
        poolAddress: poolAddress || '0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8',
        skip: 0
      }
    }) as any;
    setTicks(result?.ticks || [])
  }
  return ticks;
}
