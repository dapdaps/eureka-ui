// @ts-nocheck
import type { BigNumberish } from '@ethersproject/bignumber';
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';

import useAccount from '@/hooks/useAccount';
import { useMultiState } from '@/modules/hooks';

import {
  BalancePrice,
  Column,
  DetailWrapper,
  FilterButton,
  FilterButtonList,
  Input,
  InputSuffix,
  InputWrap,
  PriceWrap,
  Row,
  StyledButton,
  StyledButtonList,
  StyledImageList,
  TotalPrice
} from '../../styles';
import Loading from '../Loading';

export default memo(function Detail(props: any) {
  const { account, provider } = useAccount();
  const {
    from,
    data,
    toast,
    prices,
    refetch,
    addresses,
    defaultDex,
    proxyAddress,
    addAction,
    userPositions,
    ICON_VAULT_MAP
  } = props;

  const defaultDeposit = props.tab === 'deposit' || !props.tab;

  const [state, updateState] = useMultiState<any>({
    isDeposit: defaultDeposit,
    lpBalance: '',
    balances: [],
    amount0: '',
    amount1: '',
    lpAmount: '',
    isError: false,
    isLoading: false,
    isToken0Approved: true,
    isToken1Approved: true,
    isToken0Approving: false,
    isToken1Approving: false,
    loadingMsg: '',
    isPostTx: false,
    showPairs: false
  });
  const sourceBalances = {};
  const {
    isDeposit,
    balances,
    amount0,
    amount1,
    isLoading,
    isError,
    isToken0Approved,
    isToken1Approved,
    isToken0Approving,
    isToken1Approving,
    loadingMsg,
    lpBalance,
    lpAmount,
    isPostTx
  } = state;

  const detailLoading = Object.keys(balances).length < 2 || lpBalance === '';
  const sender = account;
  const { token0, token1, decimals0, decimals1, id, poolAddress, liquidity } = data;

  const vaultAddress = addresses[id];

  const updateLPBalance = () => {
    const abi = ['function balanceOf(address) view returns (uint256)'];
    const contract = new ethers.Contract(ethers.utils.getAddress(vaultAddress), abi, provider);
    contract.balanceOf(sender).then((balanceBig) => {
      const adjustedBalance = ethers.utils.formatUnits(balanceBig, 18);
      updateState({
        lpBalance: adjustedBalance
      });
    });
  };
  const updateBalance = (token) => {
    const { address, decimals, symbol } = token;
    if (symbol === 'ETH') {
      provider.getBalance(sender).then((balanceBig) => {
        const adjustedBalance = Big(ethers.utils.formatEther(balanceBig)).toFixed();
        sourceBalances[symbol] = adjustedBalance;
        updateState({
          balances: sourceBalances
        });
      });
    } else {
      const erc20Abi = ['function balanceOf(address) view returns (uint256)'];
      const contract = new ethers.Contract(address, erc20Abi, provider);
      contract.balanceOf(sender).then((balanceBig) => {
        const adjustedBalance = Big(ethers.utils.formatUnits(balanceBig, decimals)).toFixed();
        sourceBalances[symbol] = adjustedBalance;
        updateState({
          balances: sourceBalances
        });
      });
    }
  };

  const handleCheckApproval = (symbol, amount, decimals) => {
    const wei = ethers.utils.parseUnits(Big(amount).toFixed(decimals), decimals);
    const abi = ['function allowance(address, address) external view returns (uint256)'];

    const contract = new ethers.Contract(addresses[symbol], abi, provider);

    contract
      .allowance(sender, vaultAddress)
      .then((allowance) => {
        updateState({
          [symbol === token0 ? 'isToken0Approved' : 'isToken1Approved']: !new Big(allowance.toString()).lt(wei)
        });
      })
      .catch((e) => console.log(e));
  };
  const checkApproval = (amount, otherAmount, symbol) => {
    const otherSymbol = symbol === token0 ? token1 : token0;
    const decimals = symbol === token0 ? decimals0 : decimals1;
    const otherDecimals = symbol === token0 ? decimals1 : decimals0;

    handleCheckApproval(symbol, amount, decimals);
    handleCheckApproval(otherSymbol, otherAmount, otherDecimals);
  };
  const changeMode = (isDeposit) => {
    updateState({ isDeposit });
  };

  const handleMax = (isToken0) => {
    if (isToken0) handleTokenChange(balances[token0], token0);
    else handleTokenChange(balances[token1], token1);
  };
  const handleGetMintAmount = (amount0Max, amount1Max, callback) => {
    const abi =
      props?.data?.chain_id === 169
        ? [
            {
              inputs: [
                {
                  internalType: 'uint128',
                  name: 'amountXMax',
                  type: 'uint128'
                },
                {
                  internalType: 'uint128',
                  name: 'amountYMax',
                  type: 'uint128'
                }
              ],
              name: 'getMintAmounts',
              outputs: [
                {
                  internalType: 'uint256',
                  name: 'amountX',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256',
                  name: 'amountY',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256',
                  name: 'mintAmount',
                  type: 'uint256'
                }
              ],
              stateMutability: 'view',
              type: 'function'
            }
          ]
        : [
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'amount0Max',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256',
                  name: 'amount1Max',
                  type: 'uint256'
                }
              ],
              name: 'getMintAmounts',
              outputs: [
                {
                  internalType: 'uint256',
                  name: 'amount0',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256',
                  name: 'amount1',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256',
                  name: 'mintAmount',
                  type: 'uint256'
                }
              ],
              stateMutability: 'view',
              type: 'function'
            }
          ];

    const contract = new ethers.Contract(ethers.utils.getAddress(vaultAddress), abi, provider);
    contract.getMintAmounts(amount0Max, amount1Max).then((response) => {
      callback && callback(response);
    });
  };
  const handleTokenChange = (amount, symbol) => {
    updateState({
      [symbol === token0 ? 'amount0' : 'amount1']: amount
    });
    console.log('==amount', amount);
    if (Number(amount) === 0) {
      updateState({
        [symbol === token0 ? 'amount1' : 'amount0']: '',
        isToken0Approved: true,
        isToken1Approved: true
      });
      return;
    }
    updateState({
      isLoading: true,
      isError: false,
      loadingMsg: 'Computing deposit amount...'
    });

    const decimals = symbol === token0 ? decimals0 : decimals1;
    const otherDecimals = symbol === token0 ? decimals1 : decimals0;
    const targetAmount =
      props?.data?.chain_id === 169
        ? '340282366920938463463374607431768211455'
        : '1157920892373161954235709850086879078532699846656405';
    const amount0Max = symbol === token0 ? Big(amount).mul(Big(10).pow(decimals)).toFixed(0) : targetAmount;
    const amount1Max = symbol === token1 ? Big(amount).mul(Big(10).pow(decimals)).toFixed(0) : targetAmount;
    const abi =
      props?.data?.chain_id === 169
        ? [
            {
              inputs: [
                {
                  internalType: 'uint128',
                  name: 'amountXMax',
                  type: 'uint128'
                },
                {
                  internalType: 'uint128',
                  name: 'amountYMax',
                  type: 'uint128'
                }
              ],
              name: 'getMintAmounts',
              outputs: [
                {
                  internalType: 'uint256',
                  name: 'amountX',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256',
                  name: 'amountY',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256',
                  name: 'mintAmount',
                  type: 'uint256'
                }
              ],
              stateMutability: 'view',
              type: 'function'
            }
          ]
        : [
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'amount0Max',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256',
                  name: 'amount1Max',
                  type: 'uint256'
                }
              ],
              name: 'getMintAmounts',
              outputs: [
                {
                  internalType: 'uint256',
                  name: 'amount0',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256',
                  name: 'amount1',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256',
                  name: 'mintAmount',
                  type: 'uint256'
                }
              ],
              stateMutability: 'view',
              type: 'function'
            }
          ];
    const contract = new ethers.Contract(ethers.utils.getAddress(vaultAddress), abi, provider);
    contract
      .getMintAmounts(amount0Max, amount1Max)
      .then((response) => {
        const amountX = ethers.utils.formatUnits(response[0], otherDecimals);
        const amountY = ethers.utils.formatUnits(response[1], otherDecimals);
        const otherAmount = symbol === token0 ? amountY : amountX;
        updateState({
          isLoading: false,
          [symbol === token0 ? 'amount1' : 'amount0']: otherAmount
        });
        checkApproval(amount, otherAmount, symbol);
      })
      .catch((e) => {
        console.log('=e', e);
        updateState({
          isLoading: true,
          isError: true,
          loadingMsg: 'Something went wrong. Please try again.'
        });
        updateState({
          [symbol === token0 ? 'amount1' : 'amount0']: 0
        });
      });
  };
  const handleLPChange = (amount) => {
    updateState({
      lpAmount: amount
    });
  };

  const handleApprove = (isToken0) => {
    const _token = isToken0 ? token0 : token1;
    const payload = isToken0 ? { isToken0Approving: true } : { isToken1Approving: true };

    const amount = isToken0 ? Big(amount0).toFixed(decimals0) : Big(amount1).toFixed(decimals1);

    const toastId = toast?.loading({
      title: `Approve ${_token}`
    });

    updateState({
      ...payload,
      isLoading: true,
      loadingMsg: `Approving ${_token}...`
    });

    const tokenWei = ethers.utils.parseUnits(amount, isToken0 ? decimals0 : decimals1);

    const abi = ['function approve(address, uint) public'];

    const tokenContract = new ethers.Contract(addresses[_token], abi, provider.getSigner());

    tokenContract
      .approve(vaultAddress, tokenWei)
      .then((tx) => tx.wait())
      .then((receipt) => {
        const payload = isToken0
          ? { isToken0Approved: true, isToken0Approving: false }
          : { isToken1Approved: true, isToken1Approving: false };

        updateState({ ...payload, isLoading: false, loadingMsg: '' });
        toast?.dismiss(toastId);
        toast?.success({
          title: 'Approve Successfully!',
          tx: receipt.transactionHash,
          chainId: props?.data?.chain_id
        });
      })
      .catch((error) => {
        updateState({
          isError: true,
          isLoading: false,
          loadingMsg: error,
          isToken0Approving: false,
          isToken1Approving: false
        });
        toast?.dismiss(toastId);
        toast?.fail({
          title: 'Approve Failed!',
          text: error?.message?.includes('user rejected transaction') ? 'User rejected transaction' : null
        });
      });
  };
  const handleDeposit = () => {
    const toastId = toast?.loading({
      title: `Depositing...`
    });
    updateState({
      isLoading: true,
      isError: false,
      loadingMsg: 'Depositing...'
    });
    const abi =
      props?.data?.chain_id === 169
        ? [
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'mintAmount',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256[2]',
                  name: 'maxAmounts',
                  type: 'uint256[2]'
                }
              ],
              name: 'mint',
              outputs: [
                {
                  internalType: 'uint256',
                  name: 'amountX',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256',
                  name: 'amountY',
                  type: 'uint256'
                }
              ],
              stateMutability: 'nonpayable',
              type: 'function'
            }
          ]
        : [
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'mintAmount',
                  type: 'uint256'
                }
              ],
              name: 'mint',
              outputs: [
                {
                  internalType: 'uint256',
                  name: 'amount0',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256',
                  name: 'amount1',
                  type: 'uint256'
                }
              ],
              stateMutability: 'nonpayable',
              type: 'function'
            }
          ];

    const contract = new ethers.Contract(ethers.utils.getAddress(vaultAddress), abi, provider.getSigner());
    const targetAmount =
      props?.data?.chain_id === 169
        ? '340282366920938463463374607431768211455'
        : '1157920892373161954235709850086879078532699846656405';
    handleGetMintAmount(Big(amount0).mul(Big(10).pow(decimals0)).toFixed(0), targetAmount, async (response) => {
      const [_amount0, _amount1, mintAmount] = response;
      const params =
        props?.data?.chain_id === 169
          ? [
              mintAmount,
              [
                ethers.BigNumber.from(Big(_amount0).times(1.002).toFixed(0)),
                ethers.BigNumber.from(Big(_amount1).times(1.002).toFixed(0))
              ]
            ]
          : [mintAmount];

      let estimateGas: any = 300000;
      try {
        estimateGas = await contract.estimateGas.mint(...params);
      } catch (error) {
        console.log('error', error);
      }
      contract
        .mint(...params, {
          gasLimit: estimateGas ? Big(estimateGas.toString()).mul(1.2).toFixed(0) : 5000000
        })
        .then((tx) => {
          return tx.wait();
        })
        .then((receipt) => {
          const { status, transactionHash } = receipt;
          addAction?.({
            type: 'Liquidity',
            action: 'Deposit',
            token0,
            token1,
            amount: amount0,
            template: defaultDex,
            status: status,
            add: 1,
            transactionHash,
            chain_id: props?.data?.chain_id,
            extra_data: JSON.stringify({
              action: 'Deposit',
              amount0,
              amount1
            })
          });

          updateState({
            isLoading: false,
            isPostTx: true
          });

          setTimeout(() => updateState({ isPostTx: false }), 10_000);

          if (refetch) refetch();

          toast?.dismiss(toastId);
          toast?.success({
            title: 'Deposit Successfully!'
          });
        })
        .catch((error) => {
          console.log('=error', error);
          updateState({
            isError: true,
            isLoading: false,
            loadingMsg: error
          });
          toast?.dismiss(toastId);
          toast?.fail({
            title: 'Deposit Failed!',
            text: error?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ''
          });
        });
    });
  };
  const handleGetMinAmounts = (shares, callback) => {
    const abi = [
      {
        inputs: [
          {
            internalType: 'uint256',
            name: 'shares',
            type: 'uint256'
          }
        ],
        name: 'getUnderlyingBalancesByShare',
        outputs: [
          {
            internalType: 'uint256',
            name: 'amount0',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'amount1',
            type: 'uint256'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      }
    ];
    const contract = new ethers.Contract(vaultAddress, abi, provider.getSigner());
    contract.getUnderlyingBalancesByShare(shares).then((result) => callback && callback(result));
  };
  const handleWithdraw = () => {
    const toastId = toast?.loading({
      title: `Withdrawing...`
    });
    updateState({
      isLoading: true,
      isError: false,
      loadingMsg: 'Withdrawing...'
    });

    const amount = ethers.utils.parseUnits(Big(lpAmount).toFixed(18), 18);
    const abi =
      props?.data?.chain_id === 169
        ? [
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'burnAmount',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256[2]',
                  name: 'minAmounts',
                  type: 'uint256[2]'
                }
              ],
              name: 'burn',
              outputs: [
                {
                  internalType: 'uint256',
                  name: 'amountX',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256',
                  name: 'amountY',
                  type: 'uint256'
                }
              ],
              stateMutability: 'nonpayable',
              type: 'function'
            }
          ]
        : [
            {
              inputs: [
                {
                  internalType: 'uint256',
                  name: 'burnAmount',
                  type: 'uint256'
                }
              ],
              name: 'burn',
              outputs: [
                {
                  internalType: 'uint256',
                  name: 'amount0',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256',
                  name: 'amount1',
                  type: 'uint256'
                }
              ],
              stateMutability: 'nonpayable',
              type: 'function'
            }
          ];

    handleGetMinAmounts(amount, (response) => {
      const [amount0, amount1] = response;
      const contract = new ethers.Contract(vaultAddress, abi, provider.getSigner());
      const params =
        props?.data?.chain_id === 169
          ? [
              amount,
              [
                ethers.BigNumber.from(Big(amount0).times(0.99).toFixed(0)),
                ethers.BigNumber.from(Big(amount1).times(0.99).toFixed(0))
              ]
            ]
          : [amount];
      contract.callStatic.burn(...params).then((result) => {
        contract
          .burn(...params)
          .then((tx) => {
            return tx.wait();
          })
          .then((receipt) => {
            updateState({
              isLoading: false,
              isPostTx: true
            });
            const { status, transactionHash } = receipt;
            addAction?.({
              type: 'Liquidity',
              action: 'Withdraw',
              token0,
              token1,
              amount: lpAmount,
              template: defaultDex,
              status: status,
              add: 0,
              transactionHash,
              chain_id: state.chainId,
              extra_data: JSON.stringify({
                action: 'Withdraw',
                amount0: ethers.utils.formatUnits(result[0], decimals0),
                amount1: ethers.utils.formatUnits(result[1], decimals1)
              })
            });

            setTimeout(() => updateState({ isPostTx: false }), 10_000);

            if (refetch) refetch();

            toast?.dismiss(toastId);
            toast?.success({
              title: 'Withdraw Successfully!'
            });
          })
          .catch((error) => {
            updateState({
              isError: true,
              isLoading: false,
              loadingMsg: error
            });
            toast?.dismiss(toastId);
            toast?.fail({
              title: 'Withdraw Failed!',
              text: error?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ''
            });
          });
      });
    });
  };

  const tokensPrice = prices;

  const isInSufficient = Number(amount0) > Number(balances[token0]) || Number(amount1) > Number(balances[token1]);

  const isWithdrawInsufficient = Number(lpAmount) > Number(lpBalance);

  const balance0 =
    !amount0 || !tokensPrice?.[token0] ? '-' : parseFloat(Big(amount0).times(tokensPrice[token0]).toFixed(4));

  const balance1 =
    !amount1 || !tokensPrice?.[token1] ? '-' : parseFloat(Big(amount1).times(tokensPrice[token1]).toFixed(4));

  const balanceLp =
    !lpAmount || !lpBalance || !liquidity ? '-' : parseFloat(Big(lpAmount).div(lpBalance).times(liquidity).toFixed(4));

  const onUpdateLpPercent = (percent) => {
    updateState({
      lpPercent: percent
    });
  };

  const onChangeSlider = (percent) => {
    console.log('percent: ', percent);
    const newLpValue = Big(percent)
      .div(100)
      .times(lpBalance || 0)
      .toFixed(6);

    handleLPChange(newLpValue);
  };

  useEffect(() => {
    if (!sender || !token0 || !token1) return;
    [
      { symbol: token0, address: addresses[token0], decimals: decimals0 },
      { symbol: token1, address: addresses[token1], decimals: decimals1 }
    ].map(updateBalance);

    updateLPBalance();
  }, [sender, token0, token1]);

  useEffect(() => {
    if (amount0) {
      handleTokenChange(amount0, token0);
    }
  }, [data]);
  return (
    <DetailWrapper>
      <FilterButtonList>
        <FilterButton className={isDeposit ? 'isActive' : ''} onClick={() => changeMode(true)}>
          Deposit
        </FilterButton>
        <FilterButton className={!isDeposit ? 'isActive' : ''} onClick={() => changeMode(false)}>
          Withdraw
        </FilterButton>
      </FilterButtonList>
      {detailLoading ? (
        <div style={{ padding: '30px 0 45px' }}>
          <Loading color="#999" />
        </div>
      ) : (
        <>
          {isDeposit ? (
            <>
              <Row className="price-input">
                <Column>
                  <InputWrap className={Number(amount0) > Number(balances[token0]) ? 'inSufficient' : ''}>
                    <Input value={amount0} type="number" onChange={(e) => handleTokenChange(e.target.value, token0)} />
                    <InputSuffix>
                      <img src={ICON_VAULT_MAP[token0]} alt={token0} />
                      <span>{token0}</span>
                    </InputSuffix>
                  </InputWrap>
                  <PriceWrap>
                    <TotalPrice>${balance0}</TotalPrice>
                    <BalancePrice>
                      Balance:<span onClick={() => handleMax(true)}>{Big(balances[token0] ?? 0).toFixed(6)}</span>{' '}
                      {token0}
                    </BalancePrice>
                  </PriceWrap>
                </Column>
                <Column>
                  <InputWrap className={Number(amount1) > Number(balances[token1]) ? 'inSufficient' : ''}>
                    <Input value={amount1} type="number" onChange={(e) => handleTokenChange(e.target.value, token1)} />
                    <InputSuffix>
                      <img src={ICON_VAULT_MAP[token1]} alt={token1} />
                      <span>{token1}</span>
                    </InputSuffix>
                  </InputWrap>
                  <PriceWrap>
                    <TotalPrice>${balance1}</TotalPrice>
                    <BalancePrice>
                      Balance:<span onClick={() => handleMax(false)}>{Big(balances[token1] ?? 0).toFixed(6)}</span>{' '}
                      {token1}
                    </BalancePrice>
                  </PriceWrap>
                </Column>
              </Row>
              <StyledButtonList>
                {isInSufficient && <StyledButton disabled>InSufficient Balance</StyledButton>}
                {!isInSufficient &&
                  (isToken0Approved && isToken1Approved && !isToken0Approving && !isToken1Approving ? (
                    <StyledButton disabled={isLoading || !amount0 || !amount1} onClick={handleDeposit}>
                      {isLoading ? <Loading /> : 'Deposit'}
                    </StyledButton>
                  ) : (
                    <>
                      <StyledButton
                        disabled={isToken0Approved || isToken0Approving}
                        onClick={() => handleApprove(true)}
                      >
                        {isToken0Approving ? (
                          <Loading />
                        ) : (
                          <>
                            {isToken0Approved ? 'Approved' : 'Approve'} {token0}
                          </>
                        )}
                      </StyledButton>
                      <StyledButton
                        disabled={isToken1Approved || isToken1Approving}
                        onClick={() => handleApprove(false)}
                      >
                        {isToken1Approving ? (
                          <Loading />
                        ) : (
                          <>
                            {isToken1Approved ? 'Approved' : 'Approve'} {token1}
                          </>
                        )}
                      </StyledButton>
                    </>
                  ))}
              </StyledButtonList>
            </>
          ) : (
            <>
              <Row className="price-input">
                <Column>
                  <InputWrap>
                    <Input
                      value={lpAmount}
                      type="number"
                      onChange={(e) => {
                        handleLPChange(e.target.value);

                        const value = e.target.value;

                        if (!value) {
                          onUpdateLpPercent(0);
                        }

                        if (value && Big(value).gt(0)) {
                          const newSliderPercent = Big(value || 0)
                            .div(Big(lpBalance).gt(0) ? lpBalance : 1)
                            .times(100)
                            .toFixed(0);
                          onUpdateLpPercent(newSliderPercent);
                        }
                      }}
                    />

                    <InputSuffix>
                      <StyledImageList>
                        <img src={ICON_VAULT_MAP[token0]} alt={token0} />
                        <img src={ICON_VAULT_MAP[token1]} alt={token1} style={{ marginLeft: -6 }} />
                      </StyledImageList>
                      <span>
                        {token0}/{token1}
                      </span>
                    </InputSuffix>
                  </InputWrap>
                  <PriceWrap>
                    <TotalPrice>${balanceLp}</TotalPrice>
                    <BalancePrice>
                      Balance:{' '}
                      <span
                        onClick={() => {
                          const newSliderPercent = Big(lpBalance || 0)
                            .div(Big(lpBalance).gt(0) ? lpBalance : 1)
                            .times(100)
                            .toFixed(0);

                          onUpdateLpPercent(newSliderPercent);

                          handleLPChange(lpBalance);
                        }}
                        className="v"
                      >
                        {lpBalance}
                      </span>
                    </BalancePrice>
                  </PriceWrap>
                </Column>
              </Row>
              <StyledButtonList>
                <StyledButton disabled={isWithdrawInsufficient || isLoading || !lpAmount} onClick={handleWithdraw}>
                  {isLoading ? <Loading /> : <>{isWithdrawInsufficient ? 'InSufficient Balance' : 'Withdraw'}</>}
                </StyledButton>
              </StyledButtonList>
            </>
          )}
        </>
      )}
    </DetailWrapper>
  );
});
