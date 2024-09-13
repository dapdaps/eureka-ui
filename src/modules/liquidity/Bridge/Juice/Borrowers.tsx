// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';
import styled from 'styled-components';

import { useMultiState } from '@/modules/hooks';

import Loading from '../../Bridge/Loading';
const StyledContainer = styled.div`
  width: 1000px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
  /* flex-direction: column; */
`;
const StyledContainerL = styled.div`
  /* width: 490px;
  border-radius: 16px;
  border: 1px solid #373A53;
  background: #262836; */
`;
const StyledCategory = styled.div`
  width: 490px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #262836;
`;
const StyledCategoryTop = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #373a53;
`;
const StyledCategoryTopButton = styled.div`
  position: relative;
  flex: 1;
  padding: 22px 0;
  text-align: center;
  color: #979abe;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  &.active {
    color: #fff;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 4px;
      background: #b968f3;
    }
  }
`;
const StyledCategoryBottom = styled.div``;
const StyledDepositContainer = styled.div`
  padding: 19px 20px 16px;
`;
const StyledDepositInput = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #1b1e27;
  height: 71px;
`;
const StyledDepositInputTop = styled.div`
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledDepositInputBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
`;
const StyledDepositInputTopType = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledDepositInputTopBalance = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  span {
    cursor: pointer;
    color: #fff;
    text-decoration-line: underline;
  }
`;
const StyledDepositInputBottomInput = styled.input`
  padding: 0;
  border: none;
  outline: none;
  background: transparent;

  flex: 1;
  color: #fff;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;
const StyledDepositInputBottomSymbol = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const StyledDepositInputBottomSymbolImageContainer = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  overflow: hidden;
`;
const StyledDepositInputBottomSymbolImage = styled.img`
  width: 100%;
  height: 100%;
`;
const StyledDepositInputBottomSymbolTxt = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledDepositInputBottomInputTxt = styled.div`
  color: #5e617e;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const StyledDepositMessageList = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;
const StyledDepositMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledDepositMessageLabel = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledDepositMessageValue = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledEmptyContainer = styled.div`
  width: 490px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #262836;
  padding: 55px 16px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledEmptyImage = styled.img`
  width: 150px;
`;
const StyledEmptyTxt = styled.div`
  margin: 30px 0 24px;
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`;

const StyledOperationButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  flex-shrink: 0;
  border-radius: 8px;
  cursor: pointer;
  background: var(--button-color);

  color: var(--button-text-color);
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;
const StyledContainerR = styled.div`
  width: 490px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #262836;
`;
const StyledOverviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
`;
const StyledOverview = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledOverviewTitle = styled.div`
  padding: 21px 20px 23px;
  color: #fff;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-bottom: 1px solid #373a53;
`;
const StyledOverviewLabel = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledOverviewValue = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledOverviewButtonContainer = styled.div`
  padding: 0 16px 16px;
`;
const StyledWrapContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding: 10px 16px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #373a53;
  cursor: pointer;
`;
const StyledWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const StyledWrapChainList = styled.div`
  display: flex;
  align-items: center;
`;
const StyledChainImage = styled.img`
  width: 20px;
