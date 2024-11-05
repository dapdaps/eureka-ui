import Big from 'big.js';
import { useEffect } from 'react';

import useAccount from '@/hooks/useAccount';
import Loading from '@/modules/components/Loading';
import CompoundV3Asset from '@/modules/lending/components/CompoundV3/Asset';
import {
  StyledButton,
  StyledContainer,
  StyledDashed,
  StyledFlex,
  StyledFont,
  StyledOperationButton,
  StyledSvg,
  StyledTips,
  StyledWithraw,
  StyledWrapper
} from '@/modules/lending/components/CompoundV3/Detail/styles';
import CompoundV3Dialog from '@/modules/lending/components/CompoundV3/Dialog';
import CompoundV3Range from '@/modules/lending/components/CompoundV3/Range';
import { useDynamicLoader, useMultiState } from '@/modules/lending/hooks';
import { formatAmount } from '@/utils/format-number';
import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';

const CompoundV3Detail = (props: any) => {
  const {
    onBack,
    data,
    getAccountInfo,
    curChain,
    account,
    toast,
    dexConfig,
    wethAddress,
    multicall,
    addAction,
    chainId,
    curPool
  } = props;

  const { provider } = useAccount();

  const [Handler] = useDynamicLoader({ path: '/lending/handlers', name: dexConfig.loaderName });

  const [state, updateState] = useMultiState<any>({
    actions: [],
    balanceArr: [],
    collateralBalances: {}
  });

  const updateInfo = () => {
    getAccountInfo(data, (res: any) => {
      console.log(res);
      const _availableToBorrow = Big(res.userBorrowCapacityUsd).minus(res.borrowedBalanceUsd);
      updateState({
        ...res,
        collaterValue: res.userCollateralUsd,
        borrowCapacity: res.userBorrowCapacityUsd,
        availableToBorrow: Big(_availableToBorrow).lt(0) ? '0' : _availableToBorrow.toString(),
        liquidationPoint:
          Big(res.userLiquidationUsd || 0).eq(0) || Big(res.userCollateralUsd || 0).eq(0)
            ? '0'
            : Big(res.borrowedBalanceUsd).div(Big(res.userLiquidationUsd).div(res.userCollateralUsd)).toString(),
        // borrowedBalance: res.borrowedBalanceUsd,
        userLiquidationUsd: res.userLiquidationUsd
      });
    });
  };

  useEffect(() => {
    if (data) {
      updateInfo();
      updateState({
        borrowApr: Big(data.borrowApr || 0)
          .minus(data.borrowCompRewardApr || 0)
          .mul(100)
          .toFixed(2),
        supplyApr: Big(data.supplyApr || 0)
          .add(data.supplyCompRewardApr || 0)
          .mul(100)
          .toFixed(2)
      });
    }
  }, [data]);

  useEffect(() => {
    if (!state.balanceUsd) return;
    updateState({
      balanceArr: Big(state.balance).toFixed(4).split('.')
    });
  }, [state.balanceUsd]);

  useEffect(() => {
    if (!state.borrowedBalance) return;
    updateState({
      borrowArr: formateValueWithThousandSeparatorAndFont(state.borrowedBalance, 6, false, { isLTIntegerZero: true })
    });
  }, [state.borrowedBalance]);

  const onAmountChange = ({ amount, type, cb }: any) => {
    if (state.asset.address === data.baseToken.address) {
      if (type === 'Repay') {
        const _borrowedBalance = Big(state.borrowedBalanceUsd).minus(Big(amount).mul(state.asset.price));

        cb({
          borrowedBalanceUsd: _borrowedBalance.toString(),
          availableToBorrow: Big(state.borrowCapacity || 0)
            .minus(_borrowedBalance)
            .toString(),
          liquidationPoint:
            Big(state.userLiquidationUsd || 0).eq(0) || Big(state.collaterValue || 0).eq(0)
              ? '0'
              : Big(_borrowedBalance).div(Big(state.userLiquidationUsd).div(state.collaterValue)).toString()
        });
        return;
      }
      if (type === 'Borrow') {
        const _borrowedBalance = Big(amount)
          .mul(state.asset.price)
          .add(state.borrowedBalanceUsd || 0);

        cb({
          borrowedBalanceUsd: _borrowedBalance.toString(),
          availableToBorrow: Big(state.borrowCapacity || 0)
            .minus(_borrowedBalance)
            .toString(),
          liquidationPoint:
            Big(state.userLiquidationUsd || 0).eq(0) || Big(state.collaterValue || 0).eq(0)
              ? '0'
              : Big(_borrowedBalance).div(Big(state.userLiquidationUsd).div(state.collaterValue)).toString()
        });
        return;
      }
      cb({});
      return;
    }
    let _collaterValue = Big(state.collaterValue);
    let _borrowCapacity = Big(state.borrowCapacity);
    let _availableToBorrow = Big(state.availableToBorrow);

    if (type === 'Collateral') {
      _collaterValue = Big(amount || 0)
        .mul(state.asset.price)
        .add(_collaterValue);
    }
    if (type === 'Withdraw') {
      _collaterValue = _collaterValue.minus(Big(amount || 0).mul(state.asset.price));
    }
    _borrowCapacity = _collaterValue.mul(state.asset.borrowCollateralFactor / 100);
    _availableToBorrow = Big(_borrowCapacity).minus(state.borrowedBalanceUsd || 0);

    cb({
      collaterValue: _collaterValue.toString(),
      borrowCapacity: _borrowCapacity.toString(),
      availableToBorrow: _availableToBorrow.toString(),
      userLiquidationUsd: _collaterValue.mul(state.asset.liquidateCollateralFactor / 100).toString()
    });
  };

  const onAddAction = ({ amount, type }: any) => {
    const _actions = state.actions;
    _actions.push({
      amount,
      type,
      asset: state.asset
    });

    updateState({
      actions: _actions,
      showDialog: false
    });
  };

  return (
    <StyledContainer>
      <StyledWrapper style={{ width: 728 }}>
        <StyledFlex style={{ marginBottom: 36, justifyContent: 'space-between' }}>
          <StyledFlex style={{ gap: 20 }}>
            <StyledSvg style={{ cursor: 'pointer' }} onClick={onBack}>
              <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
                <path d="M6 11L1 6L6 1" stroke="white" strokeLinecap="round" />
              </svg>
            </StyledSvg>
            <StyledFlex style={{ gap: 14 }}>
              <CompoundV3Asset size="big" icon={data.baseToken.icon} curChain={curChain} />
              <StyledFlex
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 5
                }}
              >
                <StyledFlex
                  style={{
                    gap: 8
                  }}
                >
                  <StyledFont style={{ color: '#FFF', fontSize: 22, fontWeight: 700 }}>
                    {Big(state.borrowedBalanceUsd || 0).gt(0) ? (
                      <>
                        {state.borrowArr?.integer || ''}
                        <span style={{ color: '#979ABE' }}>{state.borrowArr?.decimal || '0000'}</span>
                      </>
                    ) : (
                      <>
                        {state.balanceArr?.[0] || 0}.
                        <span style={{ color: '#979ABE' }}>{state.balanceArr?.[1] || '0000'}</span>
                      </>
                    )}
                  </StyledFont>
                  <StyledFont style={{ color: '#FFF', fontSize: 22, fontWeight: 700 }}>
                    {data.baseToken.symbol}
                  </StyledFont>
                </StyledFlex>
                <StyledFont style={{ color: '#979ABE' }}>
                  {formatAmount({
                    amount: Big(state.borrowedBalanceUsd || 0).gt(0) ? state.borrowedBalanceUsd : state.balanceUsd,
                    prev: '$'
                  })}
                </StyledFont>
              </StyledFlex>
            </StyledFlex>
          </StyledFlex>

          <StyledFlex style={{ gap: 20 }}>
            {Big(state.balance || 0).gt(0) && (
              <>
                {' '}
                <StyledFlex
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 5
                  }}
                >
                  <StyledFont style={{ color: '#00D395', fontSize: 16 }}>Supplying</StyledFont>
                  <StyledFont style={{ color: '#FFF', fontSize: 16, fontWeight: 700 }}>
                    {state.supplyApr}% Net APR
                  </StyledFont>
                </StyledFlex>{' '}
                <StyledWithraw
                  disabled={state.loading}
                  onClick={() => {
                    if (state.loading) return;
                    updateState({
                      showDialog: true,
                      type: 'Withdraw',
                      asset: {
                        ...data.baseToken,
                        walletBalance: state.balance,
                        walletBalanceUsd: state.balanceUsd
                      }
                    });
                  }}
                >
                  Withdraw
                </StyledWithraw>
              </>
            )}
            {Big(state.borrowedBalanceUsd || 0).gt(0) && (
              <>
                {' '}
                <StyledFlex
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 5
                  }}
                >
                  <StyledFont style={{ color: '#7945FF', fontSize: 16 }}>Borrowing</StyledFont>
                  <StyledFont style={{ color: '#FFF', fontSize: 16, fontWeight: 700 }}>
                    {state.borrowApr}% Net APR
                  </StyledFont>
                </StyledFlex>{' '}
                <StyledWithraw
                  disabled={state.loading}
                  style={{ borderColor: '#7945FF', color: '#7945FF' }}
                  onClick={() => {
                    if (state.loading) return;
                    updateState({
                      showDialog: true,
                      type: 'Repay',
                      asset: {
                        ...data.baseToken,
                        walletBalance: state.borrowedBalance,
                        walletBalanceUsd: state.borrowedBalanceUsd
                      }
                    });
                  }}
                >
                  Repay
                </StyledWithraw>
              </>
            )}
          </StyledFlex>
        </StyledFlex>

        <StyledWrapper
          style={{
            marginBottom: 20,
            height: 252,
            borderRadius: 16,
            border: '1px solid #373A53',
            backgroundColor: '#2E3142'
          }}
        >
          <StyledWrapper
            style={{
              paddingTop: 25,
              paddingRight: 20,
              paddingBottom: 14,
              paddingLeft: 20,
              borderBottom: '1px solid #373A53'
            }}
          >
            <StyledFont
              style={{
                marginBottom: 18,
                color: '#FFF',
                fontSize: 18,
                fontWeight: 600
              }}
            >
              {data.baseToken.symbol} Wallet Balance
            </StyledFont>
            <StyledFlex style={{ marginBottom: 30, justifyContent: 'space-between' }}>
              <StyledFlex style={{ gap: 14 }}>
                <CompoundV3Asset size="medium" icon={data.baseToken.icon} curChain={curChain} />
                <StyledFont style={{ color: '#FFF', fontSize: 16, fontWeight: 500 }}>
                  {data.baseToken.symbol}
                </StyledFont>
              </StyledFlex>
              <StyledFlex
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: 3
                }}
              >
                <StyledFont style={{ color: '#FFF', fontSize: 16, fontWeight: 500 }}>
                  {formatAmount({
                    amount: state.walletBalance
                  })}
                </StyledFont>
                <StyledFont style={{ color: '#979ABE', fontSize: 12 }}>
                  {formatAmount({
                    amount: state.walletBalanceUsd,
                    prev: '$'
                  })}
                </StyledFont>
              </StyledFlex>
            </StyledFlex>
            <StyledFlex style={{ justifyContent: 'space-between' }}>
              <StyledFlex style={{ gap: 10 }}>
                <StyledFont style={{ color: '#979ABE', fontSize: 14 }}>Net Supply APR</StyledFont>
                <StyledFont style={{ color: '#FFF', fontSize: 16 }}>{state.supplyApr}%</StyledFont>
              </StyledFlex>
              <StyledFlex style={{ gap: 10 }}>
                <StyledFont style={{ color: '#979ABE', fontSize: 14 }}>Net Borrow APR</StyledFont>
                <StyledFont style={{ color: '#FFF', fontSize: 16 }}>{state.borrowApr}%</StyledFont>
              </StyledFlex>
            </StyledFlex>
          </StyledWrapper>
          <StyledFlex
            style={{
              gap: 18,
              padding: 20
            }}
          >
            <StyledButton
              className="supply"
              disabled={Big(state.borrowedBalanceUsd || 0).gt(0) || state.loading}
              onClick={() => {
                if (Big(state.borrowedBalanceUsd || 0).gt(0) || state.loading) return;
                updateState({
                  showDialog: true,
                  type: 'Supply',
                  asset: {
                    ...data.baseToken,
                    walletBalance: state.walletBalance,
                    walletBalanceUsd: state.walletBalanceUsd
                  }
                });
              }}
            >
              {Big(state.borrowedBalanceUsd || 0).gt(0) && (
                <>
                  <StyledTips>Must repay full {data.baseToken.symbol} borrowing</StyledTips>
                  <StyledSvg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6.5" stroke="#979ABE" />
                      <path d="M7 7L7 10.5" stroke="#979ABE" stroke-width="1.4" stroke-linecap="round" />
                      <circle cx="7" cy="4.375" r="0.875" fill="#979ABE" />
                    </svg>
                  </StyledSvg>
                </>
              )}
              Supply
            </StyledButton>
            <StyledButton
              className="borrow"
              disabled={Big(state.balance || 0).gt(0) || Big(state.borrowCapacity || 0).eq(0) || state.loading}
              onClick={() => {
                if (Big(state.balance || 0).gt(0) || Big(state.borrowCapacity || 0).eq(0) || state.loading) return;
                updateState({
                  showDialog: true,
                  type: 'Borrow',
                  asset: {
                    ...data.baseToken,
                    walletBalance: Big(state.availableToBorrow).div(data.baseToken.price).toString(),
                    walletBalanceUsd: state.availableToBorrow
                  }
                });
              }}
            >
              {Big(state.balance || 0).gt(0) && (
                <>
                  <StyledTips>Must Withdraw Full {data.baseToken.symbol} Balance</StyledTips>
                  <StyledSvg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="6.5" stroke="#979ABE" />
                      <path d="M7 7L7 10.5" stroke="#979ABE" stroke-width="1.4" stroke-linecap="round" />
                      <circle cx="7" cy="4.375" r="0.875" fill="#979ABE" />
                    </svg>
                  </StyledSvg>
                </>
              )}
              Borrow
            </StyledButton>
          </StyledFlex>
        </StyledWrapper>
        <StyledWrapper
          style={{
            // gap: 18,
            paddingTop: 25,
            paddingRight: 20,
            paddingBottom: 40,
            paddingLeft: 20,
            borderRadius: 16,
            border: '1px solid #373A53',
            backgroundColor: '#2E3142'
          }}
        >
          <StyledFont
            style={{
              marginBottom: 18,
              color: '#FFF',
              fontSize: 18,
              fontWeight: 600
            }}
          >
            Collateral Assets
          </StyledFont>
          <StyledFlex style={{ flexDirection: 'column', gap: 20, width: '100%' }}>
            {data.collateralAssets?.map((asset: any) => (
              <StyledFlex style={{ gap: 14, width: '100%' }} key={asset.address}>
                <CompoundV3Asset size="medium" icon={asset.icon} curChain={curChain} />
                <StyledWrapper style={{ flex: 1 }}>
                  <StyledFlex style={{ justifyContent: 'space-between', gap: 10 }}>
                    <StyledFont style={{ color: '#FFF', fontSize: 14, fontWeight: 500 }}>{asset.symbol}</StyledFont>
                    <StyledDashed />
                    <StyledFont style={{ color: '#FFF', fontSize: 14, fontWeight: 500 }}>
                      {formatAmount({
                        amount: state.collateralBalances[asset.address]?.balance
                      })}
                    </StyledFont>
                  </StyledFlex>
                  <StyledFlex style={{ justifyContent: 'space-between' }}>
                    <StyledFont style={{ color: '#979ABE', fontSize: 12 }}>
                      {formatAmount({
                        amount: state.collateralBalances[asset.address]?.walletBalance,
                        digits: 4
                      })}{' '}
                      in wallet
                    </StyledFont>
                    <StyledFont style={{ color: '#979ABE', fontSize: 12 }}>
                      {formatAmount({
                        amount: state.collateralBalances[asset.address]?.balanceUsd,
                        digits: 2,
                        prev: '$'
                      })}
                    </StyledFont>
                  </StyledFlex>
                </StyledWrapper>
                <StyledFlex style={{ gap: 10 }}>
                  <StyledOperationButton
                    disabled={Big(state.collateralBalances[asset.address]?.walletBalance || 0).eq(0) || state.loading}
                    onClick={() => {
                      if (Big(state.collateralBalances[asset.address]?.walletBalance || 0).eq(0) || state.loading)
                        return;
                      updateState({
                        showDialog: true,
                        type: 'Collateral',
                        asset: {
                          ...asset,
                          walletBalance: state.collateralBalances[asset.address]?.walletBalance,
                          walletBalanceUsd: state.collateralBalances[asset.address]?.walletBalanceUsd
                        }
                      });
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M1 5L9 5" stroke="#FFF" stroke-linecap="round" />
                      <path d="M5 1L5 9" stroke="#FFF" stroke-linecap="round" />
                    </svg>
                  </StyledOperationButton>
                  <StyledOperationButton
                    disabled={Big(state.collateralBalances[asset.address]?.balance || 0).eq(0) || state.loading}
                    onClick={() => {
                      if (Big(state.collateralBalances[asset.address]?.balance || 0).eq(0) || state.loading) return;
                      const _collaterBalanceUsd = state.collateralBalances[asset.address]?.balanceUsd;

                      let _balanceUsd = Big(0);
                      if (Big(state.borrowedBalanceUsd).eq(0)) {
                        _balanceUsd = Big(_collaterBalanceUsd);
                      } else {
                        const _capacity = Big(_collaterBalanceUsd).mul(asset.borrowCollateralFactor / 100);
                        const _otherCapacity = Big(state.userBorrowCapacityUsd).minus(_capacity);

                        const _diff = Big(state.borrowedBalanceUsd).minus(_otherCapacity);

                        _balanceUsd = Big(_collaterBalanceUsd).minus(_diff.div(asset.borrowCollateralFactor / 100));
                      }
                      _balanceUsd = _balanceUsd.lt(0) ? Big(0) : _balanceUsd;

                      updateState({
                        showDialog: true,
                        type: 'Withdraw',
                        asset: {
                          ...asset,
                          walletBalance: _balanceUsd.div(asset.price).toString(),
                          walletBalanceUsd: _balanceUsd.toString()
                        }
                      });
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="2" viewBox="0 0 10 2" fill="none">
                      <path d="M1 1L9 1" stroke="#FFF" stroke-linecap="round" />
                    </svg>
                  </StyledOperationButton>
                </StyledFlex>
              </StyledFlex>
            ))}
          </StyledFlex>
        </StyledWrapper>
      </StyledWrapper>
      <StyledWrapper style={{ width: 486 }}>
        <StyledFlex style={{ gap: 5 }}>
          <StyledFont style={{ color: '#979ABE' }}>Liquidation Risk</StyledFont>
          <CompoundV3Range
            value={
              Big(state.collaterValue || 0).eq(0)
                ? 0
                : Big(state.liquidationPoint || 0)
                    .div(state.collaterValue)
                    .mul(100)
                    .toFixed(0)
            }
          />
        </StyledFlex>
        <StyledFlex style={{ marginTop: 16, marginBottom: 40, justifyContent: 'flex-end' }}>
          <StyledFont style={{ color: '#979ABE', fontSize: 12 }}>Borrow Capacity</StyledFont>
        </StyledFlex>
        <StyledWrapper style={{ position: 'relative', marginBottom: 20 }}>
          <StyledSvg>
            <svg xmlns="http://www.w3.org/2000/svg" width="488" height="160" viewBox="0 0 488 160" fill="none">
              <path
                d="M179.632 1H479C483.418 1 487 4.58172 487 9V151C487 155.418 483.418 159 479 159H9C4.58172 159 1 155.418 1 151V9C1 4.58172 4.58172 1 9 1H12.1176"
                stroke="#373A53"
              />
            </svg>
          </StyledSvg>
          <StyledWrapper
            style={{
              position: 'absolute',
              left: 0,
              top: -10,
              right: 0,
              bottom: 0
            }}
          >
            <StyledWrapper style={{ marginBottom: 13, paddingLeft: 17 }}>
              <StyledFont style={{ color: '#FFF', fontSize: 18, fontWeight: 600 }}>Position Summary</StyledFont>
            </StyledWrapper>
            <StyledFlex
              style={{
                paddingRight: 15,
                paddingLeft: 15,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                gap: 12
              }}
            >
              <StyledFlex style={{ width: '100%', justifyContent: 'space-between' }}>
                <StyledFont style={{ color: '#979ABE' }}>Collateral Value</StyledFont>
                <StyledFlex style={{ gap: 8 }}>
                  <StyledFont style={{ color: '#FFF' }}>
                    {formatAmount({
                      amount: state.collaterValue,
                      prev: '$'
                    })}
                  </StyledFont>
                  {/* <StyledFont style={{ color: "#979ABE" }}>USDC</StyledFont> */}
                </StyledFlex>
              </StyledFlex>
              <StyledFlex style={{ width: '100%', justifyContent: 'space-between' }}>
                <StyledFont style={{ color: '#979ABE' }}>Liquidation Point</StyledFont>
                <StyledFlex style={{ gap: 8 }}>
                  <StyledFont style={{ color: '#FFF' }}>
                    {formatAmount({
                      amount: state.liquidationPoint,
                      prev: '$'
                    })}
                  </StyledFont>
                  {/* <StyledFont style={{ color: "#979ABE" }}>USDC</StyledFont> */}
                </StyledFlex>
              </StyledFlex>
              <StyledFlex style={{ width: '100%', justifyContent: 'space-between' }}>
                <StyledFont style={{ color: '#979ABE' }}>Borrow Capacity</StyledFont>
                <StyledFlex style={{ gap: 8 }}>
                  <StyledFont style={{ color: '#FFF' }}>
                    {formatAmount({
                      amount: state.borrowCapacity,
                      prev: '$'
                    })}
                  </StyledFont>
                  {/* <StyledFont style={{ color: "#979ABE" }}>USDC</StyledFont> */}
                </StyledFlex>
              </StyledFlex>
              <StyledFlex style={{ width: '100%', justifyContent: 'space-between' }}>
                <StyledFont style={{ color: '#979ABE' }}>Available to Borrow</StyledFont>
                <StyledFlex style={{ gap: 8 }}>
                  <StyledFont style={{ color: '#FFF' }}>
                    {formatAmount({
                      amount: state.availableToBorrow,
                      prev: '$'
                    })}
                  </StyledFont>
                  {/* <StyledFont style={{ color: "#979ABE" }}>USDC</StyledFont> */}
                </StyledFlex>
              </StyledFlex>
            </StyledFlex>
          </StyledWrapper>
        </StyledWrapper>
        {!!state.actions.length && (
          <StyledWrapper
            style={{
              borderRadius: 16,
              border: '1px solid #373A53',
              backgroundColor: '#2E3142',
              padding: 20
            }}
          >
            <StyledFlex style={{ marginBottom: 20, justifyContent: 'space-between' }}>
              <StyledFont style={{ color: '#FFF', fontSize: 18, fontWeight: 600 }}>
                {state.actions.length} Pending Actions
              </StyledFont>
              <StyledFont
                style={{
                  color: '#FF51AF',
                  fontSize: 14,
                  cursor: state.loading ? 'not-allowed' : 'pointer',
                  opacity: state.loading ? 0.6 : 1
                }}
                onClick={() => {
                  if (state.loading) return;
                  updateState({
                    actions: []
                  });
                }}
              >
                Clear all
              </StyledFont>
            </StyledFlex>
            <StyledFlex
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start'
              }}
            >
              {state.actions?.map((action: any, i: number) => (
                <StyledFlex
                  key={i + Math.random()}
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    height: 60,
                    paddingRight: 20,
                    paddingLeft: 15,
                    borderRadius: 8,
                    backgroundColor: '#252734'
                  }}
                >
                  <StyledFlex style={{ gap: 14 }}>
                    <CompoundV3Asset size="small" icon={action.asset.icon} curChain={curChain} />
                    <StyledFont style={{ color: '#FFF' }}>
                      {action.type} {action.asset.symbol}
                    </StyledFont>
                  </StyledFlex>
                  <StyledFlex style={{ gap: 20 }}>
                    <StyledFlex
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        gap: 3
                      }}
                    >
                      <StyledFont style={{ color: '#FFF', fontWeight: 500 }}>
                        {formatAmount({
                          amount: action.amount
                        })}
                      </StyledFont>
                      <StyledFont style={{ color: '#979ABE', fontSize: 12 }}>
                        {formatAmount({
                          amount: Big(action.amount).mul(action.asset.price).toString(),
                          prev: '$'
                        })}
                      </StyledFont>
                    </StyledFlex>
                    <StyledSvg
                      style={{
                        cursor: state.loading ? 'not-allowed' : 'pointer'
                      }}
                      onClick={() => {
                        if (state.loading) return;
                        const _actions = state.actions;
                        _actions.splice(i, 1);
                        updateState({
                          actions: _actions
                        });
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z"
                          fill="#979ABE"
                        />
                      </svg>
                    </StyledSvg>
                  </StyledFlex>
                </StyledFlex>
              ))}
              <StyledFlex style={{ width: '100%' }}>
                <StyledButton
                  disabled={!state.actions.length || state.loading}
                  onClick={() => {
                    if (!state.actions.length || state.loading) return;
                    updateState({
                      loading: true
                    });
                  }}
                  className="pending"
                >
                  {state.loading && (
                    <div>
                      <Loading size={16} />
                    </div>
                  )}
                  {state.loading ? `${state.actions.length} Pending Transactions` : ' Submit Transactions'}
                </StyledButton>
              </StyledFlex>
            </StyledFlex>
          </StyledWrapper>
        )}
      </StyledWrapper>
      {state.showDialog && (
        <CompoundV3Dialog
          asset={state.asset}
          type={state.type}
          collaterValue={state.collaterValue}
          borrowCapacity={state.borrowCapacity}
          availableToBorrow={state.availableToBorrow}
          borrowApr={state.borrowApr}
          supplyApr={state.supplyApr}
          cometAddress={data.address}
          minimumBorrow={data.minimumBorrow}
          account={account}
          toast={toast}
          addable={state.addable}
          onAmountChange={onAmountChange}
          onAddAction={onAddAction}
          onClose={() => {
            updateState({
              showDialog: false
            });
          }}
          chainId={curChain.chainId}
        />
      )}
      {Handler && (
        <Handler
          provider={provider}
          {...dexConfig}
          chainId={chainId}
          actions={state.actions}
          update={state.loading}
          comet={data}
          wethAddress={wethAddress}
          account={account}
          curPool={curPool}
          onCancel={() => {
            updateState({
              loading: false
            });
          }}
          onLoad={(data: any) => {
            console.log('estimate gas', data);
            if (!data.gas) {
              updateState({
                loading: false
              });
              toast?.fail({ title: 'Estimate gas error' });
              return;
            }
            let toastId = toast?.loading({
              title: `Confirming...`
            });
            provider
              .getSigner()
              .sendTransaction(data.unsignedTx)
              .then((tx: any) => {
                toast?.dismiss(toastId);
                toastId = toast?.loading({
                  title: `Pending...`
                });
                tx.wait()
                  .then((res: any) => {
                    const { status, transactionHash } = res;
                    const _actions: any = [];
                    state.actions.forEach((action: any, i: number) => {
                      _actions.push({
                        amount: action.amount,
                        type: action.type,
                        tokenSymbol: action.asset.symbol,
                        tokenAddress: action.asset.address,
                        tokenPriceKey: action.asset.priceKey || ''
                      });
                    });
                    addAction?.({
                      type: 'Lending',
                      template: dexConfig.name,
                      add: false,
                      status,
                      transactionHash,
                      extra_data: { lending_actions: _actions }
                    });
                    if (status === 1) {
                      updateInfo();
                      toast?.dismiss(toastId);
                      toast?.success({
                        title: `Request successed!`,
                        tx: transactionHash,
                        chainId: curChain.chainId
                      });
                      updateState({
                        loading: false,
                        actions: []
                      });
                    } else {
                      throw new Error();
                    }
                  })
                  .catch((err: any) => {
                    toast?.dismiss(toastId);
                    toast?.fail({
                      title: 'Request Failed!'
                    });
                    updateState({
                      loading: false
                    });
                  });
              })
              .catch((err: any) => {
                toast?.dismiss(toastId);
                toast?.fail({
                  title: 'Request Failed!',
                  text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ''
                });
                updateState({ loading: false });
              });
          }}
        />
      )}
    </StyledContainer>
  );
};

export default CompoundV3Detail;

export interface Props {}
