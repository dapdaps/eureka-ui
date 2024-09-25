import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

const CErc20_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'gToken', type: 'address' },
      { internalType: 'uint256', name: 'uAmount', type: 'uint256' }
    ],
    name: 'supply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function'
  },
  //
  {
    inputs: [{ internalType: 'uint256', name: 'mintAmount', type: 'uint256' }],
    name: 'mint',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'borrowAmount', type: 'uint256' }],
    name: 'borrow',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'repayAmount', type: 'uint256' }],
    name: 'repayBorrow',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint256', name: 'redeemAmount', type: 'uint256' }],
    name: 'redeemUnderlying',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
const CEther_ABI = [
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

const OrbitProtocolHandler = (props: any) => {
  const { update, display, data, curPool, amount, account, onLoad, provider } = props;

  useEffect(() => {
    const isCollateral = data.actionText.includes('Collateral');
    console.log('HANDLER--', isCollateral, props);
    if (!data.actionText || !data.underlyingToken) return;

    if (!isCollateral && !update) return;

    const isETH = data.underlyingToken.isNative;
    let spaceAddress;
    const { ORBIT_ADDRESS, REOZO_ADDRESS, MOON_MARKETS, MOON_ADDRESS, KELP_ADDRESS } = data.config;
    if (curPool === 'ORBIT') {
      spaceAddress = ORBIT_ADDRESS;
    }
    if (curPool === 'RENZO') {
      spaceAddress = REOZO_ADDRESS;
    }
    if (curPool === 'MOON') {
      spaceAddress = MOON_ADDRESS;
    }

    let options: any = {};
    let params: any = [];
    let method: any = '';
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
        value: isETH && (data.actionText === 'Deposit' || data.actionText === 'Repay') ? parsedAmount : 0,
        gasLimit: 4000000
      };
      const CEtherContract = new ethers.Contract(data.address, CEther_ABI, provider.getSigner());
      const CErc20Contract = new ethers.Contract(data.address, CErc20_ABI, provider.getSigner());

      contract = CErc20Contract;

      if (data.actionText === 'Deposit') {
        contract = isETH ? CEtherContract : CErc20Contract;
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
        contract = isETH ? CEtherContract : CErc20Contract;
        method = 'repayBorrow';
        params = isETH ? [] : [parsedAmount];
      }
    }

    if (isCollateral) {
      if (!data.underlyingToken) return;
      const isEnter = data.actionText === 'Enable as Collateral';
      contract = new ethers.Contract(spaceAddress, UNITROLLER_ABI, provider.getSigner());

      method = isEnter ? 'enterMarkets' : 'exitMarket';

      params = isEnter ? [[data.address]] : [data.address];
    }

    if (!contract) return;

    const createTx = (gas?: any) => {
      const _gas = gas ? Big(gas.toString()).mul(1.2).toFixed(0) : 4000000;

      contract.populateTransaction[method](...params, {
        ...options,
        gasLimit: 4000000
      })
        .then((res: any) => {
          onLoad({
            gas: 4000000,
            unsignedTx: res,
            isError: false
          });
        })
        .catch((err: any) => {
          console.log('CATCH_createTx:', err);
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
  }, [update, display, curPool]);

  return null;
};

export default OrbitProtocolHandler;
