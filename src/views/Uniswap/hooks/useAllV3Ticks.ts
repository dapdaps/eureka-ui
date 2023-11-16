import { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request'

export default function useAllV3Ticks(poolAddress:string) {
  const [ticks, setTicks] = useState([]);
  const [loading, setLoading] = useState(true);
  // const url = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3?source=uniswap';
  // const url = 'https://graph-query.goerli.linea.build/subgraphs/name/dapdap/uniswap-v3-test';
  const url = 'https://graph-query.linea.build/subgraphs/name/dapdap/uniswap-v3-prd';
  // const testAddress = '0xc2e9f25be6257c210d7adf0d4cd6e3e881ba25f8'; // Ethereum链上 ETH/DAI 池子的流动性
  // const testAddress = '0x001d6f0c1a963796236ca2a361ea4b0b5393c7b9'; // Linea 链上 testnet
  // const testAddress = '0xc81e0a3210da57d48fa8e69f317cd72070ac0372'; // Linea 链上 mainnet
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
    if (poolAddress) {
      queryTicks();
    }
  }, [poolAddress])
  async function queryTicks() {
   const result = await request({
      url,
      document,
      variables: {
        poolAddress: poolAddress.toLocaleLowerCase(),
        skip: 0
      }
    }) as any;
    setTicks(result?.ticks || [])
    setLoading(false);
  }
  return {
    ticks,
    loading
  }
}
