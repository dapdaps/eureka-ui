// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';
export function useUserData(props) {
  const { type, account, update, dexConfig, pools, multicall, multicallAddress, tokenIds, onLoad } = props;

  useEffect(() => {
    if (!pools) return;

    const getPositionsData = (pool, tokens, cb) => {
      asyncFetch(`https://api.hyperlock.finance/v1/blast-mainnet/points/${pool}/positions`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tokens
        })
      })
        .then((res) => {
          cb(res.body);
        })
        .catch((err) => {});
    };

    const initData = {
      staked: [],
      unstaked: [],
      stakedMap: {},
      unstakedMap: {}
    };
    let typeCounter = 0;
    const getV2Data = () => {
      const v2Pools = Object.values(pools).filter((pool) => pool.type === 'V2');
      const ids = [];
      v2Pools.forEach((pool) => {
        ids.push(`${pool.id}-${account.toLowerCase()}`);
        ids.push(`${pool.id}-${dexConfig.v2Address.toLowerCase()}`);
      });
      asyncFetch('https://graph.hyperlock.finance/subgraphs/name/hyperlock/v2-subgraph-mainnet-b', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          operationName: 'Positions',
          query:
            'query pairs($ids: [ID!]) {\n  liquidityPositions(where: {id_in: $ids}) {\n    id\n    user {\n      id\n    }\n    liquidityTokenBalance\n    pair {\n      id\n      token0 {\n        id\n      }\n      token1 {\n        id\n      }\n      lpTokenPriceUSD\n    }\n  }\n}',
          variables: {
            ids
          }
        })
      }).then((res) => {
        const data = res.body.data?.liquidityPositions || [];

        const unstaked = data.filter((pool) => pool.user.id === account.toLowerCase());
        const staked = data.filter((pool) => pool.user.id === dexConfig.v2Address.toLowerCase());

        const calls = staked.map((pool) => ({
          address: dexConfig.v2Address,
          name: 'staked',
          params: [account, pool.pair.id]
        }));

        multicall({
          abi: [
            {
              inputs: [
                { internalType: 'address', name: '', type: 'address' },
                { internalType: 'address', name: '', type: 'address' }
              ],
              name: 'staked',
              outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
              stateMutability: 'view',
              type: 'function'
            }
          ],
          calls,
          options: {},
          multicallAddress,
          provider
        }).then((stakedBalancesRes) => {
          const _unstaked = unstaked.map((item) => {
            return {
              id: item.pair.id,
              pool: {
                id: item.pair.id
              },
              token0: item.pair.token0,
              token1: item.pair.token1,
              balance: item.liquidityTokenBalance,
              price: item.pair.lpTokenPriceUSD,
              type: 'V2'
            };
          });

          const _staked = [];
          stakedBalancesRes.forEach((item, i) => {
            if (!item) return;
            const stakedItem = staked[i];
            const pool = pools[stakedItem.pair.id];
            _staked.push({
              id: stakedItem.pair.id,
              pool: {
                id: stakedItem.pair.id
              },
              token0: pool.token0,
              token1: pool.token1,
              balance: Big(item).div(Big(10).pow(18)).toFixed(18),
              price: stakedItem.pair.lpTokenPriceUSD,
              type: 'V2'
            });
          });

          const _unstakedMap = _unstaked.reduce((acc, item) => ({ ...acc, [item.id]: [item] }), {});
          const _stakedMap = _staked.reduce((acc, item) => ({ ...acc, [item.id]: [item] }), {});
          initData['staked'] = [...initData['staked'], ..._staked];
          initData['unstaked'] = [...initData['unstaked'], ..._unstaked];
          initData['unstakedMap'] = {
            ...initData['unstakedMap'],
            ..._unstakedMap
          };
          initData['stakedMap'] = { ...initData['stakedMap'], ..._stakedMap };
          typeCounter++;
          if (typeCounter === 2) {
            onLoad({ ...initData });
          }
        });
      });
    };
    initData.getV3Fees = (tokens) => {
      if (!tokens?.length) return;
      const contract = new ethers.Contract(
        dexConfig.positionManagerAddress,
        [
          {
            inputs: [
              {
                components: [
                  { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
                  { internalType: 'address', name: 'recipient', type: 'address' },
                  {
                    internalType: 'uint128',
                    name: 'amount0Max',
                    type: 'uint128'
                  },
                  {
                    internalType: 'uint128',
                    name: 'amount1Max',
                    type: 'uint128'
                  }
                ],
                internalType: 'struct INonfungiblePositionManagerStruct.CollectParams',
                name: 'params',
                type: 'tuple'
              }
            ],
            name: 'collect',
            outputs: [
              { internalType: 'uint256', name: '', type: 'uint256' },
              { internalType: 'uint256', name: '', type: 'uint256' }
            ],
            stateMutability: 'nonpayable',
            type: 'function'
          }
        ],
        provider
      );
      const fees = {};
      const loop = (_tokens) => {
        const token = _tokens.pop();
        contract.callStatic
          .collect([
            token.id,
            token.owner,
            '340282366920938463463374607431768211455',
            '340282366920938463463374607431768211455'
          ])
          .then((res) => {
            fees[token.id] = {
              token0: Big(res[0] || 0).toString(),
              token1: Big(res[1] || 0).toString()
            };
            if (_tokens.length) {
              loop(_tokens);
            } else {
              onLoad({ fees });
            }
          })
          .catch((err) => {});
      };
      loop(tokens);
    };
    const getV3Data = (tokenIds) => {
      asyncFetch('https://graph.hyperlock.finance/subgraphs/name/hyperlock/v3-subgraph-mainnet', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query:
            'query Positions($account: Bytes!, $ids: [ID!]) {\n  staked: positions(\n    where: {owner: "0xc28effdfef75448243c1d9ba972b97e32df60d06", id_in: $ids},\n    orderBy: id,\n    orderDirection: asc\n  ) {\n    ...PositionFragment\n  }\n  unstaked: positions(where: {owner: $account}, orderBy: id, orderDirection: asc) {\n    ...PositionFragment\n  }\n}\n\nfragment PositionFragment on Position {\n  id\n  owner\n  token0 {\n    ...TokenFragment\n  }\n  token1 {\n    ...TokenFragment\n  }\n  pool {\n    id\n    feeTier\n    liquidity\n    tick\n  }\n}\n\nfragment TokenFragment on Token {\n  id\n  symbol\n  decimals\n}',
          variables: {
            account,
            ids: tokenIds
          }
        })
      })
        .then((res) => {
          const { staked, unstaked } = res.body.data;

          const _unstaked = {};

          unstaked.forEach((item) => {
            const _item = _unstaked[item.pool.id];
            if (_item) {
              _item.push(item.id);
            } else {
              _unstaked[item.pool.id] = [item.id];
            }
          });

          const _staked = {};

          staked.forEach((item) => {
            const _item = _staked[item.pool.id];
            if (_item) {
              _item.push(item.id);
            } else {
              _staked[item.pool.id] = [item.id];
            }
          });

          const unstakedPools = Object.entries(_unstaked);
          const unstakedAmountData = {};
          const stakedPools = Object.entries(_staked);
          const stakedAmountData = {};

          let count = Number(!!unstakedPools.length) + Number(!!stakedPools.length);

          const loop = (list, amountData, key) => {
            const pool = list.pop();

            getPositionsData(pool[0], pool[1], (data) => {
              data.forEach((item) => {
                amountData[item.tokenId] = item;
              });
              if (list.length) {
                loop(list, amountData, key);
              } else {
                const tokens = key === 'staked' ? staked : unstaked;

                const list = tokens
                  .filter((item) => {
                    const { token0Amount, token1Amount } = amountData[item.id];
                    return Big(token0Amount).gt(0) || Big(token1Amount).gt(0);
                  })
                  .map((item) => {
                    return { ...item, ...amountData[item.id] };
                  });

                initData[key] = [...initData[key], ...list];

                const mapData = {};

                const _pools = key === 'staked' ? stakedPools : unstakedPools;

                _pools.forEach(([poolId, ids]) => {
                  if (!mapData[poolId]) mapData[poolId] = [];
                  ids.forEach((id) => {
                    const item = tokens.find((token) => token.id === id);

                    const { token0Amount, token1Amount } = amountData[id];

                    if (Big(token0Amount).gt(0) || Big(token1Amount).gt(0)) {
                      mapData[poolId].push({
                        ...item,
                        token0Amount,
                        token1Amount
                      });
                    }
                  });
                });

                const _key = `${key}Map`;

                initData[_key] = { ...initData[_key], ...mapData };
                count--;
                if (count === 0) {
                  setTimeout(() => {
                    initData.getV3Fees(staked);
                  }, 500);

                  typeCounter++;

                  if (typeCounter === 2) {
                    onLoad({ ...initData });
                  }
                }
              }
            });
          };

          if (stakedPools.length) loop(stakedPools, stakedAmountData, 'staked');
          if (unstakedPools.length) loop(unstakedPools, unstakedAmountData, 'unstaked');

          if (!stakedPools.length && !unstakedPools.length) {
            onLoad({ ...initData });
          }
        })
        .catch((err) => {
          onLoad({ ...initData });
        });
    };

    getV3Data(tokenIds);
    getV2Data();
  }, [update, pools]);
}
