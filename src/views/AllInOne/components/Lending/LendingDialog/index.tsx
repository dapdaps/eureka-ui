import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { VmComponent } from '@/components/vm/VmComponent';
import useAccount from '@/hooks/useAccount';
import { formatBorrowLimit } from '@/views/AllInOne/components/Lending/LendingDialog/utils';

import LendingArrowIcon from '../LendingArrowIcon';
import LendingProcess from '../LendingProcess';
import { ERC20_ABI } from './abi';
import LendingCloseIcon from './CloseIcon';
import LendingDialogButton from './DialogButton';
import {
  Apy,
  AssetLabel,
  AssetWrapper,
  Balance,
  BalanceValue,
  BalanceWrapper,
  BottomBox,
  CloseIcon,
  CollateralToken,
  Content,
  Dapp,
  DappIcon,
  DappName,
  Dialog,
  Header,
  Input,
  InputBalance,
  InputWrapper,
  Label,
  Overlay,
  RewardApy,
  RewardApyItem,
  RewardIcon,
  Row,
  Tips,
  Title,
  Token,
  TokenLogo,
  TokenSelect,
  TokenSymbol,
  TopBox,
  Value,
  ValuesWrapper
} from './styles';

interface IProps {
  display: boolean;
  data: any;
  chainId: any;
  onClose: any;
  onSuccess: any;
  source?: string;
  account: any;
  addAction: any;
  toast: any;
}

type DebouncedGetTradeType = {
  run: () => void;
};

