import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

import useAccount from '@/hooks/useAccount';

const COMET_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'asset', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'asset', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'supply',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'manager', type: 'address' },
      { internalType: 'bool', name: 'isAllowed', type: 'bool' }
    ],
    name: 'allow',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' }
    ],
    name: 'isAllowed',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  }
];
const BULKER_ABI = [
  {
    inputs: [
      { internalType: 'bytes32[]', name: 'actions', type: 'bytes32[]' },
      { internalType: 'bytes[]', name: 'data', type: 'bytes[]' }
    ],
    name: 'invoke',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  }
];

const CompoundV3Handler = (props: any) => {
  const {
    update,
    actions,
    bulkerActionCodes,
    comet,
    bulkerAddress,
    wethAddress,
    account,
    onLoad,
    onCancel,
    chainId,
    provider
  } = props;

  const TYPE_MAP: any = {
    Collateral: 'Supply',
    Borrow: 'Withdraw',
    Repay: 'Supply',
    Supply: 'Supply',
    Withdraw: 'Withdraw'
  };

  useEffect(() => {
    if (!update || !actions.length) return;
    const CometContract = new ethers.Contract(comet.address, COMET_ABI, provider.getSigner());
    const BulkerContract = new ethers.Contract(bulkerAddress, BULKER_ABI, provider.getSigner());

    const getActionAmount = (action: any) => Big(action.amount).mul(Big(10).pow(action.asset.decimals)).toFixed(0);

    const buildTx = ({ contract, method, params, options }: any) => {
      const _contract = contract === 'comet' ? CometContract : BulkerContract;
      const createTx = (gas?: any) => {
        const _gas = gas ? Big(gas.toString()).mul(1.2).toFixed(0) : 4000000;
        _contract.populateTransaction[method](...params, {
          ...options,
          gasLimit: _gas
        })
          .then((res) => {
            onLoad({
              gas: _gas,
              unsignedTx: {
                ...res,
                gasLimit: gas
              },
              isError: false
            });
          })
          .catch((err) => {
            console.log(err);
            onLoad({});
          });
      };
      _contract.estimateGas[method](...params, options)
        .then((gas) => {
          createTx(gas);
        })
        .catch((err) => {
          console.log('estimateGas', err);
          createTx();
        });
    };

    if (actions.length === 1) {
      const action = actions[0];
      const actionType = TYPE_MAP[action.type];
      const _amount = getActionAmount(action);
      if (!action.asset.isNative) {
        buildTx({
          contract: 'comet',
          method: actionType === 'Supply' ? 'supply' : 'withdraw',
          params: [action.asset.address, _amount],
          options: {}
        });
        return;
      }
    }

    const checkAllowed = (cb: any) => {
      CometContract.isAllowed(account, bulkerAddress)
        .then((res: any) => {
          if (res) {
            cb?.();
          } else {
            CometContract.allow(bulkerAddress, true)
              .then((tx: any) => {
                tx.wait()
                  .then((res: any) => {
                    if (res.status === 1) {
                      cb?.();
                    }
                  })
                  .catch(() => {
                    onCancel?.();
                  });
              })
              .catch((err: any) => {
                onCancel?.();
              });
          }
        })
        .catch((err: any) => {
          console.log('check allowed err', err);
          onCancel?.();
        });
    };

    checkAllowed(() => {
      try {
        const codes: any = [];
        const callDatas: any = [];
        let value = Big(0);
        actions.forEach((action: any) => {
          const _amount = getActionAmount(action);
          const actionType = TYPE_MAP[action.type];
          if (actionType === 'Supply') {
            codes.push(
              action.asset.isNative
                ? bulkerActionCodes.ACTION_SUPPLY_NATIVE_TOKEN
                : bulkerActionCodes.ACTION_SUPPLY_ASSET
            );
            if (action.asset.isNative) value = value.add(_amount);
          }
          if (actionType === 'Withdraw') {
            codes.push(
              action.asset.isNative
                ? bulkerActionCodes.ACTION_WITHDRAW_NATIVE_TOKEN
                : bulkerActionCodes.ACTION_WITHDRAW_ASSET
            );
          }

          const callData = ethers.utils.defaultAbiCoder.encode(
            action.asset.isNative ? ['address', 'address', 'uint'] : ['address', 'address', 'address', 'uint'],
            action.asset.isNative
              ? [comet.address, account, _amount]
              : [comet.address, account, action.asset.address, _amount]
          );
          callDatas.push(callData);
        });

        buildTx({
          contract: 'bulker',
          method: 'invoke',
          params: [codes, callDatas],
          options: { value: value.toFixed(0) }
        });
      } catch (err) {
        console.log('build tx error');
      }
    });
  }, [update]);

  return null;
};

export default CompoundV3Handler;
