// @ts-nocheck
import Big from 'big.js';
import { useEffect } from 'react';

import { asyncFetch } from '@/utils/http';

export function usePoolData(props) {
  const { account, chainId, onLoad } = props;

  useEffect(() => {
    let tokens = {};
    let config = {};
    let count = 0;
    let basePools = {};
    let tvlPools = {};
    const tokenIds = [];

    const getConfig = () => {
      asyncFetch('/config/hyperlock.json')
        .then((res) => {
          config = res;
          getTokens();
        })
        .catch((err) => {
          getTokens();
        });
    };
    const getTokens = () => {
      asyncFetch('https://raw.githubusercontent.com/hyperlockfi/tokenlists/main/generated/hyperlock.tokenlist.json')
        .then((res) => {
          const data = res;
          tokens = data.tokens.reduce((acc, cur) => ({ ...acc, [cur.address.toLowerCase()]: cur }), {});

          getPoints();
        })
        .catch((err) => {
          getPoints();
        });
    };
    const getPoints = () => {
      if (!account) return;
      asyncFetch('https://graph.hyperlock.finance/subgraphs/name/hyperlock/points-blast-mainnet-B', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          operationName: 'Pools',
          query:
            'query Pools($where: Pool_filter, $orderBy: Pool_orderBy, $orderDirection: OrderDirection, $account: String! = "") {\n  pools(where: $where, orderBy: $orderBy, orderDirection: $orderDirection) {\n    ...Pool__fields\n  }\n}\n\nfragment Pool__fields on Pool {\n  id\n  type\n  addedAt\n  lpToken {\n    ...Token__fields\n  }\n  totalAllocation\n  epochs {\n    id\n    epoch\n    allocation\n  }\n  token0 {\n    ...Token__fields\n  }\n  token1 {\n    ...Token__fields\n  }\n  poolAccounts(where: {account: $account}) {\n    id\n    account {\n      totalBalance\n      epochs {\n        id\n        epoch\n        balance\n      }\n    }\n    staked\n  }\n  v2PoolData {\n    totalStaked\n  }\n  v3PoolData {\n    fee\n    nfts: tokens(where: {account_ends_with: $account}) {\n      id\n      tokenId\n      isStaked\n    }\n  }\n}\n\nfragment Token__fields on Token {\n  id\n  name\n  symbol\n  decimals\n}',
          variables: {
            account: account.toLowerCase(),
            chainId,
            poolsVariables: {},
            staleTime: 162000
          }
        })
      })
        .then((res) => {
          const pools = res?.data?.pools;

          if (!pools.length) {
            onLoad({
              loading: false,
              pools: basePools,
              tokenIds,
              poolsList: Object.values(basePools)
            });
            return;
          }
          const v3Pools = {};
          const v2Pools = {};
          pools.forEach((pool) => {
            const token0 = {
              ...pool.token0,
              icon: tokens[pool.token0.id.toLowerCase()]?.logoURI
            };
            const token1 = {
              ...pool.token1,
              icon: tokens[pool.token1.id.toLowerCase()]?.logoURI
            };
            const _pool = {
              id: pool.id,
              token0,
              token1,
              fee: pool.v3PoolData?.fee,
              type: pool.type
            };
            if (pool.v3PoolData?.nfts) {
              pool.v3PoolData.nfts.forEach((nft) => {
                tokenIds.push(nft.tokenId);
              });
            }
            if (pool.type === 'V3') {
              v3Pools[pool.id] = { ..._pool, name: pool.lpToken.symbol };
            } else {
              v2Pools[pool.id] = {
                ..._pool,
                name: pool.token0.symbol + '-' + pool.token1.symbol
              };
            }
          });
          getV3Tvl(v3Pools);
          getV2Tvl(v2Pools);
          basePools = { ...v3Pools, ...v2Pools };
        })
        .catch((err) => {
          onLoad({
            loading: false,
            pools: basePools,
            tokenIds,
            poolsList: Object.values(basePools)
          });
        });
    };
    const getV3Tvl = (pools) => {
      const addresses = Object.keys(pools);
      asyncFetch('https://api.hyperlock.finance/v1/blast-mainnet/points/tvl', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ addresses })
      })
        .then((res) => {
          const data = res;
          const prices = {};
          const _pools = Object.values(pools)
            .filter((pool) => data[pool.id])
            .map((pool) => {
              const { token0Amount, token1Amount, token0Price, token1Price } = data[pool.id];

              const _token0 = Big(token0Amount).mul(token0Price).div(Big(10).pow(pool.token0.decimals));
              const _token1 = Big(token1Amount).mul(token1Price).div(Big(10).pow(pool.token1.decimals));

              prices[pool.token0.id] = token0Price;
              prices[pool.token1.id] = token1Price;

              const defaultStackIcons = config.stack?.['default'] || [];
              const stackIcons = config.stack?.[pool.id] || [];

              return {
                ...pool,
                token0: { ...pool.token0, price: token0Price },
                token1: { ...pool.token1, price: token1Price },
                tvl: _token0.add(_token1).toString(),
                stackIcons: [...defaultStackIcons, ...stackIcons].map((address) =>
                  address ? tokens[address.toLowerCase()].logoURI : ''
                )
              };
            })
            .filter((pool) => Big(pool.tvl).gt(0));

          tvlPools = {
            ...tvlPools,
            ..._pools.reduce((acc, pool) => ({ ...acc, [pool.id]: pool }), {})
          };
          count++;
          if (count === 2) {
            onLoad({
              loading: false,
              pools: tvlPools,
              tokenIds,
              poolsList: Object.values(tvlPools).sort((a, b) => (Big(a.tvl).gt(b.tvl) ? -1 : 1))
            });
          }
        })
        .catch((err) => {
          onLoad({
            loading: false,
            pools: basePools,
            tokenIds,
            poolsList: Object.values(basePools)
          });
        });
    };
    const getV2Tvl = (pools) => {
      const addresses = Object.keys(pools);
      asyncFetch('https://graph.hyperlock.finance/subgraphs/name/hyperlock/v2-subgraph-mainnet-b', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          operationName: 'Prices',
          query:
            'query Prices($account: String, $ids: [ID!]) {\n  prices: pairs(where: {id_in: $ids}) {\n    id\n    token0 {\n      id\n    }\n    token1 {\n      id\n    }\n    token0PriceUSD\n    token1PriceUSD\n    lpTokenPriceUSD\n    system: liquidityPositions(\n      where: {user: "0xc3ecadb7a5fab07c72af6bcfbd588b7818c4a40e"}\n    ) {\n      liquidityTokenBalance\n    }\n  }\n}',
          variables: { ids: addresses }
        })
      })
        .then((res) => {
          const data = res.data.prices;
          const prices = {};
          const _pools = data
            .map((item) => {
              const pool = pools[item.id];

              const lpPrice = item.lpTokenPriceUSD;
              let lpBalance = Big(0);

              item.system?.forEach((slip) => {
                lpBalance = lpBalance.add(slip.liquidityTokenBalance);
              });

              const token0Price = item.token0PriceUSD;
              const token1Price = item.token1PriceUSD;

              prices[pool.token0.id] = token0Price;
              prices[pool.token1.id] = token1Price;

              const defaultStackIcons = config.stack?.['default'] || [];
              const stackIcons = config.stack?.[pool.id] || [];

              return {
                ...pool,
                token0: { ...pool.token0, price: token0Price },
                token1: { ...pool.token1, price: token1Price },
                tvl: lpBalance.mul(lpPrice).toString(),
                stackIcons: [...defaultStackIcons, ...stackIcons].map((address) =>
                  address ? tokens[address.toLowerCase()].logoURI : ''
                )
              };
            })
            .filter((pool) => Big(pool.tvl).gt(0));

          tvlPools = {
            ...tvlPools,
            ..._pools.reduce((acc, pool) => ({ ...acc, [pool.id]: pool }), {})
          };

          count++;
          if (count === 2) {
            onLoad({
              loading: false,
              pools: tvlPools,
              tokenIds,
              poolsList: Object.values(tvlPools).sort((a, b) => (Big(a.tvl).gt(b.tvl) ? -1 : 1))
            });
          }
        })
        .catch((err) => {
          onLoad({
            loading: false,
            pools: basePools,
            tokenIds,
            poolsList: Object.values(basePools)
          });
        });
    };
    account && getConfig();
  }, [account]);
}
