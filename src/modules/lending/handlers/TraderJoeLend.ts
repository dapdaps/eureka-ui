import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

const CTOKEN_ABI = [
  {
    constant: false,
    inputs: [{ internalType: 'uint256', name: 'mintAmount', type: 'uint256' }],
    name: 'mint',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'redeemAmount', type: 'uint256' }],
    name: 'redeemUnderlying',
    outputs: [],
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
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

const UNITROLLER_ABI = [
  {
    constant: false,
    inputs: [{ internalType: 'address[]', name: 'qiTokens', type: 'address[]' }],
    name: 'enterMarkets',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    constant: false,
    inputs: [{ internalType: 'address', name: 'qiTokenAddress', type: 'address' }],
    name: 'exitMarket',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

export default function TraderJoeLendHandler(props: any) {
  const { update, data, amount, account, onLoad, provider } = props;

  useEffect(() => {
    const isCollateral = data.actionText.includes('Collateral');
    if (!data.actionText || !data.underlyingToken) return;

    if (!isCollateral && !update) return;

    const isETH = data.underlyingToken.isNative;

    let options = {};
    let params: any = [];
    let method = '';
    let contract: any = null;

    if (['Deposit', 'Repay', 'Withdraw', 'Borrow'].includes(data.actionText)) {
      if (!data.address || !amount) {
        return;
      }

      const parsedAmount = ethers.utils.parseUnits(amount, data.underlyingToken.decimals);

      options = {
        value: isETH && (data.actionText === 'Deposit' || data.actionText === 'Repay') ? parsedAmount : 0,
        gasLimit: 4000000
      };

      const CNativeTokenContract = new ethers.Contract(
        data.address,
        [
          {
            inputs: [],
            name: 'mint',
            outputs: [],
            stateMutability: 'payable',
            type: 'function'
          },
          {
            inputs: [],
            name: 'repayBorrow',
            outputs: [],
            stateMutability: 'payable',
            type: 'function'
          }
        ],
        provider.getSigner()
      );

      const CTokenContract = new ethers.Contract(data.address, CTOKEN_ABI, provider.getSigner());

      contract = CTokenContract;

      if (data.actionText === 'Deposit') {
        contract = isETH ? CNativeTokenContract : CTokenContract;
        method = 'mint';
        params = isETH ? [] : [parsedAmount];
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
        contract = isETH ? CNativeTokenContract : CTokenContract;
        method = 'repayBorrow';
        params = isETH ? [] : [parsedAmount];
      }
    }
    if (isCollateral) {
      const isEnter = data.actionText === 'Enable as Collateral';

      contract = new ethers.Contract(data.config.unitrollerAddress, UNITROLLER_ABI, provider.getSigner());

      method = isEnter ? 'enterMarkets' : 'exitMarket';

      params = isEnter ? [[data.address]] : [data.address];
    }

    if (!contract) return;

    const createTx = (gas?: number) => {
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
      .then((gas: number | undefined) => {
        createTx(gas);
      })
      .catch((err: any) => {
        console.log('estimateGas', err);
        createTx();
      });
  }, [update]);

  return null;
}
