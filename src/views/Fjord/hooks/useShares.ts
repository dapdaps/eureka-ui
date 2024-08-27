import { Contract, providers } from 'ethers';
import { useState } from 'react';

import chains from '@/config/chains';
export default function useShares(sender: any) {

  const [shares, setShares] = useState(0)
  const [loading, setLoading] = useState(false);
  const queryShares = async function (pool: any) {
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
    console.log('====pool', pool)
    const rpcUrl = chains[pool?.chain_id ? pool?.chain_id : pool?.launchpad_lbp?.chain_id]?.rpcUrls[0] ?? ''
    if (rpcUrl) {
      const provider = new providers.JsonRpcProvider(rpcUrl);
      const contract = new Contract(
        pool?.pool,
        abi,
        provider,
      )
      if (sender) {
        const _shares = await contract.purchasedShares(sender)
        console.log('==_shares', _shares)
        setShares(_shares)
        return _shares
      }
    }
  }

  return { loading, shares, queryShares };
}
