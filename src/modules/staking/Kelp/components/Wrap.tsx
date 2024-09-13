// @ts-nocheck
import { ethers } from 'ethers';
import { memo, useEffect } from 'react';
import styled from 'styled-components';

import Loading from '@/modules/components/Loading';
import { useMultiState } from '@/modules/hooks';
import { formatValueDecimal } from '@/utils/formate';
const StyledDialog = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;
const StyledMasker = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;
const StyledWrapContainer = styled.div`
  position: relative;
  width: 420px;
  height: 253px;
  flex-shrink: 0;

  border-radius: 16px;
  border: 1px solid #373a53;
  background: #262836;
  z-index: 999;
`;
const StyledWrapContainerTop = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #373a53;
`;
const StyledClose = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 20px;
  top: 20px;
`;
const StyledWrapContainerTopButton = styled.div`
  position: relative;
  padding: 15px 0 17px;
  flex: 1;
  text-align: center;
  color: #979abe;
  font-family: Gantari;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  cursor: pointer;
  &.active {
    color: #fff;
    &:after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 3px;
      background: #fff;
    }
  }
`;
const StyledWrapContainerBottom = styled.div`
  padding: 30px 20px 0;
`;
const StyledWrapOrUnwrapInput = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #373a53;
  background: #1b1e27;
  height: 71px;
`;
const StyledWrapOrUnwrapInputTop = styled.div`
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledWrapOrUnwrapInputBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StyledWrapOrUnwrapInputTopType = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledWrapOrUnwrapInputTopBalance = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  span {
    color: #fff;
    text-decoration-line: underline;
  }
`;
const StyledWrapOrUnwrapInputBottomInput = styled.input`
  padding: 0;
  border: none;
  outline: none;
  background: transparent;

  color: #fff;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
`;
const StyledWrapOrUnwrapInputBottomSymbol = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const StyledTokenIcon = styled.img`
  width: 20px;
`;
const StyledTokenSymbol = styled.div`
  color: #fff;
  font-family: Gantari;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const StyledWrapOrUnwrapInputBottomInputTxt = styled.div`
  color: #5e617e;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const StyledWrapOrUnwrapButton = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 380px;
  height: 48px;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 8px;
  background-color: #075a5a;
  color: white;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.3;
  }
`;

