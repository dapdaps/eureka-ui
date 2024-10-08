// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';

import ChainWarningBox from '@/modules/components/ChainWarningBox';
import { useMultiState } from '@/modules/hooks';

import Loading from '../../Bridge/Loading';
import {
  StackedRectangleBalance,
  StackedRectangleBalanceSubTitle,
  StackedRectangleBalanceTitle,
  StyledBlastoff,
  StyledCapsuleButton,
  StyledCapsuleButtonList,
  StyledClaimButton,
  StyledPositionsContainer,
  StyledPositionsTips,
  StyledPostion,
  StyledPostionColumn,
  StyledPostionLabel,
  StyledPostionRow,
  StyledPostions,
  StyledPostionValue,
  StyledStackedRectangle,
  StyledStackedRectangleBottom,
  StyledStackedRectangleMiddle,
  StyledStackedRectangleMiddleInput,
  StyledStackedRectangleMiddleMax,
  StyledStackedRectangleMiddleTitle,
  StyledStackedRectangleMiddleTop,
  StyledStackedRectangleTop,
  StyledStakeButton,
  StyledStakeLoadingButton,
  StyledTokenButton,
  StyledTokenButtonList,
  StyledUnstakeButton,
  StyledVaultContainer,
  StyledVaultImage,
  StyledVaultTips,
  StyledVaultTipsList,
  StyledVaultTitle,
  StyledVaultTop
} from './styles';

