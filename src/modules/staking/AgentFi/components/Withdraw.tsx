// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo } from 'react';
import styled from 'styled-components';

import Loading from '@/modules/components/Loading';
import { useMultiState } from '@/modules/hooks';
const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
`;
const StyledFormItem = styled.div`
  border-bottom: 1px solid #373a53;
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
  color: #979abe;
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
    color: #979abe;
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

    > div[type='button'] {
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
  text-align: center;

  &.full {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &.invalid {
    color: var(--switch-color);
    opacity: 0.6;
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
    border-bottom: 1px solid #373a53;
    font-size: 18px;
    color: rgb(151, 154, 190);
    padding: 8px 0;
  }
  .assets {
    margin-top: 8px;
  }
  .head-wd {
    border-bottom: 1px solid #373a53;

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
const StyledCLMWithdrawRateList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 100%;
`;
const StyledCLMWithdrawRate = styled.div`
  width: 70px;
  height: 24px;
  background: #373a53;
  color: #ffffff;
  border-radius: 12px;
  text-align: center;
  line-height: 24px;
  font-size: 14px;
  cursor: pointer;

  &.active {
    background: var(--switch-color);
    color: #000;
  }
`;

const WITHDRAW_POOL_ABI_LOOPER = [
  {
    inputs: [{ internalType: 'address', name: 'receiver', type: 'address' }],
    name: 'moduleD_withdrawBalanceTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
const WITHDRAW_POOL_ABI_DEX = [
  {
    inputs: [
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'value', type: 'uint256' },
      { internalType: 'bytes', name: 'data', type: 'bytes' },
      { internalType: 'uint8', name: 'operation', type: 'uint8' }
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
const WITHDRAW_POOL_ABI_CLM = [
  {
    inputs: [
      { internalType: 'address', name: 'receiver', type: 'address' },
      { internalType: 'uint128', name: 'liquidity', type: 'uint128' },
      { internalType: 'uint160', name: 'sqrtPriceX96', type: 'uint160' },
      { internalType: 'uint24', name: 'slippageLiquidity', type: 'uint24' }
    ],
    name: 'moduleC_partialWithdrawTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

const { parseUnits, formatUnits } = ethers.utils;

const actionText = 'Withdraw';
const clmWithdrawRateList = [
  { label: '25%', value: 25 },
  { label: '50%', value: 50 },
  { label: '75%', value: 75 },
  { label: '100%', value: 100 }
];

export default memo(function Withdraw(props) {
  const {
    prices,
    currentStrategy,
    dexConfig,
    record,
    formatTVL,
    rootAgent,
    account,
    provider,
    onSuccess,
    addAction,
    toast,
    chainId,
    handleDetailClose,
    QUERY_POOL_ABI,
    strategies
  } = props;
  const { StakeTokens } = dexConfig;
  const balanceList = formatTVL(record).list || [];
  const [state, updateState] = useMultiState({
    unStakePercent: 25,
    pending: false
  });

  const queryPoolInfo = ({ fee }) => {
    return new Promise((resolve) => {
      const contract = new ethers.Contract(fee.pool, QUERY_POOL_ABI, provider.getSigner());
      const params = [];
      contract
        .slot0(...params)
        .then((poolAddress) => {
          const [sqrtPriceX96] = poolAddress;
          resolve(sqrtPriceX96);
        })
        .catch((err) => {
          console.log('queryPoolInfo failed, ', err);
          resolve(false);
        });
    });
  };

  const handleAmount = (value) => {
    updateState({
      unStakePercent: value
    });
  };

  const formatAddAction = (actionText, _amount, status, transactionHash, tokenSymbol) => {
    addAction?.({
      type: 'Staking',
      action: actionText,
      token: {
        symbol: tokenSymbol
      },
      amount: _amount,
      template: props.name,
      add: false,
      status,
      transactionHash
    });
  };

  const handleSubmit = () => {
    if (!record.agentAddress) return;
    updateState({
      pending: true
    });
    if ([strategies[0].name].includes(record.name.toLowerCase())) {
      const params = [
        // receiver
        account
      ];
      const contract = new ethers.Contract(record.agentAddress, WITHDRAW_POOL_ABI_LOOPER, provider.getSigner());
      const getTx = (gas) => {
        const contractOption = {
          gasLimit: gas || 4000000
        };
        contract
          .moduleD_withdrawBalanceTo(...params, contractOption)
          .then((tx) => {
            tx.wait()
              .then((res) => {
                const { status, transactionHash } = res;
                updateState({
                  pending: false
                });
                if (status !== 1) throw new Error('');
                // call back
                handleDetailClose();
                onSuccess();
                formatAddAction(actionText, balanceList[0]?.balance, status, transactionHash, balanceList[0]?.symbol);
                toast?.success({
                  title: `${actionText} Successfully!`,
                  text: `${actionText} ${Big(balanceList[0]?.balance || 0).toFixed(4)} DETH`,
                  tx: transactionHash,
                  chainId
                });
              })
              .catch((err) => {
                console.log('tx error: ', err);
                updateState({
                  pending: false
                });
                toast?.fail({
                  title: `${actionText} Failed!`,
                  text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ``
                });
              });
          })
          .catch((err) => {
            console.log('contract fn error: ', err);
            updateState({
              pending: false
            });
            toast?.fail({
              title: `${actionText} Failed!`,
              text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ``
            });
          });
      };

      const estimateGas = () => {
        contract.estimateGas
          .moduleD_withdrawBalanceTo(...params, {})
          .then((gas) => {
            getTx(gas);
          })
          .catch((err) => {
            console.log('get gas failed: ', err);
            getTx();
          });
      };

      estimateGas();
      return;
    }
    if ([strategies[3].name, strategies[2].name].includes(record.name.toLowerCase())) {
      // contract is rootAgent.agentAddress
      const params = [
        // to
        record.agentAddress,
        // value
        parseUnits('0', 18),
        // data
        `0xc4fb5289000000000000000000000000${account.replace(/^0x/, '')}`,
        // operation
        0
      ];
      const contract = new ethers.Contract(rootAgent.agentAddress, WITHDRAW_POOL_ABI_DEX, provider.getSigner());
      const getTx = (gas) => {
        const contractOption = {
          gasLimit: gas || 4000000
        };
        contract
          .execute(...params, contractOption)
          .then((tx) => {
            tx.wait()
              .then((res) => {
                const { status, transactionHash } = res;
                updateState({
                  pending: false
                });
                if (status !== 1) throw new Error('');
                // call back
                handleDetailClose();
                onSuccess();
                formatAddAction(actionText, balanceList[0]?.balance, status, transactionHash, balanceList[0]?.symbol);
                toast?.success({
                  title: `${actionText} Successfully!`,
                  text: `${actionText} ${Big(balanceList[0]?.balance || 0).toFixed(4)} ${balanceList[0]?.symbol}`,
                  tx: transactionHash,
                  chainId
                });
              })
              .catch((err) => {
                console.log('tx error: ', err);
                updateState({
                  pending: false
                });
                toast?.fail({
                  title: `${actionText} Failed!`,
                  text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ``
                });
              });
          })
          .catch((err) => {
            console.log('contract fn error: ', err);
            updateState({
              pending: false
            });
            toast?.fail({
              title: `${actionText} Failed!`,
              text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ``
            });
          });
      };

      const estimateGas = () => {
        contract.estimateGas
          .execute(...params, {})
          .then((gas) => {
            getTx(gas);
          })
          .catch((err) => {
            console.log('get gas failed: ', err);
            getTx();
          });
      };

      estimateGas();
      return;
    }
    if (record.name.toLowerCase() === strategies[1].name) {
      const currentBalancesList = record.balances || [];
      const currentBalance = currentBalancesList.find((it) => /^BlasterSwap Positions NFT/.test(it.name));
      if (!currentBalance || Big(currentBalance.balance || 0).lte(0)) {
        toast?.fail({
          title: `${actionText} Failed!`,
          text: 'This strategy currently has no balance to withdraw!'
        });
        updateState({
          pending: false
        });
        return;
      }
      const liquidity = Big(currentBalance.balance || 0).times(Big(state.unStakePercent).div(100));

      if (liquidity.toNumber() !== Math.floor(liquidity.toNumber())) {
        toast?.fail({
          title: `${actionText} Failed!`,
          text: 'Please select another ratio withdraw!'
        });
        updateState({
          pending: false
        });
        return;
      }
      const { name } = currentBalance;
      // query sqrtprocex96
      const fee = currentStrategy.meta.feeTierList.find((it) => it.name.includes(name));
      if (!fee) {
        toast?.fail({
          title: `${actionText} Failed!`,
          text: 'This strategy currently has no balance to withdraw!'
        });
        updateState({
          pending: false
        });
        return;
      }
      queryPoolInfo({ fee }).then((sqrtPriceX96) => {
        if (!sqrtPriceX96) {
          toast?.fail({
            title: `${actionText} Failed!`,
            text: 'Query pool information failed!'
          });
          updateState({
            pending: false
          });
          return;
        }
        const params = [
          // receiver
          account,
          // liquidity - uint128
          currentStrategy.meta.formatBigInt(liquidity.toNumber()),
          // sqrtPriceX96 - uint160
          sqrtPriceX96,
          // slippageLiquidity - uint24
          1000000
        ];
        const contract = new ethers.Contract(record.agentAddress, WITHDRAW_POOL_ABI_CLM, provider.getSigner());
        const getTx = (gas) => {
          const contractOption = {
            gasLimit: gas || 4000000
          };
          contract
            .moduleC_partialWithdrawTo(...params, contractOption)
            .then((tx) => {
              tx.wait()
                .then((res) => {
                  const { status, transactionHash } = res;
                  updateState({
                    pending: false
                  });
                  if (status !== 1) throw new Error('');
                  // call back
                  handleDetailClose();
                  onSuccess();
                  formatAddAction(actionText, balanceList[0]?.balance, status, transactionHash, balanceList[0]?.symbol);
                  toast?.success({
                    title: `${actionText} Successfully!`,
                    text: `${actionText} ${Big(balanceList[0]?.balance || 0).toFixed(4)} ${balanceList[0]?.symbol}`,
                    tx: transactionHash,
                    chainId
                  });
                })
                .catch((err) => {
                  console.log('tx error: ', err);
                  updateState({
                    pending: false
                  });
                  toast?.fail({
                    title: `${actionText} Failed!`,
                    text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ``
                  });
                });
            })
            .catch((err) => {
              console.log('contract fn error: ', err);
              updateState({
                pending: false
              });
              toast?.fail({
                title: `${actionText} Failed!`,
                text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ``
              });
            });
        };

        const estimateGas = () => {
          contract.estimateGas
            .moduleC_partialWithdrawTo(...params, {})
            .then((gas) => {
              getTx(gas);
            })
            .catch((err) => {
              console.log('get gas failed: ', err);
              getTx();
            });
        };

        estimateGas();
      });
    }
  };

  const { unStakePercent, pending } = state;

  const renderButton = (disabled) => {
    return (
      <StyledButton disabled={pending || disabled} onClick={handleSubmit}>
        {pending ? <Loading size={16} /> : 'WITHDRAW'}
      </StyledButton>
    );
  };

  const renderWithdraw = () => {
    // can select withdraw value
    if (record.name.toLowerCase() === strategies[1].name) {
      let noValueDisabled = false;
      const currentBalancesList = record.balances || [];
      const currentBalance = currentBalancesList.find((it) => /^BlasterSwap Positions NFT/.test(it.name));
      if (!currentBalance || Big(currentBalance.balance || 0).lte(0)) {
        noValueDisabled = true;
      }
      return (
        <>
          <StyledContent>
            <StyledFormItem>
              <StyledFormItemTitle>Withdraw</StyledFormItemTitle>
              <StyledFormItemBody>
                <StyledCLMWithdrawRateList>
                  {clmWithdrawRateList.map((item) => (
                    <StyledCLMWithdrawRate
                      key={item.value}
                      onClick={() => handleAmount(item.value)}
                      className={`${unStakePercent === item.value ? 'active' : ''}`}
                    >
                      {item.label}
                    </StyledCLMWithdrawRate>
                  ))}
                </StyledCLMWithdrawRateList>
              </StyledFormItemBody>
              <StyledFormItemBody>
                <StyledWithdrawTips>
                  <div className="value">{unStakePercent}%</div>
                  <div className="title">Withdraw</div>
                  <div className="assets">
                    <div className="head-wd">
                      <div className="row-wd">
                        <div className="col-wd" style={{ flexBasis: '20%' }}>
                          Asset
                        </div>
                        <div className="col-wd" style={{ flexBasis: '40%' }}>
                          LP Balance
                        </div>
                        <div className="col-wd" style={{ flexBasis: '40%' }}>
                          Withdraw
                        </div>
                      </div>
                    </div>
                    <div className="body-wd">
                      {balanceList.length
                        ? balanceList.map((b) => (
                            <div className="row-wd" key={b.symbol}>
                              <div className="col-wd" style={{ flexBasis: '20%' }}>
                                {b.symbol}
                              </div>
                              <div className="col-wd" style={{ flexBasis: '40%' }}>
                                {Big(b.balance || 0).toFixed(4, Big.roundDown)}
                              </div>
                              <div className="col-wd" style={{ flexBasis: '40%' }}>
                                {Big(b.balance || 0)
                                  .times(Big(unStakePercent || 0).div(100))
                                  .toFixed(4, Big.roundDown)}
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                  </div>
                </StyledWithdrawTips>
              </StyledFormItemBody>
            </StyledFormItem>
            {noValueDisabled && (
              <StyledFormItem>
                <StyledTips className="invalid">This strategy currently has no balance to withdraw!</StyledTips>
              </StyledFormItem>
            )}
          </StyledContent>
          {renderButton(!unStakePercent || noValueDisabled)}
        </>
      );
    }
    // withdraw all but show diff text
    if ([strategies[0].name].includes(record.name.toLowerCase())) {
      return (
        <>
          <StyledContent>
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <StyledTips>All positions will be unwound and funds returned.</StyledTips>
              <StyledTips>Withdrawal Balance</StyledTips>
              {balanceList.length ? (
                balanceList.map((tk, index) => (
                  <StyledTips key={index}>
                    {Big(tk.balance).toFixed(4, Big.roundDown)} {tk.symbol}
                  </StyledTips>
                ))
              ) : (
                <StyledTips>No balance</StyledTips>
              )}
            </div>
          </StyledContent>
          {renderButton(!balanceList.length)}
        </>
      );
    }
    if (record.name.toLowerCase() === strategies[3].name) {
      return (
        <>
          <StyledContent>
            <StyledTips className="full">
              Withdraw all your funds - only recommended after all tasks are completed!
            </StyledTips>
          </StyledContent>
          {renderButton(!balanceList.length)}
        </>
      );
    }
    if (record.name.toLowerCase() === strategies[2].name) {
      return (
        <>
          <StyledContent>
            <StyledTips className="full">Withdraw your full position.</StyledTips>
          </StyledContent>
          {renderButton(!balanceList.length)}
        </>
      );
    }
  };

  return <StyledContainer>{renderWithdraw()}</StyledContainer>;
});
