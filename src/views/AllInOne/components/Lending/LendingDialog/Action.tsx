import Big from 'big.js';
import { ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';

import LazyImage from '@/components/LazyImage';
import { VmComponent } from '@/components/vm/VmComponent';
import useAccount from '@/hooks/useAccount';
import { formatBorrowLimit } from '@/views/AllInOne/components/Lending/LendingDialog/utils';
import Expand from '@/views/AllInOne/components/Lending/Market/Expand';

import LendingArrowIcon from '../LendingArrowIcon';
import LendingProcess from '../LendingProcess';
import { ERC20_ABI } from './abi';
import LendingDialogButton from './DialogButton';
import {
  Balance,
  BalanceValue,
  BalanceWrapper,
  BottomBox,
  BoxItem,
  Input,
  InputFoot,
  InputMain,
  Label,
  Row,
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
  onSuccess: any;
  source?: string;
  account: any;
  addAction: any;
  toast: any;
  isHideInfo?: boolean;
  updateBalance?: number;
  tabs: ActionType[];
}

type DebouncedGetTradeType = {
  run: () => void;
};

export enum ActionType {
  Supply = 'Deposit',
  Withdraw = 'Withdraw',
  Borrow = 'Borrow',
  Repay = 'Repay'
}

const TabList = [
  {
    key: ActionType.Supply,
    label: 'Supply'
  },
  {
    key: ActionType.Borrow,
    label: 'Borrow'
  },
  {
    key: ActionType.Withdraw,
    label: 'Withdraw'
  },
  {
    key: ActionType.Repay,
    label: 'Repay'
  }
];

const LendingAction = (props: IProps) => {
  const { data, chainId, onSuccess, updateBalance, isHideInfo, tabs } = props;
  const { provider, account } = useAccount();
  const [state, setState] = useState<{
    amount: string;
    processValue: number;
    balanceLoading: boolean;
    balance: string;
    userSupplyBalance: string;
    userAvailableBorrow: string;
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
    userSupplyBalance: '',
    userAvailableBorrow: '',
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

  const tabList = useMemo(() => {
    return TabList.filter((tab) => tabs.includes(tab.key));
  }, [TabList, tabs]);

  const [actionText, setActionText] = useState<ActionType>(tabList[0].key);

  const params = useMemo(() => {
    return { ...data, actionText };
  }, [data, actionText]);

  const isSupply = useMemo(() => [ActionType.Supply, ActionType.Withdraw].includes(actionText), [actionText]);
  const isBorrow = useMemo(() => [ActionType.Repay, ActionType.Borrow].includes(actionText), [actionText]);
  const isForCollateral = useMemo(() => !isSupply && !isBorrow, [isSupply, isBorrow]);
  const tokenSymbol = useMemo(() => data?.underlyingToken?.symbol, [data]);
  const tokenIcon = useMemo(() => data?.underlyingToken?.icon, [data]);
  const isUnderlying = [ActionType.Supply, ActionType.Repay].includes(actionText);

  //#region Query Balance
  const getAvailable = useCallback(
    (_balance: any) => {
      if (!_balance) return '-';
      if (actionText !== ActionType.Repay) return _balance;
      if (Big(_balance).lt(data.userBorrow || 0)) return _balance;
      if (Big(_balance).gt(data.userBorrow || 0)) return data.userBorrow;
    },
    [data, actionText]
  );

  const getBalance = useCallback(
    async (_actionType: ActionType) => {
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
      // query deposit balance
      if (_actionType === ActionType.Withdraw) {
        setState((prevState) => ({
          ...prevState,
          userSupplyBalance: Big(data.userSupply).toFixed(data.underlyingToken?.decimals || data.decimals, 0),
          balanceLoading: false
        }));
        return;
      }
      // query borrow available
      if (_actionType === ActionType.Borrow) {
        const borrowAvailable = Big(data.totalCollateralUsd)
          .minus(data.userTotalBorrowUsd)
          .div(data.underlyingPrice || 1);
        setState((prevState) => ({
          ...prevState,
          userAvailableBorrow: borrowAvailable.gt(0) ? Big(borrowAvailable).toString() : '0.00',
          balanceLoading: false
        }));
        return;
      }
    },
    [account, params, getAvailable, provider, isUnderlying, data]
  );

  const currentBalance = useMemo(() => {
    let _balance = state.balance;
    if (actionText === ActionType.Borrow) {
      _balance = state.userAvailableBorrow;
    }
    if (actionText === ActionType.Withdraw) {
      _balance = state.userSupplyBalance;
    }
    return _balance;
  }, [state.balance, state.userAvailableBorrow, state.userSupplyBalance, actionText]);
  //#endregion

  const balanceFormatter = (_balance?: string) => {
    if (!_balance) return '-';
    if (Big(_balance).eq(0)) return '0';
    if (Big(_balance).lt(0.0001)) return '<0.0001';
    return Big(_balance).toFixed(4, 0);
  };

  const formatBalance = () => {
    if (state.balanceLoading) return 'Loading';
    return balanceFormatter(currentBalance);
  };

  const handleAmountChange = (_amount: any) => {
    const amount = _amount.replace(/\s+/g, '');
    if (isNaN(Number(amount))) return;
    const isZero = Big(amount || 0).eq(0);
    if (isZero) {
      setState((prevState) => ({
        ...prevState,
        amount
      }));
      return;
    }

    const precent = !Big(currentBalance || 0).eq(0) ? Big(amount).div(currentBalance).mul(100) : Big(0);

    const states: any = {
      amount: amount,
      processValue: precent.gt(100) ? 100 : precent.toNumber(),
      isEmpty: false
    };
    setState((prevState) => ({
      ...prevState,
      ...states
    }));

    state.debouncedGetTrade?.run();
  };

  const onTabChange = (_key: ActionType) => {
    if (_key === actionText) {
      return;
    }
    setActionText(_key);
  };

  useEffect(() => {
    const isZero = Big(state.amount || 0).eq(0);
    if (isZero) {
      setState((prevState) => ({
        ...prevState,
        buttonClickable: false,
        borrowLimit: '',
        borrowLimitUsed: '',
        borrowBalance: '',
        isEmpty: Number(state.amount) === 0 && state.amount !== '',
        isOverSize: false,
        isBigerThanBalance: false
      }));
      return;
    }

    const states: any = {};
    let isOverSize = false;
    const value = Big(
      Big(state.amount || 0)
        .mul(data.underlyingPrice)
        .toFixed(20, 0)
    );
    if (isSupply) {
      if (actionText === ActionType.Withdraw && data.userMerberShip) {
        states.borrowLimit = Big(data.totalCollateralUsd)
          .minus(data.userTotalBorrowUsd)
          .minus(value.mul(data.loanToValue / 100));
        isOverSize = Big(data.userTotalBorrowUsd).eq(0)
          ? false
          : Big(data.totalCollateralUsd || 0)
              .minus(value.mul(data.loanToValue / 100) || 0)
              .lt(data.userTotalBorrowUsd || 0);
      }
      if (actionText === ActionType.Supply) {
        states.borrowLimit = Big(data.totalCollateralUsd)
          .minus(data.userTotalBorrowUsd)
          .plus(value.mul(data.loanToValue / 100));
      }
    }
    if (isBorrow) {
      if (actionText === ActionType.Borrow) {
        states.borrowBalance = value.plus(data.userTotalBorrowUsd).toFixed(2);
        isOverSize = value.gt(Big(data.totalCollateralUsd).minus(data.userTotalBorrowUsd));
        states.borrowLimit = Big(data.totalCollateralUsd || 0)
          .minus(data.userTotalBorrowUsd || 0)
          .minus(value || 0);
      }
      if (actionText === ActionType.Repay) {
        states.borrowBalance = Big(data.userTotalBorrowUsd).minus(value);
        states.borrowLimit = Big(data.totalCollateralUsd).minus(data.userTotalBorrowUsd).add(value);
        isOverSize = value.gt(data.userTotalBorrowUsd);
      }
    }
    if (states.borrowLimit) {
      if (states.borrowLimit.lt(0)) {
        states.borrowLimit = '0.00';
      } else {
        states.borrowLimit = states.borrowLimit.toFixed();
      }
    }
    states.isBigerThanBalance = Big(state.amount || 0).gt(currentBalance);
    states.buttonClickable = !isOverSize && !states.isBigerThanBalance;
    states.isOverSize = isOverSize;
    setState((prevState) => ({
      ...prevState,
      ...states
    }));
  }, [state.amount, isSupply, isBorrow, data, actionText, currentBalance]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      borrowLimit: '',
      amount: '',
      buttonClickable: false,
      processValue: 0,
      borrowBalance: ''
    }));
  }, [actionText]);

  useEffect(() => {
    setUpdateHandler(Date.now());
  }, [params, state.amount, account]);

  useEffect(() => {
    tabList.forEach((tab) => {
      getBalance(tab.key);
    });
  }, [tabList, account, getBalance, params, provider, isUnderlying, data, updateBalance]);

  useEffect(() => {
    setActionText(tabList[0].key);
  }, [tabList]);

  if (!data) return '';

  return (
    <>
      <Expand
        currentTab={actionText}
        tabList={tabList}
        onTabChange={onTabChange}
        info={
          isHideInfo
            ? false
            : {
                limit: `$${formatBorrowLimit(2, '', data)}`,
                supply: `${balanceFormatter(state.balance)} ${tokenSymbol}`,
                borrow: `${balanceFormatter(state.userAvailableBorrow)} ${tokenSymbol}`
              }
        }
      >
        <div style={{ width: '500px' }}>
          <TopBox className={isForCollateral ? 'none-border' : ''}>
            {!isForCollateral && (
              <>
                <BoxItem>
                  <InputMain>
                    <Input
                      value={state.amount}
                      onChange={(ev) => {
                        if (isNaN(Number(ev.target.value))) return;
                        handleAmountChange(ev.target.value.replace(/\s+/g, ''));
                        setState((prevState) => ({
                          ...prevState,
                          isMax: Big(ev.target.value.replace(/\s+/g, '') || 0).eq(currentBalance || 0)
                        }));
                      }}
                      placeholder="0.0"
                    />
                    <TokenSelect>
                      <LazyImage src={tokenIcon} style={{ width: '20px', height: '20px' }} />
                      <TokenSymbol>{tokenSymbol}</TokenSymbol>
                    </TokenSelect>
                  </InputMain>
                  <InputFoot>
                    <BalanceValue>
                      ≈ ${state.amount ? Big(state.amount).mul(data.underlyingPrice).toFixed(2) : '-'}
                    </BalanceValue>
                    <BalanceWrapper
                      onClick={() => {
                        if (state.balanceLoading || isNaN(Number(currentBalance))) return;
                        handleAmountChange(currentBalance);
                        const balanceNumber = Big(currentBalance || 0);
                        const balanceStr = Big(balanceNumber).toFixed(18, 0);
                        setState((prevState) => ({
                          ...prevState,
                          amount: Big(balanceStr).eq(0) ? '0' : balanceStr.replace(/0+$/, '').replace(/\.$/, ''),
                          isMax: true
                        }));
                      }}
                    >
                      <Label>Balance:</Label>&nbsp;<Balance>{formatBalance()}</Balance>&nbsp;
                      <Label>{tokenSymbol}</Label>
                    </BalanceWrapper>
                  </InputFoot>
                </BoxItem>
                {isSupply && (
                  <LendingProcess
                    value={state.processValue}
                    onChange={(value) => {
                      let currencyDecimals = data.decimals;
                      if (isUnderlying && data.underlyingToken) {
                        currencyDecimals = data.underlyingToken.decimals;
                      }
                      const _amountFormatter = (_amount: string) => {
                        return _amount.replace(/[.]?0*$/, '');
                      };
                      // 100% use balance directly
                      if (value === 100) {
                        const balanceNumber = Big(currentBalance || 0);
                        const balanceStr = Big(balanceNumber).toFixed(12);
                        const _amount = Big(balanceStr).eq(0)
                          ? '0'
                          : _amountFormatter(Big(balanceStr).toFixed(currencyDecimals));
                        setState((prevState) => ({
                          ...prevState,
                          processValue: value,
                          amount: _amount
                        }));
                        handleAmountChange(_amount);
                        return;
                      }
                      let amount = Big(currentBalance)
                        .mul(value / 100)
                        .toFixed(currencyDecimals, 0);
                      amount = _amountFormatter(amount);
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
            <BoxItem className="no-bg">
              {actionText === ActionType.Supply && (
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
                      <LendingArrowIcon color={'#979ABE'} className="mx_5" />
                      <Value>${Big(state.borrowLimit).toFixed(2)}</Value>
                    </>
                  )}
                </ValuesWrapper>
              </Row>
              {actionText === ActionType.Repay && (
                <Row>
                  <Label>Remaining Debt</Label>
                  <ValuesWrapper>
                    <Value className={!!state.borrowBalance ? 'range' : ''}>
                      ${Big(data.userTotalBorrowUsd).toFixed(2)}
                    </Value>
                    {!!(isBorrow && state.borrowBalance) && (
                      <>
                        <LendingArrowIcon color={'#979ABE'} className="mx_5" />
                        <Value>${Big(state.borrowBalance).toFixed(2)}</Value>
                      </>
                    )}
                  </ValuesWrapper>
                </Row>
              )}
            </BoxItem>
            <LendingDialogButton
              disabled={!state.buttonClickable}
              actionText={actionText}
              amount={state.isMax ? currentBalance : state.amount}
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
                onSuccess?.(data);
              }}
            />
          </BottomBox>
        </div>
      </Expand>

      {params.config.handler && (
        <VmComponent
          src={params.config.handler}
          props={{
            update: updateHandler,
            data: params,
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
    </>
  );
};

export default LendingAction;
