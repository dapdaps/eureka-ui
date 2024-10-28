import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

const abi = [
  {
    inputs: [
      { internalType: 'address', name: 'asset', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'address', name: 'onBehalfOf', type: 'address' },
      { internalType: 'uint16', name: 'referralCode', type: 'uint16' }
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'asset', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'address', name: 'to', type: 'address' }
    ],
    name: 'withdraw',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'asset', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'interestRateMode', type: 'uint256' },
      { internalType: 'uint16', name: 'referralCode', type: 'uint16' },
      { internalType: 'address', name: 'onBehalfOf', type: 'address' }
    ],
    name: 'borrow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'asset', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' },
      { internalType: 'uint256', name: 'rateMode', type: 'uint256' },
      { internalType: 'address', name: 'onBehalfOf', type: 'address' }
    ],
    name: 'repay',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'asset', type: 'address' },
      { internalType: 'bool', name: 'useAsCollateral', type: 'bool' }
    ],
    name: 'setUserUseReserveAsCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

const LENDING_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'asset', type: 'address' },
      { internalType: 'bool', name: 'useAsCollateral', type: 'bool' }
    ],
    name: 'setUserUseReserveAsCollateral',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

const wethGateWayAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'weth',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
  },
  {
    stateMutability: 'payable',
    type: 'fallback'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'lendingPool',
        type: 'address'
      }
    ],
    name: 'authorizeLendingPool',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'lendingPool',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'interesRateMode',
        type: 'uint256'
      },
      {
        internalType: 'uint16',
        name: 'referralCode',
        type: 'uint16'
      }
    ],
    name: 'borrowETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'lendingPool',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'onBehalfOf',
        type: 'address'
      },
      {
        internalType: 'uint16',
        name: 'referralCode',
        type: 'uint16'
      }
    ],
    name: 'depositETH',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'emergencyEtherTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'token',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'emergencyTokenTransfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getWETHAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'lendingPool',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'rateMode',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'onBehalfOf',
        type: 'address'
      }
    ],
    name: 'repayETH',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'lendingPool',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      }
    ],
    name: 'withdrawETH',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    stateMutability: 'payable',
    type: 'receive'
  }
];

export default function RadiantHandlers(props: any) {
  const { update, data, amount, account, onLoad, provider } = props;

  useEffect(() => {
    const isCollateral = data.actionText.includes('Collateral');
    if (!data.actionText || !data.underlyingToken) return;

    if (!isCollateral && !update) return;

    let params: any[] = [];

    let method = '';

    let contract: any = null;

    const isETH = data.underlyingToken.isNative;

    let options = {};
    if (['Deposit', 'Repay', 'Withdraw', 'Borrow'].includes(data.actionText)) {
      if (
        !amount ||
        !data.actionText ||
        !data.config.wethGateway ||
        !data.config.lendingPoolAddress ||
        !account ||
        !data.underlyingToken ||
        !data.variableDebtTokenAddress
      ) {
        return;
      }
      const addressTo = isETH ? data.config.lendingPoolAddress : data.underlyingToken.address;

      if (!amount || isNaN(Number(amount))) {
        console.error('Invalid amount');
        return;
      }

      if (!data.underlyingToken.decimals || typeof data.underlyingToken.decimals !== 'number') {
        console.error('Invalid token decimals');
        return;
      }

      let formattedAmount = amount;

      const parts = formattedAmount.split('.');
      if (parts[1] && parts[1].length > data.underlyingToken.decimals) {
        formattedAmount = `${parts[0]}.${parts[1].slice(0, data.underlyingToken.decimals)}`;
      }

      const parsedAmount = ethers.utils.parseUnits(formattedAmount, data.underlyingToken.decimals);

      options = {
        value: isETH && ['Repay', 'Deposit'].includes(data.actionText) ? parsedAmount : 0,
        gasLimit: 4000000
      };

      if (data.actionText === 'Deposit') {
        method = isETH ? 'depositETH' : 'deposit';

        params = isETH ? [addressTo, account, 0] : [addressTo, parsedAmount, account, 0];
      }
      if (data.actionText === 'Withdraw') {
        method = isETH ? 'withdrawETH' : 'withdraw';

        params = [addressTo, parsedAmount, account];
      }
      if (data.actionText === 'Borrow') {
        method = isETH ? 'borrowETH' : 'borrow';

        params = isETH ? [addressTo, parsedAmount, 2, 0] : [addressTo, parsedAmount, 2, 0, account];
      }
      if (data.actionText === 'Repay') {
        method = isETH ? 'repayETH' : 'repay';

        params = [addressTo, parsedAmount, 2, account];
      }

      contract = new ethers.Contract(
        isETH ? data.config.wethGateway : data.config.lendingPoolAddress,
        isETH ? wethGateWayAbi : abi,
        provider.getSigner()
      );
    }
    if (isCollateral) {
      if (!data.config.lendingPoolAddress || !data.underlyingToken) return;
      const isEnter = data.actionText === 'Enable as Collateral';
      contract = new ethers.Contract(data.config.lendingPoolAddress, LENDING_ABI, provider.getSigner());

      method = 'setUserUseReserveAsCollateral';

      params = [data.underlyingToken.address, isEnter];
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
        console.log('estimateGas', err);
        createTx();
      });
  }, [update, data, amount]);
}
