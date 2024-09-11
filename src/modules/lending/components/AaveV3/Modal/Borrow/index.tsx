import Big from 'big.js';
import { ethers } from 'ethers';
import { debounce } from 'lodash';
import { useEffect } from 'react';
import { styled } from 'styled-components';

import { useMultiState } from '@/modules/lending/hooks';

import PrimaryButton from '../../PrimaryButton';
import { formatHealthFactor, isValid, ROUND_DOWN, unifyNumber } from '../../utils';
import BaseModal from '../';
import FlexBetween from '../FlexBetween';
import RoundedCard from '../RoundedCard';

const BorrowContainer = styled.div`
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

const Texture = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: var(--agg-primary-color, #fff);
`;

const RedTexture = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: red;
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

const BorrowModal = (props: any) => {
  const {
    dexConfig,
    config,
    data,
    onRequestClose,
    onActionSuccess,
    calcHealthFactor,
    theme,
    addAction,
    prices,
    provider,
    gasEstimation
  } = props;

  const {
    symbol,
    healthFactor,
    availableBorrows,
    availableBorrowsUSD,
    decimals,
    underlyingAsset,
    variableDebtTokenAddress
  } = data;

  const [state, updateState] = useMultiState<any>({
    amount: '',
    amountInUSD: '0.00',
    allowanceAmount: 0,
    loading: false,
    newHealthFactor: '-',
    gas: '-'
  });

  function updateGas() {
    if (symbol === config.nativeCurrency.symbol) {
      gasEstimation('borrowETH').then((value: any) => {
        updateState({ gas: value });
      });
    } else {
      gasEstimation('borrow').then((value: any) => {
        updateState({ gas: value });
      });
    }
  }

  const disabled = !state.amount || !isValid(state.amount) || Number(state.amount) === 0;
  const maxValue = Big(availableBorrows).toFixed(decimals);

  /**
   * @param {string} vwETHAddress
   * @param {string} userAddress
   * @returns {BigNumber}
   */
  function borrowAllowance(vwETHAddress: string, userAddress: string) {
    const vToken = new ethers.Contract(vwETHAddress, config.variableDebtTokenABI, provider.getSigner());

    return vToken.borrowAllowance(userAddress, config.wrappedTokenGatewayV3Address);
  }

  function approveDelegation(vwETHAddress: string) {
    const vToken = new ethers.Contract(vwETHAddress, config.variableDebtTokenABI, provider.getSigner());
    const maxUint256 = ethers.BigNumber.from('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
    return vToken.approveDelegation(config.wrappedTokenGatewayV3Address, maxUint256);
  }

  const updateNewHealthFactor = debounce((amount: any) => {
    updateState({ newHealthFactor: '-' });
    const newHealthFactor = formatHealthFactor(calcHealthFactor('BORROW', symbol, amount));
    // console.log(
    //   "BORROW updateNewHealthFactor",
    //   symbol,
    //   state.amount,
    //   newHealthFactor
    // );
    updateState({ newHealthFactor });
  }, 1000);

  const changeValue = (value: string) => {
    let amountInUSD = '0.00';
    if (Number(value) > Number(maxValue)) {
      value = maxValue;
    }
    if (Number(value) < 0) {
      value = '0';
    }
    if (isValid(value)) {
      amountInUSD = Big(value)
        .mul(prices[symbol] || 1)
        .toFixed(2, ROUND_DOWN);
    }

    updateState({ amount: parseFloat(value), amountInUSD });

    updateNewHealthFactor(value);
  };

  function formatAddAction(_amount: string, status: number, transactionHash: string) {
    addAction?.({
      type: 'Lending',
      action: 'Borrow',
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

  function borrowERC20(amount: string) {
    updateState({ loading: true });
    const pool = new ethers.Contract(config.aavePoolV3Address, config.aavePoolV3ABI, provider);

    provider
      .getSigner()
      .getAddress()
      .then((address: any) => {
        return pool['borrow(address,uint256,uint256,uint16,address)'](
          underlyingAsset,
          amount,
          2, // variable interest rate
          0,
          address
        );
      })
      .then((tx: any) => {
        tx.wait()
          .then((res: any) => {
            const { status, transactionHash } = res;
            console.log('SUCCESS--', status, transactionHash);
            if (status === 1) {
              formatAddAction(Big(amount).div(Big(10).pow(decimals)).toFixed(8), status, transactionHash);
              onActionSuccess({
                msg: `You borrowed ${parseFloat(Big(amount).div(Big(10).pow(decimals)).toFixed(8))} ${symbol}`,
                callback: () => {
                  onRequestClose();
                  updateState({
                    loading: false
                  });
                }
              });
              console.log('tx succeeded', res);
            } else {
              console.log('tx failed', res);
              updateState({
                loading: false
              });
            }
          })
          .catch(() => updateState({ loading: false }));
      })
      .catch(() => updateState({ loading: false }));
  }

  function borrowETH(amount: string) {
    const wrappedTokenGateway = new ethers.Contract(
      config.wrappedTokenGatewayV3Address,
      config.wrappedTokenGatewayV3ABI,
      provider.getSigner()
    );
    updateState({ loading: true });
    return wrappedTokenGateway
      .borrowETH(
        config.aavePoolV3Address,
        amount,
        2, // variable interest rate
        0
      )
      .then((tx: any) => {
        tx.wait()
          .then((res: any) => {
            const { status, transactionHash } = res;
            if (status === 1) {
              formatAddAction(Big(amount).div(Big(10).pow(decimals)).toFixed(8), status, transactionHash);
              onActionSuccess({
                msg: `You borrowed ${parseFloat(Big(amount).div(Big(10).pow(decimals)).toFixed(8))} ${symbol}`,
                callback: () => {
                  onRequestClose();
                  updateState({
                    loading: false
                  });
                }
              });
              console.log('tx succeeded', res);
            } else {
              console.log('tx failed', res);
              updateState({
                loading: false
              });
            }
          })
          .catch(() => updateState({ loading: false }));
      })
      .catch(() => updateState({ loading: false }));
  }

  function update() {
    provider
      .getSigner()
      .getAddress()
      .then((address: any) => {
        borrowAllowance(variableDebtTokenAddress, address)
          .then((amountRaw: any) => amountRaw.toString())
          .then((amount: any) => {
            updateState({
              allowanceAmount: Big(amount).div(Big(10).pow(decimals)).toNumber()
            });
          });
      });

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

  useEffect(() => {
    update();
    updateGas();
  }, [state.amount]);

  if (!data) {
    return <div />;
  }

  return (
    <>
      <BaseModal config={config} title={`Borrow ${symbol}`} onRequestClose={onRequestClose}>
        <BorrowContainer>
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
                Available:{' '}
                <Max
                  onClick={() => {
                    changeValue(maxValue);
                  }}
                >
                  {unifyNumber(availableBorrows)}
                </Max>
              </GrayTexture>
            </FlexBetween>
          </RoundedCard>
          <RoundedCard title="Transaction Overview">
            <FlexBetween>
              <PurpleTexture>Health Factor</PurpleTexture>
              <div style={{ textAlign: 'right' }}>
                <Texture
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}
                >
                  {formatHealthFactor(healthFactor)}→{state.newHealthFactor}
                </Texture>
              </div>
            </FlexBetween>
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
                approveDelegation(variableDebtTokenAddress)
                  .then((tx: any) => {
                    tx.wait()
                      .then((res: any) => {
                        const { status } = res;
                        if (status === 1) {
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
                      .catch(() => updateState({ loading: false }));
                  })
                  .finally(() => updateState({ loading: false }));
              }}
            >
              Approve {symbol}
            </PrimaryButton>
          ) : (
            <PrimaryButton
              config={config}
              theme={theme}
              loading={state.loading}
              disabled={disabled}
              onClick={() => {
                const amount = Big(state.amount).mul(Big(10).pow(decimals)).toFixed(0);
                if (symbol === config.nativeWrapCurrency.symbol) {
                  // borrow weth
                  borrowETH(amount);
                } else {
                  // borrow common
                  borrowERC20(amount);
                }
              }}
            >
              Borrow {symbol}
            </PrimaryButton>
          )}
        </BorrowContainer>
      </BaseModal>
    </>
  );
};

export default BorrowModal;
