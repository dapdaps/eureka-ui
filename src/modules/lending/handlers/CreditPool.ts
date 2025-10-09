import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

const supply_abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'depositAndWrap',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'wNLPAmount',
        type: 'uint256'
      }
    ],
    name: 'unwrapAndRedeem',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

const pair_abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256'
      }
    ],
    name: 'addLiquidity',
    outputs: [
      {
        internalType: 'uint256',
        name: 'shares',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_shares',
        type: 'uint256'
      }
    ],
    name: 'removeLiquidity',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

const CreditPoolHandler = (props: any) => {
  const { update, data, amount, onLoad, provider } = props;

  const getActionAmount = (amount: any) => Big(amount).mul(Big(10).pow(data.underlyingToken.decimals)).toFixed(0);

  useEffect(() => {
    (async () => {
      if (!update) return;

      if (data.actionText === 'Supply') {
        const SupplyContract = new ethers.Contract(data.wrappedTokenAddress, supply_abi, provider.getSigner());
        const amountFormatted = getActionAmount(amount);
        let gas = null;
        try {
          gas = await SupplyContract.estimateGas.depositAndWrap(amountFormatted);
        } catch (error) {
          console.log('error:', error);
          gas = null;
        }
        const unsignedTx = await SupplyContract.populateTransaction.depositAndWrap(amountFormatted);
        console.log('gas:', gas, unsignedTx);
        onLoad({
          gas: gas,
          unsignedTx
        });
      } else if (data.actionText === 'Withdraw') {
        const SupplyContract = new ethers.Contract(data.wrappedTokenAddress, supply_abi, provider.getSigner());
        const amountFormatted = getActionAmount(amount);
        let gas = null;
        try {
          gas = await SupplyContract.estimateGas.unwrapAndRedeem(amountFormatted);
        } catch (error) {
          console.log('error:', error);
          gas = null;
        }
        const unsignedTx = await SupplyContract.populateTransaction.unwrapAndRedeem(amountFormatted);
        onLoad({
          gas: gas,
          unsignedTx
        });
      } else if (data.actionText === 'Pair') {
        if (!data.pairingToken || data.pairingToken.length === 0) {
          onLoad({
            gas: null,
            unsignedTx: null
          });
          return;
        }
        const contactAddress = data.pairingToken[0].stakerAddress;

        console.log('contactAddress:', contactAddress);

        const SupplyContract = new ethers.Contract(contactAddress, pair_abi, provider.getSigner());
        const amountFormatted = getActionAmount(amount);
        let gas = null;
        try {
          gas = await SupplyContract.estimateGas.addLiquidity(amountFormatted);
        } catch (error) {
          console.log('error:', error);
          gas = null;
        }
        const unsignedTx = await SupplyContract.populateTransaction.addLiquidity(amountFormatted);
        onLoad({
          gas: gas,
          unsignedTx
        });
      } else if (data.actionText === 'Unpair') {
        if (!data.pairingToken || data.pairingToken.length === 0) {
          onLoad({
            gas: null,
            unsignedTx: null
          });
          return;
        }
        const contactAddress = data.pairingToken[0].stakerAddress;
        const SupplyContract = new ethers.Contract(contactAddress, pair_abi, provider.getSigner());
        const amountFormatted = getActionAmount(amount);
        let gas = null;
        try {
          gas = await SupplyContract.estimateGas.removeLiquidity(amountFormatted);
        } catch (error) {
          console.log('error:', error);
          gas = null;
        }
        const unsignedTx = await SupplyContract.populateTransaction.removeLiquidity(amountFormatted);
        onLoad({
          gas: gas,
          unsignedTx
        });
      }
    })();

    // SupplyContract.estimateGas.depositAndWrap(...params, options)
  }, [update]);

  return null;
};

export default CreditPoolHandler;
