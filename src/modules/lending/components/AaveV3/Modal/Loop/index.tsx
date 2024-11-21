import Big from 'big.js';
import { ethers } from 'ethers';
import { debounce } from 'lodash';
import { useEffect } from 'react';
import { styled } from 'styled-components';

import { useMultiState } from '@/modules/hooks/useMultiState';
import { getPrice } from '@/utils/price';

import PrimaryButton from '../../PrimaryButton';
import Slider from '../../Slider';
import { formatHealthFactor, isValid } from '../../utils';
import FlexBetween from '../FlexBetween';
import BaseModal from '../index';
import RoundedCard from '../RoundedCard';

const MIN_ETH_GAS_FEE = 0.000001;
const ROUND_DOWN = 0;

const ERC20ABI = [
  {
    inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
    name: 'nonces',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'spender', type: 'address' },
      { internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'owner', type: 'address' },
      { internalType: 'address', name: 'spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  }
];

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

const RedTexture = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: red;
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
  text-decoration: underline;
  cursor: pointer;
`;

const LoopModal = (props: any) => {
  const { parseUnits } = ethers.utils;

  const {
    account,
    toast,
    dexConfig,
    config,
    data,
    onRequestClose,
    onActionSuccess,
    chainId,
    calcHealthFactor,
    theme,
    addAction,
    prices,
    gasEstimation,
    provider
  } = props;

  const { symbol, balance, decimals, underlyingAsset, healthFactor } = data;

  const [state, updateState] = useMultiState<any>({
    amount: '',
    amountInUSD: '0.00',
    loading: false,
    newHealthFactor: '-',
    gas: '-',

    needApprove: false,
    pointsRewards: '1.65',
    leverage: 1.1
  });

  const maxValue =
    symbol === config.nativeCurrency.symbol
      ? Big(balance || 0)
          .minus(MIN_ETH_GAS_FEE)
          .toFixed(6)
      : Big(balance || 0).toFixed(6);

  function updateGas() {
    if (symbol === config.nativeCurrency.symbol) {
      gasEstimation('deposit').then((value: any) => {
        updateState({ gas: value });
      });
    } else {
      gasEstimation('supplyWithPermit').then((value: any) => {
        updateState({ gas: value });
      });
    }
  }

  function formatAddAction(_amount: any, status: any, transactionHash: any) {
    addAction?.({
      type: 'Lending',
      action: 'Loop',
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

  const updateNewHealthFactor = debounce((amount: any) => {
    updateState({ newHealthFactor: '-' });
    const newHealthFactor = formatHealthFactor(calcHealthFactor('LOOP', symbol, amount, state.leverage));
    console.log('supply updateNewHealthFactor', symbol, state.amount, newHealthFactor);
    updateState({ newHealthFactor });
  }, 1000);

  const disabled = !state.amount || !isValid(state.amount) || Number(state.amount) === 0;

  const changeValue = (value: any) => {
    if (Number(value) > Number(maxValue)) {
      value = maxValue;
    }
    if (Number(value) < 0) {
      value = '0';
    }
    if (isValid(value)) {
      const amountInUSD = Big(value).mul(getPrice(symbol, prices)).toFixed(2, ROUND_DOWN);
      updateState({
        amountInUSD
      });

      updateNewHealthFactor(value);
    } else {
      updateState({
        amountInUSD: '0.00',
        newHealthFactor: '-'
      });
    }
    updateState({ amount: value });
  };

  const onSliderChange = (_value: any) => {
    updateState({
      leverage: _value,
      pointsRewards: (_value[0] * 1.5).toFixed(2)
    });
    updateNewHealthFactor(_value);
  };

  function getTokenAllowance() {
    return new ethers.Contract(underlyingAsset, ERC20ABI, provider.getSigner())
      .allowance(account, config.LoopDelegateeAddress)
      .then((_allowance: any) => {
        const supplyAmount = parseUnits(state.amount, decimals);
        console.log(
          'tokenAllowance--',
          _allowance,
          _allowance?.toString(),
          supplyAmount,
          Big(_allowance?.toString()).lt(supplyAmount.toString())
        );

        if (Big(_allowance.toString()).lt(supplyAmount.toString())) {
          const toastId = toast?.loading({
            title: `Approve ${symbol}`
          });
          new ethers.Contract(data.underlyingAsset, ERC20ABI, provider.getSigner())
            .approve(config.LoopDelegateeAddress, supplyAmount)
            .then((tx: any) => {
              tx.wait()
                .then((res: any) => {
                  const { status, transactionHash } = res;
                  if (status === 1) {
                    toast?.dismiss(toastId);
                    toast?.success({
                      title: 'Approve Successfully!',
                      // text: `Approved ${state.amount} ${symbol}`,
                      tx: transactionHash,
                      chainId
                    });
                    console.log('approve succeeded', res);
                  }
                  updateState({
                    loading: false
                  });
                })
                .catch((err: any) => {
                  updateState({
                    loading: false
                  });
                  toast?.dismiss(toastId);
                  toast?.fail({
                    title: 'Approve Failed!',
                    text: err?.message?.includes('user rejected transaction') ? 'User rejected transaction' : null
                  });
                });
            })
            .catch(() => updateState({ loading: false }));
        } else {
          return true;
        }
      })
      .catch((err: any) => {
        console.log('CATCH-getTokenAllowance_ERROR:', err);
      });
  }

  function loop(isNative?: any) {
    new ethers.Contract(
      data.variableDebtTokenAddress,
      [
        {
          inputs: [
            {
              internalType: 'address',
              name: 'fromUser',
              type: 'address'
            },
            { internalType: 'address', name: 'toUser', type: 'address' }
          ],
          name: 'borrowAllowance',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      provider.getSigner()
    )
      .borrowAllowance(account, config.LoopDelegateeAddress)
      .then((_debtAllowance: any) => {
        const _borrowAmount = Big(state.leverage).times(Big(state.amount)).minus(Big(state.amount)).toString();
        const borrowAmount = parseUnits(_borrowAmount, decimals);
        console.log('borrowAmount--', borrowAmount.toString());
        console.log(
          'debtAllowance--',
          _debtAllowance,
          _debtAllowance.toString(),
          Big(_debtAllowance).lt(Big(borrowAmount.toString()))
        );
        if (!_debtAllowance) return false;

        if (Big(_debtAllowance).lt(Big(borrowAmount.toString()))) {
          new ethers.Contract(
            data.variableDebtTokenAddress,
            [
              {
                inputs: [
                  {
                    internalType: 'address',
                    name: 'delegatee',
                    type: 'address'
                  },
                  {
                    internalType: 'uint256',
                    name: 'amount',
                    type: 'uint256'
                  }
                ],
                name: 'approveDelegation',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function'
              }
            ],
            provider.getSigner()
          )
            .approveDelegation(config.LoopDelegateeAddress, borrowAmount)
            .then((tx: any) => {
              tx.wait()
                .then((res: any) => {
                  const { status } = res;
                  if (status === 1) {
                    console.log('approveDelegation succeeded', res);
                    return { step2: true, borrowAmount };
                  } else {
                    console.log('approveDelegation failed', res);
                    updateState({
                      loading: false
                    });
                  }
                })
                .catch(() => updateState({ loading: false }));
            });
        } else {
          return { step2: true, borrowAmount };
        }
      })
      .then(({ step2, borrowAmount }: any) => {
        if (!step2) return;
        const asset = data.symbol === 'ETH' ? '0x0000000000000000000000000000000000000000' : data.underlyingAsset;
        const options = isNative
          ? {
              gasLimit: 4000000,
              value: parseUnits(state.amount, decimals)
            }
          : {
              gasLimit: 4000000
            };
        new ethers.Contract(
          config.LoopDelegateeAddress,
          [
            {
              inputs: [
                { internalType: 'address', name: 'asset', type: 'address' },
                {
                  internalType: 'uint256',
                  name: 'cashAmount',
                  type: 'uint256'
                },
                {
                  internalType: 'uint256',
                  name: 'borrowAmount',
                  type: 'uint256'
                }
              ],
              name: 'leverageDeposit',
              outputs: [],
              stateMutability: 'payable',
              type: 'function'
            }
          ],
          provider.getSigner()
        )
          .leverageDeposit(asset, parseUnits(state.amount, decimals), borrowAmount, options)
          .then((tx: any) => {
            tx.wait()
              .then((res: any) => {
                console.log('loop_res--', res);
                const { status, transactionHash } = res;
                if (status === 1) {
                  formatAddAction(Number(state.amount).toFixed(6), status, transactionHash);
                  onRequestClose();
                  onActionSuccess({
                    msg: `You looped ${Number(state.amount).toFixed(6)} ${symbol}`,
                    step1: true
                  });
                  console.log('loop succeeded', res);
                  updateState({
                    loading: false
                  });
                } else {
                  console.log('loop failed', res);
                  updateState({
                    loading: false
                  });
                }
              })
              .catch((err: any) => console.log('CATCH:', err))
              .finally(() => updateState({ loading: false }));
          })
          .catch((err: any) => {
            console.log('CATCH:', err);
            updateState({
              loading: false
            });
          });
      })
      .catch((err: any) => {
        console.log('CATCH---789:', err);
      })
      .finally(() => {
        updateState({
          loading: false
        });
      });
  }

  function handleLoop() {
    updateState({
      loading: true
    });

    if (data.symbol === 'ETH') {
      loop(true);
    } else {
      getTokenAllowance()
        .then((step1: any) => {
          console.log('handleLoop--', step1);
          if (!step1) return;
          loop();
        })
        .catch((err: any) => {
          console.log('handleLoop_error:', err);
          updateState({
            loading: false
          });
        });
    }
  }

  useEffect(() => {
    updateGas();
  }, [data]);

  if (!data) {
    return <div />;
  }

  console.log('loopModal---', props);
  return (
    <BaseModal config={config} title={`Loop ${symbol}`} onRequestClose={onRequestClose}>
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
            <GrayTexture>${state.amountInUSD}</GrayTexture>
            <GrayTexture>
              Balance:
              <Max
                onClick={() => {
                  changeValue(maxValue);
                }}
              >
                {isValid(balance) && balance !== '-' ? Big(balance).toFixed(7) : balance}
              </Max>
            </GrayTexture>
          </FlexBetween>
        </RoundedCard>
        <RoundedCard title="Transaction Overview">
          <TransactionOverviewContainer>
            <Slider {...data} onSliderChange={onSliderChange} />
            <FlexBetween>
              <PurpleTexture>LTV</PurpleTexture>
              <WhiteTexture>{(Number(data.LTV) * 100).toFixed()}%</WhiteTexture>
            </FlexBetween>
            <FlexBetween>
              <PurpleTexture>Health Factor</PurpleTexture>
              <div style={{ textAlign: 'right' }}>
                <PurpleTexture>
                  {formatHealthFactor(healthFactor)}→{state.newHealthFactor}
                </PurpleTexture>
              </div>
            </FlexBetween>
            <FlexBetween>
              <PurpleTexture>Points Rewards</PurpleTexture>
              <PurpleTexture>{`${state.pointsRewards} x`}</PurpleTexture>
            </FlexBetween>
            <FlexBetween>
              <PurpleTexture>Flash loan fee</PurpleTexture>
              <PurpleTexture>
                0.01% (${' '}
                {`${Big(state.amount || 0)
                  .times(Big(state.leverage))
                  .minus(Big(state.amount || 0))
                  .times(getPrice(symbol, prices))
                  .times(0.0001)
                  .toFixed(6)} `}
                )
              </PurpleTexture>
            </FlexBetween>
          </TransactionOverviewContainer>
        </RoundedCard>
      </WithdrawContainer>
      <PrimaryButton config={config} theme={theme} loading={state.loading} disabled={disabled} onClick={handleLoop}>
        Loop
      </PrimaryButton>
    </BaseModal>
  );
};

export default LoopModal;
