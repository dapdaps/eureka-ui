import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

const CTOKEN_ABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_assets',
        type: 'uint256',
      },
    ],
    name: 'convertToShares',
    outputs: [
      {
        internalType: 'uint256',
        name: '_shares',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'bool',
        name: '_roundUp',
        type: 'bool',
      },
      {
        internalType: 'bool',
        name: '_previewInterest',
        type: 'bool',
      },
    ],
    name: 'toBorrowShares',
    outputs: [
      {
        internalType: 'uint256',
        name: '_shares',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_shares',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_receiver',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'redeem',
    outputs: [
      {
        internalType: 'uint256',
        name: '_amountToReturn',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'deposit',
    inputs: [
      {
        'internalType': 'uint256',
        'name': '_amount',
        'type': 'uint256',
      },
      {
        'internalType': 'address',
        'name': '_receiver',
        'type': 'address',
      },
    ],
    outputs: [
      {
        'internalType': 'uint256',
        'name': '_sharesReceived',
        'type': 'uint256',
      },
    ],
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_collateralAmount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_borrower',
        type: 'address',
      },
    ],
    name: 'addCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_collateralAmount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_receiver',
        type: 'address',
      },
    ],
    name: 'removeCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_shares',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_borrower',
        type: 'address',
      },
    ],
    name: 'repayAsset',
    outputs: [
      {
        internalType: 'uint256',
        name: '_amountToRepay',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_borrowAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_collateralAmount',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_receiver',
        type: 'address',
      },
    ],
    name: 'borrowAsset',
    outputs: [
      {
        internalType: 'uint256',
        name: '_shares',
        type: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];

const SturdyHandler = (props: any) => {
  const { update, data, amount, onLoad, provider, account } = props;

  const handleConvertToShares = (_amount: any) => {
    const contract = new ethers.Contract(
      data.address,
      CTOKEN_ABI,
      provider.getSigner(),
    );

    return new Promise((resolve) => {
      contract
        .convertToShares(_amount)
        .then((res: any) => {
          resolve(res);
        })
        .catch((err: any) => {
          resolve(false);
          console.log('handleConvertToShares-error', err);
        });
    });
  };

  const handleToBorrowShares = (_amount: any) => {
    const contract = new ethers.Contract(
      data.address,
      CTOKEN_ABI,
      provider.getSigner(),
    );

    return new Promise((resolve) => {
      contract
        .toBorrowShares(_amount, true, true)
        .then((res: any) => {
          resolve(res);
        })
        .catch((err: any) => {
          resolve(false);
          console.log('handleToBorrowShares-error', err);
        });
    });
  };

  const handleTx = async () => {
    if (!data.actionText || !data.underlyingToken || !update || !data.address || !amount) return;

    let curToken = '';
    if (['Add Collateral', 'Remove Collateral'].includes(data.actionText)) {
      curToken = 'underlyingToken';
    }
    if (['Borrow', 'Repay', 'Deposit', 'Withdraw'].includes(data.actionText)) {
      curToken = 'borrowToken';
    }

    const tokenSymbol = data[curToken].symbol;
    const tokenDecimals = data[curToken].decimals;
    const tokenAddr = data[curToken].address;
    const spender = data.address;
    const isETH = data[curToken].isNative;

    let options = {};
    let params: any = [];
    let method = '';

    const parsedAmount = ethers.utils.parseUnits(
      Big(amount).toFixed(tokenDecimals).toString(),
      tokenDecimals,
    );

    options = {
      value:
        isETH && (data.actionText === 'Deposit' || data.actionText === 'Repay')
          ? parsedAmount
          : 0,
      gasLimit: 4000000,
    };

    const contract = new ethers.Contract(
      spender,
      CTOKEN_ABI,
      provider.getSigner(),
    );

    if (data.actionText === 'Withdraw') {
      const shares = await handleConvertToShares(parsedAmount);
      if (!shares) return;
      method = 'redeem';
      params = [shares, account, account];
    }

    if (data.actionText === 'Deposit') {
      method = 'deposit';
      params = [parsedAmount, account];
    }

    if (data.actionText === 'Add Collateral') {
      method = 'addCollateral';
      params = [parsedAmount, account];
    }

    if (data.actionText === 'Remove Collateral') {
      method = 'removeCollateral';
      params = [parsedAmount, account];
    }

    if (data.actionText === 'Repay') {
      let repayAmount: any;
      if (Big(amount).eq(Big(data.yourBorrow))) {
        repayAmount = data.yourBorrowShares || 0;
      } else {
        repayAmount = await handleToBorrowShares(parsedAmount);
      }
      method = 'repayAsset';
      params = [repayAmount, account];
    }

    if (data.actionText === 'Borrow') {
      method = 'borrowAsset';
      params = [parsedAmount, 0, account];
    }

    if (!contract) return;

    const createTx = (gas?: any) => {
      const _gas = gas ? Big(gas.toString()).mul(1.2).toFixed(0) : 4000000;
      contract.populateTransaction[method](...params, {
        ...options,
        gasLimit: _gas,
      })
        .then((res: any) => {
          onLoad({
            gas: _gas,
            unsignedTx: res,
            isError: false,
          });
        })
        .catch((err: any) => {
          console.log('createTx failure: %o', err);
          onLoad({});
        });
    };

    contract.estimateGas[method](...params, options)
      .then((gas: any) => {
        console.log('estimateGas', gas);
        createTx(gas);
      })
      .catch((err: any) => {
        console.log('estimateGasError: %o', err);
        createTx();
      });
  };

  useEffect(() => {
    handleTx();
  }, [update, amount, provider, data.actionText]);

  return null;
};

export default SturdyHandler;
