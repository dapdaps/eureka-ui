// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

import { asyncFetch } from '@/utils/http';
export default function GammaData(props: any) {
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
  const loading = false;
  let dataList = [];
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

  const MulticallContract = new ethers.Contract(multicallAddress, MULTICALL_ABI, provider?.getSigner());
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

  function formatedData() {
    onLoad({
      loading,
      dataList
    });
  }
  function getDataList() {
    pairs.forEach((pair) => {
      const vaultAddress = addresses[pair.id];
      const data = allData[vaultAddress];
      dataList.push({
        ...data,
        ...pair,
        vaultAddress
      });
    });
    formatedData('dataList');
  }

  function getLiquidity() {
    if (!sender) return;
    const calls = [];
    dataList.forEach((data) => {
      calls.push({
        address: data.vaultAddress,
        name: 'balanceOf',
        params: [sender]
      });
    });
    multicallv2(
      ERC20_ABI,
      calls,
      {},
      (res) => {
        for (let i = 0, len = res.length; i < len; i++) {
          if (res[i]) {
            dataList[i].liquidity = Big(ethers.utils.formatUnits(res[i][0]._hex)).toFixed();
          }
        }
        formatedData('getLiquidity');
      },
      (error) => {
        setTimeout(() => {
          getLiquidity();
        }, 500);
      }
    );
  }
  function getTotalApr() {
    const chain_id = curChain.chain_id;
    if ([8453, 10, 5000, 81457].includes(chain_id)) {
      dataList = dataList.map((data) => {
        data.totalApr = formatPercent(data?.returns?.weekly?.feeApr);
        return data;
      });
      formatedData('getTotalApr');
    }
    if (chain_id === 59144) {
      asyncFetch('https://api.lynex.fi/api/v1/fusions').then((res) => {
        const fusionsData = res?.data;
        dataList = dataList.map((data) => {
          const fusionData = fusionsData?.find((fusionData) => fusionData.address === data.vaultAddress);
          data.totalApr = Big(fusionData?.gauge?.minApr ?? 0).toFixed(2) + '%';
          return data;
        });
        formatedData('getTotalApr');
      });
    }
    if (chain_id === 56) {
      const calls = [];
      dataList.forEach((data) => {
        data?.gaugeV2Address &&
          calls.push({
            address: data?.gaugeV2Address,
            name: 'rewardRate'
          });
      });
      multicallv2(
        ERC20_ABI,
        calls,
        {},
        (res) => {
          for (let i = 0, len = res.length; i < len; i++) {
            dataList[i]['totalApr'] =
              (dataList[i].tvlUSD > 0
                ? Big(ethers.utils.formatUnits(res[i][0]._hex))
                    .mul(365 * 24 * 60 * 60)
                    .mul(prices['THE'])
                    .div(dataList[i].tvlUSD)
                    .times(100)
                    .toFixed(2)
                : '0.00') + '%';
          }
          formatedData('getTotalApr');
        },
        (error) => {
          setTimeout(() => {
            getTotalApr();
          }, 500);
        }
      );
    }
    if ([137, 1101, 3776].includes(chain_id)) {
      asyncFetch('https://api.angle.money/v2/merkl?chainIds[]=' + chain_id).then((res) => {
        const { pools } = res[chain_id];
        dataList = dataList.map((data) => {
          const pool = pools[ethers.utils.getAddress(data.poolAddress)];
          if (pool && Object.keys(pool.aprs).length > 0) {
            Object.keys(pool.aprs).forEach((key) => {
              if (key.indexOf(ethers.utils.getAddress(data.vaultAddress)) > -1) {
                data.totalApr = Big(data.returns.weekly.feeApr).times(100).plus(pool.aprs[key]).toFixed(2) + '%';
              }
            });
          } else {
            data.totalApr = formatPercent(data?.returns?.weekly?.feeApr ?? 0);
          }
          return data;
        });
        formatedData('getTotalApr');
      });
    }
  }
  function getFeeTiers() {
    const chain_id = curChain.chain_id;
    if ([59144, 56, 137, 1101].includes(chain_id)) {
      const calls = [];
      dataList.forEach((data) => {
        calls.push({
          address: data.poolAddress,
          name: 'globalState'
        });
      });
      multicallv2(
        ERC20_ABI,
        calls,
        {},
        (res) => {
          for (let i = 0, len = res.length; i < len; i++) {
            dataList[i]['fee'] = Big(res[i][2]).div(10000).toFixed(4);
          }
          formatedData('getFeeTiers');
        },
        (error) => {
          setTimeout(() => {
            getFeeTiers();
          }, 500);
        }
      );
    } else {
      asyncFetch(LAST_SNAP_SHOT_DATA_URL)
        .then((res) => {
          dataList.forEach((data, index) => {
            const findIndex = res.findIndex((source) => data.vaultAddress === source.address);
            if (findIndex > -1) {
              dataList[index]['fee'] = Big(res[findIndex]?.pool?.fee ?? 0)
                .div(10000)
                .toFixed(2);
            }
          });
          formatedData('getFeeTiers');
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }

  useEffect(() => {
    getDataList();
    getLiquidity();
    getFeeTiers();
    getTotalApr();
  }, [sender]);
}
