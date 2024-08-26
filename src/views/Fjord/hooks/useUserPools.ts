import { utils } from 'ethers';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

import { AUTH_TOKENS,get } from '@/utils/http';
import useShares from './useShares';
export default function useUserPools(sender: any) {
  const [userPools, setUserPools] = useState<any[]>([]);
  const { queryShares } = useShares(sender)
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

  const handleQueryShares = async function (pool?: any) {
    const res = await queryShares(pool)
    setContractDataMapping((prev: any) => {
      const curr = _.cloneDeep(prev)
      const _contractData = curr[pool?.pool] || {}
      _contractData["purchased_shares"] = utils.formatUnits(res, 18)
      curr[pool?.pool] = _contractData
      return curr
    })
  }
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
      handleQueryShares(data[i])
    }
  }


  useEffect(() => {
    userPools.length > 0 && queryContractDataMapping(userPools)
  }, [userPools, sender])


  return { loading, userPools, contractDataMapping, queryUserPools };
}
