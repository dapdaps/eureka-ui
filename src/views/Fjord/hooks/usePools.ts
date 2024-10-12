import { Contract, providers, utils } from 'ethers';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import chains from '@/config/chains';
import { usePriceStore } from '@/stores/price';
import { get } from '@/utils/http';
export default function usePools(sender: any) {
  const prices = usePriceStore((store) => store.price);
  const [pools, setPools] = useState<any[]>([]);
  const [contractDataMapping, setContractDataMapping] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const queryContractDataMapping = function (data: any) {
    const abi = [
      {
        inputs: [
          {
            internalType: 'address',
            name: '',
            type: 'address'
          }
        ],
        name: 'purchasedShares',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [],
        name: 'args',
        outputs: [
          {
            components: [
              {
                internalType: 'address',
                name: 'asset',
                type: 'address'
              },
              {
                internalType: 'address',
                name: 'share',
                type: 'address'
              },
              {
                internalType: 'uint256',
                name: 'assets',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'shares',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'virtualAssets',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'virtualShares',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'weightStart',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'weightEnd',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'saleStart',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'saleEnd',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'totalPurchased',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'maxSharePrice',
                type: 'uint256'
              }
            ],
            internalType: 'struct Pool',
            name: '',
            type: 'tuple'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      }
    ];
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const rpcUrl = chains[element.chain_id]?.rpcUrls[0] ?? '';
      if (rpcUrl) {
        const provider = new providers.JsonRpcProvider(rpcUrl);
        const contract = new Contract(element.pool, abi, provider);
        if (sender) {
          contract
            .purchasedShares(sender)
            .then((res: any) => {
              setContractDataMapping((prev: any) => {
                const curr = _.cloneDeep(prev);
                const _contractData = curr[element.pool] || {};
                _contractData['purchased_shares'] = utils.formatUnits(res, 18);
                curr[element.pool] = _contractData;
                return curr;
              });
            })
            .catch((err: any) => {
              console.log('err', err);
            });
        }
      }
    }
  };
  const queryPools = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`/api/launchpad/pools`);
      const data = result.data || [];
      const map: any = {};
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        map[element.status] = map[element.status] ? map[element.status] : [];
        map[element.status].push(element);
      }
      const sortPools = [...(map['ongoing'] || []), ...(map['upcoming'] || []), ...(map['completed'] || [])];
      setPools(sortPools);
      setLoading(false);
    } catch (err) {
      console.log('=err', err);
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    pools.length > 0 && queryContractDataMapping(pools);
  }, [pools, sender]);
  return { loading, setLoading, pools, contractDataMapping, queryPools };
}
