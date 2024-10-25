import Big from 'big.js';

import { multicall, multicallAddresses } from '@/utils/multicall';

import poolV2Abi from '../abi/poolV2';
import getV3Pools from './getV3Pools';

async function getV2Pool({ address, account, multicallAddress, provider, chainId }: any) {
  try {
    const calls = [
      {
        address,
        name: 'getReserves'
      },
      {
        address,
        name: 'token0'
      },
      { address, name: 'token1' },
      { address, name: 'balanceOf', params: [account] }
    ];
    const [reserves, token0, token1, balance] = await multicall({
      abi: poolV2Abi,
      calls: calls,
      options: {},
      multicallAddress,
      provider
    });
    return {
      token0: token0[0],
      token1: token1[0],
      liquidity: balance?.[0] ? balance[0].toString() : '0',
      poolVersion: 'V2',
      chainId,
      poolAddress: address,
      data: {
        reserves0: reserves ? (Big(reserves[0] || 0).eq(0) ? 0 : reserves[0].toString()) : 0,
        reserves1: reserves ? (Big(reserves[1] || 0).eq(0) ? 0 : reserves[1].toString()) : 0,
        totalSupply: balance?.[0] ? balance[0].toString() : '0'
      }
    };
  } catch (err) {
    console.log('pool err', err);
    return null;
  }
}

async function getV2Pools({ account, chainId, provider }: any) {
  try {
    const response = await fetch(
      `https://nile-api-production.up.railway.app/legacy_mints?wallet=${account.toLowerCase()}`
    );
    const lps = await response.json();

    const multicallAddress = multicallAddresses[chainId];
    const pools = await Promise.all(
      lps.map((lp: string) => getV2Pool({ address: lp, account, multicallAddress, chainId, provider }))
    );

    return pools.filter((pool) => pool && Big(pool.liquidity || 0).gt(0));
  } catch (err) {
    return [];
  }
}

export default async function getNilePools({ contracts, chainId, account, provider }: any) {
  const poolsV3 = await getV3Pools({
    contracts,
    chainId,
    account,
    provider
  });
  const poolsV2 = await getV2Pools({ account, chainId, provider });
  return [...poolsV2, ...poolsV3].sort((a, b) => (Big(b.liquidity || 0).gt(a.liquidity) ? -1 : 1));
}
