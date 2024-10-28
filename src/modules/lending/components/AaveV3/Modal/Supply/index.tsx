import Big from 'big.js';
import { ethers } from 'ethers';
import { debounce } from 'lodash';
import { useEffect } from 'react';
import { styled } from 'styled-components';

import useToast from '@/hooks/useToast';
import { useMultiState } from '@/modules/lending/hooks/useMultiState';

import PrimaryButton from '../../PrimaryButton';
import { formatHealthFactor, isValid, unifyNumber } from '../../utils';
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

const MIN_ETH_GAS_FEE = 0.001;
const ROUND_DOWN = 0;

const SupplyModal = (props: any) => {
  const {
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

  const {
    symbol,
    balance,
    supplyAPY,
    usageAsCollateralEnabled,
    decimals,
    underlyingAsset,
    name: tokenName,
    healthFactor,
    supportPermit
  } = data;

  const toast = useToast();

  const [state, updateState] = useMultiState<any>({
    amount: '',
    amountInUSD: '0.00',
    loading: false,
    newHealthFactor: '-',
    gas: '-',
    allowanceAmount: '0',
    needApprove: false
  });

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

  function getNonce(tokenAddress: any, userAddress: any) {
    const token = new ethers.Contract(tokenAddress, config.erc20Abi, provider.getSigner());
    return token.nonces(userAddress).then((nonce: any) => nonce.toNumber());
  }

  /**
   *
   * @param {string} user user address
   * @param {string} reserve AAVE reserve address (token to supply)
   * @param {string} tokenName token name
   * @param {string} amount token amount in full decimals
   * @param {number} deadline unix timestamp in SECONDS
   * @returns raw signature string will could be used in supplyWithPermit
   */
  function signERC20Approval(user: any, reserve: any, tokenName: any, amount: any, deadline: any) {
    return getNonce(reserve, user).then((nonce: any) => {
      const typeData = {
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' }
          ],
          Permit: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' }
          ]
        },
        primaryType: 'Permit',
        domain: {
          name: tokenName,
          version: '1',
          chainId,
          verifyingContract: reserve
        },
        message: {
          owner: user,
          spender: config.aavePoolV3Address,
          value: amount,
          nonce,
          deadline
        }
      };

      const dataToSign = JSON.stringify(typeData);

      return provider.send('eth_signTypedData_v4', [user, dataToSign]);
    });
  }

  /**
   *
   * @param {string} user user address
   * @param {string} reserve AAVE reserve address (token to supply)
   * @param {string} amount token amount in full decimals
   * @param {number} deadline unix timestamp in SECONDS
   * @param {string} rawSig signature from signERC20Approval
   * @returns txn object
   */
  function supplyWithPermit(user: any, reserve: any, amount: any, deadline: any, rawSig: any) {
    const sig = ethers.utils.splitSignature(rawSig);
    const pool = new ethers.Contract(config.aavePoolV3Address, config.aavePoolV3ABI, provider.getSigner());
    return pool['supplyWithPermit(address,uint256,address,uint16,uint256,uint8,bytes32,bytes32)'](
      reserve,
      amount,
      user,
      0,
      deadline,
      sig.v,
      sig.r,
      sig.s
    );
  }

  function depositETH(amount: any) {
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
        return wrappedTokenGateway.depositETH(config.aavePoolV3Address, address, 0, {
          value: amount,
          gasLimit: 90000000
        });
      })
      .then((tx: any) => {
        tx.wait()
          .then((res: any) => {
            const { status, transactionHash } = res;
            console.log(res, status === 1, 'status === 1');

            if (status === 1) {
              formatAddAction(Big(amount).div(Big(10).pow(decimals)).toFixed(8), status, transactionHash);
              onRequestClose();
              onActionSuccess({
                msg: `You supplied ${parseFloat(Big(amount).div(Big(10).pow(decimals)).toFixed(8))} ${symbol}`,
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
          });
      })
      .catch((err: any) => {
        console.log(err, '<==Supply===depositETH');
        if (err?.code === 'UNPREDICTABLE_GAS_LIMIT') {
          toast.fail('Insufficient balance to cover gas fees');
        }
        updateState({
          loading: false
        });
      });
  }

  function depositPacETH(amount: any) {
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
        return wrappedTokenGateway.depositETH(config.aavePoolV3Address, address, 0, {
          value: amount
        });
      })
      .then((tx: any) => {
        tx.wait()
          .then((res: any) => {
            const { status, transactionHash } = res;
            if (status === 1) {
              onRequestClose();
              formatAddAction(Big(amount).div(Big(10).pow(decimals)).toFixed(8), status, transactionHash);
              onActionSuccess({
                msg: `You supplied ${parseFloat(Big(amount).div(Big(10).pow(decimals)).toFixed(8))} ${symbol}`,
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
          .finally(() => updateState({ loading: false }));
      })
      .catch((err: any) => {
        updateState({
          loading: false
        });
        if (err?.code === 'UNPREDICTABLE_GAS_LIMIT') {
          toast.fail('Insufficient balance to cover gas fees');
        }
      });
  }

  function getAllowance() {
    provider
      .getSigner()
      .getAddress()
      .then(async (userAddress: any) => {
        const token = new ethers.Contract(underlyingAsset, config.erc20Abi, provider.getSigner());
        token
          .allowance(userAddress, config.aavePoolV3Address)
          .then((allowanceAmount: any) => allowanceAmount.toString())
          .then((allowanceAmount: any) => {
            updateState({
              allowanceAmount: Big(allowanceAmount).div(Big(10).pow(decimals)).toFixed()
            });
          })
          .catch((err: any) => {
            console.log(err, 'getAllowance---err');
          });
      });
  }

  function depositFromApproval(amount: any) {
    const tokenAddress = underlyingAsset;
    const pool = new ethers.Contract(
      config.aavePoolV3Address,
      [
        {
          inputs: [
            { internalType: 'address', name: 'asset', type: 'address' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' },
            { internalType: 'address', name: 'onBehalfOf', type: 'address' },
            { internalType: 'uint16', name: 'referralCode', type: 'uint16' }
          ],
          name: 'supply',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      provider.getSigner()
    );

    return provider
      .getSigner()
      .getAddress()
      .then((userAddress: any) => {
        return pool['supply(address,uint256,address,uint16)'](tokenAddress, amount, userAddress, 0);
      });
  }

  function formatAddAction(_amount: any, status: any, transactionHash: any) {
    addAction?.({
      type: 'Lending',
      action: 'Supply',
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
  function approve(amount: any) {
    const tokenAddress = underlyingAsset;
    const token = new ethers.Contract(tokenAddress, config.erc20Abi, provider.getSigner());
    return token['approve(address,uint256)'](config.aavePoolV3Address, amount);
  }

  function update() {
    if (supportPermit) {
      return;
    }
    if (symbol === config.nativeCurrency.symbol) {
      updateState({ needApprove: false });
      return;
    }
    if (!isValid(state.amount)) {
      updateState({ needApprove: false });
      return;
    }
    if (
      !isValid(state.allowanceAmount) ||
      Number(state.allowanceAmount) < Number(state.amount) ||
      Number(state.amount) === 0
    ) {
      updateState({ needApprove: true });
    } else {
      updateState({ needApprove: false });
    }
  }

  function depositErc20(amount: any) {
    updateState({
      loading: true
    });
    const deadline = Math.floor(Date.now() / 1000 + 3600); // after an hour

    provider
      .getSigner()
      .getAddress()
      .then((userAddress: any) => {
        debugger;
        if (!supportPermit) {
          depositFromApproval(amount)
            .then((tx: any) => {
              tx.wait()
                .then((res: any) => {
                  const { status, transactionHash } = res;
                  if (status === 1) {
                    onRequestClose();
                    formatAddAction(Big(amount).div(Big(10).pow(decimals)).toFixed(8), status, transactionHash);
                    onActionSuccess({
                      msg: `You supplied ${parseFloat(Big(amount).div(Big(10).pow(decimals)).toFixed(8))} ${symbol}`,
                      step1: true
                    });
                    console.log('tx succeeded', res);
                  } else {
                    updateState({
                      loading: false
                    });
                    console.log('tx failed', res);
                  }
                })
                .catch((err: any) => {
                  console.log('tx.wait on error depositErc20', err);
                  updateState({ loading: false });
                })
                .finally(() => updateState({ loading: false }));
            })
            .catch((err: any) => {
              updateState({ loading: false });
              console.log('tx.wait on error depositFromApproval', err);
              if (err?.code === 'UNPREDICTABLE_GAS_LIMIT') {
                toast.fail('Insufficient balance to cover gas fees');
              }
            });
        } else {
          const token = underlyingAsset;
          signERC20Approval(userAddress, token, tokenName, amount, deadline)
            .then((rawSig: any) => {
              return supplyWithPermit(userAddress, token, amount, deadline, rawSig);
            })
            .then((tx: any) => {
              tx.wait()
                .then((res: any) => {
                  const { status, transactionHash } = res;
                  console.log('SUCCESS--', status, transactionHash);
                  if (status === 1) {
                    onRequestClose();
                    formatAddAction(Big(amount).div(Big(10).pow(decimals)).toFixed(8), status, transactionHash);
                    onActionSuccess({
                      msg: `You supplied ${parseFloat(Big(amount).div(Big(10).pow(decimals)).toFixed(8))} ${symbol}`,
                      step1: true
                    });
                    console.log('tx succeeded', res);
                  } else {
                    updateState({
                      loading: false
                    });
                    console.log('tx failed', res);
                  }
                })
                .catch((err: any) => {
                  console.log('tx.wait on error depositErc20', err);
                })
                .finally(() => updateState({ loading: false }));
            })
            .catch((err: any) => {
              console.log('tx.wait on error signERC20Approval', err);
              if (err?.code === 'UNPREDICTABLE_GAS_LIMIT') {
                toast.fail('Insufficient balance to cover gas fees');
              }
              updateState({ loading: false });
            });
        }
      });
  }

  function smartFormatNumber(value: Big, decimals: number): string {
    const formatted = value.toFixed(decimals).replace(/\.?0+$/, '');
    return formatted.includes('.') ? formatted : formatted + '.0';
  }

  function calculateMaxValue(balance: string, symbol: string, decimals: number, config: any): string {
    const balanceBig = new Big(balance);

    if (symbol === config.nativeCurrency.symbol) {
      return smartFormatNumber(balanceBig.minus(MIN_ETH_GAS_FEE), decimals);
    } else {
      return smartFormatNumber(balanceBig, decimals);
    }
  }

  const maxValue = calculateMaxValue(balance, symbol, decimals, config);

  const updateNewHealthFactor = debounce((amount: any) => {
    updateState({ newHealthFactor: '-' });
    const newHealthFactor = formatHealthFactor(calcHealthFactor('SUPPLY', symbol, amount));
    console.log('supply updateNewHealthFactor', symbol, amount, newHealthFactor);
    updateState({ newHealthFactor });
  }, 1000);

  const disabled =
    !data.balanceInUSD ||
    Number(data.balanceInUSD) === 0 ||
    !state.amount ||
    !isValid(state.amount) ||
    Number(state.amount) === 0;

  const changeValue = (value: any) => {
    if (!isValid(value)) {
      updateState({ amount: '', amountInUSD: '0.00', newHealthFactor: '-' });
      return;
    }

    if (Big(value).gte(Big(maxValue))) {
      value = maxValue;
    }
    if (Big(value).lt(Big(0))) {
      value = '0';
    }

    const amountInUSD = Big(value)
      .mul(prices[symbol] || 1)
      .toFixed(2, ROUND_DOWN);

    updateState({
      amount: value,
      amountInUSD
    });

    updateNewHealthFactor(value);
  };

  useEffect(() => {
    updateGas();
    getAllowance();
    update();
  }, [data, state.amount]);

  if (!data) {
    return <div />;
  }

  return (
    <BaseModal config={config} title={`Supply ${symbol}`} {...props}>
      <WithdrawContainer>
        <RoundedCard title="Amount">
          <FlexBetween>
            <TokenTexture>
              <Input type="text" value={state.amount} onChange={(e) => changeValue(e.target.value)} placeholder="0" />
            </TokenTexture>
            <TokenWrapper>
              <img width={26} height={26} src={data?.icon} />
              <TokenTexture>{symbol}</TokenTexture>
            </TokenWrapper>
          </FlexBetween>
          <FlexBetween>
            <GrayTexture>${unifyNumber(state.amountInUSD)}</GrayTexture>
            <GrayTexture>
              Balance:
              <Max
                onClick={() => {
                  changeValue(parseFloat(maxValue));
                }}
              >
                {unifyNumber(balance)}
              </Max>
            </GrayTexture>
          </FlexBetween>
        </RoundedCard>
        <RoundedCard title="Transaction Overview">
          <TransactionOverviewContainer>
            <FlexBetween>
              <PurpleTexture>Supply APY</PurpleTexture>
              <WhiteTexture>{unifyNumber(Number(supplyAPY) * 100)}%</WhiteTexture>
            </FlexBetween>
            <FlexBetween>
              <PurpleTexture>Collateralization</PurpleTexture>
              {usageAsCollateralEnabled ? <PurpleTexture>Enabled</PurpleTexture> : <RedTexture>Disabled</RedTexture>}
            </FlexBetween>
            <FlexBetween>
              <PurpleTexture>Health Factor</PurpleTexture>
              <div style={{ textAlign: 'right' }}>
                <PurpleTexture style={{ display: 'flex' }}>
                  {formatHealthFactor(healthFactor)}→{state.newHealthFactor}
                </PurpleTexture>
              </div>
            </FlexBetween>
          </TransactionOverviewContainer>
        </RoundedCard>

        {state.needApprove ? (
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
              approve(amount)
                .then((tx: any) => {
                  tx.wait()
                    .then((res: any) => {
                      const { status } = res;
                      console.log('approve => tx.wait', res);

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
                    .catch((err: any) => {
                      console.log('tx.wait on error approve', err);
                    })
                    .finally(() => updateState({ loading: false }));
                })
                .catch(() => updateState({ loading: false }));
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

              if (symbol === config.nativeCurrency.symbol) {
                if (['ZeroLend', 'AAVE V3', 'Seamless Protocol', 'C14'].includes(dexConfig.name)) {
                  // supply eth
                  depositETH(amount);
                }
                if (['Pac Finance'].includes(dexConfig.name)) {
                  depositPacETH(amount);
                }
              } else {
                // supply common
                depositErc20(amount);
              }
            }}
          >
            Supply {symbol}
          </PrimaryButton>
        )}
      </WithdrawContainer>
    </BaseModal>
  );
};

export default SupplyModal;
