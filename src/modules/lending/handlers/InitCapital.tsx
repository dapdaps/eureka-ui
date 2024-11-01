import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect } from 'react';

import { OTOKEN_ABI } from '../components/InitCapital/Abi';
const MONEY_MARKET_HOOK_ABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'posId',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'viewer',
            type: 'address'
          },
          {
            internalType: 'uint16',
            name: 'mode',
            type: 'uint16'
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'pool',
                type: 'address'
              },
              {
                internalType: 'uint256',
                name: 'amt',
                type: 'uint256'
              },
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'helper',
                    type: 'address'
                  },
                  {
                    internalType: 'address',
                    name: 'tokenIn',
                    type: 'address'
                  }
                ],
                internalType: 'struct IMoneyMarketHook.RebaseHelperParams',
                name: 'rebaseHelperParams',
                type: 'tuple'
              }
            ],
            internalType: 'struct IMoneyMarketHook.DepositParams[]',
            name: 'depositParams',
            type: 'tuple[]'
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'pool',
                type: 'address'
              },
              {
                internalType: 'uint256',
                name: 'shares',
                type: 'uint256'
              },
              {
                components: [
                  {
                    internalType: 'address',
                    name: 'helper',
                    type: 'address'
                  },
                  {
                    internalType: 'address',
                    name: 'tokenIn',
                    type: 'address'
                  }
                ],
                internalType: 'struct IMoneyMarketHook.RebaseHelperParams',
                name: 'rebaseHelperParams',
                type: 'tuple'
              },
              {
                internalType: 'address',
                name: 'to',
                type: 'address'
              }
            ],
            internalType: 'struct IMoneyMarketHook.WithdrawParams[]',
            name: 'withdrawParams',
            type: 'tuple[]'
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'pool',
                type: 'address'
              },
              {
                internalType: 'uint256',
                name: 'amt',
                type: 'uint256'
              },
              {
                internalType: 'address',
                name: 'to',
                type: 'address'
              }
            ],
            internalType: 'struct IMoneyMarketHook.BorrowParams[]',
            name: 'borrowParams',
            type: 'tuple[]'
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'pool',
                type: 'address'
              },
              {
                internalType: 'uint256',
                name: 'shares',
                type: 'uint256'
              }
            ],
            internalType: 'struct IMoneyMarketHook.RepayParams[]',
            name: 'repayParams',
            type: 'tuple[]'
          },
          {
            internalType: 'uint256',
            name: 'minHealth_e18',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'returnNative',
            type: 'bool'
          }
        ],
        internalType: 'struct IMoneyMarketHook.OperationParams',
        name: '_params',
        type: 'tuple'
      }
    ],
    name: 'execute',
    outputs: [
      {
        internalType: 'uint256',
        name: 'posId',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'initPosId',
        type: 'uint256'
      },
      {
        internalType: 'bytes[]',
        name: 'results',
        type: 'bytes[]'
      }
    ],
    stateMutability: 'payable',
    type: 'function'
  }
];

