// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo } from "react";
import { useEffect } from 'react';
import styled from "styled-components";

import Balance from "@/modules/components/Balance";
import Loading from '@/modules/components/Loading';
import { useMultiState } from '@/modules/hooks';
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
`;
const StyledFormItem = styled.div`
  border-bottom: 1px solid #373A53;
  padding-bottom: 18px;
  padding-top: 18px;

  &.inline {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &:first-child {
    padding-top: 0;
  }
`;
const StyledFormItemTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  color: #979ABE;
`;
const StyledFormItemBody = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;
const StyledFormItemFoot = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 400;
  line-height: 14.4px;
  color: rgba(151, 154, 190, 1);
`;
const StyledInput = styled.input`
  flex: 1;
  width: 0;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  border: none;
  height: 24px;
  outline: none;
  background-color: transparent;
  padding: 0;

  &:focus {
    color: #fff;
    background-color: transparent;
    border-color: transparent;
    outline: none;
    box-shadow: none;
  }
`;
const StyledList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 8px;
  margin-top: 8px;
`;
const StyledListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;

  .label {
    color: #979ABE;
  }

  .value {
    color: #fff;
  }
`;
const StyledContent = styled.div`
  flex: 1;
`;
const StyledButton = styled.button`
  background: var(--switch-color);
  color: var(--button-text-color);

  display: block;
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  height: 56px;
  line-height: 56px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.5s;
  margin-top: auto;
  text-align: center;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const StyledFullSelect = styled.div`
  width: 100%;

  > div {
    width: 100%;

    > div[type="button"] {
      width: 100%;
    }
  }
`;
const StyledTips = styled.div`
  color: rgb(151, 154, 190);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: 16px;

  &.full {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const StyledWithdrawTips = styled.div`
  width: 240px;
  text-align: center;
  margin: 0 auto;

  .value {
    color: var(--switch-color);
    font-size: 18px;
  }

  .title {
    border-bottom: 1px solid #373A53;
    font-size: 18px;
    color: rgb(151, 154, 190);
    padding: 8px 0;
  }

  .assets {
    margin-top: 8px;
  }

  .head-wd {
    border-bottom: 1px solid #373A53;

    .col-wd {
      color: rgb(151, 154, 190);
    }
  }

  .row-wd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    flex-wrap: nowrap;
  }

  .col-wd {
    flex-shrink: 0;
    flex-basis: 33.33%;
    color: #fff;
    font-size: 14px;
    text-align: left;
    padding: 8px 0;
  }

  .body-wd {
  }
