import Big from 'big.js';
import { styled } from 'styled-components';

import useAccount from '@/hooks/useAccount';
import { useMultiState } from '@/modules/lending/hooks';

import { isValid, ROUND_DOWN } from '../../utils';

const WithdrawContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TokenTexture = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: var(--agg-primary-color, #fff);
`;

const TokenWrapper = styled.div`
  display: flex;
  img {
    margin-right: 4px;
  }
`;

const GrayTexture = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #9b9b9b;
`;

const PurpleTexture = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #6f6f6f;
`;

const WhiteTexture = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: var(--agg-primary-color, #fff);
`;

const TransactionOverviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;

  font-size: 20px;
  font-weight: bold;
  color: var(--agg-primary-color, #fff);
  flex: 1;
  width: 160px;

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

const Max = styled.span`
  color: #9b9b9b;
  cursor: pointer;
  text-decoration: underline;
`;

const WithdrawModal = (props: any) => {
  const {
    config,
    data,
    onRequestClose,
    onActionSuccess,
    chainId,
    withdrawETHGas,
    withdrawERC20Gas,
    formatHealthFactor,
    calcHealthFactor,
    account,
    yourTotalBorrow,
    yourTotalCollateral,
    threshold,
    prices,
    theme,
    addAction,
    dexConfig,
    from,
    unifyNumber,
  } = props;

  const { provider } = useAccount();

  const {
    underlyingAsset,
    decimals,
    symbol,
    underlyingBalance,
    underlyingBalanceUSD,
    isCollateraled,
    aTokenAddress,
    availableLiquidity,
    healthFactor,
  } = data;
  console.log('withdraw-props--', props, isCollateraled);

  const availableLiquidityAmount = Big(availableLiquidity).div(Big(10).pow(decimals)).toFixed();

  const [state, updateState] = useMultiState<any>({
    amount: '',
    amountInUSD: '0.00',
    allowanceAmount: 0,
    needApprove: false,
    loading: false,
    newHealthFactor: '-',
    gas: '-',
  });

  function updateGas() {
    if (symbol === config.nativeCurrency.symbol) {
      withdrawETHGas().then((value: any) => {
        updateState({ gas: value });
      });
    } else {
      withdrawERC20Gas().then((value: any) => {
        updateState({ gas: value });
      });
    }
  }

  updateGas();

  const _remainingSupply = Number(underlyingBalance) - Number(state.amount);
  const remainingSupply = isNaN(_remainingSupply) ? underlyingBalance : Big(_remainingSupply).toFixed(2);

  function formatAddAction(_amount: any, status: any, transactionHash: any) {
    console.log('formatAddAction--', dexConfig, dexConfig.name);
    addAction?.({
      type: 'Lending',
      action: 'Withdraw',
      token: {
        symbol,
      },
      amount: _amount,
      template: dexConfig.name,
      add: false,
      status,
      transactionHash,
    });
  }

  function withdrawErc20(asset: any, actualAmount: any, shownAmount: any) {
    console.log('withdrawErc20--', asset, actualAmount, shownAmount);
    updateState({
      loading: true,
    });
    return Ethers.provider()
      .getSigner()
      .getAddress()
      .then((address) => {
        const pool = new ethers.Contract(
          config.aavePoolV3Address,
          config.aavePoolV3ABI.body,
          Ethers.provider().getSigner(),
        );
        // there is a bug in the aave pool contract that requires the amount to be truncated to the correct number of decimals
        const truncatedAmount = shownAmount.slice(0, shownAmount.indexOf('.') + decimals + 1);
        const amount = ethers.utils.parseUnits(truncatedAmount || 0, decimals);

        return pool['withdraw(address,uint256,address)'](asset, amount, address);
      })
      .then((tx) => {
        tx.wait()
          .then((res) => {
            console.log('withdrawErc20', res);
            const { status, transactionHash } = res;
            if (status === 1) {
              formatAddAction(shownAmount, status, transactionHash);
              onActionSuccess({
                msg: `You withdraw ${parseFloat(Big(shownAmount).toFixed(8))} ${symbol}`,
                step1: true,
                callback: () => {
                  onRequestClose();
                  updateState({
                    loading: false,
                  });
                },
              });
              console.log('tx succeeded', res);
            } else {
              console.log('tx failed', res);
              updateState({
                loading: false,
              });
            }
          })
          .catch((err) => {
            console.log('tx.wait on error', err);
            updateState({ loading: false });
          });
      })
      .catch((err) => {
        console.log('withdraw(address,uint256,address) on error', err);
        updateState({ loading: false });
      });
  }

  function withdrawETH(actualAmount: any, shownAmount: any) {
    console.log('withdrawETH--', actualAmount, shownAmount);
    updateState({
      loading: true,
    });
    return Ethers.provider()
      .getSigner()
      .getAddress()
      .then((address) => {
        const wrappedTokenGateway = new ethers.Contract(
          config.wrappedTokenGatewayV3Address,
          config.wrappedTokenGatewayV3ABI.body,
          Ethers.provider().getSigner(),
        );

        return wrappedTokenGateway.withdrawETH(config.aavePoolV3Address, actualAmount, address);
      })
      .then((tx) => {
        tx.wait()
          .then((res) => {
            const { status, transactionHash } = res;
            if (status === 1) {
              formatAddAction(shownAmount, status, transactionHash);
              onActionSuccess({
                msg: `You withdraw ${parseFloat(Big(shownAmount).toFixed(8))} ${symbol}`,
                step1: true,
                callback: () => {
                  onRequestClose();
                  updateState({
                    loading: false,
                  });
                },
              });
              console.log('tx succeeded', res);
            } else {
              console.log('tx failed', res);
              updateState({
                loading: false,
              });
            }
          })
          .catch((err) => {
            console.log('tx.wait on error', err);
            updateState({ loading: false });
          });
      })
      .catch((err) => {
        console.log('wrappedTokenGateway.withdrawETH on error', err);
        updateState({ loading: false });
      });
  }

  function approveForGateway(tokenAddress: any, amount: any) {
    const token = new ethers.Contract(tokenAddress, config.erc20Abi.body, Ethers.provider().getSigner());

    return token.approve(config.wrappedTokenGatewayV3Address, amount);
  }

  function allowanceForGateway(tokenAddress: any) {
    return Ethers.provider()
      .getSigner()
      .getAddress()
      .then((address) => {
        const token = new ethers.Contract(tokenAddress, config.erc20Abi.body, Ethers.provider().getSigner());
        return token.allowance(address, config.wrappedTokenGatewayV3Address);
      });
  }

  function update() {
    allowanceForGateway(aTokenAddress)
      .then((amount) => Number(amount.toString()))
      .then((amount) =>
        updateState({
          allowanceAmount: Big(amount).div(Big(10).pow(decimals)).toNumber(),
        }),
      );

    if (
      !isValid(state.amount) ||
      !isValid(state.allowanceAmount) ||
      Number(state.allowanceAmount) < Number(state.amount) ||
      Number(state.amount) === 0
    ) {
      updateState({ needApprove: true });
    } else {
      updateState({ needApprove: false });
    }
  }

  update();

  function bigMin(_a: any, _b: any) {
    const a = Big(_a);
    const b = Big(_b);
    return a.gt(b) ? b : a;
  }

  const actualMaxValue =
    isValid(underlyingBalance) && isValid(availableLiquidityAmount)
      ? Big(underlyingBalance).lt(availableLiquidityAmount)
        ? config.MAX_UINT_256
        : Big(availableLiquidityAmount).mul(Big(10).pow(decimals)).toFixed(0, ROUND_DOWN)
      : '0';

  let shownMaxValue;
  if (isCollateraled) {
    if (Big(threshold).eq(0)) {
      shownMaxValue = '0';
    } else {
      const maxWithdraw = Big(yourTotalCollateral)
        .minus(
          Big(yourTotalBorrow || 0)
            .times(1.01)
            .div(Big(threshold)),
        )
        .div(prices[symbol])
        .toFixed();

      shownMaxValue = bigMin(maxWithdraw, underlyingBalance).toFixed();
    }
  } else {
    shownMaxValue = underlyingBalance;
  }

  function debounce(fn: any, wait: any) {
    let timer = state.timer;
    return () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn();
      }, wait);
      updateState({ timer });
    };
  }
  const updateNewHealthFactor = debounce(() => {
    updateState({ newHealthFactor: '-' });
    if (isCollateraled) {
      const newHealthFactor = formatHealthFactor(calcHealthFactor('WITHDRAW', symbol, state.amount));
      console.log('withdraw updateNewHealthFactor', symbol, state.amount, newHealthFactor);
      updateState({ newHealthFactor });
    } else {
      updateState({ newHealthFactor: healthFactor });
    }
  }, 1000);

  const changeValue = (value: any) => {
    console.log('change--', value, shownMaxValue, prices[symbol]);
    if (Number(value) > shownMaxValue) {
      value = shownMaxValue;
    }
    if (Number(value) < 0) {
      value = '0';
    }
    if (isValid(value)) {
      const amountInUSD = Big(value).mul(prices[symbol]).toFixed(2, ROUND_DOWN);

      updateState({
        amountInUSD,
      });
      if (hasHF) {
        updateNewHealthFactor();
      }
    } else {
      updateState({
        amountInUSD: '0.00',
        newHealthFactor: '-',
      });
    }
    updateState({ amount: value });
  };

  // const disabled =
  //   (state.newHealthFactor !== "∞" &&
  //     (!isValid(state.newHealthFactor) ||
  //       state.newHealthFactor === "" ||
  //       Big(state.newHealthFactor).lt(1))) ||
  //   !state.amount ||
  //   !isValid(state.amount) ||
  //   Number(state.amount) === 0;
  const disabled = !state.amount || !isValid(state.amount) || Number(state.amount) === 0;
  const hasHF = config.heroData.includes('Health Factor');

  if (!data) {
    return <div />;
  }
  
  return (
    <Widget
      src={`${config.ownerId}/widget/AAVE.Modal.BaseModal`}
      props={{
        title: `Withdraw ${symbol}`,
        from,
        onRequestClose: props.onRequestClose,
        children: (
          <WithdrawContainer>
            <Widget
              src={`${config.ownerId}/widget/AAVE.Modal.RoundedCard`}
              props={{
                title: 'Amount',
                config,
                children: (
                  <>
                    <Widget
                      src={`${config.ownerId}/widget/AAVE.Modal.FlexBetween`}
                      props={{
                        left: (
                          <TokenTexture>
                            <Input
                              type="number"
                              value={state.amount}
                              onChange={(e) => {
                                changeValue(e.target.value);
                              }}
                              placeholder="0"
                            />
                          </TokenTexture>
                        ),
                        right: (
                          <TokenWrapper>
                            <img width={26} height={26} src={data?.icon} />
                            <TokenTexture>{symbol}</TokenTexture>
                          </TokenWrapper>
                        ),
                      }}
                    />
                    <Widget
                      src={`${config.ownerId}/widget/AAVE.Modal.FlexBetween`}
                      props={{
                        left: <GrayTexture>${unifyNumber(state.amountInUSD)}</GrayTexture>,
                        right: (
                          <GrayTexture>
                            Supply Balance:
                            <Max
                              onClick={() => {
                                changeValue(Big(shownMaxValue).toFixed());
                              }}
                            >
                              {unifyNumber(shownMaxValue)}
                            </Max>
                          </GrayTexture>
                        ),
                      }}
                    />
                  </>
                ),
              }}
            />
            <Widget
              src={`${config.ownerId}/widget/AAVE.Modal.RoundedCard`}
              props={{
                title: 'Transaction Overview',
                config,
                children: (
                  <TransactionOverviewContainer>
                    <Widget
                      src={`${config.ownerId}/widget/AAVE.Modal.FlexBetween`}
                      props={{
                        left: <PurpleTexture>Remaining Supply</PurpleTexture>,
                        right: (
                          <WhiteTexture>
                            {unifyNumber(remainingSupply)} {symbol}
                          </WhiteTexture>
                        ),
                      }}
                    />
                    {hasHF ? (
                      <Widget
                        src={`${config.ownerId}/widget/AAVE.Modal.FlexBetween`}
                        props={{
                          left: <PurpleTexture>Health Factor</PurpleTexture>,
                          right: (
                            <div style={{ textAlign: 'right' }}>
                              <PurpleTexture>
                                {formatHealthFactor(healthFactor)}→{state.newHealthFactor}
                              </PurpleTexture>
                            </div>
                          ),
                        }}
                      />
                    ) : null}
                  </TransactionOverviewContainer>
                ),
              }}
            />
            {/* <Widget
                  src={`${config.ownerId}/widget/AAVE.GasEstimation`}
                  props={{ gas: state.gas, config }}
                /> */}
            {state.needApprove && symbol === config.nativeCurrency.symbol && (
              <Widget
                src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
                props={{
                  config,
                  theme,
                  loading: state.loading,
                  children: `Approve ${symbol}`,
                  disabled,
                  onClick: () => {
                    updateState({
                      loading: true,
                    });
                    const amount = Big(state.amount).mul(Big(10).pow(decimals)).toFixed(0);
                    approveForGateway(aTokenAddress, amount)
                      .then((tx) => {
                        tx.wait()
                          .then((res) => {
                            const { status } = res;
                            if (status === 1) {
                              console.log('tx succeeded', res);
                              updateState({
                                needApprove: false,
                                loading: false,
                              });
                            } else {
                              console.log('tx failed', res);
                              updateState({
                                loading: false,
                              });
                            }
                          })
                          .catch(() => updateState({ loading: false }));
                      })
                      .catch(() => updateState({ loading: false }));
                  },
                }}
              />
            )}
            {!(state.needApprove && symbol === config.nativeCurrency.symbol) && (
              <Widget
                src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
                props={{
                  config,
                  theme,
                  loading: state.loading,
                  children: 'Withdraw',
                  disabled,
                  onClick: () => {
                    const actualAmount =
                      state.amount === shownMaxValue
                        ? actualMaxValue
                        : Big(state.amount).mul(Big(10).pow(decimals)).toFixed(0, ROUND_DOWN);

                    const shownAmount = state.amount;
                    console.log(shownAmount, 'shownAmount');
                    console.log(shownMaxValue, 'shownMaxValue');
                    console.log(actualAmount, 'actualAmount');
                    console.log(actualMaxValue, 'actualMaxValue');

                    if (symbol === config.nativeCurrency.symbol) {
                      // supply weth
                      withdrawETH(actualAmount, shownAmount);
                    } else {
                      // supply common
                      withdrawErc20(underlyingAsset, actualAmount, shownAmount);
                    }
                  },
                }}
              />
            )}
          </WithdrawContainer>
        ),
        config,
      }}
    />
  );
};

export default WithdrawModal;
