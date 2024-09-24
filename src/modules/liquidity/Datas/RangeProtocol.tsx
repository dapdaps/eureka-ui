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
    feesData,
    RANGE_URL,
    prices,
    provider
  } = props;

  const loading = false;
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
      name: 'symbol',
      outputs: [{ internalType: 'string', name: '', type: 'string' }],
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
  function multicallv2WithPromise(abi, calls, options) {
    return new Promise((resolve, reject) => {
      multicallv2(abi, calls, options, resolve, reject);
    });
  }
  function asyncFetchWithPromise(url, options) {
    return new Promise((resolve, reject) => {
      asyncFetch(url, options || {})
        .then((result) => {
          try {
            resolve(result);
          } catch (error) {
            reject(error);
          }
        })
        .catch(reject);
    });
  }
  const formatPercent = (value) => {
    return `${Number(value * 100).toLocaleString('en', {
      maximumFractionDigits: 2
    })}%`;
  };

  function formatedData(type) {
    onLoad({
      loading,
      dataList
    });
  }
  function getDataList() {
    pairs.forEach((pair) => {
      const vaultAddress = addresses[pair.id];
      const data = allData.find((data) => data.pool === pair.poolAddress && data.vault === vaultAddress);
      dataList.push({
        ...data,
        ...pair
      });
    });
    formatedData('dataList');
  }

  function getLiquidity() {
    const query = `{
    users(where: {id: "${sender}"}) {
      id
      vaultBalances {
        token0
        token1
        balance
        address
        vault {
          id
          token0
          token1
        }
      }
    }
  }`;
    asyncFetch(RANGE_URL, {
      method: 'POST',
      body: JSON.stringify({
        query
      })
    }).then((result) => {
      const vaultBalances = result?.data?.users[0]?.vaultBalances ?? [];
      for (let i = 0; i < dataList.length; i++) {
        // const element = array[i];
        const data = dataList[i];
        const balance = vaultBalances.find(
          (vaultBalance) => vaultBalance.vault.id.toLowerCase() === addresses[data.id].toLowerCase()
        );
        if (balance) {
          const { token0, token1 } = balance;
          dataList[i].liquidity = Big(ethers.utils.formatUnits(token0, data.decimals0))
            .times(prices[data.token0])
            .plus(Big(ethers.utils.formatUnits(token1, data.decimals1)).times(prices[data.token1]))
            .toFixed();
        }
      }
      formatedData('getLiquidity');
    });
  }
  function getFee() {
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i];
      dataList[i].fee = Big(data?.fee ?? 0)
        .div(10000)
        .toFixed(2);
    }
    formatedData('getFee');
  }
  function getTvl() {
    const promiseArray = [];
    if (curChain.chain_id === 56) {
      for (let i = 0; i < dataList.length; i++) {
        const vault = dataList[i].vault;
        const query =
          '{\n  vault(id: "' +
          vault +
          '") {\n    liquidity\n    balance0\n    balance1\n    totalSupply\n    totalFeesEarned0\n    totalFeesEarned1\n    token0\n    token1\n    name\n    tag\n    pool\n  }\n}';
        promiseArray.push(
          asyncFetchWithPromise(RANGE_URL, {
            method: 'POST',
            body: JSON.stringify({
              query
            })
          })
        );
      }
    } else {
      for (let i = 0; i < dataList.length; i++) {
        const query = `{
        vault(id: "${dataList[i].vault}") {
          liquidity
          balance0
          balance1
          totalSupply
          totalFeesEarned0
          totalFeesEarned1
          name
          tag
          pool
        }
      }`;
        promiseArray.push(
          asyncFetchWithPromise(
            'https://api.goldsky.com/api/public/project_clm97huay3j9y2nw04d8nhmrt/subgraphs/izumi-manta/0.2/gn',
            {
              method: 'POST',
              body: JSON.stringify({
                query
              })
            }
          )
        );
      }
    }
    Promise.all(promiseArray).then((result) => {
      for (let i = 0; i < result.length; i++) {
        const { balance0, balance1 } = result[i].data.vault;
        const data = dataList[i];
        dataList[i].tvlUSD = Big(ethers.utils.formatUnits(balance0, data.decimals0))
          .times(prices[data.token0] ?? 0)
          .plus(Big(ethers.utils.formatUnits(balance1, data.decimals1)).times(prices[data.token1] ?? 0))
          .toFixed(2);
      }
      formatedData('getTvl');
    });
  }
  function getApy() {
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i];
      dataList[i].apy =
        Big(data?.fee_apy ?? 0)
          .plus(data?.asset_yield ?? 0)
          .toFixed(2) + '%';
    }
    formatedData('getApy');
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
    getFee();
    getTvl();
    getApy();
    getBalance();
    getLiquidity();
  }, [sender]);
}
