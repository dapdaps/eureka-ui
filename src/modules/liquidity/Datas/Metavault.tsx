// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

export default function GammaData(props: any) {
  const { pairs, sender, provider, addresses, onLoad, curChain, multicallAddress, storeAddress, prices } = props;

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
          name: '_asset',
          type: 'address'
        }
      ],
      name: 'getBalance',
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
      inputs: [
        {
          internalType: 'address',
          name: '_asset',
          type: 'address'
        }
      ],
      name: 'getGlobalUPL',
      outputs: [
        {
          internalType: 'int256',
          name: '',
          type: 'int256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    }
  ];

  const MulticallContract = new ethers.Contract(multicallAddress, MULTICALL_ABI, provider.getSigner());

  const multicallv2 = (abi, calls, options, onSuccess, onError) => {
    const { requireSuccess, ...overrides } = options || {};
    const itf = new ethers.utils.Interface(abi);
    const calldata = calls.map((call) => ({
      target: call.address.toLowerCase(),
      callData: itf.encodeFunctionData(call.name, call.params)
    }));
    MulticallContract.callStatic
      .tryAggregate(requireSuccess || true, calldata, overrides)
      .then((res) => {
        onSuccess(
          res.map((call, i) => {
            const [result, data] = call;
            return result && data !== '0x' ? itf.decodeFunctionResult(calls[i].name, data) : null;
          })
        );
      })
      .catch((err) => {
        onError?.(err);
      });
  };

  const formatPercent = (value) => {
    return `${Number(value * 100).toLocaleString('en', {
      maximumFractionDigits: 2
    })}%`;
  };

  const loading = false;
  const dataList = [];
  function formatedData() {
    onLoad({
      loading,
      dataList
    });
  }
  function getDataList() {
    pairs?.forEach((pair) => {
      dataList.push(pair);
    });
    formatedData('getDataList');
  }
  function getMyBalance() {
    const abi = [
      {
        inputs: [
          {
            internalType: 'address[]',
            name: '_assets',
            type: 'address[]'
          },
          {
            internalType: 'address',
            name: 'account',
            type: 'address'
          }
        ],
        name: 'getUserBalances',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      }
    ];
    const contract = new ethers.Contract(ethers.utils.getAddress(storeAddress), abi, provider);
    contract
      .getUserBalances(
        dataList.map((data) => addresses[data.id]),
        sender
      )
      .then((result) => {
        for (let i = 0; i < result.length; i++) {
          const data = dataList[i];
          const element = result[i];
          dataList[i].myBalance = Big(ethers.utils.formatUnits(element, data.decimals)).toFixed(6);
        }
        formatedData('getMyBalance');
      })
      .catch((e) => {
        setTimeout(() => {
          getMyBalance();
        }, 500);
      });
  }
  function getPoolBalance() {
    const calls = [];
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i];
      calls.push({
        address: ethers.utils.getAddress(storeAddress),
        name: 'getBalance',
        params: [addresses[data.id]]
      });
    }
    multicallv2(
      ERC20_ABI,
      calls,
      {},
      (result) => {
        for (let i = 0; i < result.length; i++) {
          const data = dataList[i];
          const element = result[i];
          dataList[i].poolBalance = Big(ethers.utils.formatUnits(element[0], data.decimals)).toFixed(3);
        }
        formatedData('getPoolBalance');
      },
      (error) => {
        setTimeout(() => {
          getPoolBalance();
        }, 500);
      }
    );
  }
  function getTrader() {
    const calls = [];
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i];
      calls.push({
        address: ethers.utils.getAddress(storeAddress),
        name: 'getGlobalUPL',
        params: [addresses[data.id]]
      });
    }
    multicallv2(
      ERC20_ABI,
      calls,
      {},
      (result) => {
        for (let i = 0; i < result.length; i++) {
          const data = dataList[i];
          const element = result[i];
          dataList[i].trader = Big(ethers.utils.formatUnits(element[0], data.decimals))
            .times(prices[data.token])
            .toFixed(2);
        }
        formatedData('getTrader');
      },
      (error) => {
        setTimeout(() => {
          getTrader();
        }, 500);
      }
    );
  }

  useEffect(() => {
    getDataList();
    getMyBalance();
    getPoolBalance();
    getTrader();
  }, [sender]);
}