const InitCapitalHandler = (props: Props) => {
  const { update, data, amount, onLoad, provider, account } = props;

  const { MONEY_MARKET_HOOK } = data.config;

  const getShares = async (parsedAmount, method: 'toShares' | 'debtAmtToShareStored') => {
    const contract = new ethers.Contract(data?.address, OTOKEN_ABI, provider?.getSigner());
    const result = await contract[method](parsedAmount);
    const shares = ethers.utils.formatUnits(result, data?.underlyingToken?.decimals);
    return ethers.utils.parseUnits(
      Big(shares).toFixed(data?.underlyingToken.decimals).toString(),
      data?.underlyingToken.decimals
    );
  };
  const getEstimateGas = async () => {
    const isBorrow = data.actionText.includes('Borrow');
    if (!data.actionText || !data.underlyingToken) return;
    const isETH = data.underlyingToken.isNative;
    let options = {};
    const params: any = [
      [
        data?.sequence ? data?.sequence : '0',
        account,
        '1',
        [],
        [],
        [],
        [],
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
        'true'
      ]
    ];
    let method = '';
    let contract: any = null;

    if (['Deposit', 'Repay', 'Withdraw', 'Borrow', 'Deposit and Borrow'].includes(data.actionText)) {
      if (!data.address || !amount) {
        return;
      }

      const parsedAmount = ethers.utils.parseUnits(
        Big(amount).toFixed(data.underlyingToken.decimals).toString(),
        data.underlyingToken.decimals
      );
      options = {
        value: (isETH && data.actionText === 'Deposit') || data.actionText === 'Repay' ? parsedAmount : 0
      };
      contract = new ethers.Contract(MONEY_MARKET_HOOK, MONEY_MARKET_HOOK_ABI, provider.getSigner());
      if (data.actionText === 'Deposit') {
        method = 'execute';
        const depositParams = [
          [
            data?.address,
            parsedAmount,
            ['0x0000000000000000000000000000000000000000', '0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111']
          ]
        ];
        params[0][3] = depositParams;
      }
      if (data.actionText === 'Withdraw') {
        method = 'execute';
        const shares = await getShares(parsedAmount, 'toShares');
        const withdrawParams = [
          [
            data?.address,
            shares,
            ['0x0000000000000000000000000000000000000000', '0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111'],
            account
          ]
        ];
        params[0][4] = withdrawParams;
      }

      if (data.actionText === 'Deposit and Borrow') {
        method = 'execute';
        const { borrowAmount, currentBorrowToken } = data;

        const depositParams = [
          [
            data?.address,
            parsedAmount,
            ['0x0000000000000000000000000000000000000000', '0xdeaddeaddeaddeaddeaddeaddeaddeaddead1111']
          ]
        ];
        params[0][3] = depositParams;
        if (Big(borrowAmount ? borrowAmount : 0).gt(0)) {
          const parsedBorrowAmount = ethers.utils.parseUnits(
            Big(borrowAmount).toFixed(currentBorrowToken.decimals).toString(),
            currentBorrowToken.decimals
          );
          const borrowParams = [[currentBorrowToken?.underlyingAddress, parsedBorrowAmount, account]];
          params[0][5] = borrowParams;
          if (isFinite(data?.healthFactor)) {
            params[0][7] = ethers.utils.parseUnits(Big(data?.healthFactor).times(0.97).toFixed(18).toString(), 18);
          }
        }
      }

      if (data.actionText === 'Borrow') {
        method = 'execute';
        const borrowParams = [[data?.address, parsedAmount, account]];
        params[0][5] = borrowParams;
        params[0][7] = ethers.utils.parseUnits(Big(1.02).times(0.97).toFixed(18).toString(), 18);
      }
      if (data.actionText === 'Repay') {
        method = 'execute';
        const shares = await getShares(parsedAmount, 'debtAmtToShareStored');
        console.log('====shares', shares.toString());
        const repayParams = [[data?.address, shares]];
        params[0][6] = repayParams;
      }

      if (isFinite(data?.healthFactor)) {
        params[0][7] = ethers.utils.parseUnits(Big(data?.healthFactor).times(0.97).toFixed(18).toString(), 18);
      }
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

    console.log('===method', method);
    console.log('===params', params);
    contract.estimateGas[method](...params, options)
      .then((gas: any) => {
        createTx(gas);
      })
      .catch((err: any) => {
        console.log('estimateGasError', err);
        createTx();
      });
  };
  const { run: debounceGetEstimateGas } = useDebounceFn(getEstimateGas, { wait: 500 });

  useEffect(() => {
    debounceGetEstimateGas();
  }, [update]);

  return null;
};

export default InitCapitalHandler;

export interface Props {
  update?: boolean | number;
  data: any;
  amount: string;
  provider: any;

  onLoad(data: Record<any, any>): void;
}
