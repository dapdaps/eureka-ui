import Big from 'big.js';
import { ethers } from 'ethers';
import { debounce } from 'lodash';
import { useEffect } from 'react';
import { styled } from 'styled-components';

import useToast from '@/hooks/useToast';
import { useMultiState } from '@/modules/lending/hooks';
import { getPrice } from '@/utils/price';

import PrimaryButton from '../../PrimaryButton';
import { formatHealthFactor, isValid, ROUND_DOWN, unifyNumber } from '../../utils';
import FlexBetween from '../FlexBetween';
import BaseModal from '../index';
import RoundedCard from '../RoundedCard';

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
  width: 260px;

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
    calcHealthFactor,
    yourTotalBorrow,
    yourTotalCollateral,
    threshold,
    prices,
    theme,
    addAction,
    dexConfig,
    from,
    provider,
    gasEstimation
  } = props;

  const {
    underlyingAsset,
    decimals,
    symbol,
    underlyingBalance,
    isCollateraled,
    aTokenAddress,
    availableLiquidity,
    healthFactor
  } = data;

  const toast = useToast();

  const availableLiquidityAmount = Big(availableLiquidity).div(Big(10).pow(decimals)).toFixed();

  const [state, updateState] = useMultiState<any>({
    amount: '',
    amountInUSD: '0.00',
    allowanceAmount: 0,
    needApprove: false,
    loading: false,
    newHealthFactor: '-',
    gas: '-'
  });

  function updateGas() {
    if (symbol === config.nativeCurrency.symbol) {
      gasEstimation('withdrawETH').then((value: any) => {
        updateState({ gas: value });
      });
    } else {
      gasEstimation('withdraw').then((value: any) => {
        updateState({ gas: value });
      });
    }
  }

  const _remainingSupply = Number(underlyingBalance) - Number(state.amount);
  const remainingSupply = isNaN(_remainingSupply) ? underlyingBalance : Big(_remainingSupply).toFixed(2);

  function formatAddAction(_amount: any, status: any, transactionHash: any) {
    console.log('formatAddAction--', dexConfig, dexConfig.name);
    addAction?.({
      type: 'Lending',
      action: 'Withdraw',
      token: {
        symbol
      },
      amount: _amount,
      template: dexConfig.name,
      add: false,
      status,
      transactionHash
    });
  }

  function withdrawErc20(asset: any, actualAmount: any, shownAmount: any) {
    console.log('withdrawErc20--', asset, actualAmount, shownAmount);
    updateState({
      loading: true
    });
    return provider
      .getSigner()
      .getAddress()
      .then((address: any) => {
        const pool = new ethers.Contract(config.aavePoolV3Address, config.aavePoolV3ABI, provider.getSigner());
        // there is a bug in the aave pool contract that requires the amount to be truncated to the correct number of decimals
        const truncatedAmount = shownAmount.slice(0, shownAmount.indexOf('.') + decimals + 1);
        const amount = ethers.utils.parseUnits(truncatedAmount || 0, decimals);

        return pool['withdraw(address,uint256,address)'](asset, amount, address);
      })
      .then((tx: any) => {
        tx.wait()
          .then((res: any) => {
            console.log('withdrawErc20', res);
            const { status, transactionHash } = res;
            if (status === 1) {
              formatAddAction(shownAmount, status, transactionHash);
              onRequestClose();
              onActionSuccess({
                msg: `You withdraw ${parseFloat(Big(shownAmount).toFixed(8))} ${symbol}`,
                step1: true
              });
              console.log('tx succeeded', res);
            } else {
              console.log('tx failed', res);
              updateState({
                loading: false
              });
            }
          })
          .catch((err: any) => {
            console.log('tx.wait on error', err);
          })
          .finally(() => updateState({ loading: false }));
      })
      .catch((err: any) => {
        console.log('withdraw(address,uint256,address) on error', err);
        updateState({ loading: false });
        if (err?.code === 'UNPREDICTABLE_GAS_LIMIT') {
          toast.fail('Insufficient balance to cover gas fees');
        }
      });
  }

  function withdrawETH(actualAmount: any, shownAmount: any) {
    updateState({
      loading: true
    });
    return provider
      .getSigner()
      .getAddress()
      .then((address: any) => {
        const wrappedTokenGateway = new ethers.Contract(
          config.wrappedTokenGatewayV3Address,
          config.wrappedTokenGatewayV3ABI,
          provider.getSigner()
        );

        return wrappedTokenGateway.withdrawETH(config.aavePoolV3Address, actualAmount, address);
      })
      .then((tx: any) => {
        tx.wait()
          .then((res: any) => {
            const { status, transactionHash } = res;
            if (status === 1) {
              onRequestClose();
              formatAddAction(shownAmount, status, transactionHash);
              onActionSuccess({
                msg: `You withdraw ${parseFloat(Big(shownAmount).toFixed(8))} ${symbol}`,
                step1: true
              });
              console.log('tx succeeded', res);
            } else {
              console.log('tx failed', res);
              updateState({
                loading: false
              });
            }
          })
          .catch((err: any) => {
            console.log('tx.wait on error', err);
          })
          .finally(() => updateState({ loading: false }));
      })
      .catch((err: any) => {
        console.log('wrappedTokenGateway.withdrawETH on error', err);
        updateState({ loading: false });
        if (err?.code === 'UNPREDICTABLE_GAS_LIMIT') {
          toast.fail('Insufficient balance to cover gas fees');
        }
      });
  }

  function approveForGateway(tokenAddress: any, amount: any) {
    const token = new ethers.Contract(tokenAddress, config.erc20Abi, provider.getSigner());

    return token.approve(config.wrappedTokenGatewayV3Address, amount);
  }

  function allowanceForGateway(tokenAddress: any) {
    return provider
      .getSigner()
      .getAddress()
      .then((address: any) => {
        const token = new ethers.Contract(tokenAddress, config.erc20Abi, provider.getSigner());
        return token.allowance(address, config.wrappedTokenGatewayV3Address);
      });
  }

  function update() {
    allowanceForGateway(aTokenAddress)
      .then((amount: any) => Number(amount.toString()))
      .then((amount: any) =>
        updateState({
          allowanceAmount: Big(amount).div(Big(10).pow(decimals)).toNumber()
        })
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

  let shownMaxValue: any;
  if (isCollateraled) {
    if (Big(threshold).eq(0)) {
      shownMaxValue = '0';
    } else {
      const maxWithdraw = Big(yourTotalCollateral)
        .minus(
          Big(yourTotalBorrow || 0)
            .times(1.01)
            .div(Big(threshold))
        )
        .div(getPrice(symbol, prices))
        .toFixed();

      shownMaxValue = bigMin(maxWithdraw, underlyingBalance).toFixed();
    }
  } else {
    shownMaxValue = underlyingBalance;
  }

  const updateNewHealthFactor = debounce((amount: any) => {
    updateState({ newHealthFactor: '-' });
    if (isCollateraled) {
      const newHealthFactor = formatHealthFactor(calcHealthFactor('WITHDRAW', symbol, amount));
      console.log('withdraw updateNewHealthFactor', symbol, amount, newHealthFactor);
      updateState({ newHealthFactor });
    } else {
      updateState({ newHealthFactor: healthFactor });
    }
  }, 1000);

  const changeValue = (value: any) => {
    if (Number(value) > shownMaxValue) {
      value = shownMaxValue;
    }
    if (Number(value) < 0) {
      value = '0';
    }
    if (isValid(value)) {
      const amountInUSD = Big(value).mul(getPrice(symbol, prices)).toFixed(2, ROUND_DOWN);

      updateState({
        amountInUSD
      });
      if (hasHF) {
        updateNewHealthFactor(value);
      }
    } else {
      updateState({
        amountInUSD: '0.00',
        newHealthFactor: '-'
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

  useEffect(() => {
    update();
    updateGas();
  }, [data]);

  if (!data) {
    return <div />;
  }

  return (
    <BaseModal title={`Withdraw ${symbol}`} onRequestClose={onRequestClose} config={config} from={from}>
      <WithdrawContainer>
        <RoundedCard title="Amount">
          <FlexBetween>
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
            <TokenWrapper>
              <img width={26} height={26} src={data?.icon} />
              <TokenTexture>{symbol}</TokenTexture>
            </TokenWrapper>
          </FlexBetween>
          <FlexBetween>
            <GrayTexture>${unifyNumber(state.amountInUSD)}</GrayTexture>
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
          </FlexBetween>
        </RoundedCard>
        <RoundedCard title="Transaction Overview">
          <TransactionOverviewContainer>
            <FlexBetween>
              <PurpleTexture>Remaining Supply</PurpleTexture>
              <WhiteTexture>
                {unifyNumber(remainingSupply)} {symbol}
              </WhiteTexture>
            </FlexBetween>
            {hasHF && (
              <FlexBetween>
                <PurpleTexture>Health Factor</PurpleTexture>
                <div style={{ textAlign: 'right' }}>
                  <PurpleTexture>
                    {formatHealthFactor(healthFactor)}→{state.newHealthFactor}
                  </PurpleTexture>
                </div>
              </FlexBetween>
            )}
          </TransactionOverviewContainer>
        </RoundedCard>

        {state.needApprove && symbol === config.nativeCurrency.symbol ? (
          <PrimaryButton
            config={config}
            theme={theme}
            loading={state.loading}
            disabled={disabled}
            onClick={() => {
              updateState({
                loading: true
              });
              const amount = Big(state.amount).mul(Big(10).pow(decimals)).toFixed(0);
              approveForGateway(aTokenAddress, amount)
                .then((tx: any) => {
                  tx.wait()
                    .then((res: any) => {
                      const { status } = res;
                      if (status === 1) {
                        console.log('tx succeeded', res);
                        updateState({
                          needApprove: false,
                          loading: false
                        });
                      } else {
                        console.log('tx failed', res);
                        updateState({
                          loading: false
                        });
                      }
                    })
                    .finally(() => updateState({ loading: false }));
                })
                .catch(() => updateState({ loading: false }));
            }}
          >
            {`Approve ${symbol}`}
          </PrimaryButton>
        ) : (
          <PrimaryButton
            config={config}
            theme={theme}
            loading={state.loading}
            disabled={disabled}
            onClick={() => {
              const actualAmount =
                state.amount === shownMaxValue
                  ? actualMaxValue
                  : Big(state.amount).mul(Big(10).pow(decimals)).toFixed(0, ROUND_DOWN);

              const shownAmount = state.amount;

              if (symbol === config.nativeCurrency.symbol) {
                // supply weth
                withdrawETH(actualAmount, shownAmount);
              } else {
                // supply common
                withdrawErc20(underlyingAsset, actualAmount, shownAmount);
              }
            }}
          >
            {`Withdraw ${symbol}`}
          </PrimaryButton>
        )}
      </WithdrawContainer>
    </BaseModal>
  );
};

export default WithdrawModal;
