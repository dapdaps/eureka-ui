import chains from '@/config/chains';
import { get } from '@/utils/http';
import Big from 'big.js';
import { Contract, providers } from 'ethers';
import _ from 'lodash';
import { useCallback, useState } from 'react';
export default function usePools() {
  const [pools, setPools] = useState<any[]>([]);
  const [sharesMapping, setSharesMapping] = useState<any>({

  })
  const [loading, setLoading] = useState(false);
  const querySharesMapping = function (data: any, sender: any) {
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
    }]
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      const rpcUrl = chains[element.chain_id]?.rpcUrls[0] ?? ''
      if (rpcUrl) {
        const provider = new providers.JsonRpcProvider(rpcUrl);
        const contract = new Contract(
          element.pool,
          abi,
          provider,
        )
        contract.purchasedShares(sender).then((res: any) => {
          setSharesMapping((prev: any) => {
            const curr = _.cloneDeep(prev)
            curr[element.pool] = Big(res).toFixed()
            return curr
          })
        })
      }

    }
  }
  const queryPools = useCallback(async (sender?: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const result = await get(`/api/launchpad/pools`);
      const data = result.data || []
      setPools(data);
      setLoading(false);
      querySharesMapping(data, sender)
    } catch (err) {
      setLoading(false);
    }
  }, [loading]);



  return { loading, pools, sharesMapping, queryPools };
}
