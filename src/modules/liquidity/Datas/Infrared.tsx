// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

import { asyncFetch } from '@/utils/http';
export default function Data(props: any) {
  const {
    pairs,
    sender,
    addresses,
    allData,
    onLoad,
    curChain,
    multicallAddress,
    LAST_SNAP_SHOT_DATA_URL,
    prices,
    provider
  } = props;

  const dataList = [];
  const MULTICALL_ABI = [
    {
      inputs: [
        { internalType: 'bool', name: 'requireSuccess', type: 'bool' },
        {
          components: [
            { internalType: 'address', name: 'target', type: 'address' },
            { internalType: 'bytes', name: 'callData', type: 'bytes' }
          ],
          internalType: 'struct Multicall2.Call[]',
          name: 'calls',
          type: 'tuple[]'
        }
      ],
      name: 'tryAggregate',
      outputs: [
        {
          components: [
            { internalType: 'bool', name: 'success', type: 'bool' },
            { internalType: 'bytes', name: 'returnData', type: 'bytes' }
          ],
          internalType: 'struct Multicall2.Result[]',
          name: 'returnData',
          type: 'tuple[]'
        }
      ],
      stateMutability: 'nonpayable',
      type: 'function'
    }
  ];
  const ERC20_ABI = [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'balanceOf',
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
      name: 'rewardRate',
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
      name: 'rewardToken',
      outputs: [
        {
          internalType: 'contract IERC20',
          name: '',
          type: 'address'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'globalState',
      outputs: [
        {
          internalType: 'uint160',
          name: 'price',
          type: 'uint160'
        },
        {
          internalType: 'int24',
          name: 'tick',
          type: 'int24'
        },
        {
          internalType: 'uint16',
          name: 'fee',
          type: 'uint16'
        },
        {
          internalType: 'uint16',
          name: 'timepointIndex',
          type: 'uint16'
        },
        {
          internalType: 'uint16',
          name: 'communityFeeToken0',
          type: 'uint16'
        },
        {
          internalType: 'uint16',
          name: 'communityFeeToken1',
          type: 'uint16'
        },
        {
          internalType: 'bool',
          name: 'unlocked',
          type: 'bool'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    }
  ];

  function formatedData() {
    onLoad({
      dataList
    });
  }
  function getDataList() {
    pairs.forEach((pair) => {
      const findIndex = allData?.findIndex(
        (data) => data?.address.toLocaleLowerCase() === addresses[pair.id]?.toLocaleLowerCase()
      );
      if (findIndex > -1) {
        dataList.push({
          ...pair,
          initialData: allData[findIndex]
        });
      }
    });
    formatedData('dataList');
  }

  useEffect(() => {
    getDataList();
  }, [sender]);
}