export default memo(function BlastOff(props: any) {
  const {
    toast,
    account,
    provider,
    chainId,
    CHAIN_LIST,
    multicallAddress,
    dexConfig,
    curChain,
    isChainSupported,
    switchingChain,
    onSwitchChain,
    addAction,
    connectProps,
    prices
  } = props;
  const sender = account;
  const [state, updateState] = useMultiState<any>({
    categoryList: ['Vaults', 'Positions'],
    categoryIndex: 0,
    symbolList: ['ETH', 'USDB'],
    symbolIndex: 0,
    pool: null,
    positionList: [],
    stakeLoading: false,
    stakedAmount: '',
    unStakeLoading: false,
    claimLoading: false,
    checkedPoolId: 0
  });

  const { pool, categoryList, categoryIndex, symbolList, symbolIndex, stakedAmount, stakeLoading, positionList } =
    state;

  const COLUMN_LIST = [
    {
      key: 'userStakePosition',
      type: 'money',
      width: '15%'
    },
    {
      key: 'yield',
      label: 'Yield Earned',
      type: 'money',
      width: '15%'
    },
    {
      key: 'off',
      label: '$OFFxPoints / Hour',
      width: '15%'
    },
    {
      key: 'bx',
      label: '$BxPoints / Hour',
      width: '15%'
    },
    {
      key: 'operation',
      label: '',
      width: '40%'
    }
  ];
  const contractAddress = '0xd9747a98624f0B64B4412632C420672E16432334';
  const isInSufficient = Number(stakedAmount) > Number(pool?.walletBalance);

  function promiseContractQuery(address, abi, method, data) {
    const contract = new ethers.Contract(ethers.utils.getAddress(address), abi, provider?.getSigner());
    return new Promise((resolve, reject) => {
      contract[method](...data)
        .then(resolve)
        .catch(reject);
    });
  }
  function queryPool(poolId) {
    const promiseArray = [];
    const abi = [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256'
          }
        ],
        name: 'poolInfo',
        outputs: [
          {
            internalType: 'uint256',
            name: 'yieldAPY',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'yieldToken',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'stakeToken',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'totalStaked',
            type: 'uint256'
          },
          {
            internalType: 'bool',
            name: 'enabled',
            type: 'bool'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      },
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'poolId',
            type: 'uint256'
          },
          {
            internalType: 'address',
            name: 'account',
            type: 'address'
          }
        ],
        name: 'getUserStakePosition',
        outputs: [
          {
            components: [
              {
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'lastCalcTs',
                type: 'uint256'
              },
              {
                internalType: 'uint256',
                name: 'pendingReward',
                type: 'uint256'
              }
            ],
            internalType: 'struct INonLockStaking.StakePosition',
            name: '',
            type: 'tuple'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      }
    ];
    // query poolInfo
    promiseArray.push(promiseContractQuery(contractAddress, abi, 'poolInfo', [poolId]));
    // query getUserStakePosition
    promiseArray.push(promiseContractQuery(contractAddress, abi, 'getUserStakePosition', [poolId, sender]));
    return new Promise((resolve, reject) => {
      Promise.all(promiseArray)
        .then((result) => {
          const [poolInfoResult, getUserStakePositionResult] = result;
          const yieldAPY = Big(poolInfoResult[0]).div(1000).toString();
          const stakeToken = poolInfoResult[2];
          const userStakePosition = ethers.utils.formatUnits(getUserStakePositionResult[0], 18);
          if (poolId === 0) {
            provider.getBalance(sender).then((balanceResult) => {
              const walletBalance = Big(ethers.utils.formatEther(balanceResult)).toFixed(6);
              const pool = {
                yieldAPY,
                stakeToken,
                walletBalance,
                userStakePosition
              };
              resolve(pool);
            });
          } else {
            const contract = new ethers.Contract(
              stakeToken,
              ['function balanceOf(address) view returns (uint256)'],
              provider
            );
            contract.balanceOf(sender).then((balanceResult) => {
              const walletBalance = Big(ethers.utils.formatUnits(balanceResult, 18)).toFixed(6);
              const pool = {
                yieldAPY,
                stakeToken,
                walletBalance,
                userStakePosition
              };
              resolve(pool);
            });
          }
        })
        .catch(reject);
    });
  }
  function handleQueryPool(poolId) {
    queryPool(poolId)
      .then((pool) => {
        updateState({
          pool
        });
      })
      .catch((error) => {
        console.log('=error', error);
      });
  }
  function handleStakedAmountChange(amount) {
    if (Number(amount) === 0) {
      updateState({
        stakedAmount: amount
      });
      return;
    }
    updateState({
      stakedAmount: amount
    });
  }
  function handleQueryPositions() {
    const promiseArray = [];
    promiseArray.push(queryPool(0));
    promiseArray.push(queryPool(1));
    Promise.all(promiseArray).then((result) => {
      updateState({
        positionList: result
          .map((pool, poolId) => {
            return {
              poolId,
              ...pool
            };
          })
          .filter((position) => Big(position.userStakePosition).gt(0))
      });
    });
  }
  function doStake(_amount) {
    const toastId = toast?.loading({
      title: `Stake ${stakedAmount} ${symbolList[symbolIndex]}`
    });
    const abi = [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'poolId',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          }
        ],
        name: 'stake',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
      }
    ];
    const contract = new ethers.Contract(ethers.utils.getAddress(contractAddress), abi, provider.getSigner());
    const params = symbolIndex === 0 ? [symbolIndex, _amount, { value: _amount }] : [symbolIndex, _amount];
    contract
      .stake(...params)
      .then((tx) => tx.wait())
      .then((result) => {
        const { status, transactionHash } = result;
        toast?.dismiss(toastId);
        if (status !== 1) throw new Error('');
        toast?.success({
          title: 'Stake Successfully!',
          text: `Stake ${stakedAmount} ${symbolList[symbolIndex]}`,
          tx: transactionHash,
          chainId
        });
        updateState({
          stakeLoading: false
        });
        if (status === 1) {
          addAction?.({
            type: 'Staking',
            action: 'Stake',
            token: {
              symbol: symbolList[symbolIndex]
            },
            amount: stakedAmount,
            template: 'BlastOff',
            add: true,
            status,
            transactionHash
          });
          handleQueryPool(symbolIndex);
        }
      })
      .catch((error) => {
        updateState({
          stakeLoading: false
        });
        toast?.fail({
          title: 'Stake Failed!',
          text: error?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : `Stake ${stakedAmount} ${symbolList[symbolIndex]}`
        });
      });
  }
  function handleStake() {
    const _amount = Big(stakedAmount).mul(Big(10).pow(18)).toFixed(0);
    updateState({
      stakeLoading: true
    });
    if (symbolIndex === 0) {
      doStake(_amount);
    } else {
      const toastId = toast?.loading({
        title: `Approve ${symbolList[symbolIndex]}`
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
      const contract = new ethers.Contract(ethers.utils.getAddress(pool.stakeToken), abi, provider.getSigner());
      contract
        .approve(contractAddress, _amount)
        .then((tx) => tx.wait())
        .then((result) => {
          const { status, transactionHash } = result;
          toast?.dismiss(toastId);
          if (status !== 1) throw new Error('');
          toast?.success({
            title: 'Approve Successfully!',
            // text: `Approved ${stakedAmount} ${symbolList[symbolIndex]}`,
            tx: transactionHash,
            chainId
          });
          doStake(_amount);
        })
        .catch((error) => {
          updateState({
            stakeLoading: false
          });
          toast?.fail({
            title: 'Approve Failed!',
            text: error?.message?.includes('user rejected transaction') ? 'User rejected transaction' : null
          });
        });
    }
  }
  function handleClaim(index) {
    const position = positionList[index];
    updateState({
      claimLoading: true,
      checkedPoolId: position.poolId
    });
    const toastId = toast?.loading({
      title: `Claim ${position.userStakePosition} ${symbolList[position.poolId]}`
    });
    const abi = [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'poolId',
            type: 'uint256'
          }
        ],
        name: 'claimPendingReward',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ];
    const contract = new ethers.Contract(contractAddress, abi, provider.getSigner());
    contract
      .claimPendingReward(position.poolId)
      .then((tx) => tx.wait())
      .then((result) => {
        const { status, transactionHash } = result;
        toast?.dismiss(toastId);
        if (status !== 1) throw new Error('');

        toast?.success({
          title: 'Claim Successfully!',
          text: `Claimed ${position.userStakePosition} ${symbolList[position.poolId]}`,
          tx: transactionHash,
          chainId
        });
        updateState({
          claimLoading: false
        });
        if (status === 1) {
          handleQueryPositions();
        }
      })
      .catch((error) => {
        updateState({
          claimLoading: false
        });
        toast?.fail({
          title: 'Claim Failed!',
          text: error?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : `Claim ${position.userStakePosition} ${symbolList[position.poolId]}`
        });
      });
  }
  function handleUnstake(index) {
    const position = positionList[index];
    updateState({
      unStakeLoading: true,
      checkedPoolId: position.poolId
    });
    const toastId = toast?.loading({
      title: `UnStake ${position.userStakePosition} ${symbolList[position.poolId]}`
    });
    const abi = [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'poolId',
            type: 'uint256'
          }
        ],
        name: 'unstake',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ];
    const contract = new ethers.Contract(contractAddress, abi, provider.getSigner());
    contract
      .unstake(position.poolId)
      .then((tx) => tx.wait())
      .then((result) => {
        const { status, transactionHash } = result;
        toast?.dismiss(toastId);
        if (status !== 1) throw new Error('');
        toast?.success({
          title: 'UnStake Successfully!',
          text: `UnStaked ${position.userStakePosition} ${symbolList[position.poolId]}`,
          tx: transactionHash,
          chainId
        });
        updateState({
          unStakeLoading: false
        });
        if (status === 1) {
          addAction?.({
            type: 'Staking',
            action: 'UnStake',
            token: {
              symbol: symbolList[position.poolId]
            },
            amount: position.userStakePosition,
            template: 'BlastOff',
            add: false,
            status,
            transactionHash
          });
          handleQueryPositions();
        }
      })
      .catch((error) => {
        updateState({
          unStakeLoading: false
        });
        toast?.fail({
          title: 'UnStake Failed!',
          text: error?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : `UnStake ${position.userStakePosition} ${symbolList[position.poolId]}`
        });
      });
  }
  function handleMax() {
    updateState({
      stakedAmount: state.pool?.walletBalance
    });
  }
  useEffect(() => {
    handleQueryPool(symbolIndex);
    updateState({
      stakedAmount: ''
    });
  }, [symbolIndex]);
  useEffect(() => {
    if (categoryIndex > 0) {
      handleQueryPositions();
    } else {
      handleQueryPool(symbolIndex);
    }
  }, [categoryIndex]);
  return !sender || !isChainSupported ? (
    <ChainWarningBox chain={curChain} onSwitchChain={onSwitchChain} theme={dexConfig.theme?.button} />
  ) : (
    <StyledBlastoff>
      <StyledCapsuleButtonList>
        {categoryList.map((category, index) => (
          <StyledCapsuleButton
            key={index}
            style={{
              background: categoryIndex === index ? '#32364B' : 'transparent',
              borderColor: categoryIndex === index ? '#373A53' : 'transparent',
              color: categoryIndex === index ? '#FFF' : '#979ABE'
            }}
            onClick={() => {
              updateState({
                categoryIndex: index
              });
            }}
          >
            {category}
          </StyledCapsuleButton>
        ))}
      </StyledCapsuleButtonList>
      {categoryIndex === 0 ? (
        <StyledVaultContainer>
          <StyledVaultTop>
            <StyledVaultTitle>GEN1 YIELD VAULT</StyledVaultTitle>
            <StyledVaultImage src="/assets/images/gen1-yield-vault.png" />
          </StyledVaultTop>
          <StyledTokenButtonList>
            {symbolList.map((symbol, index) => (
              <StyledTokenButton
                key={index}
                className={symbolIndex === index ? 'active' : ''}
                onClick={() => {
                  updateState({
                    symbolIndex: index
                  });
                }}
              >
                {symbol}
              </StyledTokenButton>
            ))}
          </StyledTokenButtonList>
          <StyledVaultTipsList>
            <StyledVaultTips>
              The Staking Vault generates Future Yield Tokens that can be used in YIDOs and runs strategies to
              accumulate Points across Blast Projects.
            </StyledVaultTips>
            <StyledVaultTips>Every 1 ETH Staked generates 100 $OFFxPoints Daily.</StyledVaultTips>
            <StyledVaultTips>
              Every 1 ETH Staked generates 30 $BPoints Daily. Earlier participation will be rewarded with higher daily
              distribution.
            </StyledVaultTips>
            <StyledVaultTips>
              To withdraw Staked ETH head over to “Positions” and “Request Unstake”, assets will be available to
              withdraw after 24 Hours.
            </StyledVaultTips>
          </StyledVaultTipsList>
          <StyledStackedRectangle>
            <StyledStackedRectangleTop>
              <StackedRectangleBalance>
                <StackedRectangleBalanceTitle>Staked {symbolList[symbolIndex]} Balance</StackedRectangleBalanceTitle>
                <StackedRectangleBalanceSubTitle>
                  {state.pool?.userStakePosition} {symbolList[symbolIndex]}
                </StackedRectangleBalanceSubTitle>
              </StackedRectangleBalance>
              <StackedRectangleBalance>
                <StackedRectangleBalanceTitle>Wallet Balance</StackedRectangleBalanceTitle>
                <StackedRectangleBalanceSubTitle>
                  {state.pool?.walletBalance} {symbolList[symbolIndex]}
                </StackedRectangleBalanceSubTitle>
              </StackedRectangleBalance>
            </StyledStackedRectangleTop>
            <StyledStackedRectangleMiddle>
              <StyledStackedRectangleMiddleTop>
                <StyledStackedRectangleMiddleTitle>Staked {symbolList[symbolIndex]}</StyledStackedRectangleMiddleTitle>
                <StyledStackedRectangleMiddleMax onClick={handleMax}>Max</StyledStackedRectangleMiddleMax>
              </StyledStackedRectangleMiddleTop>
              <StyledStackedRectangleMiddleInput
                type="number"
                placeholder="0"
                value={stakedAmount}
                onChange={(event) => handleStakedAmountChange(event.target.value)}
              />
            </StyledStackedRectangleMiddle>
            <StyledStackedRectangleBottom>
              <StackedRectangleBalance>
                <StackedRectangleBalanceTitle>Future Yield APR</StackedRectangleBalanceTitle>
                <StackedRectangleBalanceSubTitle>
                  {state.pool?.yieldAPY}% fy{symbolList[symbolIndex]}
                </StackedRectangleBalanceSubTitle>
              </StackedRectangleBalance>
              <StackedRectangleBalance>
                <StackedRectangleBalanceTitle>$BxPoints</StackedRectangleBalanceTitle>
                <StackedRectangleBalanceSubTitle>1x</StackedRectangleBalanceSubTitle>
              </StackedRectangleBalance>
              <StackedRectangleBalance>
                <StackedRectangleBalanceTitle>$OFFxPoints</StackedRectangleBalanceTitle>
                <StackedRectangleBalanceSubTitle>1x</StackedRectangleBalanceSubTitle>
              </StackedRectangleBalance>
            </StyledStackedRectangleBottom>
          </StyledStackedRectangle>

          {isInSufficient ? (
            <StyledStakeButton disabled>InSufficient Balance</StyledStakeButton>
          ) : stakeLoading ? (
            <StyledStakeLoadingButton disabled>
              <Loading />
            </StyledStakeLoadingButton>
          ) : (
            <StyledStakeButton disabled={state.stakedAmount > 0 ? false : true} onClick={handleStake}>
              Stake {symbolList[symbolIndex]}
            </StyledStakeButton>
          )}
        </StyledVaultContainer>
      ) : (
        <StyledPositionsContainer>
          {state.positionList.length > 0 ? (
            <StyledPostions>
              {state.positionList.map((position, index) => {
                return (
                  <StyledPostion key={index}>
                    {COLUMN_LIST.map((column) => {
                      return column.key === 'operation' ? (
                        <StyledPostionRow key={column.key} style={{ width: column.width }}>
                          {state.checkedPoolId === position.poolId && state.claimLoading ? (
                            <StyledClaimButton disabled>
                              <Loading />
                            </StyledClaimButton>
                          ) : (
                            <StyledClaimButton onClick={() => handleClaim(index)}>Claim Yield</StyledClaimButton>
                          )}
                          {state.checkedPoolId === position.poolId && state.unStakeLoading ? (
                            <StyledUnstakeButton disabled>
                              <Loading />
                            </StyledUnstakeButton>
                          ) : (
                            <StyledUnstakeButton onClick={() => handleUnstake(index)}>Unstake</StyledUnstakeButton>
                          )}
                        </StyledPostionRow>
                      ) : (
                        <StyledPostionColumn key={column.key} style={{ width: column.width }}>
                          <StyledPostionLabel>
                            {column.key === 'userStakePosition'
                              ? `Staked ${symbolList[position.poolId]}`
                              : column.label}
                          </StyledPostionLabel>
                          {column.type === 'money' ? (
                            <StyledPostionValue>
                              {position[column.key] ?? '1'} {symbolList[position.poolId]}
                            </StyledPostionValue>
                          ) : (
                            <StyledPostionValue>{position[column.key] ?? '1'}</StyledPostionValue>
                          )}
                        </StyledPostionColumn>
                      );
                    })}
                  </StyledPostion>
                );
              })}
            </StyledPostions>
          ) : (
            <StyledPositionsTips>Your positions will appear here.</StyledPositionsTips>
          )}
        </StyledPositionsContainer>
      )}
    </StyledBlastoff>
  );
});
