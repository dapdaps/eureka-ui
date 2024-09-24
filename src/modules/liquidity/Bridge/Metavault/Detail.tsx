// @ts-nocheck
import type { BigNumberish } from '@ethersproject/bignumber';
import Big from 'big.js';
import { ethers } from 'ethers';
import { memo, useEffect, useMemo } from 'react';

import useAccount from '@/hooks/useAccount';
import { useMultiState } from '@/modules/hooks';

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
} from '../../styles';
import Loading from '../Loading';

export default memo(function Detail(props: any) {
  const { account, provider } = useAccount();
  const { data, toast, prices, refetch, addresses, addAction, defaultDex, storeAddress, ICON_VAULT_MAP } = props;
  const defaultDeposit = props.tab === 'deposit' || !props.tab;
  const [state, updateState] = useMultiState({
    toastId: null,
    isDeposit: defaultDeposit,
    lpBalance: '',
    balances: [],
    amount: '',
    lpAmount: '',
    isError: false,
    isLoading: false,
    isTokenApproved: true,
    isTokenApproving: false,
    loadingMsg: '',
    isPostTx: false,
    showPairs: false
  });
  const sourceBalances: any = {};
  const {
    isDeposit,
    balances,
    amount,
    isLoading,
    isError,
    isTokenApproved,
    isTokenApproving,
    loadingMsg,
    lpBalance,
    lpAmount,
    isPostTx
  } = state;
  const detailLoading = Object.keys(balances).length < 1 || lpBalance === '';
  const sender = account;
  const { token, decimals, id, poolAddress } = data;
  const vaultAddress = addresses[id];
  const tokensPrice = prices;
  const isInSufficient = Number(amount) > Number(balances[token]);
  const isWithdrawInsufficient = Number(lpAmount) > Number(lpBalance);

  const balance = !amount || !tokensPrice?.[token] ? '-' : parseFloat(Big(amount).times(tokensPrice[token]).toFixed(4));

  const balanceLp =
    !lpAmount || !tokensPrice?.[token]
      ? '-'
      : parseFloat(parseFloat(Big(lpAmount).times(tokensPrice[token]).toFixed(4)));

  const getFromDepositAmount = (depositAmount: any, tokenDecimal: number) => {
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

  const updateLPBalance = () => {
    const abi = [
      {
        inputs: [
          {
            internalType: 'address[]',
            name: '_assets',
            type: 'address[]'
          },
          {
            internalType: 'address',
            name: 'account',
            type: 'address'
          }
        ],
        name: 'getUserBalances',
        outputs: [
          {
            internalType: 'uint256[]',
            name: '',
            type: 'uint256[]'
          }
        ],
        stateMutability: 'view',
        type: 'function'
      }
    ];
    const contract = new ethers.Contract(ethers.utils.getAddress(storeAddress), abi, provider);
    contract.getUserBalances([vaultAddress], sender).then((result) => {
      updateState({
        lpBalance: Big(ethers.utils.formatUnits(result[0], decimals)).toFixed(6)
      });
    });
  };
  const updateBalance = () => {
    const symbol = token;
    const address = addresses[token];
    if (symbol === 'ETH') {
      provider.getBalance(sender).then((balanceBig) => {
        const adjustedBalance = ethers.utils.formatEther(balanceBig);
        sourceBalances[symbol] = adjustedBalance;
        updateState({
          balances: sourceBalances
        });
      });
    } else {
      const abi = ['function balanceOf(address) view returns (uint256)'];
      const contract = new ethers.Contract(address, abi, provider);
      contract.balanceOf(sender).then((balanceBig) => {
        const adjustedBalance = Big(ethers.utils.formatUnits(balanceBig, decimals)).toFixed();
        sourceBalances[symbol] = adjustedBalance;
        updateState({
          balances: sourceBalances
        });
      });
    }
  };

  const handleCheckApproval = (symbol, amount, decimals) => {
    const wei = ethers.utils.parseUnits(Big(amount).toFixed(decimals), decimals);
    const abi = ['function allowance(address, address) external view returns (uint256)'];
    const contract = new ethers.Contract(addresses[symbol], abi, provider);
    return new Promise((resolve) => {
      contract
        .allowance(sender, storeAddress)
        .then((allowance) => {
          const approved = !new Big(allowance.toString()).lt(wei);
          updateState({
            isTokenApproved: approved
          });
          resolve(approved);
        })
        .catch((e) => console.log(e));
    });
  };

  const changeMode = (isDeposit: boolean) => {
    updateState({ isDeposit });
  };

  const handleMax = (isToken0: boolean) => {
    if (isToken0) handleTokenChange(balances[token0], token0);
    else handleTokenChange(balances[token1], token1);
  };

  const handleTokenChange = (value, symbol) => {
    updateState({
      amount: value
    });
    if (Number(value) === 0) {
      updateState({
        isTokenApproved: true
      });
      return;
    }
    if (symbol === 'ETH') {
      updateState({
        isTokenApproved: true
      });
    } else {
      handleCheckApproval(symbol, value, decimals);
    }
  };

  const handleLPChange = (amount: string) => {
    updateState({
      lpAmount: amount
    });
  };

  const handleApprove = (isToken0: boolean) => {
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

    const tokenWei = ethers.utils.parseUnits(amount, isToken0 ? decimals0 : decimals1);

    const abi = ['function approve(address, uint) public'];

    const tokenContract = new ethers.Contract(addresses[_token], abi, provider.getSigner());

    tokenContract
      .approve(vaultAddress, tokenWei)
      .then((tx: any) => tx.wait())
      .then((receipt: any) => {
        const payload = isToken0
          ? { isToken0Approved: true, isToken0Approving: false }
          : { isToken1Approved: true, isToken1Approving: false };

        updateState({ ...payload, isLoading: false, loadingMsg: '' });
        toast?.dismiss(toastId);
        toast?.success({
          title: 'Approve Successfully!',
          tx: receipt.transactionHash,
          chainId: props.chainId
        });
      })
      .catch((error: Error) => {
        console.log('error: ', error);
        updateState({
          isError: true,
          isLoading: false,
          loadingMsg: error?.message,
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
    const _amount = Big(amount).mul(Big(10).pow(decimals)).toFixed(0);

    const abi = [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_asset',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256'
          }
        ],
        name: 'deposit',
        outputs: [],
        stateMutability: 'payable',
        type: 'function'
      }
    ];
    const contract = new ethers.Contract(ethers.utils.getAddress(storeAddress), abi, provider.getSigner());
    contract
      .deposit(vaultAddress, _amount, {
        value: _amount
      })
      .then((tx) => {
        return tx.wait();
      })
      .then((receipt) => {
        const { status, transactionHash } = receipt;
        addAction?.({
          type: 'Liquidity',
          action: 'Deposit',
          token0: token,
          amount,
          template: defaultDex,
          status: status,
          add: 1,
          transactionHash,
          chain_id: props.chainId
        });

        updateState({
          isLoading: false,
          isPostTx: true
        });

        setTimeout(() => updateState({ isPostTx: false }), 10_000);

        if (refetch) refetch();

        toast?.dismiss(toastId);
        toast?.success({
          title: 'Deposit Successfully!'
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
          title: 'Deposit Failed!',
          text: error?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ''
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
    const _amount = Big(lpAmount).mul(Big(10).pow(18)).toFixed(0);

    const abi = [
      {
        inputs: [
          {
            internalType: 'address',
            name: '_asset',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: '_amount',
            type: 'uint256'
          }
        ],
        name: 'withdraw',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ];

    const contract = new ethers.Contract(ethers.utils.getAddress(storeAddress), abi, provider.getSigner());
    contract
      .withdraw(vaultAddress, _amount)
      .then((tx) => {
        return tx.wait();
      })
      .then((receipt) => {
        updateState({
          isLoading: false,
          isPostTx: true
        });

        const { status, transactionHash } = receipt;

        addAction?.({
          type: 'Liquidity',
          action: 'Withdraw',
          token0: token,
          amount: lpAmount,
          template: defaultDex,
          status: status,
          add: 0,
          transactionHash,
          chain_id: state.chainId
        });

        setTimeout(() => updateState({ isPostTx: false }), 10_000);

        if (refetch) refetch();

        toast?.dismiss(toastId);
        toast?.success({
          title: 'Withdraw Successfully!'
        });
      })
      .catch((error) => {
        console.log('error', error);
        updateState({
          isError: true,
          isLoading: false,
          loadingMsg: error
        });
        toast?.dismiss(toastId);
        toast?.fail({
          title: 'Withdraw Failed!',
          text: error?.message?.includes('user rejected transaction') ? 'User rejected transaction' : ''
        });
      });
  };

  const onUpdateLpPercent = (percent: number) => {
    updateState({
      lpPercent: percent
    });
  };

  const onChangeSlider = (percent: number) => {
    console.log('percent: ', percent);
    const newLpValue = Big(percent)
      .div(100)
      .times(lpBalance || 0)
      .toFixed(6);

    handleLPChange(newLpValue);
  };
  useEffect(() => {
    if (!sender || !token) return;
    updateBalance();
    updateLPBalance();
  }, [sender, token]);

  useEffect(() => {
    if (amount) {
      handleTokenChange(amount, token);
    }
  }, [data]);
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
          <Loading color="#999" />
        </div>
      ) : (
        <>
          {isDeposit ? (
            <>
              <Row className="price-input">
                <Column>
                  <InputWrap className={Number(amount) > Number(balances[token]) ? 'inSufficient' : ''}>
                    <Input value={amount} type="number" onChange={(e) => handleTokenChange(e.target.value, token)} />
                    <InputSuffix>
                      <img src={ICON_VAULT_MAP[token]} alt={token} />
                      <span>{token}</span>
                    </InputSuffix>
                  </InputWrap>
                  <PriceWrap>
                    <TotalPrice>${balance}</TotalPrice>
                    <BalancePrice>
                      Balance:<span onClick={() => handleMax(true)}>{Big(balances[token] ?? 0).toFixed(6)}</span>{' '}
                      {token}
                    </BalancePrice>
                  </PriceWrap>
                </Column>
              </Row>
              <StyledButtonList>
                {isInSufficient && <StyledButton disabled>InSufficient Balance</StyledButton>}
                {!isInSufficient &&
                  (isTokenApproved && !isTokenApproving ? (
                    <StyledButton disabled={isLoading || !amount} onClick={handleDeposit}>
                      {isLoading ? <Loading /> : 'Deposit'}
                    </StyledButton>
                  ) : (
                    <>
                      <StyledButton disabled={isTokenApproved || isTokenApproving} onClick={() => handleApprove()}>
                        {isTokenApproving ? (
                          <Loading />
                        ) : (
                          <>
                            {isTokenApproved ? 'Approved' : 'Approve'} {token}
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
                        <img src={ICON_VAULT_MAP[token]} alt={token} />
                      </StyledImageList>
                      <span>{token}</span>
                    </InputSuffix>
                  </InputWrap>
                  <PriceWrap>
                    <TotalPrice>${balanceLp}</TotalPrice>
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
                        {lpBalance}
                      </span>
                    </BalancePrice>
                  </PriceWrap>
                </Column>
              </Row>
              <StyledButtonList>
                <StyledButton disabled={isWithdrawInsufficient || isLoading || !lpAmount} onClick={handleWithdraw}>
                  {isLoading ? <Loading /> : <>{isWithdrawInsufficient ? 'InSufficient Balance' : 'Withdraw'}</>}
                </StyledButton>
              </StyledButtonList>
            </>
          )}
        </>
      )}
    </DetailWrapper>
  );
});
