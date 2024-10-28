// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';
export default function PencilData(props: any) {
  const {
    pools,
    sender,
    addresses,
    allData,
    onLoad,
    curChain,
    multicallAddress,
    LAST_SNAP_SHOT_DATA_URL,
    FEE_APR_DATA_URL,
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

  function formatedData() {
    onLoad({
      loading,
      dataList
    });
  }
  function getDataList() {
    pools?.forEach((pool) => {
      const data = allData.find((data) => data?.symbol === pool?.id);
      if (data) {
        dataList.push({
          ...pool,
          ...data
        });
      }
    });
    formatedData('dataList');
  }
  function getBalances() {
    const calls = [];
    dataList.forEach((data) => {
      calls.push({
        address: data?.vaultAddress,
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
            dataList[i].balance = Big(ethers.utils.formatUnits(res[i][0], dataList[i]?.decimals)).toFixed();
          }
        }
        formatedData('getBalances');
      },
      (error) => {
        console.log('====error', error);
        setTimeout(() => {
          getBalances();
        }, 500);
      }
    );
  }

  useEffect(() => {
    if (allData) {
      getDataList();
      getBalances();
    }
  }, [allData, sender]);
}
