// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';
import styled from 'styled-components';

import Balance from '@/modules/components/Balance';
import Select from '@/modules/components/Select';
import { useMultiState } from '@/modules/hooks';
import LiquidityLoading from '@/modules/liquidity/Bridge/Loading';
import { formatValueDecimal } from '@/utils/formate';

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
} from '../styles';
import Button from './Button';
import SwitchBtn from './SwitchBtn';
import Wrap from './Wrap';
const ABI = [
  {
    inputs: [
      { internalType: 'uint256', name: '_shares', type: 'uint256' },
      { internalType: 'uint256', name: '_amount0Max', type: 'uint256' },
      { internalType: 'uint256', name: '_amount1Max', type: 'uint256' }
    ],
    name: 'deposit',
    outputs: [
      {
        internalType: 'uint256',
        name: 'depositedAmount0',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'depositedAmount1',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_shares', type: 'uint256' },
      { internalType: 'uint256', name: '_amount0Min', type: 'uint256' },
      { internalType: 'uint256', name: '_amount1Min', type: 'uint256' }
    ],
    name: 'withdraw',
    outputs: [
      {
        internalType: 'uint256',
        name: 'withdrawnAmount0',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'withdrawnAmount1',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
const { formatUnits, parseUnits } = ethers.utils;
export default memo(function Detail(props) {
  const {
    account,
    provider,
    data,
    toast,
    prices,
    addresses,
    defaultDex,
    addAction,
    userPositions,
    ICON_VAULT_MAP,
    onSuccess
  } = props;
  const defaultDeposit = props.tab === 'deposit' || !props.tab;
  const curPositionUSD = userPositions && userPositions[data.vaultAddress]?.balanceUSD;
  const { vaultAddress, token0, token1, decimals0, decimals1, totalAmount0, totalAmount1, totalSupply } = data;
  const [state, updateState] = useMultiState({
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
    showPairs: false,
    updater: 0
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
  const isInSufficient = Number(amount0) > Number(balances[token0]) || Number(amount1) > Number(balances[token1]);
  const isWithdrawInsufficient = Number(lpAmount) > Number(lpBalance);
  const balance0 = !amount0 || !prices?.[token0] ? '-' : parseFloat(Big(amount0).times(prices[token0]).toFixed(4));

  const balance1 = !amount1 || !prices?.[token1] ? '-' : parseFloat(Big(amount1).times(prices[token1]).toFixed(4));
  const balanceLp =
    !lpAmount || !lpBalance || !curPositionUSD
      ? '-'
      : parseFloat(
          Big(lpAmount)
            .div(Big(lpBalance).gt(0) ? lpBalance : 1)
            .times(curPositionUSD)
            .toFixed(4)
        );
  const getFromDepositAmount = (depositAmount, tokenDecimal) => {
    const a = new Big(depositAmount[0].toString());
    const b = new Big(depositAmount[1].toString());

    if (a.eq(0) && b.eq(0)) return '0';

    let diff;
    let midpoint;
    if (a.gt(b)) {
      diff = a.minus(b);
      midpoint = diff.div(new Big(2)).plus(b);
    } else {
      diff = b.minus(a);
      midpoint = diff.div(new Big(2)).plus(a);
    }

    for (let i = tokenDecimal; i > 0; i--) {
      const midpointFixed = midpoint.div(new Big(10).pow(tokenDecimal)).toFixed(i);
      if (a.div(Big(10).pow(tokenDecimal)).lte(midpointFixed) && b.div(Big(10).pow(tokenDecimal)).gte(midpointFixed)) {
        return midpointFixed;
      }
    }

    return '0';
  };
  function isValid(a) {
    if (!a) return false;
    if (isNaN(Number(a))) return false;
    if (a === '') return false;
    return true;
  }
  function calcAmount1(_amount0Input) {
    if (!isValid(_amount0Input)) return 0;
    const _amount1 = Big(formatUnits(totalAmount1, decimals1))
      .div(formatUnits(totalAmount0, decimals0))
      .times(_amount0Input)
      .toFixed(decimals1, 0);
    return _amount1;
  }
  function calcAmount0(_amount1Input) {
    if (!isValid(_amount1Input)) return 0;
    const _amount0 = Big(formatUnits(totalAmount0, decimals0))
      .div(formatUnits(totalAmount1, decimals1))
      .times(_amount1Input)
      .toFixed(decimals0, 0);
    return _amount0;
  }
  function calcShares(_amount0Input) {
    if (!isValid(_amount0Input)) return 0;
    const _shares = Big(_amount0Input).times(totalSupply).div(totalAmount0).div(Math.pow(10, 12)).toFixed(4, 0);
    return _shares;
  }
  function calcShareToTokens(_shares) {
    const _token0 = Big(_shares).times(Math.pow(10, 12)).times(totalAmount0).div(totalSupply).times(0.99).toString();
    const _token1 = Big(_shares).times(Math.pow(10, 12)).times(totalAmount1).div(totalSupply).times(0.99).toString();
    console.log('sharesToToken--', _token0, _token1);
    return { _token0, _token1 };
  }
  const updateLPBalance = () => {
    console.log('updateLPBalance--');
    const abi = ['function balanceOf(address) view returns (uint256)'];
    const vaultContract = new ethers.Contract(vaultAddress, abi, provider);
    vaultContract.balanceOf(account).then((balanceBig) => {
      const adjustedBalance = formatUnits(balanceBig, 18);
      updateState({
        lpBalance: adjustedBalance
      });
    });
  };
  const updateBalance = (token) => {
    console.log('updateBalance--');
    const { address, decimals, symbol } = token;
    if (symbol === 'ETH') {
      provider.getBalance(account).then((balanceBig) => {
        const adjustedBalance = ethers.utils.formatEther(balanceBig);
        sourceBalances[symbol] = adjustedBalance;
        updateState({
          balances: sourceBalances
        });
      });
    } else {
      const erc20Abi = ['function balanceOf(address) view returns (uint256)'];
      const tokenContract = new ethers.Contract(address, erc20Abi, provider);
      tokenContract
        .balanceOf(account)
        .then((balanceBig) => {
          const adjustedBalance = Big(ethers.utils.formatUnits(balanceBig, decimals)).toFixed();
          sourceBalances[symbol] = adjustedBalance;
          updateState({
            balances: sourceBalances
          });
        })
        .catch((error) => {
          console.log('error: ', error);
          setTimeout(() => {
            updateBalance(token);
          }, 1500);
        });
    }
  };
  const checkApproval = (token0Amount, token1Amount) => {
    const token0Wei = parseUnits(Big(token0Amount).toFixed(decimals0), decimals0);
    const token1Wei = parseUnits(Big(token1Amount).toFixed(decimals1), decimals1);

    const abi = ['function allowance(address, address) external view returns (uint256)'];

    const token0Contract = new ethers.Contract(addresses[token0], abi, provider);

    token0Contract
      .allowance(account, vaultAddress)
      .then((allowance0) => {
        updateState({
          isToken0Approved: !new Big(allowance0.toString()).lt(token0Wei)
        });
      })
      .catch((e) => console.log(e));

    const token1Contract = new ethers.Contract(addresses[token1], abi, provider);

    token1Contract
      .allowance(account, vaultAddress)
      .then((allowance1) => {
        updateState({
          isToken1Approved: !new Big(allowance1.toString()).lt(token1Wei)
        });
      })
      .catch((e) => console.log(e));
  };
  const changeMode = (isDeposit) => {
    updateState({ isDeposit });
  };

  const handleMax = (isToken0) => {
    if (isToken0) handleToken0Change(balances[token0]);
    else handleToken1Change(balances[token1]);
  };
  const handleToken0Change = (amount) => {
    updateState({ amount0: amount });
    if (Number(amount) === 0) {
      updateState({
        amount1: '',
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

    const amount1 = calcAmount1(amount);
    updateState({ amount1 });
    updateState({ isLoading: false });
    checkApproval(amount, amount1);
  };

  const handleToken1Change = (amount) => {
    updateState({ amount1: amount });

    if (Number(amount) === 0) {
      updateState({
        amount0: '',
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

    const amount0 = calcAmount0(amount);
    updateState({ amount0 });
    updateState({ isLoading: false });
    checkApproval(amount0, amount);
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

    const tokenWei = parseUnits(amount, isToken0 ? decimals0 : decimals1);

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
          // text: `Approve ${amount} ${_token}`,
          tx: receipt.transactionHash,
          chainId: props.chainId
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

    const token0Wei = parseUnits(Big(Math.ceil(amount0)).toFixed(decimals0), decimals0);
    const token1Wei = parseUnits(Big(Math.ceil(amount1)).toFixed(decimals1), decimals1);
    const _shares = parseUnits(calcShares(amount0));

    const depositContract = new ethers.Contract(vaultAddress, ABI, provider.getSigner());
    depositContract
      .deposit(_shares, token0Wei, token1Wei, {
        gasLimit: 4000000
      })
      .then((tx) => {
        return tx.wait();
      })
      .then((receipt) => {
        const { status, transactionHash } = receipt;

        addAction?.({
          type: 'Liquidity',
          action: 'Add Liquidity',
          token0,
          token1,
          extra_data: JSON.stringify({
            amount0,
            amount1,
            action: 'Add Liquidity',
            type: 'univ3'
          }),
          template: defaultDex,
          status,
          add: false,
          transactionHash
        });

        updateState({
          amount0: '',
          amount1: '',
          isLoading: false,
          isPostTx: true,
          updater: new Date().getTime()
        });

        setTimeout(() => updateState({ isPostTx: false }), 10_000);

        toast?.dismiss(toastId);
        toast?.success({
          title: 'Deposit Successfully!'
        });
        onSuccess?.();
      })
      .catch((error) => {
        console.log('error: ', error);
        updateState({
          isError: true,
          isLoading: false,
          loadingMsg: error
        });
        toast?.dismiss(toastId);
        toast?.fail({
          title: 'Deposit Failed!',
          text: error?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : (error?.message ?? '')
        });
      });
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

    const lpWeiAmount = parseUnits(Big(lpAmount).toFixed(18));
    const { _token0, _token1 } = calcShareToTokens(lpAmount);
    const token0Amount = parseUnits(Big(_token0).toFixed(decimals0), decimals0);
    const token1Amount = parseUnits(Big(_token1).toFixed(decimals1), decimals1);
    const withdrawContract = new ethers.Contract(vaultAddress, ABI, provider.getSigner());

    withdrawContract
      .withdraw(lpWeiAmount, token0Amount, token1Amount, {
        gasLimit: 4000000
      })
      .then((tx) => {
        return tx.wait();
      })
      .then((receipt) => {
        updateState({
          lpAmount: '',
          isLoading: false,
          isPostTx: true,
          updater: new Date().getTime()
        });

        const { status, transactionHash } = receipt;

        const _params = {
          type: 'Liquidity',
          action: 'Withdraw',
          token0,
          token1,
          amount: lpAmount,
          template: defaultDex,
          status,
          add: 0,
          transactionHash,
          chain_id: props.chainId,
          extra_data: JSON.stringify({
            action: 'Withdraw',
            amount0: formatUnits(token0Amount, decimals0),
            amount1: formatUnits(token1Amount, decimals1)
          })
        };
        console.log('_params--', _params);
        addAction?.(_params);

        setTimeout(() => updateState({ isPostTx: false }), 10_000);

        toast?.dismiss(toastId);
        toast?.success({
          title: 'Withdraw Successfully!'
        });
        onSuccess?.();
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
          text: error?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : (error?.message ?? '')
        });
      });
  };
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
  const handleGetBalance = function () {
    [
      { symbol: token0, address: addresses[token0], decimals: decimals0 },
      { symbol: token1, address: addresses[token1], decimals: decimals1 }
    ].map(updateBalance);
    updateLPBalance();
    if (detailLoading) {
      // setTimeout(() => {
      //   handleGetBalance()
      // }, 1500)
    }
  };

  useEffect(() => {
    if (amount0) {
      handleToken0Change(amount0);
    }
  }, [data]);

  useEffect(() => {
    if (!account || !token0 || !token1) return;
    handleGetBalance();
  }, [account, token0, token1, state.updater]);
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
          <LiquidityLoading color="#999" />
        </div>
      ) : (
        <>
          {isDeposit ? (
            <>
              <Row className="price-input">
                <Column>
                  <InputWrap className={Number(amount0) > Number(balances[token0]) ? 'inSufficient' : ''}>
                    <Input value={amount0} type="number" onChange={(e) => handleToken0Change(e.target.value)} />
                    <InputSuffix>
                      <img src={ICON_VAULT_MAP[token0]} alt={token0} />
                      <span>{token0}</span>
                    </InputSuffix>
                  </InputWrap>
                  <PriceWrap>
                    <TotalPrice>${balance0}</TotalPrice>
                    <BalancePrice>
                      Balance:
                      <span onClick={() => handleMax(true)}>{Big(balances[token0] ?? 0).toFixed(6)}</span> {token0}
                    </BalancePrice>
                  </PriceWrap>
                </Column>
                <Column>
                  <InputWrap className={Number(amount1) > Number(balances[token1]) ? 'inSufficient' : ''}>
                    <Input value={amount1} type="number" onChange={(e) => handleToken1Change(e.target.value)} />
                    <InputSuffix>
                      <img src={ICON_VAULT_MAP[token1]} alt={token1} />
                      <span>{token1}</span>
                    </InputSuffix>
                  </InputWrap>
                  <PriceWrap>
                    <TotalPrice>${balance1}</TotalPrice>
                    <BalancePrice>
                      Balance:
                      <span onClick={() => handleMax(false)}>{Big(balances[token1] ?? 0).toFixed(6)}</span> {token1}
                    </BalancePrice>
                  </PriceWrap>
                </Column>
              </Row>
              <StyledButtonList>
                {isInSufficient && <StyledButton disabled>InSufficient Balance</StyledButton>}
                {!isInSufficient &&
                  (isToken0Approved && isToken1Approved && !isToken0Approving && !isToken1Approving ? (
                    <StyledButton disabled={isLoading || !amount0 || !amount1} onClick={handleDeposit}>
                      {isLoading ? <LiquidityLoading /> : 'Deposit'}
                    </StyledButton>
                  ) : (
                    <>
                      <StyledButton
                        disabled={isToken0Approved || isToken0Approving}
                        onClick={() => handleApprove(true)}
                      >
                        {isToken0Approving ? (
                          <LiquidityLoading />
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
                          <LiquidityLoading />
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
                    <TotalPrice>{/* ${balanceLp} */}</TotalPrice>
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
                      >
                        {Number(lpBalance).toFixed(6)}
                      </span>
                      Shares
                    </BalancePrice>
                  </PriceWrap>
                </Column>
              </Row>
              <StyledButtonList>
                <StyledButton
                  disabled={isWithdrawInsufficient || isLoading || Number(lpAmount) <= 0}
                  onClick={handleWithdraw}
                >
                  {isLoading ? (
                    <LiquidityLoading />
                  ) : (
                    <>{isWithdrawInsufficient ? 'InSufficient Balance' : 'Withdraw'}</>
                  )}
                </StyledButton>
              </StyledButtonList>
            </>
          )}
        </>
      )}
    </DetailWrapper>
  );
});