`;
const StyledWrapTxt = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%; /* 21px */
`;
const StyledIconRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default memo(function Borrowers(props: any) {
  const [state, updateState] = useMultiState<any>({
    categoryList: ['Deposit', 'Withdraw', 'Borrow', 'Repay'],
    categoryIndex: 0,
    accountOverview: null,
    inDepositAmount: '',
    inWithdrawAmount: '',
    inBorrowAmount: '',
    inRepayAmount: '',
    depositLoading: false,
    withdrawLoading: false,
    borrowLoading: false,
    repayLoading: false,
    depositApproved: true,
    depositApproving: false,
    repayApproved: true,
    repayApproving: false,
    withRevert: false,
    balances: {
      deposit: 0,
      withdraw: 0,
      borrow: 0,
      repay: 0,
      firstRepay: 0,
      secondRepay: 0
    },
    pnl: 0,
    borrowLeverage: ''
  });
  const { categoryList, categoryIndex } = state;

  const {
    toast,
    sender,
    provider,
    prices,
    symbolIndex,
    addAction,
    multicall,
    multicallAddress,
    isCreatedAccount,
    createSubAccountLoading,
    ICON_MAP,
    PROXY_ADDRESS,
    SYMBOL_ADDRESS,
    SYMBOL_NAME_MAPPING,
    LENDING_POOL_ADDRESS,
    smartContractAddress,
    onCreateSubAccount,
    onOpenWrap
  } = props;

  const FIRST_SYMBOL_ADDRESS = typeof SYMBOL_ADDRESS === 'string' ? SYMBOL_ADDRESS : SYMBOL_ADDRESS[0];
  const SECOND_SYMBOL_ADDRESS = typeof SYMBOL_ADDRESS === 'string' ? SYMBOL_ADDRESS : SYMBOL_ADDRESS[1];
  const FIRST_SYMBOL_NAME = SYMBOL_NAME_MAPPING[symbolIndex][0];
  const SECOND_SYMBOL_NAME = SYMBOL_NAME_MAPPING[symbolIndex][1];

  const SYMBOL_ADDRESS_ABI = [
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
          name: 'value',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    }
  ];
  const GET_ACCOUNT_HEALTH_ABI =
    symbolIndex === 1
      ? {
          inputs: [
            {
              internalType: 'address',
              name: 'account',
              type: 'address'
            }
          ],
          name: 'getAccountHealth',
          outputs: [
            {
              components: [
                {
                  internalType: 'uint256',
                  name: 'debtAmount',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256',
                  name: 'collateralValue',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256',
                  name: 'investmentValue',
                  type: 'uint256'
                },
                {
                  internalType: 'bool',
                  name: 'isLiquidatable',
                  type: 'bool'
                },
                {
                  internalType: 'bool',
                  name: 'hasBadDebt',
                  type: 'bool'
                }
              ],
              internalType: 'struct AccountLib.Health',
              name: 'health',
              type: 'tuple'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        }
      : {
          inputs: [
            {
              internalType: 'address',
              name: 'account',
              type: 'address'
            }
          ],
          name: 'getAccountHealth',
          outputs: [
            {
              components: [
                {
                  internalType: 'uint256',
                  name: 'debtAmount',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256',
                  name: 'collateralValue',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256',
                  name: 'investmentValue',
                  type: 'uint256'
                },
                {
                  internalType: 'UD60x18',
                  name: 'healthFactor',
                  type: 'uint256'
                },
                {
                  internalType: 'bool',
                  name: 'isLiquidatable',
                  type: 'bool'
                },
                {
                  internalType: 'bool',
                  name: 'isRisky',
                  type: 'bool'
                },
                {
                  internalType: 'bool',
                  name: 'hasBadDebt',
                  type: 'bool'
                }
              ],
              internalType: 'struct AccountLib.Health',
              name: 'health',
              type: 'tuple'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        };
  const PROXY_ADDRESS_ABI = [
    GET_ACCOUNT_HEALTH_ABI,
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'getTotalCollateralValue',
      outputs: [
        {
          internalType: 'uint256',
          name: 'totalValue',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'getDebtAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'balanceOfAssets',
      outputs: [
        {
          internalType: 'uint256',
          name: 'assets',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address'
        }
      ],
      name: 'getTotalAccountValue',
      outputs: [
        {
          internalType: 'uint256',
          name: 'totalValue',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address'
        }
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: 'result',
          type: 'uint256'
        }
      ],
      stateMutability: 'view',
      type: 'function'
    }
  ];

  const isDepositInSufficient = Number(state?.inDepositAmount ?? 0) > Number(state?.balances.deposit ?? 0);
  const isWithdrawInSufficient = Number(state?.inWithdrawAmount ?? 0) > Number(state?.balances.withdraw ?? 0);
  const isBorrowInSufficient = Number(state?.inBorrowAmount ?? 0) > Number(state?.balances.borrow ?? 0);
  const isRepayInSufficient = Number(state?.inRepayAmount ?? 0) > Number(state?.balances.secondRepay ?? 0);
  function isNotEmptyArray(value) {
    return value && value[0];
  }
  function getValue(value) {
    return value ? value : 0;
  }
  function handleCheckApprove(amount) {
    const _amount = Big(amount).mul(Big(10).pow(18)).toFixed(0);
    const abi = [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'owner',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'spender',
            type: 'address'
          }
        ],
        name: 'allowance',
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
    if (categoryIndex === 0) {
      const contract = new ethers.Contract(FIRST_SYMBOL_ADDRESS, abi, provider);
      contract.allowance(sender, PROXY_ADDRESS).then((allowance) => {
        updateState({
          depositApproved: !new Big(allowance.toString()).lt(_amount)
        });
      });
    }
    if (categoryIndex === 3) {
      updateState({
        repayApproved: Big(state.accountOverview?.firstBalance ?? 0).gt(amount)
      });
    }
  }
  function handleInAmountChange(amount) {
    const keyArray = ['inDepositAmount', 'inWithdrawAmount', 'inBorrowAmount', 'inRepayAmount'];
    if (Number(amount) < 0) {
      return;
    }
    if (Number(amount) === 0) {
      updateState({
        [keyArray[categoryIndex]]: amount
      });
      if (categoryIndex === 0) {
        updateState({
          depositApproved: true,
          depositApproving: false
        });
      }
      if (categoryIndex === 3) {
        updateState({
          repayApproved: true,
          repayApproving: false
        });
      }
      return;
    }
    updateState({
      [keyArray[categoryIndex]]: amount
    });

    if (categoryIndex === 0 || categoryIndex === 3) {
      handleCheckApprove(amount);
    }
    if (categoryIndex === 1) {
      const abi = [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'shares',
              type: 'uint256'
            },
            {
              internalType: 'address',
              name: 'receiver',
              type: 'address'
            }
          ],
          name: 'withdraw',
          outputs: [
            {
              internalType: 'uint256',
              name: 'updatedAssets',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'updatedShares',
              type: 'uint256'
            }
          ],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ];
      const contract = new ethers.Contract(ethers.utils.getAddress(PROXY_ADDRESS), abi, provider.getSigner());
      const _amount = Big(amount).mul(Big(10).pow(18)).toFixed(0);
      getShares(_amount).then((sharesResult) => {
        const shares = sharesResult[1];
        contract.callStatic
          .withdraw(shares, sender)
          .then((result) => {
            updateState({
              withRevert: false
            });
          })
          .catch((error) => {
            updateState({
              withRevert: true
            });
          });
      });
    }
  }
  function doApprove(amount, APPROVE_ADDRESS, onSuccess, onError) {
    const toastId = toast?.loading({
      title: `Approve ${symbol}`
    });
    const abi = [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'spender',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          }
        ],
        name: 'approve',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool'
          }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ];
    const contract = new ethers.Contract(ethers.utils.getAddress(FIRST_SYMBOL_ADDRESS), abi, provider.getSigner());
    const _amount = Big(amount).mul(Big(10).pow(18)).toFixed(0);
    contract
      .approve(APPROVE_ADDRESS, _amount)
      .then((tx) => tx.wait())
      .then((result) => {
        const { transactionHash } = result;
        toast?.dismiss(toastId);
        toast?.success({
          title: 'Approve Successfully!',
          // text: `Approved ${amount} ${symbol}`,
          tx: transactionHash,
          chainId
        });
        onSuccess && onSuccess();
      })
      .catch((error) => {
        onError && onError();
        toast?.fail({
          title: 'Approve Failed!',
          text: error?.message?.includes('user rejected transaction') ? 'User rejected transaction' : null
        });
      });
  }
  function handleApprove() {
    // deposit approve
    if (categoryIndex === 0) {
      updateState({
        depositApproving: true
      });
      doApprove(
        state.inDepositAmount,
        PROXY_ADDRESS,
        () => {
          updateState({
            depositApproved: true,
            depositApproving: false
          });
          handleRefresh();
        },
        () => {
          updateState({
            depositApproving: false
          });
        }
      );
    }
    // repay approve
    if (categoryIndex === 3) {
      updateState({
        repayApproving: true
      });
      doApprove(
        Big(state.inRepayAmount).times(2).toFixed(),
        smartContractAddress,
        () => {
          updateState({
            repayApproved: true,
            repayApproving: false
          });
          handleRefresh();
        },
        () => {
          updateState({
            repayApproving: false
          });
        }
      );
    }
  }
  function handleDeposit() {
    updateState({
      depositLoading: true
    });
    const toastId = toast?.loading({
      title: `Deposit ${state.inDepositAmount} ${FIRST_SYMBOL_NAME}`
    });
    const abi = [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'assets',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address'
          }
        ],
        name: 'deposit',
        outputs: [
          {
            internalType: 'uint256',
            name: 'updatedAssets',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'shares',
            type: 'uint256'
          }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ];
    const contract = new ethers.Contract(ethers.utils.getAddress(PROXY_ADDRESS), abi, provider.getSigner());
    const _amount = Big(state?.inDepositAmount).mul(Big(10).pow(18)).toFixed(0);
    contract
      .deposit(_amount, sender)
      .then((tx) => tx.wait())
      .then((result) => {
        const { status, transactionHash } = result;
        toast?.dismiss(toastId);
        if (status !== 1) throw new Error('');
        updateState({
          inDepositAmount: '',
          depositLoading: false
        });
        toast?.success({
          title: 'Deposit Successfully!',
          text: `Deposit ${state.inDepositAmount} ${FIRST_SYMBOL_NAME}`,
          tx: transactionHash,
          chainId
        });
        if (status === 1) {
          addAction?.({
            type: 'Yield',
            action: 'Deposit',
            token0: FIRST_SYMBOL_NAME,
            amount: state?.inDepositAmount,
            template: 'Juice',
            add: true,
            status,
            transactionHash
          });
          handleRefresh();
        }
      })
      .catch((error) => {
        console.log('error:', error);
        updateState({
          depositLoading: false
        });
        toast?.fail({
          title: 'Deposit Failed!',
          text: error?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : `Deposited ${state.inDepositAmount} ${FIRST_SYMBOL_NAME}`
        });
      });
  }
  function getShares(_amount) {
    return new Promise((resolve, reject) => {
      const abi = [
        {
          inputs: [
            {
              internalType: 'uint256',
              name: 'assets',
              type: 'uint256'
            }
          ],
          name: 'previewDeposit',
          outputs: [
            {
              internalType: 'uint256',
              name: 'updatedAssets',
              type: 'uint256'
            },
            {
              internalType: 'uint256',
              name: 'shares',
              type: 'uint256'
            }
          ],
          stateMutability: 'view',
          type: 'function'
        }
      ];
      const contract = new ethers.Contract(ethers.utils.getAddress(PROXY_ADDRESS), abi, provider.getSigner());
      contract.previewDeposit(_amount).then(resolve).catch(reject);
    });
  }
  function handleWithdraw() {
    updateState({
      withdrawLoading: true
    });
    const toastId = toast?.loading({
      title: `Withdraw ${state.inWithdrawAmount} ${FIRST_SYMBOL_NAME}`
    });
    const abi = [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'shares',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address'
          }
        ],
        name: 'withdraw',
        outputs: [
          {
            internalType: 'uint256',
            name: 'updatedAssets',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'updatedShares',
            type: 'uint256'
          }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ];
    const contract = new ethers.Contract(ethers.utils.getAddress(PROXY_ADDRESS), abi, provider.getSigner());
    const _amount = Big(state?.inWithdrawAmount).mul(Big(10).pow(18)).toFixed(0);
    getShares(_amount).then((sharesResult) => {
      const shares = sharesResult[1];
      contract
        .withdraw(shares, sender)
        .then((tx) => tx.wait())
        .then((result) => {
          const { status, transactionHash } = result;
          toast?.dismiss(toastId);
          if (status !== 1) throw new Error('');
          updateState({
            inWithdrawAmount: '',
            withdrawLoading: false
          });
          toast?.success({
            title: 'Withdraw Successfully!',
            text: `Withdraw ${state.inWithdrawAmount} ${FIRST_SYMBOL_NAME}`,
            tx: transactionHash,
            chainId
          });
          if (status === 1) {
            addAction?.({
              type: 'Yield',
              action: 'Withdraw',
              token0: FIRST_SYMBOL_NAME,
              amount: state?.inWithdrawAmount,
              template: 'Juice',
              add: false,
              status,
              transactionHash
            });
            handleRefresh();
          }
        })
        .catch((error) => {
          console.log('error:', error);
          updateState({
            withdrawLoading: false
          });
          toast?.fail({
            title: 'Withdraw Failed!',
            text: error?.message?.includes('user rejected transaction')
              ? 'User rejected transaction'
              : `Withdraw ${state.inWithdrawAmount} ${FIRST_SYMBOL_NAME}`
          });
        });
    });
  }
  function handleBorrow() {
    updateState({
      borrowLoading: true
    });
    const toastId = toast?.loading({
      title: `Borrow ${state.inBorrowAmount} ${SECOND_SYMBOL_NAME}`
    });
    const abi = [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          }
        ],
        name: 'borrow',
        outputs: [
          {
            internalType: 'uint256',
            name: 'borrowed',
            type: 'uint256'
          }
        ],
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ];
    const contract = new ethers.Contract(ethers.utils.getAddress(smartContractAddress), abi, provider.getSigner());

    const _amount = Big(state?.inBorrowAmount).mul(Big(10).pow(18)).toFixed(0);
    contract
      .borrow(_amount)
      .then((tx) => tx.wait())
      .then((result) => {
        const { status, transactionHash } = result;
        toast?.dismiss(toastId);
        if (status !== 1) throw new Error('');
        updateState({
          inBorrowAmount: '',
          borrowLoading: false
        });
        toast?.success({
          title: 'Borrow Successfully!',
          text: `Borrow ${state.inBorrowAmount} ${SECOND_SYMBOL_NAME}`,
          tx: transactionHash,
          chainId
        });
        if (status === 1) {
          addAction?.({
            type: 'Yield',
            action: 'Borrow',
            token0: SECOND_SYMBOL_NAME,
            amount: state?.inBorrowAmount,
            template: 'Juice',
            add: true,
            status,
            transactionHash
          });
          handleRefresh();
        }
      })
      .catch((error) => {
        console.log('error:', error);
        updateState({
          borrowLoading: false
        });
        toast?.fail({
          title: 'Borrow Failed!',
          text: error?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : `Borrowed ${state.inBorrowAmount} ${SECOND_SYMBOL_NAME}`
        });
      });
  }
  function handleRepay() {
    updateState({
      repayLoading: true
    });
    const toastId = toast?.loading({
      title: `Repay ${state.inRepayAmount} ${SECOND_SYMBOL_NAME}`
    });
    const abi = [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          }
        ],
        name: 'repay',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amountFrom',
            type: 'uint256'
          }
        ],
        name: 'repayFrom',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
      }
    ];

    const contract = new ethers.Contract(ethers.utils.getAddress(smartContractAddress), abi, provider.getSigner());
    const _amount = Big(state?.inRepayAmount).mul(Big(10).pow(18)).toFixed(0);
    const contractMethod = Big(state.balances.secondRepay).gt(state?.accountOverview?.firstBalance ?? 0)
      ? 'repayFrom'
      : 'repay';
    contract[contractMethod](_amount, {
      gasLimit: 5000000
    })
      .then((tx) => tx.wait())
      .then((result) => {
        const { status, transactionHash } = result;
        toast?.dismiss(toastId);
        if (status !== 1) throw new Error('');
        updateState({
          inRepayAmount: '',
          repayLoading: false
        });
        toast?.success({
          title: 'Repay Successfully!',
          text: `Repay ${state.inRepayAmount} ${SECOND_SYMBOL_NAME}`,
          tx: transactionHash,
          chainId
        });
        if (status === 1) {
          addAction?.({
            type: 'Yield',
            action: 'Repay',
            token0: SECOND_SYMBOL_NAME,
            amount: state?.inRepayAmount,
            template: 'Juice',
            add: false,
            status,
            transactionHash
          });
          handleRefresh();
        }
      })
      .catch((error) => {
        console.log('error:', error);
        updateState({
          repayLoading: false
        });
        toast?.fail({
          title: 'Repay Failed!',
          text: error?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : `Repayed ${state.inRepayAmount} ${SECOND_SYMBOL_NAME}`
        });
      });
  }
  function handleGetBalances(callback) {
    const calls = [];
    // console.log('==PROXY_ADDRESS_ABI', PROXY_ADDRESS_ABI)
    // console.log('==PROXY_ADDRESS', PROXY_ADDRESS)
    // console.log('==smartContractAddress', smartContractAddress)
    const abi = [...SYMBOL_ADDRESS_ABI, ...PROXY_ADDRESS_ABI];
    console.log('=FIRST_SYMBOL_ADDRESS', FIRST_SYMBOL_ADDRESS);
    calls.push({
      address: FIRST_SYMBOL_ADDRESS,
      name: 'balanceOf',
      params: [sender]
    });
    calls.push({
      address: PROXY_ADDRESS,
      name: 'balanceOfAssets',
      params: [sender]
    });
    calls.push({
      address: PROXY_ADDRESS,
      name: 'getTotalCollateralValue',
      params: [smartContractAddress]
    });
    calls.push({
      address: PROXY_ADDRESS,
      name: 'getDebtAmount',
      params: [smartContractAddress]
    });

    calls.push({
      address: SECOND_SYMBOL_ADDRESS,
      name: 'balanceOf',
      params: [sender]
    });

    multicall({
      abi,
      calls,
      options: {},
      multicallAddress,
      provider
    })
      .then((result) => {
        const [
          balanceOfResult,
          balanceOfAssetsResult,
          getTotalCollateralValueResult,
          getDebtAmountResult,
          secondBalanceOfResult
        ] = result;
        const deposit = Big(
          isNotEmptyArray(balanceOfResult) ? ethers.utils.formatUnits(balanceOfResult[0]) : 0
        ).toFixed();
        const withdraw = Big(
          isNotEmptyArray(balanceOfAssetsResult) ? ethers.utils.formatUnits(balanceOfAssetsResult[0]) : 0
        ).toFixed();
        const borrow = Big(
          isNotEmptyArray(getTotalCollateralValueResult)
            ? ethers.utils.formatUnits(getTotalCollateralValueResult[0])
            : 0
        )
          .times(2.97)
          .minus(isNotEmptyArray(getDebtAmountResult) ? ethers.utils.formatUnits(getDebtAmountResult[0]) : 0)
          .toFixed();
        const firstRepay = Big(
          isNotEmptyArray(secondBalanceOfResult) ? ethers.utils.formatUnits(secondBalanceOfResult[0]) : 0
        ).toFixed();
        const secondRepay = Big(
          isNotEmptyArray(getDebtAmountResult) ? ethers.utils.formatUnits(getDebtAmountResult[0]) : 0
        ).toFixed();
        const balances = {
          deposit,
          withdraw,
          borrow: Big(borrow).gt(0) ? borrow : 0,
          firstRepay,
          secondRepay
        };
        updateState({
          balances
        });
        callback && callback([deposit, withdraw, borrow, secondRepay][categoryIndex]);
      })
      .catch((error) => console.log(error));
  }
  function handleGetAccountOverview() {
    const calls = [];
    const abi = [...SYMBOL_ADDRESS_ABI, ...PROXY_ADDRESS_ABI];
    calls.push({
      address: PROXY_ADDRESS,
      name: 'balanceOfAssets',
      params: [sender]
    });
    calls.push({
      address: PROXY_ADDRESS,
      name: 'getDebtAmount',
      params: [smartContractAddress]
    });
    calls.push({
      address: PROXY_ADDRESS,
      name: 'getTotalCollateralValue',
      params: [smartContractAddress]
    });
    calls.push({
      address: PROXY_ADDRESS,
      name: 'getAccountHealth',
      params: [smartContractAddress]
    });
    calls.push({
      address: SECOND_SYMBOL_ADDRESS,
      name: 'balanceOf',
      params: [smartContractAddress]
    });
    calls.push({
      address: SECOND_SYMBOL_ADDRESS,
      name: 'balanceOf',
      params: [LENDING_POOL_ADDRESS]
    });
    multicall({
      abi,
      calls,
      options: {},
      multicallAddress,
      provider
    }).then((result) => {
      const [
        balanceOfAssetsResult,
        getDebtAmountResult,
        getTotalCollateralValueResult,
        getAccountHealthResult,
        firstBalanceResult,
        secondBalanceResult
      ] = result;
      const [A1, A2, A3] = isNotEmptyArray(getAccountHealthResult) ? getAccountHealthResult[0] : [1, 0, 0];
      updateState({
        leverage: [
          isNotEmptyArray(getTotalCollateralValueResult)
            ? ethers.utils.formatUnits(getTotalCollateralValueResult[0])
            : 0,
          isNotEmptyArray(getDebtAmountResult) ? ethers.utils.formatUnits(getDebtAmountResult[0]) : 0
        ],
        accountOverview: {
          balanceOfAssets: Big(
            isNotEmptyArray(balanceOfAssetsResult) ? ethers.utils.formatUnits(balanceOfAssetsResult[0]) : 0
          ).toFixed(4),
          debtAmount: Big(
            isNotEmptyArray(getDebtAmountResult) ? ethers.utils.formatUnits(getDebtAmountResult[0]) : 0
          ).toFixed(4),
          totalCollateralValue: Big(
            isNotEmptyArray(getTotalCollateralValueResult)
              ? ethers.utils.formatUnits(getTotalCollateralValueResult[0])
              : 0
          )
            .times(2.97)
            .minus(isNotEmptyArray(getDebtAmountResult) ? ethers.utils.formatUnits(getDebtAmountResult[0]) : 0)
            .toFixed(4),
          accountHealth: Big(A1).gt(0) ? Big(Big(A2).plus(A3)).div(A1).times(100).toFixed(2) + '%' : 'N/A',
          firstBalance: Big(
            isNotEmptyArray(firstBalanceResult) ? ethers.utils.formatUnits(firstBalanceResult[0]) : 0
          ).toFixed(),
          secondBalance: Big(
            isNotEmptyArray(secondBalanceResult) ? ethers.utils.formatUnits(secondBalanceResult[0]) : 0
          ).toFixed()
        }
      });
    });
  }
  function doQueryPnl(x, y) {
    const abi = [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'x',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'y',
            type: 'uint256'
          }
        ],
        name: 'zeroFloorSub',
        outputs: [
          {
            internalType: 'uint256',
            name: 'z',
            type: 'uint256'
          }
        ],
        stateMutability: 'pure',
        type: 'function'
      }
    ];
    const contract = new ethers.Contract(
      ethers.utils.getAddress('0xe1dA6F46d757699f6D783a2876E01937a1eCa9a9'),
      abi,
      provider.getSigner()
    );
    contract.zeroFloorSub(x, y).then((result) => {
      updateState({
        pnl: ethers.utils.formatUnits(result)
      });
    });
  }
  function handleQueryPnl() {
    const calls = [];
    const abi = [...PROXY_ADDRESS_ABI];
    calls.push({
      address: PROXY_ADDRESS,
      name: 'getTotalAccountValue',
      params: [smartContractAddress]
    });
    calls.push({
      address: PROXY_ADDRESS,
      name: 'getDebtAmount',
      params: [smartContractAddress]
    });
    multicall({
      abi,
      calls,
      options: {},
      multicallAddress,
      provider
    }).then((result) => {
      const [getTotalAccountValueResult, getDebtAmountResult] = result;
      doQueryPnl(
        isNotEmptyArray(getTotalAccountValueResult) ? getTotalAccountValueResult[0] : 0,
        isNotEmptyArray(getDebtAmountResult) ? getDebtAmountResult[0] : 0
      );
    });
  }
  function handleClaim() {
    updateState({
      claimLoading: true
    });
    const abi = [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          }
        ],
        name: 'claim',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
      }
    ];

    const contract = new ethers.Contract(ethers.utils.getAddress(smartContractAddress), abi, provider.getSigner());
    const temAmount = Big(state.balances.secondRepay).eq(0) ? state?.accountOverview?.firstBalance : state?.pnl;
    const _amount = Big(temAmount).mul(Big(10).pow(18)).toFixed(0);
    const toastId = toast?.loading({
      title: `Claim ${Big(state.pnl).toFixed()}`
    });
    contract
      .claim(_amount)
      .then((result) => {
        const { transactionHash } = result;
        toast?.dismiss(toastId);
        updateState({
          claimLoading: false
        });
        toast?.success({
          title: 'Claim Successfully!',
          text: `Claim ${Big(state.pnl).toFixed()}`,
          tx: transactionHash,
          chainId
        });

        setTimeout(() => {
          handleRefresh();
        }, 3000);
      })
      .catch((error) => {
        updateState({
          claimLoading: false
        });
        toast?.fail({
          title: 'Claim Failed!',
          text: error?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : `Claim ${Big(state.pnl).toFixed()}`
        });
      });
  }
  function handleMax() {
    handleGetBalances((balance) => {
      handleInAmountChange(Big(balance).eq(Big(10).pow(-18)) ? 0 : balance);
    });
  }
  function handleRefresh() {
    handleGetBalances();
    handleGetAccountOverview();
    handleQueryPnl();
  }
  useEffect(() => {
    handleGetBalances();
  }, [categoryIndex]);

  useEffect(() => {
    const [totalCollateralValue, totalBorrowed] = state?.leverage ?? [];
    if (totalBorrowed && totalCollateralValue) {
      if (categoryIndex < 3) {
        updateState({
          borrowLeverage:
            Big(Big(totalBorrowed).plus(state?.inBorrowAmount ? state?.inBorrowAmount : 0))
              .div(totalCollateralValue)
              .times(100)
              .toFixed(2) + '%'
        });
      } else {
        updateState({
          borrowLeverage:
            Big(Big(totalBorrowed).minus(state?.inBorrowAmount ? state?.inBorrowAmount : 0))
              .div(totalCollateralValue)
              .times(100)
              .toFixed(2) + '%'
        });
      }
    } else {
      updateState({
        borrowLeverage: '0.00%'
      });
    }
  }, [state.categoryIndex, state.leverage, state.inBorrowAmount, state.inRepayAmount]);
  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <StyledContainer>
      <StyledContainerL>
        {isCreatedAccount ? (
          <StyledCategory>
            <StyledCategoryTop>
              {categoryList.map((category, index) => (
                <StyledCategoryTopButton
                  key={index}
                  className={categoryIndex === index ? 'active' : ''}
                  onClick={() => {
                    updateState({
                      categoryIndex: index
                    });
                  }}
                >
                  {category}
                </StyledCategoryTopButton>
              ))}
            </StyledCategoryTop>
            <StyledCategoryBottom>
              {categoryIndex === 0 && (
                <StyledDepositContainer>
                  <StyledDepositInput>
                    <StyledDepositInputTop>
                      <StyledDepositInputTopType>Deposit</StyledDepositInputTopType>
                      <StyledDepositInputTopBalance>
                        Balance: <span onClick={handleMax}>{Big(state.balances?.deposit).toFixed(4)}</span>
                      </StyledDepositInputTopBalance>
                    </StyledDepositInputTop>
                    <StyledDepositInputBottom>
                      <StyledDepositInputBottomInput
                        type="number"
                        placeholder="0.0"
                        value={state.inDepositAmount}
                        onChange={(event) => handleInAmountChange(event.target.value)}
                      />
                      <StyledDepositInputBottomSymbol>
                        <StyledDepositInputBottomSymbolImageContainer>
                          <StyledDepositInputBottomSymbolImage src={ICON_MAP[FIRST_SYMBOL_NAME]} />
                        </StyledDepositInputBottomSymbolImageContainer>
                        <StyledDepositInputBottomSymbolTxt>{FIRST_SYMBOL_NAME}</StyledDepositInputBottomSymbolTxt>
                      </StyledDepositInputBottomSymbol>
                    </StyledDepositInputBottom>
                  </StyledDepositInput>
                  <StyledDepositMessageList>
                    <StyledDepositMessage>
                      <StyledDepositMessageLabel>Borrow Leverage</StyledDepositMessageLabel>
                      <StyledDepositMessageValue>{state.borrowLeverage}</StyledDepositMessageValue>
                    </StyledDepositMessage>
                    <StyledDepositMessage>
                      <StyledDepositMessageLabel>New Margin Health Factor</StyledDepositMessageLabel>
                      <StyledDepositMessageValue>N/A</StyledDepositMessageValue>
                    </StyledDepositMessage>
                  </StyledDepositMessageList>
                  {isDepositInSufficient ? (
                    <StyledOperationButton disabled>InSufficient Balance</StyledOperationButton>
                  ) : !(state.depositApproved || state.depositApproving) ? (
                    <StyledOperationButton onClick={handleApprove}>Approve</StyledOperationButton>
                  ) : state.depositLoading || state.depositApproving ? (
                    <StyledOperationButton disabled>
                      <Loading />
                    </StyledOperationButton>
                  ) : state.inDepositAmount > 0 ? (
                    <StyledOperationButton onClick={handleDeposit}>Deposit</StyledOperationButton>
                  ) : (
                    <StyledOperationButton disabled>Deposit</StyledOperationButton>
                  )}
                </StyledDepositContainer>
              )}
              {categoryIndex === 1 && (
                <StyledDepositContainer>
                  <StyledDepositInput>
                    <StyledDepositInputTop>
                      <StyledDepositInputTopType>Withdraw</StyledDepositInputTopType>
                      <StyledDepositInputTopBalance>
                        Available: <span onClick={handleMax}>{Big(state.balances?.withdraw).toFixed(4)}</span>
                      </StyledDepositInputTopBalance>
                    </StyledDepositInputTop>
                    <StyledDepositInputBottom>
                      <StyledDepositInputBottomInput
                        type="number"
                        placeholder="0.0"
                        value={state.inWithdrawAmount}
                        onChange={(event) => handleInAmountChange(event.target.value)}
                      />
                      <StyledDepositInputBottomSymbol>
                        <StyledDepositInputBottomSymbolImageContainer>
                          <StyledDepositInputBottomSymbolImage src={ICON_MAP[FIRST_SYMBOL_NAME]} />
                        </StyledDepositInputBottomSymbolImageContainer>
                        <StyledDepositInputBottomSymbolTxt>{FIRST_SYMBOL_NAME}</StyledDepositInputBottomSymbolTxt>
                      </StyledDepositInputBottomSymbol>
                    </StyledDepositInputBottom>
                  </StyledDepositInput>
                  <StyledDepositMessageList>
                    <StyledDepositMessage>
                      <StyledDepositMessageLabel>Borrow Leverage</StyledDepositMessageLabel>
                      <StyledDepositMessageValue>{state.borrowLeverage}</StyledDepositMessageValue>
                    </StyledDepositMessage>
                    <StyledDepositMessage>
                      <StyledDepositMessageLabel>New Margin Health Factor</StyledDepositMessageLabel>
                      <StyledDepositMessageValue>N/A</StyledDepositMessageValue>
                    </StyledDepositMessage>
                  </StyledDepositMessageList>
                  {isWithdrawInSufficient ? (
                    <StyledOperationButton disabled>InSufficient Balance</StyledOperationButton>
                  ) : state.withdrawLoading ? (
                    <StyledOperationButton disabled>
                      <Loading />
                    </StyledOperationButton>
                  ) : state.inWithdrawAmount > 0 && !state.withRevert ? (
                    <StyledOperationButton onClick={handleWithdraw}>Withdraw</StyledOperationButton>
                  ) : (
                    <StyledOperationButton disabled>Withdraw</StyledOperationButton>
                  )}
                </StyledDepositContainer>
              )}
              {categoryIndex === 2 && (
                <StyledDepositContainer>
                  <StyledDepositInput>
                    <StyledDepositInputTop>
                      <StyledDepositInputTopType>Borrow</StyledDepositInputTopType>
                      <StyledDepositInputTopBalance>
                        Available: <span onClick={handleMax}>{Big(state.balances?.borrow).toFixed(4)}</span>
                      </StyledDepositInputTopBalance>
                    </StyledDepositInputTop>
                    <StyledDepositInputBottom>
                      <StyledDepositInputBottomInput
                        type="number"
                        placeholder="0.0"
                        value={state.inBorrowAmount}
                        onChange={(event) => handleInAmountChange(event.target.value)}
                      />
                      <StyledDepositInputBottomSymbol>
                        <StyledDepositInputBottomSymbolImageContainer>
                          <StyledDepositInputBottomSymbolImage src={ICON_MAP[SECOND_SYMBOL_NAME]} />
                        </StyledDepositInputBottomSymbolImageContainer>
                        <StyledDepositInputBottomSymbolTxt>{SECOND_SYMBOL_NAME}</StyledDepositInputBottomSymbolTxt>
                      </StyledDepositInputBottomSymbol>
                    </StyledDepositInputBottom>
                  </StyledDepositInput>
                  <StyledDepositMessageList>
                    <StyledDepositMessage>
                      <StyledDepositMessageLabel>Available in Lending Pool</StyledDepositMessageLabel>
                      <StyledDepositMessageValue>
                        {Big(state?.accountOverview?.secondBalance ?? 0).toFixed(4)}
                      </StyledDepositMessageValue>
                    </StyledDepositMessage>
                    <StyledDepositMessage>
                      <StyledDepositMessageLabel>Variable Borrow Rate</StyledDepositMessageLabel>
                      <StyledDepositMessageValue>18.84%</StyledDepositMessageValue>
                    </StyledDepositMessage>
                    <StyledDepositMessage>
                      <StyledDepositMessageLabel>Borrow Leverage</StyledDepositMessageLabel>
                      <StyledDepositMessageValue>{state.borrowLeverage}</StyledDepositMessageValue>
                    </StyledDepositMessage>
                    <StyledDepositMessage>
                      <StyledDepositMessageLabel>New Margin Health Factor</StyledDepositMessageLabel>
                      <StyledDepositMessageValue>N/A</StyledDepositMessageValue>
                    </StyledDepositMessage>
                  </StyledDepositMessageList>
                  {isBorrowInSufficient ? (
                    <StyledOperationButton disabled>InSufficient Balance</StyledOperationButton>
                  ) : state.borrowLoading ? (
                    <StyledOperationButton disabled>
                      <Loading />
                    </StyledOperationButton>
                  ) : state.inBorrowAmount > 0 ? (
                    <StyledOperationButton onClick={handleBorrow}>Borrow</StyledOperationButton>
                  ) : (
                    <StyledOperationButton disabled>Borrow</StyledOperationButton>
                  )}
                </StyledDepositContainer>
              )}
              {categoryIndex === 3 && (
                <StyledDepositContainer>
                  <StyledDepositInput>
                    <StyledDepositInputTop>
                      <StyledDepositInputTopType>Repay</StyledDepositInputTopType>
                      <StyledDepositInputTopBalance>
                        Available:{' '}
                        <span onClick={handleMax}>
                          {Big(state.balances?.firstRepay ?? 0)
                            .plus(state.balances?.secondRepay ?? 0)
                            .toFixed(4)}
                        </span>
                      </StyledDepositInputTopBalance>
                    </StyledDepositInputTop>
                    <StyledDepositInputBottom>
                      <StyledDepositInputBottomInput
                        type="number"
                        placeholder="0.0"
                        value={state.inRepayAmount}
                        onChange={(event) => handleInAmountChange(event.target.value)}
                      />
                      <StyledDepositInputBottomSymbol>
                        <StyledDepositInputBottomSymbolImageContainer>
                          <StyledDepositInputBottomSymbolImage src={ICON_MAP[SECOND_SYMBOL_NAME]} />
                        </StyledDepositInputBottomSymbolImageContainer>
                        <StyledDepositInputBottomSymbolTxt>{SECOND_SYMBOL_NAME}</StyledDepositInputBottomSymbolTxt>
                      </StyledDepositInputBottomSymbol>
                    </StyledDepositInputBottom>
                  </StyledDepositInput>
                  <StyledDepositMessageList>
                    <StyledDepositMessage>
                      <StyledDepositMessageLabel>Borrow Leverage</StyledDepositMessageLabel>
                      <StyledDepositMessageValue>{state.borrowLeverage}</StyledDepositMessageValue>
                    </StyledDepositMessage>
                    <StyledDepositMessage>
                      <StyledDepositMessageLabel>New Margin Health Factor</StyledDepositMessageLabel>
                      <StyledDepositMessageValue>N/A</StyledDepositMessageValue>
                    </StyledDepositMessage>
                  </StyledDepositMessageList>
                  {isRepayInSufficient ? (
                    <StyledOperationButton disabled>InSufficient Balance</StyledOperationButton>
                  ) : !(state.repayApproved || state.repayApproving) ? (
                    <StyledOperationButton onClick={handleApprove}>Approve</StyledOperationButton>
                  ) : state.repayLoading || state.repayApproving ? (
                    <StyledOperationButton disabled>
                      <Loading />
                    </StyledOperationButton>
                  ) : state.inRepayAmount > 0 ? (
                    <StyledOperationButton onClick={handleRepay}>Repay</StyledOperationButton>
                  ) : (
                    <StyledOperationButton disabled>Repay</StyledOperationButton>
                  )}
                </StyledDepositContainer>
              )}
            </StyledCategoryBottom>
          </StyledCategory>
        ) : (
          <StyledEmptyContainer>
            <StyledEmptyImage src="https://ipfs.near.social/ipfs/bafkreieloy2b3qkgzea7x6oyzth3qnvbs7gaeit7bm4jf66r62hwqugayi" />
            <StyledEmptyTxt>
              Juice creates sub-accounts for users, allowing them to borrow against their deposited collateral. Create
              your Sub Account to borrow and farm yield.
            </StyledEmptyTxt>
            {createSubAccountLoading ? (
              <StyledOperationButton disabled>
                <Loading />
              </StyledOperationButton>
            ) : (
              <StyledOperationButton onClick={onCreateSubAccount}>Create Sub Account</StyledOperationButton>
            )}
          </StyledEmptyContainer>
        )}
        <StyledWrapContainer onClick={onOpenWrap}>
          <StyledWrap>
            <StyledWrapChainList>
              <StyledChainImage src="https://ipfs.near.social/ipfs/bafkreib3g5xhs4b3djuvtarhutz5ayogdi7bz7nft6a2zg2e7pi2445uny" />
              <StyledChainImage
                src="https://ipfs.near.social/ipfs/bafkreif5jqf6onhhj6aqfjt6zq2lqanw6o3kzmb7exnqjw42p4hpwrojmu"
                style={{ marginLeft: -7 }}
              />
            </StyledWrapChainList>
            <StyledWrapTxt>Wrap ETH to WETH</StyledWrapTxt>
          </StyledWrap>
          <StyledIconRight>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M1 7C0.447715 7 4.82823e-08 7.44772 0 8C-4.82823e-08 8.55228 0.447715 9 1 9L1 7ZM15.7071 8.70711C16.0976 8.31658 16.0976 7.68342 15.7071 7.29289L9.34315 0.928933C8.95262 0.538408 8.31946 0.538408 7.92893 0.928933C7.53841 1.31946 7.53841 1.95262 7.92893 2.34315L13.5858 8L7.92893 13.6569C7.53841 14.0474 7.53841 14.6805 7.92893 15.0711C8.31946 15.4616 8.95262 15.4616 9.34314 15.0711L15.7071 8.70711ZM1 9L15 9L15 7L1 7L1 9Z"
                fill="white"
              />
            </svg>
          </StyledIconRight>
        </StyledWrapContainer>
      </StyledContainerL>
      <StyledContainerR>
        <StyledOverviewTitle>Juice Account Overview</StyledOverviewTitle>
        <StyledOverviewList>
          <StyledOverview>
            <StyledOverviewLabel>Deposited {FIRST_SYMBOL_NAME}</StyledOverviewLabel>
            <StyledOverviewValue>{state.accountOverview?.balanceOfAssets}</StyledOverviewValue>
          </StyledOverview>
          <StyledOverview>
            <StyledOverviewLabel>Total {SECOND_SYMBOL_NAME} borrowed</StyledOverviewLabel>
            <StyledOverviewValue>{state.accountOverview?.debtAmount}</StyledOverviewValue>
          </StyledOverview>
          <StyledOverview>
            <StyledOverviewLabel>Remaining {SECOND_SYMBOL_NAME} to borrow</StyledOverviewLabel>
            <StyledOverviewValue>{Big(state.balances?.borrow).toFixed(4)}</StyledOverviewValue>
          </StyledOverview>
          <StyledOverview>
            <StyledOverviewLabel>Margin Health Factor</StyledOverviewLabel>
            <StyledOverviewValue>{state.accountOverview?.accountHealth}</StyledOverviewValue>
          </StyledOverview>
          <StyledOverview>
            <StyledOverviewLabel>Minimum Margin Health Factor</StyledOverviewLabel>
            <StyledOverviewValue>125.00%</StyledOverviewValue>
          </StyledOverview>
          <StyledOverview>
            <StyledOverviewLabel>Total {SECOND_SYMBOL_NAME} Balance</StyledOverviewLabel>
            <StyledOverviewValue>{Big(state?.accountOverview?.firstBalance ?? 0).toFixed(4)}</StyledOverviewValue>
          </StyledOverview>
          <StyledOverview>
            <StyledOverviewLabel>PnL</StyledOverviewLabel>
            <StyledOverviewValue>
              {Big(state.pnl).gt(0) ? '' : '-'}
              {Big(state.pnl).toFixed(4)}
            </StyledOverviewValue>
          </StyledOverview>
        </StyledOverviewList>
        <StyledOverviewButtonContainer>
          {Big(state.pnl).gt(0) && Big(state?.accountOverview?.firstBalance ?? 0).gt(0) ? (
            <StyledOperationButton onClick={handleClaim}>Claim Profit</StyledOperationButton>
          ) : (
            <StyledOperationButton disabled>Claim Profit</StyledOperationButton>
          )}
        </StyledOverviewButtonContainer>
      </StyledContainerR>
    </StyledContainer>
  );
});
