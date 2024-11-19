import Big from 'big.js';
import { ethers } from 'ethers';
import { debounce } from 'lodash';
import { useEffect } from 'react';
import { styled } from 'styled-components';

import { useMultiState } from '@/modules/lending/hooks/useMultiState';
import { getPrice } from '@/utils/price';

import PrimaryButton from '../../PrimaryButton';
import { formatHealthFactor, isValid, ROUND_DOWN, unifyNumber } from '../../utils';
import FlexBetween from '../FlexBetween';
import BaseModal from '../index';
import RoundedCard from '../RoundedCard';

const RepayContainer = styled.div`
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
  color: #9b9b9b;
  cursor: pointer;
  text-decoration: underline;
`;

const RepayModal = (props: any) => {
  const {
    config,
    data,
    assetsToSupply,
    onRequestClose,
    onActionSuccess,
    chainId,
    calcHealthFactor,
    theme,
    addAction,
    dexConfig,
    prices,
    from,
    provider,
    gasEstimation
  } = props;

  const { symbol, healthFactor, decimals, underlyingAsset, name: tokenName, supportPermit, debt, debtInUSD } = data;

  const [state, updateState] = useMultiState<any>({
    amount: '',
    amountInUSD: '0.00',
    loading: false,
    newHealthFactor: '-',
    gas: '-',
    allowanceAmount: '0',
    needApprove: false
  });

  useEffect(() => {
    updateGas();
    getAllowance();
    update();
  }, [data]);

  const walletBal = assetsToSupply.find((item: any) => item.symbol === data.symbol).balance;

  function updateGas() {
    if (symbol === config.nativeCurrency.symbol) {
      gasEstimation('repay').then((value: any) => {
        updateState({ gas: value });
      });
    } else {
      gasEstimation('repayWithPermit').then((value: any) => {
        updateState({ gas: value });
      });
    }
  }

  function formatAddAction(_amount: any, status: any, transactionHash: any) {
    addAction?.({
      type: 'Lending',
      action: 'Repay',
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

  function bigMin(_a: any, _b: any) {
    const a = Big(_a);
    const b = Big(_b);
    return a.gt(b) ? b : a;
  }

  function getAvailableBalance() {
    if (symbol === config.nativeCurrency.symbol) {
      const newBalance = Number(walletBal) - 0.01;
      if (newBalance <= 0) {
        return 0;
      } else {
        return newBalance;
      }
    } else {
      return walletBal;
    }
  }

  const actualMaxValue =
    isValid(walletBal) && isValid(debt)
      ? bigMin(getAvailableBalance(), Big(debt).times(1.01).toNumber()).toFixed()
      : '0';
  const shownMaxValue =
    isValid(walletBal) && isValid(debt)
      ? bigMin(getAvailableBalance(), debt).toFixed(decimals)
      : Big('0').toFixed(decimals);

  const updateNewHealthFactor = debounce((amount: any) => {
    updateState({ newHealthFactor: '-' });
    const newHealthFactor = formatHealthFactor(calcHealthFactor('REPAY', symbol, amount));
    console.log('REPAY updateNewHealthFactor', symbol, state.amount, newHealthFactor);
    updateState({ newHealthFactor });
  }, 1000);

  const changeValue = (value: any) => {
    let amountInUSD = '0.00';
    // if (Number(value) > Number(shownMaxValue)) {
    //   value = shownMaxValue;
    // }
    if (Number(value) < 0) {
      value = '0';
    }
    if (isValid(value)) {
      amountInUSD = Big(value).mul(getPrice(symbol, prices)).toFixed(2, ROUND_DOWN);
    }
    updateState({ amount: value, amountInUSD });

    updateNewHealthFactor(value);
  };

  function getNonce(tokenAddress: any, userAddress: any) {
    const token = new ethers.Contract(tokenAddress, config.erc20Abi, provider.getSigner());

    return token.nonces(userAddress).then((nonce: any) => nonce.toNumber());
  }

  function getAllowance() {
    const tokenAddress = underlyingAsset;
    provider
      .getSigner()
      .getAddress()
      .then((userAddress: any) => {
        const token = new ethers.Contract(tokenAddress, config.erc20Abi, provider.getSigner());
        token
          .allowance(userAddress, config.aavePoolV3Address)
          .then((allowanceAmount: any) => allowanceAmount.toString())
          .then((allowanceAmount: any) => {
            updateState({
              allowanceAmount: Big(allowanceAmount).div(Big(10).pow(decimals)).toFixed()
            });
          });
      });
  }

  function repayFromApproval(amount: any) {
    const tokenAddress = underlyingAsset;
    const pool = new ethers.Contract(config.aavePoolV3Address, config.aavePoolV3ABI, provider.getSigner());

    return provider
      .getSigner()
      .getAddress()
      .then((userAddress: any) => {
        return pool['repay(address,uint256,uint256,address)'](
          tokenAddress,
          amount,
          2, // variable interest rate
          userAddress
        );
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
   * @param {*} rawSig signature from signERC20Approval
   * @param {string} address user address
   * @param {string} asset asset address (e.g. USDT)
   * @param {string} amount repay amount in full decimals
   * @param {number} deadline UNIX timestamp in SECONDS
   * @returns
   */
  function repayERC20(shownAmount: any, actualAmount: any) {
    updateState({
      loading: true
    });
    const asset = underlyingAsset;
    const deadline = Math.floor(Date.now() / 1000 + 3600); // after an hour
    provider
      .getSigner()
      .getAddress()
      .then((address: any) => {
        if (!supportPermit) {
          repayFromApproval(actualAmount)
            .then((tx: any) => {
              tx.wait()
                .then((res: any) => {
                  const { status, transactionHash } = res;
                  if (status === 1) {
                    onRequestClose();
                    formatAddAction(Big(actualAmount).div(Big(10).pow(decimals)).toFixed(8), status, transactionHash);
                    onActionSuccess({
                      msg: `You repaid ${parseFloat(Big(shownAmount).toFixed(8))} ${symbol}`,
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
                .finally(() => updateState({ loading: false }));
            })
            .catch(() => updateState({ loading: false }));
        } else {
          return signERC20Approval(address, asset, tokenName, actualAmount, deadline)
            .then((rawSig: any) => {
              const sig = ethers.utils.splitSignature(rawSig);
              const pool = new ethers.Contract(config.aavePoolV3Address, config.aavePoolV3ABI, provider.getSigner());

              return pool['repayWithPermit(address,uint256,uint256,address,uint256,uint8,bytes32,bytes32)'](
                asset,
                actualAmount,
                2, // variable interest rate
                address,
                deadline,
                sig.v,
                sig.r,
                sig.s
              ).then((tx: any) => {
                tx.wait()
                  .then((res: any) => {
                    const { status, transactionHash } = res;
                    if (status === 1) {
                      onRequestClose();
                      formatAddAction(Big(actualAmount).div(Big(10).pow(decimals)).toFixed(8), status, transactionHash);
                      onActionSuccess({
                        msg: `You repaid ${parseFloat(Big(shownAmount).toFixed(8))} ${symbol}`,
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
                  .finally(() => updateState({ loading: false }));
              });
            })
            .catch(() => updateState({ loading: false }));
        }
      })
      .catch(() => updateState({ loading: false }));
  }

  function repayETH(shownAmount: any, actualAmount: any) {
    updateState({ loading: true });
    const wrappedTokenGateway = new ethers.Contract(
      config.wrappedTokenGatewayV3Address,
      config.wrappedTokenGatewayV3ABI,
      provider.getSigner()
    );

    provider
      .getSigner()
      .getAddress()
      .then((address: any) => {
        wrappedTokenGateway
          .repayETH(
            config.aavePoolV3Address,
            actualAmount,
            2, // variable interest rate
            address,
            {
              value: actualAmount
            }
          )
          .then((tx: any) => {
            tx.wait()
              .then((res: any) => {
                const { status, transactionHash } = res;
                if (status === 1) {
                  onRequestClose();
                  formatAddAction(
                    parseFloat(Big(shownAmount).div(Big(10).pow(decimals)).toFixed(8)),
                    status,
                    transactionHash
                  );
                  onActionSuccess({
                    msg: `You repaid ${parseFloat(Big(shownAmount).toFixed(8))} ${symbol}`,
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
              .finally(() => updateState({ loading: false }));
          })
          .catch((err: any) => {
            console.log(err, 'err');
          });
      })
      .catch((err: any) => {
        console.log(err, 'err');
      });
  }
  function transferToNumber(inputNumber: any) {
    if (isNaN(inputNumber)) {
      return inputNumber;
    }
    inputNumber = '' + inputNumber;
    inputNumber = parseFloat(inputNumber);
    const eformat = inputNumber.toExponential();
    const tmpArray = eformat.match(/\d(?:\.(\d*))?e([+-]\d+)/);
    const number = inputNumber.toFixed(Math.max(0, (tmpArray[1] || '').length - tmpArray[2]));
    return number;
  }

  if (!data) {
    return <div />;
  }

  const disabled = !state.amount || !isValid(state.amount) || Number(state.amount) === 0;

  return (
    <BaseModal title={`Repay ${symbol}`} onRequestClose={onRequestClose} from={from} config={config}>
      <RepayContainer>
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
              Wallet balance:
              <Max
                onClick={() => {
                  const _value = transferToNumber(parseFloat(shownMaxValue));
                  changeValue(_value);
                }}
              >
                {unifyNumber(walletBal)}
              </Max>
            </GrayTexture>
          </FlexBetween>
        </RoundedCard>
        <RoundedCard title="Transaction Overview">
          <TransactionOverviewContainer>
            <FlexBetween>
              <PurpleTexture>Remaining Debt</PurpleTexture>
              <div style={{ textAlign: 'right' }}>
                <WhiteTexture>
                  {unifyNumber(debt) + ` ${symbol}`}→
                  {isValid(state.amount)
                    ? unifyNumber(Big(debt).minus(state.amount).toFixed()) + ` ${symbol}`
                    : `- ${symbol}`}
                </WhiteTexture>
                <WhiteTexture>
                  ${unifyNumber(debtInUSD)}→
                  {isValid(state.amount) && isValid(getPrice(symbol, prices))
                    ? '$ ' + Big(debt).minus(state.amount).times(getPrice(symbol, prices)).toFixed(2)
                    : '$ -'}
                </WhiteTexture>
              </div>
            </FlexBetween>
            <FlexBetween>
              <PurpleTexture>Health Factor</PurpleTexture>
              <div style={{ textAlign: 'right' }}>
                <PurpleTexture>
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
              const amount = Big(state.amount).mul(1.2).mul(Big(10).pow(decimals)).toFixed(0);
              approve(amount)
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
                    .catch(() => updateState({ loading: false }))
                    .finally(() => updateState({ loading: false }));
                })
                .catch((error: any) => {
                  console.log(error, 'error');
                });
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
              const actualAmount = Big(state.amount === shownMaxValue ? actualMaxValue : state.amount)
                .mul(Big(10).pow(decimals))
                .toFixed(0);
              const shownAmount = state.amount;
              if (symbol === config.nativeCurrency.symbol) {
                repayETH(shownAmount, actualAmount);
              } else {
                repayERC20(shownAmount, actualAmount);
              }
            }}
          >
            Repay {symbol}
          </PrimaryButton>
        )}
      </RepayContainer>
    </BaseModal>
  );
};

export default RepayModal;