const WABI = [
  {
    inputs: [
      { internalType: 'address', name: 'asset', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' }
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'asset', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' }
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];
export default memo(function Wrap(props) {
  const [state, updateState] = useMultiState({
    categoryList: ['Wrap', 'Unwrap'],
    categoryIndex: 0,
    wrapAmount: '',
    unwrapAmount: '',
    wrapLoading: false,
    unwrapLoading: false,
    isApproving: false,
    balances: {},
    allowances: {}
  });
  const {
    account,
    provider,
    toast,
    chainId,
    addAction,
    onCloseWrap,
    tokenPairs,
    multicall,
    multicallAddress,
    dexConfig
  } = props;
  const { formatUnits, parseUnits } = ethers.utils;

  const isWrapInSufficient = Number(state?.wrapAmount ?? 0) > Number(state?.balances[tokenPairs[0].symbol] ?? 0);
  const isUnwrapInSufficient = Number(state?.unwrapAmount ?? 0) > Number(state?.balances[tokenPairs[1].symbol] ?? 0);

  function handleQueryBalances() {
    const calls = tokenPairs.map((token) => ({
      address: token.address,
      name: 'balanceOf',
      params: [account]
    }));

    multicall({
      abi: [
        {
          inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
          name: 'balanceOf',
          outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
          stateMutability: 'view',
          type: 'function'
        }
      ],
      calls,
      options: {},
      multicallAddress,
      provider
    })
      .then((res) => {
        console.log('get_wallet_bal_res:', res);
        const _balances = {};
        tokenPairs.forEach((token, i) => {
          const _symbol = token.symbol;
          _balances[_symbol] = res[i] ? formatUnits(res[i][0], token.decimals) : 0;
        });

        updateState({
          balances: _balances
        });
      })
      .catch((err) => {
        console.log('getWalletBalance_error', err);
      });
  }

  function getBatchAllowance() {
    const calls = tokenPairs.map((token) => ({
      address: token.address,
      name: 'allowance',
      params: [account, tokenPairs[1].address]
    }));

    multicall({
      abi: ['function allowance(address owner, address spender) external view returns (uint256)'],
      calls,
      options: {},
      multicallAddress,
      provider
    })
      .then((res) => {
        console.log('get_allowances_res:', res);

        const _allowances = {};
        tokenPairs.forEach((token, i) => {
          const _symbol = token.symbol;
          _allowances[_symbol] = res[i] ? formatUnits(res[i][0], token.decimals) : 0;
        });

        updateState({
          allowances: _allowances
        });
      })
      .catch((err) => {
        console.log('get_allowances_error', err);
      });
  }
  function handleAmountChange(amount) {
    if (Number(amount) < 0) {
      return;
    }
    const keyArray = ['wrapAmount', 'unwrapAmount'];
    if (Number(amount) === 0) {
      updateState({
        [keyArray[state.categoryIndex]]: amount
      });
      return;
    }
    updateState({
      [keyArray[state.categoryIndex]]: amount
    });
  }
  function handleWrap() {
    updateState({
      wrapLoading: true
    });
    const toastId = toast?.loading({
      title: `Wrap ${state.wrapAmount} ${tokenPairs[0].symbol}`
    });

    const contract = new ethers.Contract(tokenPairs[1].address, WABI, provider.getSigner());
    const _amount = parseUnits(state.wrapAmount, tokenPairs[0].decimals);
    const _asset = tokenPairs[0].address;
    contract
      .deposit(_asset, _amount)
      .then((tx) => tx.wait())
      .then((result) => {
        const { status, transactionHash } = result;
        toast?.dismiss(toastId);

        updateState({
          wrapLoading: false
        });
        toast?.success({
          title: 'Wrap Successfully!',
          text: `Wrap ${state.wrapAmount} ${tokenPairs[0].symbol}`,
          tx: transactionHash,
          chainId
        });
        // addAction?.({
        //   type: "Staking",
        //   action: "Wrap",
        //   template: dexConfig?.name,
        //   token0: tokenPairs[0].symbol,
        //   token1: tokenPairs[1].symbol,
        //   amount: state?.wrapAmount,
        //   template: dexConfig.name,
        //   add: true,
        //   status,
        //   transactionHash,
        // });
        handleRefresh();
      })
      .catch((error) => {
        console.log('=error', error);
        updateState({
          wrapLoading: false
        });
        toast?.fail({
          title: 'Wrap Failed!',
          text: error?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : `Wrap ${state.wrapAmount} ${tokenPairs[0].symbol}`
        });
      });
  }
  function handleUnwrap() {
    updateState({
      unwrapLoading: true
    });
    const toastId = toast?.loading({
      title: `Unwrap ${state.wrapAmount} ${tokenPairs[1].symbol}`
    });

    const contract = new ethers.Contract(tokenPairs[1].address, WABI, provider.getSigner());
    const _amount = parseUnits(state.unwrapAmount, tokenPairs[1].decimals);
    const _asset = tokenPairs[0].address;
    contract
      .withdraw(_asset, _amount)
      .then((tx) => tx.wait())
      .then((result) => {
        const { status, transactionHash } = result;
        toast?.dismiss(toastId);

        updateState({
          unwrapLoading: false
        });
        toast?.success({
          title: 'Unwrap Successfully!',
          text: `Unwrap ${state.unwrapAmount} ${tokenPairs[1].symbol}`,
          tx: transactionHash,
          chainId
        });
        handleRefresh();
      })
      .catch((error) => {
        console.log('=error', error);
        updateState({
          unwrapLoading: false
        });
        toast?.fail({
          title: 'Unwrap Failed!',
          text: error?.message?.includes('user rejected transaction')
            ? 'User rejected transaction'
            : `Unwrap ${state.unwrapAmount} ${tokenPairs[1].symbol}`
        });
      });
  }
  function handleApprove(_token, _spender, _amount, _decimals) {
    updateState({
      isApproving: true
    });
    const TokenContract = new ethers.Contract(
      _token,
      [
        {
          inputs: [
            { internalType: 'address', name: 'spender', type: 'address' },
            { internalType: 'uint256', name: 'amount', type: 'uint256' }
          ],
          name: 'approve',
          outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
          stateMutability: 'nonpayable',
          type: 'function'
        }
      ],
      provider.getSigner()
    );
    console.log(`${_token} approve ${_spender} ${_amount} ${_decimals}`);

    TokenContract.approve(_spender, parseUnits(_amount, _decimals))
      .then((tx) => {
        tx.wait()
          .then((res) => {
            const { status, transactionHash } = res;
            console.info('approve_tx_res:', res);
            updateState({
              // isApproved: status === 1,
              isApproving: false
            });
            if (status === 1) {
              toast.success?.({
                title: 'Approve Success!',
                text: `transactionHash ${transactionHash}`
              });
              getBatchAllowance();
            } else {
              toast.fail?.({
                title: 'Approve Failed!',
                text: `transactionHash ${transactionHash}`
              });
            }
          })
          .finally(() => {
            updateState({
              isApproving: false
            });
          });
      })
      .catch((err) => {
        console.info('approve_error: ', err);
        updateState({
          isApproving: false
        });
        toast?.fail({
          title: 'Approve Failed!',
          text: err?.message || ''
        });
      });
  }

  function handleMaxWrap() {
    updateState({
      wrapAmount: state.balances[tokenPairs[0].symbol]
    });
  }
  function handleMaxUnwrap() {
    updateState({
      unwrapAmount: state.balances[tokenPairs[1].symbol]
    });
  }

  function handleRefresh() {
    handleQueryBalances();
    getBatchAllowance();
  }

  useEffect(() => {
    handleRefresh();
  }, []);
  console.log('balance--', state.balances, 'allowances--', state.allowances);
  return (
    <StyledDialog>
      <StyledMasker onClick={onCloseWrap} />
      <StyledWrapContainer>
        <StyledWrapContainerTop>
          {state.categoryList.map((category, index) => (
            <StyledWrapContainerTopButton
              key={index}
              className={state.categoryIndex === index ? 'active' : ''}
              onClick={() => {
                updateState({
                  categoryIndex: index
                });
              }}
            >
              {category}
            </StyledWrapContainerTopButton>
          ))}
          <StyledClose onClick={onCloseWrap}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884124 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882277 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884277 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z"
                fill="#979ABE"
              />
            </svg>
          </StyledClose>
        </StyledWrapContainerTop>
        {state.categoryIndex === 0 ? (
          <StyledWrapContainerBottom>
            <StyledWrapOrUnwrapInput>
              <StyledWrapOrUnwrapInputTop>
                <StyledWrapOrUnwrapInputTopType>Deposit</StyledWrapOrUnwrapInputTopType>
                <StyledWrapOrUnwrapInputTopBalance>
                  Balance:{' '}
                  <span onClick={handleMaxWrap}>{formatValueDecimal(state.balances[tokenPairs[0].symbol], '', 4)}</span>
                </StyledWrapOrUnwrapInputTopBalance>
              </StyledWrapOrUnwrapInputTop>
              <StyledWrapOrUnwrapInputBottom>
                <StyledWrapOrUnwrapInputBottomInput
                  type="number"
                  placeholder="0.0"
                  value={state.wrapAmount}
                  onChange={(event) => handleAmountChange(event.target.value)}
                />
                <StyledWrapOrUnwrapInputBottomSymbol>
                  <StyledTokenIcon src={tokenPairs[0].icon} />
                  <StyledTokenSymbol>{tokenPairs[0].symbol}</StyledTokenSymbol>
                </StyledWrapOrUnwrapInputBottomSymbol>
              </StyledWrapOrUnwrapInputBottom>
            </StyledWrapOrUnwrapInput>
            {isWrapInSufficient ? (
              <StyledWrapOrUnwrapButton disabled>InSufficient Balance</StyledWrapOrUnwrapButton>
            ) : state.wrapLoading || state.isApproving ? (
              <StyledWrapOrUnwrapButton disabled>
                <Loading />
              </StyledWrapOrUnwrapButton>
            ) : state.wrapAmount > state.allowances[tokenPairs[0].symbol] ? (
              <StyledWrapOrUnwrapButton
                onClick={(e) =>
                  handleApprove(tokenPairs[0].address, tokenPairs[1].address, state.wrapAmount, tokenPairs[0].decimals)
                }
              >
                Approve
              </StyledWrapOrUnwrapButton>
            ) : state.wrapAmount > 0 ? (
              <StyledWrapOrUnwrapButton onClick={handleWrap}>Wrap</StyledWrapOrUnwrapButton>
            ) : (
              <StyledWrapOrUnwrapButton disabled>Wrap</StyledWrapOrUnwrapButton>
            )}
          </StyledWrapContainerBottom>
        ) : (
          <StyledWrapContainerBottom>
            <StyledWrapOrUnwrapInput>
              <StyledWrapOrUnwrapInputTop>
                <StyledWrapOrUnwrapInputTopType>Withdraw</StyledWrapOrUnwrapInputTopType>
                <StyledWrapOrUnwrapInputTopBalance>
                  Balance:{' '}
                  <span onClick={handleMaxUnwrap}>
                    {formatValueDecimal(state.balances[tokenPairs[1].symbol], '', 4)}
                  </span>
                </StyledWrapOrUnwrapInputTopBalance>
              </StyledWrapOrUnwrapInputTop>
              <StyledWrapOrUnwrapInputBottom>
                <StyledWrapOrUnwrapInputBottomInput
                  type="number"
                  placeholder="0.0"
                  value={state.unwrapAmount}
                  onChange={(event) => handleAmountChange(event.target.value)}
                />
                <StyledWrapOrUnwrapInputBottomSymbol>
                  <StyledTokenIcon src={tokenPairs[1].icon} />
                  <StyledTokenSymbol>{tokenPairs[1].symbol}</StyledTokenSymbol>
                </StyledWrapOrUnwrapInputBottomSymbol>
              </StyledWrapOrUnwrapInputBottom>
            </StyledWrapOrUnwrapInput>
            {isUnwrapInSufficient ? (
              <StyledWrapOrUnwrapButton disabled>InSufficient Balance</StyledWrapOrUnwrapButton>
            ) : state.unwrapLoading || state.isApproving ? (
              <StyledWrapOrUnwrapButton disabled>
                <Loading />
              </StyledWrapOrUnwrapButton>
            ) : state.unwrapAmount > state.allowances[tokenPairs[1].symbol] ? (
              <StyledWrapOrUnwrapButton
                onClick={(e) =>
                  handleApprove(
                    tokenPairs[1].address,
                    tokenPairs[1].address,
                    state.unwrapAmount,
                    tokenPairs[1].decimals
                  )
                }
              >
                Approve
              </StyledWrapOrUnwrapButton>
            ) : state.unwrapAmount > 0 ? (
              <StyledWrapOrUnwrapButton onClick={handleUnwrap}>Unwrap</StyledWrapOrUnwrapButton>
            ) : (
              <StyledWrapOrUnwrapButton disabled>Unwrap</StyledWrapOrUnwrapButton>
            )}
          </StyledWrapContainerBottom>
        )}
      </StyledWrapContainer>
    </StyledDialog>
  );
});