const LendingDialog = (props: IProps) => {
  const { display, data, chainId, onClose, onSuccess, source, account } = props;
  const { provider } = useAccount();
  const [state, setState] = useState<{
    amount: string;
    processValue: number;
    balanceLoading: boolean;
    balance: string;
    borrowLimit: string;
    buttonClickable: boolean;
    borrowBalance: string;
    isMax: boolean;
    isOverSize: boolean;
    isBigerThanBalance: boolean;
    loading: boolean;
    debouncedGetTrade: DebouncedGetTradeType | null;
    getTrade: (() => void) | null;
  }>({
    amount: '',
    processValue: 0,
    balanceLoading: false,
    balance: '',
    borrowLimit: '',
    buttonClickable: false,
    borrowBalance: '',
    isMax: false,
    isOverSize: false,
    isBigerThanBalance: false,
    loading: false,
    debouncedGetTrade: null,
    getTrade: null
  });
  const [trade, setTrade] = useState<any>({});
  const [updateHandler, setUpdateHandler] = useState<any>(Date.now());

  const actionText = useMemo(() => data?.actionText, [data]);
  const isSupply = useMemo(() => ['Deposit', 'Withdraw'].includes(actionText), [actionText]);
  const isBorrow = useMemo(() => ['Repay', 'Borrow'].includes(actionText), [actionText]);
  const isForCollateral = useMemo(() => !isSupply && !isBorrow, [isSupply, isBorrow]);
  const tokenSymbol = useMemo(() => data?.underlyingToken?.symbol, [data]);

  const getAvailable = useCallback(
    (_balance: any) => {
      if (!_balance) return '-';
      if (actionText !== 'Repay') return _balance;
      if (Big(_balance).lt(data.userBorrow || 0)) return _balance;
      if (Big(_balance).gt(data.userBorrow || 0)) return data.userBorrow;
    },
    [data, actionText]
  );

  const getBalance = useCallback(() => {
    console.log(actionText, 'actionText');

    const isUnderlying = ['Deposit', 'Repay'].includes(actionText);
    setState((prevState) => ({
      ...prevState,
      balanceLoading: true
    }));
    if (isUnderlying && data.underlyingToken.isNative) {
      provider.getBalance(account).then((rawBalance: ethers.BigNumber) => {
        setState((prevState) => ({
          ...prevState,
          balance: getAvailable(ethers.utils.formatUnits(rawBalance._hex, 18)),
          balanceLoading: false
        }));
      });
      return;
    }
    if (isUnderlying && data.underlyingToken.address) {
      const TokenContract = new ethers.Contract(data.underlyingToken.address, ERC20_ABI, provider.getSigner());
      TokenContract.balanceOf(account).then((rawBalance: ethers.BigNumber) => {
        const _rawBalance = ethers.utils.formatUnits(rawBalance._hex, data.underlyingToken.decimals);
        setState((prevState) => ({
          ...prevState,
          balance: getAvailable(_rawBalance),
          balanceLoading: false
        }));
        return;
      });
    }
    if (actionText === 'Withdraw') {
      setState((prevState) => ({
        ...prevState,
        balance: Big(data.userSupply).toFixed(6, 0),
        balanceLoading: false
      }));
      return;
    }
    if (actionText === 'Borrow') {
      const borrowAvailable = Big(data.totalCollateralUsd)
        .minus(data.userTotalBorrowUsd)
        .div(data.underlyingPrice || 1);
      setState((prevState) => ({
        ...prevState,
        balance: borrowAvailable.gt(0) ? Big(borrowAvailable).toString() : '0.00',
        balanceLoading: false
      }));
      return;
    }
  }, [actionText, account, data, getAvailable, provider]);

  const { run: debouncedGetTrade } = useDebounceFn(
    () => {
      setState((prevState) => ({
        ...prevState,
        loading: true
      }));
    },
    {
      wait: 500
    }
  );

  const getTrade = () => {
    setState((prevState) => ({
      ...prevState,
      loading: true
    }));
  };

  useEffect(() => {
    if (data && localStorage.getItem('prevAddress') !== data.address && display) {
      let borrowLimit = '' as any;
      const _borrowLimit = Big(data.totalCollateralUsd).minus(data.userTotalBorrowUsd);
      let buttonClickable = false;
      if (actionText === 'Enable as Collateral') {
        borrowLimit = _borrowLimit.add(
          Big(data.loanToValue / 100)
            .mul(data.userSupply || 0)
            .mul(data.underlyingPrice)
        );
        buttonClickable = true;
      }
      if (actionText === 'Disable as Collateral') {
        borrowLimit = _borrowLimit.minus(
          Big(data.loanToValue / 100)
            .mul(data.userSupply || 0)
            .mul(data.underlyingPrice)
        );
        buttonClickable = Big(data.userTotalBorrowUsd).eq(0) ? true : !borrowLimit.lt(0);
      }
      setState((prevState) => ({
        ...prevState,
        borrowLimit: borrowLimit ? (!borrowLimit.gt(0) ? '0.00' : borrowLimit.toFixed(2)) : '',
        amount: '',
        buttonClickable,
        processValue: 0,
        borrowBalance: ''
      }));
      getBalance();
      localStorage.setItem('prevAddress', data.address);
    }
  }, [display, data, actionText, provider, account, getBalance]);

  // useEffect(() => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     debouncedGetTrade: { run: debouncedGetTrade },
  //     getTrade,
  //   }));
  // }, []);

  useEffect(() => {
    setUpdateHandler(Date.now());
  }, [data, state.amount, account]);

  const formatBalance = () => {
    if (state.balanceLoading) return 'Loading';
    if (!state.balance) return '-';
    if (Big(state.balance).eq(0)) return '0';
    if (Big(state.balance).lt(0.0001)) return '<0.0001';
    return Big(state.balance).toFixed(4, 0);
  };
  const handleAmountChange = (_amount: any) => {
    const amount = _amount.replace(/\s+/g, '');
    if (isNaN(Number(amount))) return;
    const isZero = Big(amount || 0).eq(0);
    if (isZero) {
      setState((prevState) => ({
        ...prevState,
        amount,
        buttonClickable: false,
        borrowLimit: '',
        borrowLimitUsed: '',
        borrowBalance: '',
        isEmpty: Number(amount) === 0 && amount !== '',
        isOverSize: false,
        isBigerThanBalance: false
      }));
      return;
    }

    const precent = !Big(state.balance || 0).eq(0) ? Big(amount).div(state.balance).mul(100) : Big(0);

    const params = {
      amount: amount,
      processValue: precent.gt(100) ? 100 : precent.toNumber()
    } as any;

    let isOverSize = false;
    const value = Big(Big(amount).mul(data.underlyingPrice).toFixed(20, 0));
    if (isSupply) {
      if (actionText === 'Withdraw' && data.userMerberShip) {
        params.borrowLimit = Big(data.totalCollateralUsd)
          .minus(data.userTotalBorrowUsd)
          .minus(value.mul(data.loanToValue / 100));
        isOverSize = Big(data.userTotalBorrowUsd).eq(0)
          ? false
          : Big(data.totalCollateralUsd || 0)
              .minus(value.mul(data.loanToValue / 100) || 0)
              .lt(data.userTotalBorrowUsd || 0);
      }
      if (actionText === 'Deposit') {
        params.borrowLimit = Big(data.totalCollateralUsd)
          .minus(data.userTotalBorrowUsd)
          .plus(value.mul(data.loanToValue / 100));
      }
    }
    if (isBorrow) {
      if (actionText === 'Borrow') {
        params.borrowBalance = value.plus(data.userTotalBorrowUsd).toFixed(2);
        isOverSize = value.gt(Big(data.totalCollateralUsd).minus(data.userTotalBorrowUsd));
        params.borrowLimit = Big(data.totalCollateralUsd || 0)
          .minus(data.userTotalBorrowUsd || 0)
          .minus(value || 0);
      }
      if (actionText === 'Repay') {
        params.borrowBalance = Big(data.userTotalBorrowUsd).minus(value);
        params.borrowLimit = Big(data.totalCollateralUsd).minus(data.userTotalBorrowUsd).add(value);
        isOverSize = value.gt(data.userTotalBorrowUsd);
      }
    }
    if (params.borrowLimit) {
      if (params.borrowLimit.lt(0)) {
        params.borrowLimit = '0.00';
      } else {
        params.borrowLimit = params.borrowLimit.toFixed();
      }
    }
    params.isBigerThanBalance = Big(amount).gt(state.balance);
    params.buttonClickable = !isOverSize && !params.isBigerThanBalance;
    params.isOverSize = isOverSize;
    params.isEmpty = false;
    setState((prevState) => ({
      ...prevState,
      ...params
    }));

    state.debouncedGetTrade?.run();
  };

  const handleClose = () => {
    onClose?.();
    localStorage.setItem('prevAddress', '');
  };

  if (!data) return '';

  return (
    <Dialog className={display ? 'display' : ''}>
      <Overlay
        onClick={() => {
          handleClose();
        }}
      >
        <Content
          onClick={(ev) => {
            ev.stopPropagation();
          }}
        >
          <TopBox className={isForCollateral ? 'none-border' : ''}>
            <Header>
              <Title>
                <span>
                  {isForCollateral ? 'Collateral' : actionText} {!isForCollateral && tokenSymbol}
                </span>
                {!isForCollateral && source !== 'dapp' && (
                  <>
                    <Apy className={isSupply ? 'supply-color' : 'borrow-color'}>
                      APY {isSupply ? data.supplyApy : data.borrowApy}
                    </Apy>
                    {data.distributionApy &&
                      data.distributionApy
                        .filter((reward: any) => reward.supply !== '0.00%')
                        .map((reward: any) => (
                          <RewardApyItem key={reward.symbol}>
                            <RewardIcon src={reward.icon} />
                            <RewardApy>{reward.supply}</RewardApy>
                          </RewardApyItem>
                        ))}
                  </>
                )}
              </Title>
              <CloseIcon>
                <LendingCloseIcon onClose={handleClose} size={18} />
              </CloseIcon>
            </Header>
            {isForCollateral && (
              <CollateralToken>
                {actionText === 'Disable as Collateral' ? 'Disabling' : 'Enabling'}
                <Token>
                  <TokenLogo src={data.underlyingToken.icon} />
                  <TokenSymbol>{tokenSymbol}</TokenSymbol>
                </Token>
                as Collateral
              </CollateralToken>
            )}
            {!isForCollateral && (
              <>
                {source !== 'dapp' && (
                  <AssetWrapper>
                    <AssetLabel>Asset from</AssetLabel>
                    <Dapp>
                      <DappIcon src={data.dappIcon} />
                      <DappName>{data.dappName}</DappName>
                    </Dapp>
                  </AssetWrapper>
                )}
                <InputWrapper>
                  <Input
                    value={state.amount}
                    onChange={(ev) => {
                      if (isNaN(Number(ev.target.value))) return;
                      handleAmountChange(ev.target.value.replace(/\s+/g, ''));
                      setState((prevState) => ({
                        ...prevState,
                        isMax: Big(ev.target.value.replace(/\s+/g, '') || 0).eq(state.balance || 0)
                      }));
                    }}
                    placeholder="0.0"
                  />
                  <TokenSelect>
                    <TokenSymbol>{tokenSymbol}</TokenSymbol>
                  </TokenSelect>
                </InputWrapper>
                <InputBalance>
                  <BalanceValue>
                    ≈ ${state.amount ? Big(state.amount).mul(data.underlyingPrice).toFixed(2) : '-'}
                  </BalanceValue>
                  <BalanceWrapper
                    onClick={() => {
                      if (state.balanceLoading || isNaN(Number(state.balance))) return;
                      handleAmountChange(state.balance);
                      const balanceNumber = Big(state.balance || 0);
                      const balanceStr = Big(balanceNumber).toFixed(18, 0);
                      setState((prevState) => ({
                        ...prevState,
                        amount: Big(balanceStr).eq(0) ? '0' : balanceStr.replace(/0+$/, '').replace(/\.$/, ''),
                        isMax: true
                      }));
                    }}
                  >
                    &nbsp;Available&nbsp;<Balance>{formatBalance()}</Balance>
                  </BalanceWrapper>
                </InputBalance>
                {isSupply && (
                  <LendingProcess
                    value={state.processValue}
                    onChange={(value) => {
                      // 100% use balance directly
                      if (value === 100) {
                        const balanceNumber = Big(state.balance || 0);
                        const balanceStr = Big(balanceNumber).toFixed(12);
                        const _amount = Big(balanceStr).eq(0) ? '0' : Big(balanceStr).toString();
                        setState((prevState) => ({
                          ...prevState,
                          processValue: value,
                          amount: _amount
                        }));
                        handleAmountChange(_amount);
                        return;
                      }
                      const amount = Big(state.balance)
                        .mul(value / 100)
                        .toFixed(4, 0);
                      setState((prevState) => ({
                        ...prevState,
                        processValue: value,
                        amount
                      }));
                      handleAmountChange(amount);
                    }}
                  />
                )}
              </>
            )}
          </TopBox>
          <BottomBox>
            {actionText === 'Deposit' && (
              <>
                <Row>
                  <Label>Collateral factor</Label>
                  <Value>{Number(data.loanToValue).toFixed(0)} %</Value>
                </Row>
              </>
            )}
            <Row className={isForCollateral ? 'justfiy-start' : ''}>
              <Label>Borrow Limit</Label>
              <ValuesWrapper>
                <Value className={!!state.borrowLimit ? 'range' : ''}>${formatBorrowLimit(2, '', data)}</Value>
                {!!state.borrowLimit && (
                  <>
                    <div className="mx_5">
                      <LendingArrowIcon color={'#979ABE'} className="mx_5" />
                    </div>
                    <Value>${Big(state.borrowLimit).toFixed(2)}</Value>
                  </>
                )}
              </ValuesWrapper>
            </Row>
            {actionText === 'Repay' && (
              <Row>
                <Label>Remaining Debt</Label>
                <ValuesWrapper>
                  <Value className={!!state.borrowBalance ? 'range' : ''}>
                    ${Big(data.userTotalBorrowUsd).toFixed(2)}
                  </Value>
                  {!!(isBorrow && state.borrowBalance) && (
                    <>
                      <div className="mx_5">
                        <LendingArrowIcon color={'#979ABE'} className="mx_5" />
                      </div>
                      <Value>${Big(state.borrowBalance).toFixed(2)}</Value>
                    </>
                  )}
                </ValuesWrapper>
              </Row>
            )}
            <LendingDialogButton
              disabled={!state.buttonClickable}
              actionText={actionText}
              amount={state.isMax ? state.balance : state.amount}
              data={data}
              addAction={props.addAction}
              toast={props.toast}
              chainId={chainId}
              unsignedTx={trade.unsignedTx}
              loading={state.loading}
              gas={trade.gas}
              account={account}
              onApprovedSuccess={() => {
                if (!trade.gas) state.getTrade?.();
              }}
              onSuccess={() => {
                handleClose();
                onSuccess?.();
              }}
            />
          </BottomBox>
        </Content>
      </Overlay>
      {data.config.handler && (
        <VmComponent
          src={data.config.handler}
          props={{
            update: updateHandler,
            data: data,
            amount: state.amount,
            account,
            onLoad: (_data: any) => {
              console.log('%cDialog-handler-onLoad--', 'background:red;color:white;', _data);
              setTrade(_data);
              setState((prevState) => ({
                ...prevState,
                ..._data,
                loading: false
              }));
            }
          }}
        />
      )}
    </Dialog>
  );
};

export default LendingDialog;
