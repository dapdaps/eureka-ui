import { styled } from "styled-components";

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

const RepayModal = (props: any) => {
  State.init({
    amount: '',
    amountInUSD: '0.00',
    loading: false,
    newHealthFactor: '-',
    gas: '-',
    allowanceAmount: '0',
    needApprove: false,
  });

  const walletBal = assetsToSupply.find((item) => item.symbol === data.symbol).balance;
  function updateGas() {
    if (symbol === config.nativeCurrency.symbol) {
      repayETHGas().then((value) => {
        State.update({ gas: value });
      });
    } else {
      repayERC20Gas().then((value) => {
        State.update({ gas: value });
      });
    }
  }

  updateGas();
  function formatAddAction(_amount, status, transactionHash) {
    addAction?.({
      type: 'Lending',
      action: 'Repay',
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
  function bigMin(_a, _b) {
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

  /**
   *
   * @param {string} chainId
   * @param {string} address user address
   * @param {string} asset asset address
   * @param {string} action 'deposit' | 'withdraw' | 'borrow' | 'repay'
   * @param {string} amount amount in USD with 2 fixed decimals
   * @returns
   */
  function getNewHealthFactor(chainId, address, asset, action, amount) {
    const url = `${config.AAVE_API_BASE_URL}/${chainId}/health/${address}`;
    return asyncFetch(`${url}?asset=${asset}&action=${action}&amount=${amount}`);
  }

  function debounce(fn, wait) {
    let timer = state.timer;
    return () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        fn();
      }, wait);
      State.update({ timer });
    };
  }

  const updateNewHealthFactor = debounce(() => {
    State.update({ newHealthFactor: '-' });
    const newHealthFactor = formatHealthFactor(calcHealthFactor('REPAY', symbol, state.amount));
    console.log('REPAY updateNewHealthFactor', symbol, state.amount, newHealthFactor);
    State.update({ newHealthFactor });
  }, 1000);

  const changeValue = (value) => {
    let amountInUSD = '0.00';
    // if (Number(value) > Number(shownMaxValue)) {
    //   value = shownMaxValue;
    // }
    if (Number(value) < 0) {
      value = '0';
    }
    if (isValid(value)) {
      amountInUSD = Big(value)
        .mul(prices[symbol] || 1)
        .toFixed(2, ROUND_DOWN);
    }
    State.update({ amount: value, amountInUSD });

    updateNewHealthFactor();
  };

  function getNonce(tokenAddress, userAddress) {
    const token = new ethers.Contract(tokenAddress, config.erc20Abi.body, Ethers.provider().getSigner());

    return token.nonces(userAddress).then((nonce) => nonce.toNumber());
  }

  function getAllowance() {
    const tokenAddress = underlyingAsset;
    Ethers.provider()
      .getSigner()
      .getAddress()
      .then((userAddress) => {
        const token = new ethers.Contract(tokenAddress, config.erc20Abi.body, Ethers.provider().getSigner());
        token
          .allowance(userAddress, config.aavePoolV3Address)
          .then((allowanceAmount) => allowanceAmount.toString())
          .then((allowanceAmount) => {
            State.update({
              allowanceAmount: Big(allowanceAmount).div(Big(10).pow(decimals)).toFixed(),
            });
          });
      });
  }
  getAllowance();

  function repayFromApproval(amount) {
    const tokenAddress = underlyingAsset;
    const pool = new ethers.Contract(
      config.aavePoolV3Address,
      config.aavePoolV3ABI.body,
      Ethers.provider().getSigner(),
    );

    return Ethers.provider()
      .getSigner()
      .getAddress()
      .then((userAddress) => {
        return pool['repay(address,uint256,uint256,address)'](
          tokenAddress,
          amount,
          2, // variable interest rate
          userAddress,
        );
      });
  }

  function approve(amount) {
    const tokenAddress = underlyingAsset;
    const token = new ethers.Contract(tokenAddress, config.erc20Abi.body, Ethers.provider().getSigner());
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
      State.update({ needApprove: true });
    } else {
      State.update({ needApprove: false });
    }
  }
  update();

  /**
   *
   * @param {string} user user address
   * @param {string} reserve AAVE reserve address (token to supply)
   * @param {string} tokenName token name
   * @param {string} amount token amount in full decimals
   * @param {number} deadline unix timestamp in SECONDS
   * @returns raw signature string will could be used in supplyWithPermit
   */
  function signERC20Approval(user, reserve, tokenName, amount, deadline) {
    return getNonce(reserve, user).then((nonce) => {
      const typeData = {
        types: {
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
          ],
          Permit: [
            { name: 'owner', type: 'address' },
            { name: 'spender', type: 'address' },
            { name: 'value', type: 'uint256' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' },
          ],
        },
        primaryType: 'Permit',
        domain: {
          name: tokenName,
          version: '1',
          chainId,
          verifyingContract: reserve,
        },
        message: {
          owner: user,
          spender: config.aavePoolV3Address,
          value: amount,
          nonce,
          deadline,
        },
      };

      const dataToSign = JSON.stringify(typeData);

      return Ethers.provider().send('eth_signTypedData_v4', [user, dataToSign]);
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
  function repayERC20(shownAmount, actualAmount) {
    State.update({
      loading: true,
    });
    const asset = underlyingAsset;
    const deadline = Math.floor(Date.now() / 1000 + 3600); // after an hour
    Ethers.provider()
      .getSigner()
      .getAddress()
      .then((address) => {
        if (!supportPermit) {
          repayFromApproval(actualAmount)
            .then((tx) => {
              tx.wait()
                .then((res) => {
                  const { status, transactionHash } = res;
                  if (status === 1) {
                    formatAddAction(
                      parseFloat(Big(actualAmount).div(Big(10).pow(decimals)).toFixed(8)),
                      status,
                      transactionHash,
                    );
                    onActionSuccess({
                      msg: `You repaid ${parseFloat(Big(shownAmount).toFixed(8))} ${symbol}`,
                      callback: () => {
                        onRequestClose();
                        State.update({
                          loading: false,
                        });
                      },
                    });
                    console.log('tx succeeded', res);
                  } else {
                    State.update({
                      loading: false,
                    });
                    console.log('tx failed', res);
                  }
                })
                .catch(() => State.update({ loading: false }));
            })
            .catch(() => State.update({ loading: false }));
        } else {
          return signERC20Approval(address, asset, tokenName, actualAmount, deadline)
            .then((rawSig) => {
              const sig = ethers.utils.splitSignature(rawSig);
              const pool = new ethers.Contract(
                config.aavePoolV3Address,
                config.aavePoolV3ABI.body,
                Ethers.provider().getSigner(),
              );

              return pool['repayWithPermit(address,uint256,uint256,address,uint256,uint8,bytes32,bytes32)'](
                asset,
                actualAmount,
                2, // variable interest rate
                address,
                deadline,
                sig.v,
                sig.r,
                sig.s,
              ).then((tx) => {
                tx.wait()
                  .then((res) => {
                    const { status, transactionHash } = res;
                    if (status === 1) {
                      formatAddAction(
                        parseFloat(Big(actualAmount).div(Big(10).pow(decimals)).toFixed(8)),
                        status,
                        transactionHash,
                      );
                      onActionSuccess({
                        msg: `You repaid ${parseFloat(Big(shownAmount).toFixed(8))} ${symbol}`,
                        callback: () => {
                          onRequestClose();
                          State.update({
                            loading: false,
                          });
                        },
                      });
                      console.log('tx succeeded', res);
                    } else {
                      State.update({
                        loading: false,
                      });
                      console.log('tx failed', res);
                    }
                  })
                  .catch(() => State.update({ loading: false }));
              });
            })
            .catch(() => State.update({ loading: false }));
        }
      })
      .catch(() => State.update({ loading: false }));
  }

  function repayETH(shownAmount, actualAmount) {
    State.update({ loading: true });
    const wrappedTokenGateway = new ethers.Contract(
      config.wrappedTokenGatewayV3Address,
      config.wrappedTokenGatewayV3ABI.body,
      Ethers.provider().getSigner(),
    );

    Ethers.provider()
      .getSigner()
      .getAddress()
      .then((address) => {
        wrappedTokenGateway
          .repayETH(
            config.aavePoolV3Address,
            actualAmount,
            2, // variable interest rate
            address,
            {
              value: actualAmount,
            },
          )
          .then((tx) => {
            tx.wait()
              .then((res) => {
                const { status, transactionHash } = res;
                if (status === 1) {
                  formatAddAction(
                    parseFloat(Big(shownAmount).div(Big(10).pow(decimals)).toFixed(8)),
                    status,
                    transactionHash,
                  );
                  onActionSuccess({
                    msg: `You repaid ${parseFloat(Big(shownAmount).toFixed(8))} ${symbol}`,
                    callback: () => {
                      onRequestClose();
                      State.update({
                        loading: false,
                      });
                    },
                  });
                  console.log('tx succeeded', res);
                } else {
                  State.update({
                    loading: false,
                  });
                  console.log('tx failed', res);
                }
              })
              .catch(() => State.update({ loading: false }));
          })
          .catch(() => State.update({ loading: false }));
      })
      .catch(() => State.update({ loading: false }));
  }
  function transferToNumber(inputNumber) {
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

  const {
    config,
    data,
    assetsToSupply,
    onRequestClose,
    onActionSuccess,
    chainId,
    onlyOneBorrow,
    repayETHGas,
    repayERC20Gas,
    formatHealthFactor,
    calcHealthFactor,
    theme,
    addAction,
    dexConfig,
    prices,
    from,
    unifyNumber,
  } = props;

  if (!data) {
    return <div />;
  }

  const ROUND_DOWN = 0;
  function isValid(a) {
    if (!a) return false;
    if (isNaN(Number(a))) return false;
    if (a === '') return false;
    return true;
  }

  const {
    symbol,

    healthFactor,
    decimals,
    underlyingAsset,
    name: tokenName,
    supportPermit,
    debt,
    debtInUSD,
  } = data;

  const disabled = !state.amount || !isValid(state.amount) || Number(state.amount) === 0;

  return (
    <Widget
      src={`${config.ownerId}/widget/AAVE.Modal.BaseModal`}
      props={{
        title: `Repay ${symbol}`,
        onRequestClose: onRequestClose,
        from,
        children: (
          <RepayContainer>
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
                        left: <PurpleTexture>Remaining Debt</PurpleTexture>,
                        right: (
                          <div style={{ textAlign: 'right' }}>
                            <WhiteTexture>
                              {unifyNumber(debt) + ` ${symbol}`}→
                              {isValid(state.amount)
                                ? unifyNumber(Big(debt).minus(state.amount).toFixed()) + ` ${symbol}`
                                : `- ${symbol}`}
                            </WhiteTexture>
                            <WhiteTexture>
                              ${unifyNumber(debtInUSD)}→
                              {isValid(state.amount) && isValid(prices[symbol] || 1)
                                ? '$ ' +
                                  Big(debt)
                                    .minus(state.amount)
                                    .times(prices[symbol] || 1)
                                    .toFixed(2)
                                : '$ -'}
                            </WhiteTexture>
                          </div>
                        ),
                      }}
                    />

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
                  </TransactionOverviewContainer>
                ),
              }}
            />
            {/* <Widget
                  src={`${config.ownerId}/widget/AAVE.GasEstimation`}
                  props={{ gas: state.gas, config }}
                /> */}
            {state.needApprove && (
              <Widget
                src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
                props={{
                  config,
                  theme,
                  loading: state.loading,
                  children: `Approve ${symbol}`,
                  disabled,
                  onClick: () => {
                    State.update({
                      loading: true,
                    });
                    const amount = Big(state.amount).mul(1.2).mul(Big(10).pow(decimals)).toFixed(0);
                    approve(amount)
                      .then((tx) => {
                        tx.wait()
                          .then((res) => {
                            const { status } = res;
                            if (status === 1) {
                              State.update({
                                needApprove: false,
                                loading: false,
                              });
                            } else {
                              console.log('tx failed', res);
                              State.update({
                                loading: false,
                              });
                            }
                          })
                          .catch(() => State.update({ loading: false }));
                      })
                      .catch(() => State.update({ loading: false }));
                  },
                }}
              />
            )}
            {!state.needApprove && (
              <Widget
                src={`${config.ownerId}/widget/AAVE.PrimaryButton`}
                props={{
                  config,
                  theme,
                  children: `Repay ${symbol}`,
                  loading: state.loading,
                  disabled,
                  onClick: () => {
                    const actualAmount = Big(state.amount === shownMaxValue ? actualMaxValue : state.amount)
                      .mul(Big(10).pow(decimals))
                      .toFixed(0);
                    const shownAmount = state.amount;
                    if (symbol === config.nativeCurrency.symbol) {
                      repayETH(shownAmount, actualAmount);
                    } else {
                      repayERC20(shownAmount, actualAmount);
                    }
                  },
                }}
              />
            )}
          </RepayContainer>
        ),
        config,
      }}
    />
  );
};

export default RepayModal;