`;
const DEPOSIT_POOL_ABI_MULTI = [
  {
    inputs: [
      {
        "components": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address",
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256",
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes",
          },
          {
            "internalType": "uint8",
            "name": "operation",
            "type": "uint8",
          },
        ],
        "internalType": "struct BatchExecutor.Operation[]",
        "name": "operations",
        "type": "tuple[]",
      },
    ],
    name: "executeBatch",
    outputs: [
      {
        "internalType": "bytes[]",
        "name": "",
        "type": "bytes[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        name: "receiver",
        type: "address",
        internalType: "address",
      },
      {
        name: "sqrtPriceX96",
        type: "uint160",
        internalType: "uint160",
      },
      {
        name: "slippageLiquidity",
        type: "uint24",
        internalType: "uint24",
      },
    ],
    name: "moduleC_increaseLiquidityWithBalanceAndRefundTo",
    outputs: [
      {
        name: "liquidity",
        type: "uint128",
        internalType: "uint128",
      },
      {
        name: "amount0",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "amount1",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes[]", name: "data", type: "bytes[]" }
    ],
    name: "multicall",
    outputs: [
      { internalType: "bytes[]", name: "", type: "bytes[]" }
    ],
    stateMutability: "payable",
    type: "function",
  },
];
const TRANSFORM_TOKEN_ABI = [
  {
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      { internalType: "bytes", name: "returnData", type: "bytes" },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const { parseUnits, formatUnits } = ethers.utils;


export default memo(function Deposit(props: any) {
  const {
    record,
    prices,
    dexConfig,
    getTokenBalance,
    currentStrategy,
    account,
    provider,
    rootAgent,
    onSuccess,
    addAction,
    toast,
    chainId,
    handleApprove,
    balanceList,
    queryPoolInfo,
    strategies,
  } = props;

  const { StakeTokens } = dexConfig;
  const actionText = "Stake";

  const [state, updateState] = useMultiState<any>({
    pending: false,

    //#region dex/clm
    currentEthToken: {},
    ethAmount: "",
    ethTokens: [],
    currentEthTokenBalance: 0,
    usdAmount: "",
    usdTokens: [],
    currentUsdToken: {},
    currentUsdTokenBalance: 0,
    //#endregion

    //#region Multipliooor
    stakeAmount: "",
    stakeTokens: [],
    stakeToken: {},
    stakeTokenBalance: 0,
    //#endregion

    //#region clm
    currentEthPer: 50,
    currentUsdPer: 50,
    //#endregion
  });

  const {
    pending,

    //#region dex/clm
    ethAmount,
    currentEthToken,
    ethTokens,
    currentEthTokenBalance,
    usdAmount,
    usdTokens,
    currentUsdToken,
    currentUsdTokenBalance,
    //#endregion

    //#region Multipliooor
    stakeAmount,
    stakeTokens,
    stakeToken,
    stakeTokenBalance,
    //#endregion
  } = state;

  const formatAddAction = (actionText, _amount, status, transactionHash, tokenSymbol) => {
    addAction?.({
      type: "Staking",
      action: actionText,
      token: {
        symbol: tokenSymbol,
      },
      amount: _amount,
      template: props.name,
      add: false,
      status,
      transactionHash,
    });
  };

  const queryUSDBTransform = () => {
    // query usdb fransform
    const iface = new ethers.utils.Interface(TRANSFORM_TOKEN_ABI);
    const usdAmountShown = Big(state.usdAmount || 0)
      .times(Big(10).pow(state.currentUsdToken.decimals))
      .toFixed(0, Big.roundDown);
    const params = [
      // from
      account,
      // to
      record.agentAddress,
      // amount
      ethers.BigNumber.from(usdAmountShown),
    ];
    return iface.encodeFunctionData("transferFrom", params);
  };

  const handleSubmit = () => {
    const ethAmountShown = Big(state.ethAmount || 0).toFixed(state.currentEthToken.decimals || 18, Big.roundDown);
    const usdAmountShown = Big(state.usdAmount || 0).toFixed(state.currentUsdToken.decimals || 18, Big.roundDown);
    const stakeAmountShown = Big(state.stakeAmount || 0).toFixed(state.stakeToken.decimals || 18, Big.roundDown);

    if (record.name.toLowerCase() === strategies[2].name) {
      if (!state.ethAmount || !state.usdAmount) return;
      updateState({
        pending: true,
      });

      const data = queryUSDBTransform();

      // const params = [
      //   {
      //     to: record.agentAddress,
      //     value: parseUnits(state.ethAmount, state.currentEthToken.decimals),
      //     data: '0x',
      //     operation: 0,
      //   },
      //   {
      //     to: state.currentUsdToken.address,
      //     value: 0,
      //     data: data,
      //     operation: 0,
      //   },
      //   {
      //     to: record.agentAddress,
      //     value: 0,
      //     data: '0x7bb485dc',
      //     operation: 0,
      //   },
      // ];
      const params = [
        [
          record.agentAddress,
          // Big(state.ethAmount).times(Big(10).pow(state.currentEthToken.decimals)).toNumber(),
          parseUnits(ethAmountShown, state.currentEthToken.decimals),
          "0x",
          0,
        ],
        [
          state.currentUsdToken.address,
          0,
          data,
          0,
        ],
        [
          record.agentAddress,
          0,
          "0x7bb485dc",
          0,
        ],
      ];

      const approveList = [
        handleApprove(rootAgent.agentAddress, state.currentEthToken.address, state.ethAmount, state.currentEthToken.decimals),
        handleApprove(rootAgent.agentAddress, state.currentUsdToken.address, state.usdAmount, state.currentUsdToken.decimals),
      ];
      Promise.all(approveList).then((approveRes) => {
        if (approveRes.some((approved) => !approved)) {
          updateState({
            pending: false,
          });
          return;
        }

        const contract = new ethers.Contract(
          rootAgent.agentAddress,
          DEPOSIT_POOL_ABI_MULTI,
          provider.getSigner(),
        );

        const getTx = (gas) => {
          const contractOption = {
            gasLimit: gas || 4000000,
          };
          if (['ETH'].includes(state.currentEthToken.value)) {
            contractOption.value = parseUnits(ethAmountShown, state.currentEthToken.decimals || 18);
          }
          contract.executeBatch(params, contractOption)
            .then((tx) => {
              tx.wait()
                .then((res) => {
                  const { status, transactionHash } = res;
                  updateState({
                    pending: false,
                  });
                  if (status !== 1) throw new Error("");
                  onSuccess();
                  formatAddAction(actionText, ethAmountShown, status, transactionHash, state.currentEthToken.value);
                  toast?.success({
                    title: `${actionText} Successfully!`,
                    text: `${actionText} ${Big(state.ethAmount).toFixed(2)} ${state.currentEthToken.value}`,
                    tx: transactionHash,
                    chainId,
                  });
                })
                .catch((err) => {
                  console.log("tx error: ", err);
                  updateState({
                    pending: false,
                  });
                  toast?.fail({
                    title: `${actionText} Failed!`,
                    text: err?.message?.includes("user rejected transaction")
                      ? "User rejected transaction"
                      : ``,
                  });
                });
            })
            .catch((err) => {
              console.log("contract fn error: ", err);
              updateState({
                pending: false,
              });
              toast?.fail({
                title: `${actionText} Failed!`,
                text: err?.message?.includes("user rejected transaction")
                  ? "User rejected transaction"
                  : ``,
              });
            });
        };

        const estimateGas = () => {
          contract.estimateGas.executeBatch(
            params,
            { value: parseUnits(ethAmountShown, state.currentEthToken.decimals || 18) },
          ).then((gas) => {
            getTx(gas);
          }).catch((err) => {
            console.log("get gas failed: ", err);
            getTx();
          });
        };

        estimateGas();
      });
      return;
    }
    if (record.name.toLowerCase() === strategies[3].name) {
      if (!state.stakeAmount || !rootAgent.agentAddress) return;
      updateState({
        pending: true,
      });

      // const params = [
      //   {
      //     to: rootAgent.agentAddress,
      //     value: parseUnits(state.stakeAmount, state.stakeToken.decimals),
      //     data: '0x',
      //     operation: 0,
      //   },
      //   {
      //     to: rootAgent.agentAddress,
      //     value: 0,
      //     data: '0x7bb485dc',
      //     operation: 0,
      //   },
      // ];
      const params = [
        [
          record.agentAddress,
          parseUnits(stakeAmountShown, state.stakeToken.decimals),
          "0x",
          0,
        ],
        [
          record.agentAddress,
          0,
          "0x7bb485dc",
          0,
        ],
      ];

      const contract = new ethers.Contract(
        rootAgent.agentAddress,
        DEPOSIT_POOL_ABI_MULTI,
        provider.getSigner(),
      );

      const getTx = (gas) => {
        const contractOption = {
          gasLimit: gas || 4000000,
          value: parseUnits(stakeAmountShown, state.stakeToken.decimals || 18),
        };
        contract.executeBatch(params, contractOption)
          .then((tx) => {
            tx.wait()
              .then((res) => {
                const { status, transactionHash } = res;
                updateState({
                  pending: false,
                });
                if (status !== 1) throw new Error("");
                onSuccess();
                formatAddAction(actionText, stakeAmountShown, status, transactionHash, state.stakeToken.value);
                toast?.success({
                  title: `${actionText} Successfully!`,
                  text: `${actionText} ${Big(state.stakeAmount).toFixed(2)} ${state.stakeToken.value}`,
                  tx: transactionHash,
                  chainId,
                });
              })
              .catch((err) => {
                console.log("tx error: ", err);
                updateState({
                  pending: false,
                });
                toast?.fail({
                  title: `${actionText} Failed!`,
                  text: err?.message?.includes("user rejected transaction")
                    ? "User rejected transaction"
                    : ``,
                });
              });
          })
          .catch((err) => {
            console.log("contract fn error: ", err);
            updateState({
              pending: false,
            });
            toast?.fail({
              title: `${actionText} Failed!`,
              text: err?.message?.includes("user rejected transaction")
                ? "User rejected transaction"
                : ``,
            });
          });
      };

      const estimateGas = () => {
        contract.estimateGas.executeBatch(
          params,
          { value: parseUnits(stakeAmountShown, state.stakeToken.decimals || 18) },
        ).then((gas) => {
          getTx(gas);
        }).catch((err) => {
          console.log("get gas failed: ", err);
          getTx();
        });
      };

      estimateGas();
      return;
    }
    if (record.name.toLowerCase() === strategies[1].name) {
      if (!state.ethAmount || !state.usdAmount) return;
      updateState({
        pending: true,
      });

      const data = queryUSDBTransform();
      // fixed 0.30 % fee tier
      queryPoolInfo({ fee: currentStrategy.meta.feeTierList[2] }).then((poolRes) => {
        if (!poolRes) {
          updateState({
            pending: false,
          });
          toast?.fail({
            title: `${actionText} Failed!`,
            text: 'Query pool information failed!',
          });
          return;
        }
        const { sqrtPriceX96 } = poolRes;

        // queryPoolInfo({ fee: currentStrategy.meta.feeTierList[1] }).then((pool1) => {
        //   queryPoolInfo({ fee: currentStrategy.meta.feeTierList[0] }).then((pool0) => {
        //     console.log('pool0.sqrtPriceX96: ', pool0.sqrtPriceX96);
        //     console.log('pool1.sqrtPriceX96: ', pool1.sqrtPriceX96);
        //     console.log('pool2.sqrtPriceX96: ', sqrtPriceX96);
        //   });
        // });

        const approveList = [
          handleApprove(
            record.agentAddress,
            state.currentEthToken.address,
            '115792089237316195423570985008687907853269984665640564039457.584007913129639935',
            state.currentEthToken.decimals
          ),
          handleApprove(
            record.agentAddress,
            state.currentUsdToken.address,
            '115792089237316195423570985008687907853269984665640564039457.584007913129639935',
            state.currentUsdToken.decimals
          ),
        ];
        Promise.all(approveList).then((approveRes) => {
          if (approveRes.some((approved) => !approved)) {
            updateState({
              pending: false,
            });
            return;
          }

          const executeBatchParams = [
            [
              {
                to: state.currentUsdToken.address,
                value: '0',
                data,
                operation: 0
              }
            ]
          ];
          const moduleCParams = [
            account,
            sqrtPriceX96,
            1000000,
          ];

          const iface = new ethers.utils.Interface(DEPOSIT_POOL_ABI_MULTI);
          const multicallParams = [
            iface.encodeFunctionData("executeBatch", executeBatchParams),
            iface.encodeFunctionData("moduleC_increaseLiquidityWithBalanceAndRefundTo", moduleCParams)
          ];

          const multicallContract = new ethers.Contract(
            record.agentAddress,
            DEPOSIT_POOL_ABI_MULTI,
            provider.getSigner()
          );

          const multicallOptions = {};

          if (['ETH'].includes(state.currentEthToken.value)) {
            multicallOptions.value = parseUnits(ethAmountShown, state.currentEthToken.decimals || 18);
          }

          const getTx = (_gas) => {
            multicallContract
              // .populateTransaction
              .multicall(multicallParams, {
                ...multicallOptions,
                gasLimit: _gas || 5000000,
              })
              .then((tx) => {
                tx.wait().then((res) => {
                  const { status, transactionHash } = res;
                  updateState({
                    pending: false,
                  });
                  if (status !== 1) throw new Error("");
                  onSuccess();
                  formatAddAction(actionText, ethAmountShown, status, transactionHash, state.currentEthToken.value);
                  toast?.success({
                    title: `${actionText} Successfully!`,
                    text: `${actionText} ${Big(state.ethAmount).toFixed(2)} ${state.currentEthToken.value}`,
                    tx: transactionHash,
                    chainId,
                  });
                }).catch((err) => {
                  console.log('Concentrated Liquidity Manager deposit faild when wait, ', err);
                  updateState({
                    pending: false,
                  });
                  toast?.fail({
                    title: `${actionText} Failed!`,
                    text: err?.message?.includes("user rejected transaction")
                      ? "User rejected transaction"
                      : ``,
                  });
                });
              })
              .catch((err) => {
                console.log('Concentrated Liquidity Manager deposit faild when multicall, ', err);
                updateState({
                  pending: false,
                });
                toast?.fail({
                  title: `${actionText} Failed!`,
                  text: err?.message?.includes("user rejected transaction")
                    ? "User rejected transaction"
                    : ``,
                });
              });
          };

          const estimateGas = () => {
            multicallContract.estimateGas
              .multicall(multicallParams, multicallOptions)
              .then((_gas) => {
                getTx(_gas);
              })
              .catch((err) => {
                getTx();
              });
          };

          estimateGas();
        });
      });
    }
  };

  //#region dex/clm
  const handleUsdAmount = (ev) => {
    if (isNaN(Number(ev.target.value))) return;
    let amount = ev.target.value.replace(/\s+/g, "");

    if (!amount) {
      updateState({
        ethAmount: "",
        usdAmount: "",
      });
      return;
    }

    if (Big(amount || 0).gt(Big(state.currentUsdTokenBalance || 0))) {
      amount = Big(state.currentUsdTokenBalance || 0).toFixed(4, 0);
    }
    let calcEthAmount = Big(amount).times(prices[state.currentUsdToken.value]).div(prices[state.currentEthToken.value]).toFixed(state.currentEthToken.decimals, 0);
    if (record.name.toLowerCase() === strategies[1].name) {
      if (Big(state.currentUsdPer).lte(0)) {
        calcEthAmount = Big(amount).times(prices[state.currentUsdToken.value]).times(Big(state.currentEthPer).div(100)).div(prices[state.currentEthToken.value]).toFixed(state.currentEthToken.decimals);
      } else {
        calcEthAmount = Big(amount).times(prices[state.currentUsdToken.value]).div(Big(state.currentUsdPer).div(100)).times(Big(state.currentEthPer).div(100)).div(prices[state.currentEthToken.value]).toFixed(state.currentEthToken.decimals);
      }
    }
    updateState({
      usdAmount: amount,
      ethAmount: calcEthAmount,
    });
  };

  const handleUsdToken = (option) => {
    if (option.value === state.currentUsdToken.value) return;
    updateState({
      currentUsdToken: option,
      usdAmount: "",
      ethAmount: "",
    });
    getTokenBalance(option).then((value) => {
      updateState({
        currentUsdTokenBalance: value,
      });
    });
  };

  const handleUsdBalance = (value) => {
    // auto enter eth amount
    const updates = {
      usdAmount: Big(value).toFixed(4, 0),
    };
    updates.ethAmount = Big(updates.usdAmount).times(prices[state.currentUsdToken.value]).div(prices[state.currentEthToken.value]).toFixed(state.currentEthToken.decimals, 0);
    if (record.name.toLowerCase() === strategies[1].name) {
      updates.ethAmount = Big(updates.usdAmount).times(prices[state.currentUsdToken.value]).div(Big(state.currentUsdPer).div(100)).times(Big(state.currentEthPer).div(100)).div(prices[state.currentEthToken.value]).toFixed(state.currentEthToken.decimals);
    }
    updateState(updates);
  };

  const handleEthAmount = (ev) => {
    if (isNaN(Number(ev.target.value))) return;
    let amount = ev.target.value.replace(/\s+/g, "");

    if (!amount) {
      updateState({
        ethAmount: "",
        usdAmount: "",
      });
      return;
    }

    if (Big(amount || 0).gt(Big(state.currentEthTokenBalance || 0))) {
      amount = Big(state.currentEthTokenBalance || 0).toFixed(4, 0);
    }
    let calcUsdAmount = Big(amount).times(prices[state.currentEthToken.value]).div(prices[state.currentUsdToken.value]).toFixed(state.currentUsdToken.decimals, 0);
    if (record.name.toLowerCase() === strategies[1].name) {
      if (Big(state.currentEthPer).lte(0)) {
        calcUsdAmount = Big(amount).times(prices[state.currentEthToken.value]).times(Big(state.currentUsdPer).div(100)).div(prices[state.currentUsdToken.value]).toFixed(state.currentUsdToken.decimals, Big.roundDown);
      } else {
        calcUsdAmount = Big(amount).times(prices[state.currentEthToken.value]).div(Big(state.currentEthPer).div(100)).times(Big(state.currentUsdPer).div(100)).div(prices[state.currentUsdToken.value]).toFixed(state.currentUsdToken.decimals, Big.roundDown);
      }
    }
    updateState({
      ethAmount: amount,
      usdAmount: calcUsdAmount,
    });
  };

  const handleEthToken = (option) => {
    if (option.value === state.currentEthToken.value) return;
    updateState({
      currentEthToken: option,
      ethAmount: "",
    });
    getTokenBalance(option).then((value) => {
      updateState({
        currentEthTokenBalance: value,
      });
    });
  };

  const handleEthBalance = (value) => {
    // auto enter usd amount
    const updates = {
      ethAmount: Big(value).toFixed(4, 0),
    };
    updates.usdAmount = Big(updates.ethAmount).times(prices[state.currentEthToken.value]).div(prices[state.currentUsdToken.value]).toFixed(state.currentUsdToken.decimals, 0);
    if (record.name.toLowerCase() === strategies[1].name) {
      updates.usdAmount = Big(updates.ethAmount).times(prices[state.currentEthToken.value]).div(Big(state.currentEthPer).div(100)).times(Big(state.currentUsdPer).div(100)).div(prices[state.currentUsdToken.value]).toFixed(state.currentUsdToken.decimals, Big.roundDown);
    }
    updateState(updates);
  };
  //#endregion

  //#region Multipliooor
  const handleAmount = (ev) => {
    if (isNaN(Number(ev.target.value))) return;
    let amount = ev.target.value.replace(/\s+/g, "");

    if (Big(amount || 0).gt(Big(state.stakeTokenBalance || 0))) {
      amount = Big(state.stakeTokenBalance || 0).toFixed(4, 0);
    }
    updateState({
      stakeAmount: amount,
    });
  };

  const handleToken = (option) => {
    if (option.value === state.stakeToken.value) return;
    updateState({
      stakeToken: option,
      stakeAmount: "",
    });
    const currToken = StakeTokens.find((it) => it.symbol === option.value);
    currToken && getTokenBalance(currToken).then((value) => {
      updateState({
        stakeTokenBalance: value,
      });
    });
  };

  const handleBalance = (value) => {
    updateState({
      stakeAmount: Big(value).toFixed(4, 0),
    });
  };
  //#endregion

  const renderButton = (disabled) => {
    return (
      <StyledButton
        disabled={pending || disabled}
        onClick={handleSubmit}
      >
        {pending ? (
          <Loading size={16} />
        ) : "DEPOSIT MORE ETH"}
      </StyledButton>
    );
  };

  const renderDeposit = () => {
    if (record.name.toLowerCase() === strategies[3].name) {
      return (
        <>
          <StyledContent>
            <StyledTips>
              If the remaining funds are low, deposit more funds to ensure the Blast Multiplier tasks are completed.
            </StyledTips>
            <StyledFormItem>
              <StyledFormItemTitle>
                Watch for our Discord announcements!
              </StyledFormItemTitle>
              <StyledFormItemBody>
                <StyledInput
                  type="text"
                  placeholder="0"
                  value={stakeAmount}
                  onChange={handleAmount}
                />
              </StyledFormItemBody>
              <StyledFormItemFoot>
                <div className="prices">
                  ${Big(stakeAmount || 0).times(Big(prices[stakeToken.value] || 1)).toFixed(2, 0)}
                </div>
                <div className="balance">
                  Balance:
                  <Balance
                    {...{
                      value: stakeTokenBalance,
                      digit: 4,
                      onClick: handleBalance,
                      symbol: stakeToken.value,
                    }}
                  />
                </div>
              </StyledFormItemFoot>
            </StyledFormItem>
          </StyledContent>
          {renderButton(!stakeAmount)}
        </>
      );
    }
    if (record.name.toLowerCase() === strategies[2].name || record.name.toLowerCase() === strategies[1].name) {
      return (
        <>
          <StyledContent>
            {
              record.name.toLowerCase() === strategies[1].name ? (
                <>
                  <StyledTips>
                    Due to price movement, your LP position is {Big(state.currentEthPer).toFixed(0)}% : {Big(state.currentUsdPer).toFixed(0)}%, WETH :
                    USDB.
                  </StyledTips>
                  <StyledTips>
                    Deposit more below at the same ratio.
                  </StyledTips>
                </>
              ) : (
                <StyledTips>
                  Add to your position
                </StyledTips>
              )
            }
            <StyledFormItem>
              <StyledFormItemBody>
                <StyledInput
                  type="text"
                  placeholder="0"
                  value={ethAmount}
                  onChange={handleEthAmount}
                />
              </StyledFormItemBody>
              <StyledFormItemFoot>
                <div className="prices">
                  ${Big(ethAmount || 0).times(Big(prices[currentEthToken.value] || 1)).toFixed(2, 0)}
                </div>
                <div className="balance">
                  Balance:
                  <Balance
                    {...{
                      value: currentEthTokenBalance,
                      digit: 5,
                      onClick: handleEthBalance,
                      symbol: currentEthToken.value,
                    }}
                  />

                </div>
              </StyledFormItemFoot>
              <StyledFormItemBody>
                <StyledInput
                  type="text"
                  placeholder="0"
                  value={usdAmount}
                  onChange={handleUsdAmount}
                />
              </StyledFormItemBody>
              <StyledFormItemFoot>
                <div className="prices">
                  ${Big(usdAmount || 0).times(Big(prices[currentUsdToken.value] || 1)).toFixed(2, 0)}
                </div>
                <div className="balance">
                  Balance:
                  <Balance
                    {...{
                      value: currentUsdTokenBalance,
                      digit: 5,
                      onClick: handleUsdBalance,
                      symbol: currentUsdToken.value,
                    }}
                  />
                </div>
              </StyledFormItemFoot>
            </StyledFormItem>
          </StyledContent>
          {renderButton(!ethAmount && !usdAmount)}
        </>
      );
    }
    return null;
  };

  useEffect(() => {
    //#region dex/clm
    if ([strategies[2].name, strategies[1].name].includes(record.name.toLowerCase())) {
      const _ethTokens = [];
      const _usdTokens = [];
      const EthStakeTokens = StakeTokens.filter((it) => ["ETH", "WETH"].includes(it.symbol));
      const UsdStakeTokens = StakeTokens.filter((it) => ["USDB"].includes(it.symbol));
      EthStakeTokens.forEach((it) => {
        _ethTokens.push({
          ...it,
          text: it.symbol,
          value: it.symbol,
          icons: [it.icon],
          address: it.address === "native" ? "0x0000000000000000000000000000000000000000" : it.address,
        });
      });
      UsdStakeTokens.forEach((it) => {
        _usdTokens.push({
          ...it,
          text: it.symbol,
          value: it.symbol,
          icons: [it.icon],
        });
      });
      updateState({
        ethTokens: _ethTokens,
        currentEthToken: _ethTokens[0],
        usdTokens: _usdTokens,
        currentUsdToken: _usdTokens[0],
      });
      getTokenBalance(EthStakeTokens[0]).then((value) => {
        updateState({
          currentEthTokenBalance: value,
        });
      });
      getTokenBalance(UsdStakeTokens[0]).then((value) => {
        updateState({
          currentUsdTokenBalance: value,
        });
      });
    }
    //#endregion

    //#region Multipliooor
    if (record.name.toLowerCase() === strategies[3].name) {
      const _stakeTokens = [];
      const eth = StakeTokens.find((it) => it.symbol === "ETH");
      eth && _stakeTokens.push({
        ...eth,
        text: eth.symbol,
        value: eth.symbol,
        icons: [eth.icon],
        address: "0x0000000000000000000000000000000000000000",
      });
      updateState({
        stakeMode: currentStrategy.meta.modeList[0],
        stakeTokens: _stakeTokens,
        stakeToken: _stakeTokens[0] || {},
      });
      getTokenBalance(StakeTokens[0]).then((value) => {
        updateState({
          stakeTokenBalance: value,
        });
      });
    }
    //#endregion
  }, []);

  useEffect(() => {
    //#region 'Concentrated Liquidity Manager'
    if (record.name.toLowerCase() === strategies[1].name) {
      try {
        const weth = balanceList.find((it) => ["WETH", "ETH"].includes(it.symbol));
        const usdb = balanceList.find((it) => it.symbol === "USDB");
        const wethVal = Big(weth.balance).times(prices[weth.symbol]);
        const usdbVal = Big(usdb.balance).times(prices[usdb.symbol]);
        const total = wethVal.plus(usdbVal);
        if (total.lte(0)) {
          updateState({
            currentEthPer: 50,
            currentUsdPer: 50,
          });
          return;
        }
        const wethPer = wethVal.div(total).times(100).toString();
        const usdbPer = usdbVal.div(total).times(100).toString();
        updateState({
          currentEthPer: wethPer,
          currentUsdPer: usdbPer,
        });
      } catch (err) {
        console.log(err);
      }
    }
    //#endregion
  }, [balanceList, prices]);

  return (
    <StyledContainer>
      {renderDeposit()}
    </StyledContainer>
  );
})
