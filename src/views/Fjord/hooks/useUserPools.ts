import { Contract, providers, utils } from 'ethers';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import chains from '@/config/chains';
import { usePriceStore } from '@/stores/price';
import { AUTH_TOKENS,get } from '@/utils/http';
export default function useUserPools(sender: any) {
  const prices = usePriceStore((store) => store.price);
  const [userPools, setUserPools] = useState<any[]>([]);
  const [contractDataMapping, setContractDataMapping] = useState<any>({

  })
  const [loading, setLoading] = useState(false);

  const queryUserPools = useCallback(async (query?: Record<string, any>) => {
    if (loading) return;
    setLoading(true);
    try {
      const tokens = JSON.parse(window.sessionStorage.getItem(AUTH_TOKENS) || '{}')
      if (tokens && tokens.access_token) {
        const result = await get(`/api/launchpad/user/pools`, query);
        setUserPools(result.data || []);
        setLoading(false);
      } else {
        setTimeout(() => {
          queryUserPools(query)
        }, 500)
      }
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);

  const queryContractDataMapping = function (data: any) {
    const abi = [{
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "purchasedShares",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }, {
      "inputs": [],
      "name": "args",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "asset",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "share",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "assets",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "shares",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "virtualAssets",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "virtualShares",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "weightStart",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "weightEnd",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "saleStart",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "saleEnd",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "totalPurchased",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maxSharePrice",
              "type": "uint256"
            }
          ],
          "internalType": "struct Pool",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }]
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const rpcUrl = chains[element?.launchpad_lbp?.chain_id]?.rpcUrls[0] ?? ''
      if (rpcUrl) {
        const provider = new providers.JsonRpcProvider(rpcUrl);
        const contract = new Contract(
          element.pool,
          abi,
          provider,
        )
        if (sender) {
          contract.purchasedShares(sender).then((res: any) => {
            setContractDataMapping((prev: any) => {
              const curr = _.cloneDeep(prev)
              const _contractData = curr[element.pool] || {}
              _contractData["purchased_shares"] = utils.formatUnits(res, 18)
              curr[element.pool] = _contractData
              return curr
            })
          })
        }
        // console.log('=prices[element.asset_token_symbol]', prices[element.asset_token_symbol])
        // contract.args().then((res: any) => {
        //   setContractDataMapping((prev: any) => {
        //     const curr = _.cloneDeep(prev)
        //     const _contractData = curr[element.pool] || {}
        //     _contractData["funds_raised"] = Big(utils.formatUnits(res[2], element.asset_token_decimal)).times(prices[element.asset_token_symbol])
        //     curr[element.pool] = _contractData
        //     return curr
        //   })
        // }).catch(error => console.log('=error', error))
      }

    }
  }

  useEffect(() => {
    userPools.length > 0 && queryContractDataMapping(userPools)
  }, [userPools, sender])


  return { loading, userPools, contractDataMapping, queryUserPools };
}
