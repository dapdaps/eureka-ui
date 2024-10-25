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
  const { data, toast, sender, prices, refetch, addresses, addAction, defaultDex, storeAddress, ICON_VAULT_MAP } =
    props;
  const defaultDeposit = props.tab === 'deposit' || !props.tab;
  const [state, updateState] = useMultiState({
    isDeposit: true,
    balances: [],
    lpBalance: '',
    inAmount: '',
    lpAmount: '',
    isLoading: false,
    isTokenApproved: true,
    isTokenApproving: false,
    updater: 0
  });
  const sourceBalances: any = {};

  const { isDeposit, balances, inAmount, isLoading, isTokenApproved, isTokenApproving, lpBalance, lpAmount, updater } =
    state;

  const detailLoading = Object.keys(balances).length < 1 || lpBalance === '';

  const { asset, decimals, symbol, vaultAddress, tokenAddress } = data;
  // const vaultAddress = addresses[symbol];

  const isInSufficient = Number(inAmount) > Number(balances[symbol]);
  const isWithdrawInsufficient = Number(lpAmount) > Number(lpBalance);
  // const balanceLp =
  //   !lpAmount || !lpBalance
  //     ? '-'
  //     : parseFloat(
  //       Big(lpAmount)
  //         .div(Big(lpBalance).gt(0) ? lpBalance : 1)
  //         .toFixed(4)
  //     );
  const updateLPBalance = () => {
    const abi = ['function balanceOf(address) view returns (uint256)'];
    const contract = new ethers.Contract(vaultAddress, abi, provider?.getSigner());
    contract.balanceOf(sender).then((balanceBig) => {
      const adjustedBalance = ethers.utils.formatUnits(balanceBig, decimals);
      updateState({
        lpBalance: adjustedBalance
      });
    });
  };
  const updateBalance = () => {
    const abi = ['function balanceOf(address) view returns (uint256)'];
    const contract = new ethers.Contract(tokenAddress, abi, provider?.getSigner());
    contract
      .balanceOf(sender)
      .then((balanceBig) => {
        const adjustedBalance = Big(ethers.utils.formatUnits(balanceBig, decimals)).toFixed();
        sourceBalances[symbol] = adjustedBalance;
        updateState({
          balances: sourceBalances
        });
      })
      .catch((error: Error) => {
        console.log('error: ', error);
        setTimeout(() => {
          updateBalance(token);
        }, 1500);
      });
  };
  const checkApproval = (amount) => {
    const wei: any = ethers.utils.parseUnits(Big(amount).toFixed(decimals), decimals);
    const abi = ['function allowance(address, address) external view returns (uint256)'];
    const contract = new ethers.Contract(tokenAddress, abi, provider?.getSigner());
    updateState({
      isTokenApproved: false
    });
    contract
      .allowance(sender, vaultAddress)
      .then((allowance: any) => {
        const approved = !new Big(allowance.toString()).lt(wei);
        updateState({
          isTokenApproved: approved
        });
      })
      .catch((e: Error) => console.log(e));
  };

  const changeMode = (isDeposit: boolean) => {
    updateState({ isDeposit });
  };

  const handleMax = () => {
    handleTokenChange(balances[symbol]);
  };

  const handleTokenChange = (amount) => {
    updateState({ inAmount: amount });
    if (amount === '') {
      updateState({
        inAmount: '',
        isTokenApproved: true
      });
      return;
    }
    checkApproval(amount);
  };
  const handleLPChange = (amount: string) => {
    updateState({
      lpAmount: amount
    });
  };

  const handleApprove = () => {
    const payload = { isTokenApproving: true };
    const amount = Big(inAmount).toFixed(decimals);
    const toastId = toast?.loading({
      title: `Approve ${symbol}`
    });
    updateState({
      ...payload,
      isLoading: true,
      loadingMsg: `Approving ${symbol}...`
    });
    const wei = ethers.utils.parseUnits(amount, decimals);
    const abi = ['function approve(address, uint) public'];
    const contract = new ethers.Contract(tokenAddress, abi, provider?.getSigner());

    contract
      .approve(vaultAddress, wei)
      .then((tx: any) => tx.wait())
      .then((receipt: any) => {
        const payload = { isTokenApproved: true, isTokenApproving: false };
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
          isTokenApproving: false
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
      toastId,
      isLoading: true,
      isError: false,
      loadingMsg: 'Depositing...'
    });
    const wei = ethers.utils.parseUnits(Big(inAmount).toFixed(decimals), decimals);
    const abi = [
      {
        constant: false,
        inputs: [
          {
            name: 'assets',
            type: 'uint256'
          }
        ],
        name: 'deposit',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function'
      }
    ];
    const contract = new ethers.Contract(vaultAddress, abi, provider?.getSigner());
    contract
      .deposit(wei)
      .then((tx: any) => tx.wait())
      .then((receipt: any) => {
        const { status, transactionHash } = receipt;
        addAction?.({
          type: 'Liquidity',
          action: 'Deposit',
          token0: symbol,
          amount: inAmount,
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
        setTimeout(() => {
          onSuccess?.();
        }, 3000);

        toast?.dismiss(toastId);
        toast?.success({
          title: 'Deposit Successfully!'
        });
      })
      .catch((error: Error) => {
        console.log('error: ', error);
        updateState({
          isError: true,
          isLoading: false,
          loadingMsg: error?.message
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

    const lpWeiAmount = ethers.utils.parseUnits(Big(lpAmount).toFixed(decimals), decimals);

    console.log('=lpWeiAmount', lpWeiAmount);
    const abi = [
      {
        constant: false,
        inputs: [
          {
            name: 'wad',
            type: 'uint256'
          }
        ],
        name: 'withdraw',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ];

    const contract = new ethers.Contract(vaultAddress, abi, provider?.getSigner());
    contract
      .withdraw(lpWeiAmount)
      .then((tx: any) => tx.wait())
      .then((receipt: any) => {
        updateState({
          isLoading: false,
          isPostTx: true
        });
        const { status, transactionHash } = receipt;

        addAction?.({
          type: 'Liquidity',
          action: 'Withdraw',
          token0: symbol,
          amount: lpAmount,
          template: defaultDex,
          status: status,
          add: 0,
          transactionHash,
          chain_id: props.chainId
        });
        setTimeout(() => {
          onSuccess?.();
        }, 3000);

        toast?.dismiss(toastId);
        toast?.success({
          title: 'Withdraw Successfully!'
        });
      })
      .catch((error: Error) => {
        updateState({
          isError: true,
          isLoading: false,
          loadingMsg: error?.message
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
  const onUpdateLpPercent = (percent: number) => {
    updateState({
      lpPercent: percent
    });
  };

  const onSuccess = function () {
    updateState({
      updater: Date.now(),
      isTokenApproved: true,
      isTokenApproving: false
    });
    isDeposit ? handleTokenChange('') : handleLPChange('');
  };

  useEffect(() => {
    if (!sender || !vaultAddress) return;
    updateBalance();
    updateLPBalance();
  }, [sender, vaultAddress, updater]);
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
                  <InputWrap className={Number(inAmount) > Number(balances[symbol]) ? 'inSufficient' : ''}>
                    <Input value={inAmount} type="number" onChange={(e) => handleTokenChange(e.target.value)} />
                    <InputSuffix>
                      <img src={ICON_VAULT_MAP[asset]} alt={asset} />
                      <span>{symbol}</span>
                    </InputSuffix>
                  </InputWrap>
                  <PriceWrap>
                    <TotalPrice>${inAmount ? Big(inAmount).times(data?.price).toFixed(4) : '-'}</TotalPrice>
                    <BalancePrice>
                      Balance:<span onClick={() => handleMax(true)}>{Big(balances[symbol] ?? 0).toFixed(6)}</span>{' '}
                      {symbol}
                    </BalancePrice>
                  </PriceWrap>
                </Column>
              </Row>
              <StyledButtonList>
                {isInSufficient && <StyledButton disabled>InSufficient Balance</StyledButton>}
                {!isInSufficient &&
                  (isTokenApproved && !isTokenApproving ? (
                    <StyledButton disabled={isLoading || !inAmount || Big(inAmount).lt(0)} onClick={handleDeposit}>
                      {isLoading ? <Loading /> : 'Deposit'}
                    </StyledButton>
                  ) : (
                    <>
                      <StyledButton disabled={isTokenApproved || isTokenApproving} onClick={() => handleApprove()}>
                        {isTokenApproving ? (
                          <Loading />
                        ) : (
                          <>
                            {isTokenApproved ? 'Approved' : 'Approve'} {symbol}
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
                        <img src={ICON_VAULT_MAP[asset]} alt={asset} />
                      </StyledImageList>
                      <span>{symbol}</span>
                    </InputSuffix>
                  </InputWrap>
                  <PriceWrap>
                    <TotalPrice>${lpAmount ? Big(lpAmount).times(data?.price).toFixed(4) : '-'}</TotalPrice>
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
                <StyledButton
                  disabled={isWithdrawInsufficient || isLoading || !lpAmount || Big(lpAmount).lt(0)}
                  onClick={handleWithdraw}
                >
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
