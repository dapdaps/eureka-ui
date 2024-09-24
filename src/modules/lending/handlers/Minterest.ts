import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

const CTOKEN_ABI = [
  {
    inputs: [{ internalType: 'uint256', name: 'lendAmount', type: 'uint256' }],
    name: 'lend',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'redeemAmount', type: 'uint256' }],
    name: 'redeemUnderlying',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'borrowAmount', type: 'uint256' }],
    name: 'borrow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'repayAmount', type: 'uint256' }],
    name: 'repayBorrow',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  }
];

const UNITROLLER_ABI = [
  {
    inputs: [{ internalType: 'address[]', name: 'mTokens', type: 'address[]' }],
    name: 'enableAsCollateral',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'mToken', type: 'address' }],
    name: 'disableAsCollateral',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

const MinterestHandler = (props: any) => {
  const { update, data, amount, onLoad, provider } = props;

  useEffect(() => {
    const isCollateral = data.actionText.includes('Collateral');
    if (!data.actionText || !data.underlyingToken) return;

    if (!isCollateral && !update) return;

    const isNative = data.underlyingToken.isNative;

    let options = {};
    let params: any = [];
    let method = '';
    let contract: any = null;

    if (['Deposit', 'Repay', 'Withdraw', 'Borrow'].includes(data.actionText)) {
      if (!data.address || !amount) {
        return;
      }

      const parsedAmount = ethers.utils.parseUnits(
        Big(amount).toFixed(data.underlyingToken.decimals).toString(),
        data.underlyingToken.decimals
      );

      options = {
        value: isNative && (data.actionText === 'Deposit' || data.actionText === 'Repay') ? parsedAmount : 0
      };

      const CTokenContract = new ethers.Contract(data.address, CTOKEN_ABI, provider.getSigner());

      contract = CTokenContract;

      if (data.actionText === 'Deposit') {
        method = 'lend';
        params = isNative ? [0] : [parsedAmount];
      }

      if (data.actionText === 'Withdraw') {
        method = 'redeemUnderlying';
        params = [parsedAmount];
      }

      if (data.actionText === 'Borrow') {
        method = 'borrow';
        params = [parsedAmount];
      }

      if (data.actionText === 'Repay') {
        method = 'repayBorrow';
        params = isNative ? [0] : [parsedAmount];
      }
    }

    if (isCollateral) {
      if (!data.address || !data.underlyingToken) return;
      const isEnter = data.actionText === 'Enable as Collateral';

      contract = new ethers.Contract(data.config.collateralAddress, UNITROLLER_ABI, provider.getSigner());

      method = isEnter ? 'enableAsCollateral' : 'disableAsCollateral';

      params = isEnter ? [[data.address]] : [data.address];
    }

    if (!contract) return;

    const createTx = (gas?: any) => {
      const _gas = gas ? Big(gas.toString()).mul(1.2).toFixed(0) : 4000000;
      contract.populateTransaction[method](...params, {
        ...options,
        gasLimit: _gas
      })
        .then((res: any) => {
          onLoad({
            gas: _gas,
            unsignedTx: res,
            isError: false
          });
        })
        .catch((err: any) => {
          onLoad({});
        });
    };

    contract.estimateGas[method](...params, options)
      .then((gas: any) => {
        createTx(gas);
      })
      .catch((err: any) => {
        console.log('estimateGasError', err);
        createTx();
      });
  }, [update]);

  return null;
};

export default MinterestHandler;
