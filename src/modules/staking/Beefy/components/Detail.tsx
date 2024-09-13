// @ts-nocheck
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

import Balance from '@/modules/components/Balance';
import Select from '@/modules/components/Select';
import { useMultiState } from '@/modules/hooks';
import LiquidityLoading from '@/modules/liquidity/Bridge/Loading';

import {
  BalancePrice,
  Column,
  DetailWrapper,
  FilterButton,
  FilterButtonList,
  InputSuffix,
  InputWrap,
  InputWrapList,
  PriceWrap,
  Row,
  StyledButton,
  StyledButtonList,
  StyledImageList,
  TotalPrice
} from '../styles';

const Panel = styled.div`
  width: 500px;
  margin: 0 auto 20px;
  border-radius: 12px;
  border: 1px solid rgba(55, 58, 83, 1);
  background-color: rgba(46, 49, 66, 1);
  padding: 15px;
  margin-bottom: 20px;
  .title {
    font-size: 14px;
    font-weight: 400;
    line-height: 16.8px;
    color: rgba(151, 154, 190, 1);
  }
  .body {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  .foot {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 400;
    line-height: 14.4px;
    color: rgba(151, 154, 190, 1);
  }
`;
const Input = styled.input`
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  border: none;
  height: 24px;
  width: 300px;
  outline: none;
  background-color: transparent;
  padding: 0;
  &:focus {
    color: #fff;
    background-color: transparent;
    border-color: transparent;
    outline: none;
    box-shadow: none;
  }
`;

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
export default memo(function Detail(props) {
  const { account, provider, data, toast, prices, defaultDex, addAction, userPositions, dexConfig } = props;

  const { formatUnits, parseUnits } = ethers.utils;
  const { tokenList } = dexConfig;
  const defaultDeposit = props.tab === 'deposit' || !props.tab;

  const curPositionUSD = userPositions && userPositions[data.vaultAddress]?.balanceUSD;

  const _options = tokenList.map((item) => ({
    text: item.symbol,
    value: item.symbol,
    icons: [item.icon]
  }));

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
    updater: 0,
    options: _options
  });

  const { vaultAddress, token0, token1, decimals0, decimals1, totalAmount0, totalAmount1, totalSupply } = data;

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

  const detailLoading = false;
  function isValid(a) {
    if (!a) return false;
    if (isNaN(Number(a))) return false;
    if (a === '') return false;
    return true;
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
        const adjustedBalance = formatUnits(balanceBig);
        updateState({
          balances: {
            ...state.balances,
            [symbol]: adjustedBalance
          }
        });
      });
    } else {
      const erc20Abi = ['function balanceOf(address) view returns (uint256)'];
      const tokenContract = new ethers.Contract(address, erc20Abi, provider);
      tokenContract
        .balanceOf(account)
        .then((balanceBig) => {
          const adjustedBalance = Big(formatUnits(balanceBig, decimals)).toFixed();
          updateState({
            balances: {
              ...state.balances,
              [symbol]: adjustedBalance
            }
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

  const handleDeposit = () => {
    const toastId = toast?.loading({
      title: `Depositing...`
    });
    updateState({
      isLoading: true,
      isError: false,
      loadingMsg: 'Depositing...'
    });

    const token0Wei = parseUnits(Big(amount0).times(1.01).toFixed(decimals0), decimals0);
    const token1Wei = parseUnits(Big(amount1).times(1.01).toFixed(decimals1), decimals1);
    const _shares = parseUnits(calcShares(amount0));

    const depositContract = new ethers.Contract(vaultAddress, ABI, provider.getSigner());
    depositContract
      .deposit(_shares, token0Wei, token1Wei)
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
          add: false,
          transactionHash,
          chain_id: props.chainId
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

        addAction?.({
          type: 'Liquidity',
          action: 'Withdraw',
          token0,
          token1,
          amount: lpAmount,
          template: defaultDex,
          status: status,
          add: false,
          transactionHash,
          chain_id: state.chainId
        });

        setTimeout(() => updateState({ isPostTx: false }), 10_000);

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
          text: error?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : (error?.message ?? '')
        });
      });
  };

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
          <Panel>
            <div className="title"></div>
            <div className="body">
              <Input
                type="text"
                placeholder="0"
                value={state.stakeAmount}
                onChange={(ev) => {
                  if (isNaN(Number(ev.target.value))) return;
                  let amount = ev.target.value.replace(/\s+/g, '');

                  if (Big(amount || 0).gt(Big(state.tokenBal || 0))) {
                    amount = Big(state.tokenBal || 0).toFixed(4, 0);
                  }
                  updateState({
                    stakeAmount: amount
                  });
                }}
              />

              <Select
                {...{
                  options: state.options,
                  value: state.options.find((obj) => obj.value === state.curToken),
                  onChange: (option) => {
                    console.log('onchange--', option);
                    updateState({
                      curToken: option.value
                    });
                  }
                }}
              />
            </div>
            <div className="foot">
              <div class="prices">
                $
                {Big(state.stakeAmount || 0)
                  .times(Big(prices[state.curToken] || 1))
                  .toFixed(2, 0)}
              </div>
              <div class="balance">
                Balance:
                <Balance
                  {...{
                    value: state.tokenBal,
                    digit: 4
                  }}
                />
              </div>
            </div>
          </Panel>
          <StyledButtonList>
            {isToken0Approved && isToken1Approved && !isToken0Approving && !isToken1Approving ? (
              <StyledButton disabled={isLoading || !amount0 || !amount1} onClick={handleDeposit}>
                {isLoading ? <LiquidityLoading /> : 'Deposit'}
              </StyledButton>
            ) : (
              <>
                <StyledButton disabled={isToken0Approved || isToken0Approving} onClick={() => handleApprove(true)}>
                  {isToken0Approving ? (
                    <LiquidityLoading />
                  ) : (
                    <>
                      {isToken0Approved ? 'Approved' : 'Approve'} {token0}
                    </>
                  )}
                </StyledButton>
                <StyledButton disabled={isToken1Approved || isToken1Approving} onClick={() => handleApprove(false)}>
                  {isToken1Approving ? (
                    <LiquidityLoading />
                  ) : (
                    <>
                      {isToken1Approved ? 'Approved' : 'Approve'} {token1}
                    </>
                  )}
                </StyledButton>
              </>
            )}
          </StyledButtonList>
        </>
      )}
    </DetailWrapper>
  );
});
