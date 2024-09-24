// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';
export default function JuiceData(props) {
  const { provider, onLoad, dataList, symbolIndex, multicall, multicallAddress, smartContractAddress } = props;

  function updateDataList() {
    onLoad({
      dataList
    });
  }
  function handleGetTotalBaseDeposit() {
    const calls = [];
    for (let i = 0; i < dataList.length; i++) {
      calls.push({
        address: dataList[i].strategyAddress,
        name: 'getTotalBaseDeposit'
      });
    }
    multicall({
      abi: [
        {
          inputs: [],
          name: 'getTotalBaseDeposit',
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
      ],
      calls,
      options: {},
      multicallAddress,
      provider
    }).then((result) => {
      for (let i = 0; i < dataList.length; i++) {
        dataList[i].pointList[0].value = Big(result[i][0] ? ethers.utils.formatUnits(result[i][0]) : 0).toString();
      }
      updateDataList('handleGetTotalBaseDeposit');
    });
  }
  function handleGetPositionValue() {
    const calls = [];
    for (let i = 0; i < dataList.length; i++) {
      calls.push({
        address: dataList[i].strategyAddress,
        name: 'getPositionValue',
        params: [smartContractAddress]
      });
    }
    console.log('=calls', calls);
    multicall({
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: 'account',
              type: 'address'
            }
          ],
          name: 'getPositionValue',
          outputs: [
            {
              internalType: 'uint256',
              name: 'value',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      calls,
      options: {},
      multicallAddress,
      provider
    }).then((result) => {
      for (let i = 0; i < dataList.length; i++) {
        dataList[i].positionValue = Big(
          result[i] && result[i][0] ? ethers.utils.formatUnits(result[i][0]) : 0
        ).toString();
      }
      updateDataList('handleGetPositionValue');
    });
  }
  useEffect(() => {
    console.log('====symbolIndex', symbolIndex);
    handleGetTotalBaseDeposit();
  }, [symbolIndex]);
  useEffect(() => {
    smartContractAddress && handleGetPositionValue();
  }, [smartContractAddress, symbolIndex]);
}
