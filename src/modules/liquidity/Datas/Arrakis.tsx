// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

import { asyncFetch } from '@/utils/http';
export default function GammaData(props: any) {
  const {
    pairs,
    sender,
    provider,
    addresses,
    allData,
    onLoad,
    // chainType,
    curChain,
    multicallAddress,
    LAST_SNAP_SHOT_DATA_URL,
    prices
  } = props;

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
          internalType: 'uint256',
          name: '_shares',
          type: 'uint256'
        }
      ],
      name: 'getUnderlyingAssets',
      outputs: [
        {
          internalType: 'uint256',
          name: 'totalX',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'totalY',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    'function balanceOf(address) view returns (uint256)',
    {
      inputs: [],
      name: 'getUnderlyingBalances',
      outputs: [
        {
          internalType: 'uint256',
          name: 'amount0Current',
          type: 'uint256'
        },
        {
          internalType: 'uint256',
          name: 'amount1Current',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
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
    pairs.forEach((pair) => {
      const findIndex = allData.findIndex((data) => addresses[pair.id].toLowerCase() === data.id);
      if (findIndex > -1) {
        dataList.push({
          initialData: allData[findIndex],
          ...pair
        });
      }
    });
    formatedData('getDataList');
  }
  function getTvlUSD() {
    const calls = [];
    dataList.forEach((data) => {
      calls.push({
        address: addresses[data.id],
        name: 'getUnderlyingBalances'
      });
    });
    multicallv2(ERC20_ABI, calls, {}, (result) => {
      for (let i = 0; i < result.length; i++) {
        const data = dataList[i];
        const [amount0Current, amount1Current] = result[i];
        dataList[i].tvlUSD = Big(ethers.utils.formatUnits(amount0Current, data.decimals0))
          .times(prices[data.token0])
          .plus(Big(ethers.utils.formatUnits(amount1Current, data.decimals1)).times(prices[data.token1]))
          .toFixed(2);
      }
      formatedData('getTvlUSD');
    });
  }

  function getFeeApr() {
    for (let i = 0; i < dataList.length; i++) {
      dataList[i].feeApr = dataList[i]?.initialData
        ? Big(dataList[i]?.initialData?.averageApr ?? 0).toFixed(2) + '%'
        : '-';
    }
    formatedData('getFeeApr');
  }
  function getLiquidity() {
    const firstCalls = [];
    const secondColls = [];
    dataList.forEach((data) => {
      firstCalls.push({
        address: addresses[data.id],
        name: 'totalSupply'
      });
      secondColls.push({
        address: addresses[data.id],
        name: 'getUnderlyingBalances'
      });
    });
    multicallv2(
      ERC20_ABI,
      firstCalls,
      {},
      (firstResult) => {
        multicallv2(
          ERC20_ABI,
          secondColls,
          {},
          (secondResult) => {
            for (let i = 0; i < dataList.length; i++) {
              const data = dataList[i];
              const [total0, total1] = secondResult[i];
              const priceLp = Big(
                Big(ethers.utils.formatUnits(total0, 18))
                  .times(prices[data.token0])
                  .plus(Big(ethers.utils.formatUnits(total1, 18)).times(prices[data.token1]))
              )
                .div(ethers.utils.formatUnits(firstResult[i][0], 18))
                .toFixed();
              const amountLp = data.balance;
              dataList[i].liquidity = Big(priceLp).times(amountLp).toFixed();
            }
            formatedData('getLiquidity');
          },
          (error) => {
            console.log('error', error);
          }
        );
      },
      (error) => {
        console.log('error', error);
      }
    );
  }
  function getBalance() {
    const calls = [];
    dataList.forEach((data) => {
      calls.push({
        address: ethers.utils.getAddress(addresses[data.id]),
        name: 'balanceOf',
        params: [sender]
      });
    });
    multicallv2(
      ERC20_ABI,
      calls,
      {},
      (result) => {
        for (let i = 0; i < result.length; i++) {
          const element = result[i];
          dataList[i].balance = ethers.utils.formatUnits(element[0], 18);
        }
        formatedData('getBalance');
        getLiquidity();
      },
      (error) => {
        setTimeout(() => {
          getBalance();
        }, 500);
      }
    );
  }
  useEffect(() => {
    getDataList();
    getTvlUSD();
    getFeeApr();
    getBalance();
  }, []);
}
