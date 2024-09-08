import { useDebounceFn } from 'ahooks';
import Big from 'big.js';
import { ethers } from 'ethers';
import { useEffect, useMemo } from 'react';

import useAccount from '@/hooks/useAccount';
import LendingDialogButton from '@/modules/lending/components/Button';
import ArrowIcon from '@/modules/lending/components/Dialog/ArrowIcon';
import CloseIcon from '@/modules/lending/components/Dialog/CloseIcon';
import LendingProcess from '@/modules/lending/components/Process';
import { useDynamicLoader, useMultiState } from '@/modules/lending/hooks';

import {
  Apy,
  AssetLabel,
  AssetWrapper,
  Balance,
  BalanceValue,
  BalanceWrapper,
  BottomBox,
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
  StyledCloseIcon,
  Title,
  Token,
  TokenLogo,
  TokenSelect,
  TokenSymbol,
  TopBox,
  Value,
  ValuesWrapper
} from './styles';

const ERC20_ABI = [
  {
    constant: true,
    inputs: [
      {
        name: '_owner',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        name: 'balance',
        type: 'uint256'
      }
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function'
  }
];

const LendingDialog = (props: Props) => {
  const {
    display,
    data,
    chainId,
    onClose,
    onSuccess,
    source,
    account,
    from,
    dexConfig,
    curPool
  } = props;

  const { provider } = useAccount();
  const [Handler] = useDynamicLoader({ path: '/lending/handlers', name: dexConfig.loaderName });

  const [state, updateState] = useMultiState<any>({
    amount: '',
    processValue: 0,
    updateHandler: Date.now()
  });

  const actionText = useMemo(() => data?.actionText, [data]);
  const isSupply = useMemo(() => ['Deposit', 'Withdraw'].includes(actionText), [actionText]);
  const isBorrow = useMemo(() => ['Repay', 'Borrow'].includes(actionText), [actionText]);
  const isForCollateral = useMemo(() => !isSupply && !isBorrow, [isSupply, isBorrow]);

  const tokenSymbol = useMemo(() => data?.underlyingToken?.symbol, [data]);

  const getAvailable = (_balance: any) => {
    if (!_balance) return '-';
    if (actionText !== 'Repay') return _balance;
    if (Big(_balance).lt(data?.userBorrow || 0)) return _balance;
    if (Big(_balance).gt(data?.userBorrow || 0)) return data.userBorrow;
  };

  const getBalance = () => {
    const isUnderlying = ['Deposit', 'Repay'].includes(actionText);
    updateState({
      balanceLoading: true
    });
    if (isUnderlying && data.underlyingToken.isNative) {
      provider
        .getBalance(account)
        .then((rawBalance: any) => {
          updateState({
            balance: getAvailable(ethers.utils.formatUnits(rawBalance._hex, 18)),
            balanceLoading: false
          });
        });
      return;
    }
    if (isUnderlying && data?.underlyingToken?.address) {
      const TokenContract = new ethers.Contract(
        data.underlyingToken.address,
        ERC20_ABI,
        provider.getSigner()
      );
      TokenContract.balanceOf(account).then((rawBalance: any) => {
        const _rawBalance = ethers.utils.formatUnits(
          rawBalance._hex,
          data.underlyingToken.decimals
        );
        updateState({
          balance: getAvailable(_rawBalance),
          balanceLoading: false
        });
      });
      return;
    }

    if (actionText === 'Withdraw') {
      updateState({
        balance: Big(data.userSupply).toFixed(6, 0),
        balanceLoading: false
      });
      return;
    }
    if (actionText === 'Borrow') {
      const borrowAvailable = Big(data?.totalCollateralUsd)
        .minus(data?.userTotalBorrowUsd)
        .div(data?.underlyingPrice || 1);
      updateState({
        balance: borrowAvailable.gt(0) ? Big(borrowAvailable).toString() : '0.00',
        balanceLoading: false
      });
      return;
    }
  };

  const getTrade = () => {
    updateState({
      loading: true
    });
  };

  const { run: debouncedGetTrade } = useDebounceFn(
    () => {
      getTrade();
    },
    {
      wait: 500
    }
  );

  useEffect(() => {
    updateState({ updateHandler: Date.now() });
  }, [data, state.amount, account]);

  useEffect(() => {
    if (data && display) {
      let borromLimit: any = '';
      const _borrowLimit = Big(data.totalCollateralUsd).minus(
        data.userTotalBorrowUsd
      );
      let buttonClickable = false;
      if (actionText === 'Enable as Collateral') {
        borromLimit = _borrowLimit.add(
          Big(data.loanToValue / 100)
            .mul(data.userSupply || 0)
            .mul(data.underlyingPrice)
        );
        buttonClickable = true;
      }
      if (actionText === 'Disable as Collateral') {
        borromLimit = _borrowLimit.minus(
          Big(data.loanToValue / 100)
            .mul(data.userSupply || 0)
            .mul(data.underlyingPrice)
        );

        buttonClickable = Big(data.userTotalBorrowUsd).eq(0)
          ? true
          : !borromLimit.lt(0);
      }
      updateState({
        borrowLimit: borromLimit
          ? !borromLimit.gt(0)
            ? '0.00'
            : borromLimit.toFixed(2)
          : '',
        amount: '',
        buttonClickable,
        processValue: 0,
        borrowBalance: ''
      });
      getBalance();
      localStorage.setItem('prevAddress', data.address);
    }
  }, [display, data, actionText, provider, account]);

  const formatBorrowLimit = (digits: any, round?: any) => {
    if (data.config.name === 'Ionic') {
      const currentTokenCollateralUSD = Big(data.userCollateralUSD || 0).times(
        Big(data.COLLATERAL_FACTOR)
      );

      const _borrowLimit = Big(data.totalCollateralUsd)
        .minus(currentTokenCollateralUSD)
        .div(1.07)
        .minus(Big(data.userTotalBorrowUsd));
      return _borrowLimit.lte(0) ? 0 : _borrowLimit.toFixed(6);
    } else {
      if (Big(data.totalCollateralUsd).gt(data.userTotalBorrowUsd)) {
        return Big(data.totalCollateralUsd)
          .minus(data.userTotalBorrowUsd)
          .toFixed(digits || 2, round || 1);
      }
      return '0.00';
    }
  };

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
      updateState({
        amount,
        buttonClickable: false,
        borrowLimit: '',
        borrowLimitUsed: '',
        borrowBalance: '',
        isEmpty: Number(amount) === 0 && amount !== '',
        isOverSize: false,
        isBigerThanBalance: false
      });
      return;
    }

    const precent = !Big(state.balance || 0).eq(0)
      ? Big(amount).div(state.balance).mul(100)
      : Big(0);
    const params: any = {
      amount: amount,
      processValue: precent.gt(100) ? 100 : precent.toNumber()
    };
    let isOverSize = false;
    const value = Big(Big(amount).mul(data.underlyingPrice).toFixed(20));
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
        isOverSize = value.gt(
          Big(data.totalCollateralUsd).minus(data.userTotalBorrowUsd)
        );
        params.borrowLimit = Big(data.totalCollateralUsd || 0)
          .minus(data.userTotalBorrowUsd || 0)
          .minus(value || 0);
      }
      if (actionText === 'Repay') {
        params.borrowBalance = Big(data.userTotalBorrowUsd).minus(value);
        params.borrowLimit = Big(data.totalCollateralUsd)
          .minus(data.userTotalBorrowUsd)
          .add(value);
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
    updateState(params);
  };

  const handleClose = () => {
    onClose?.();
    localStorage.setItem('prevAddress', '');
  };

  if (!data) return null;

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
                {isForCollateral ? 'Collateral' : actionText}
                {!isForCollateral && tokenSymbol}
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
              {from === 'layer' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  onClick={handleClose}
                >
                  <circle cx="13" cy="13" r="13" fill="black" />
                  <path
                    d="M14.4079 13L17.6604 9.74757C17.9049 9.503 17.9466 9.14818 17.7537 8.95529L17.0445 8.24614C16.8516 8.05316 16.4972 8.0955 16.2522 8.3399L13.0001 11.5923L9.74772 8.33998C9.50315 8.09517 9.14833 8.05316 8.95536 8.24638L8.2462 8.95562C8.05332 9.14826 8.09508 9.50308 8.33997 9.74765L11.5924 13L8.33997 16.2527C8.09548 16.4971 8.05315 16.8516 8.2462 17.0446L8.95536 17.7539C9.14833 17.9468 9.50315 17.905 9.74772 17.6605L13.0003 14.4079L16.2523 17.66C16.4973 17.9051 16.8516 17.9468 17.0446 17.7539L17.7538 17.0446C17.9466 16.8516 17.9049 16.4971 17.6605 16.2523L14.4079 13Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <StyledCloseIcon>
                  <CloseIcon
                    size={18}
                    onClose={handleClose}
                  />
                </StyledCloseIcon>
              )}
            </Header>
            {isForCollateral && (
              <CollateralToken>
                {actionText === 'Disable as Collateral'
                  ? 'Disabling'
                  : 'Enabling'}
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
                      updateState({
                        isMax: Big(ev.target.value.replace(/\s+/g, '') || 0).eq(
                          state.balance || 0
                        )
                      });
                    }}
                    placeholder="0.0"
                  />
                  <TokenSelect>
                    <TokenSymbol>{tokenSymbol}</TokenSymbol>
                  </TokenSelect>
                </InputWrapper>
                <InputBalance>
                  <BalanceValue>
                    ≈ $
                    {state.amount
                      ? Big(state.amount).mul(data.underlyingPrice).toFixed(2)
                      : '-'}
                  </BalanceValue>
                  <BalanceWrapper
                    onClick={(ev) => {
                      if (state.balanceLoading || isNaN(state.balance)) return;
                      handleAmountChange(state.balance);
                      updateState({
                        amount: Big(state.balance || 0).toFixed(12),
                        isMax: true
                      });
                    }}
                  >
                    Available
                    <Balance>{formatBalance()}</Balance>
                  </BalanceWrapper>
                </InputBalance>
                {isSupply && (
                  <LendingProcess
                    value={state.processValue}
                    onChange={(value) => {
                      const amount = Big(state.balance || 0)
                        .mul(+value / 100)
                        .toFixed(4, 0);
                      updateState({
                        processValue: value,
                        amount
                      });
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

                {/* <Row>
                 <Label>Use as Collateral</Label>
                 <Value>
                 <Widget
                 src="bluebiu.near/widget/Avalanche.Lending.Switch"
                 props={{
                 disabled: true,
                 active: data.userMerberShip,
                 }}
                 />
                 </Value>
                 </Row> */}
              </>
            )}
            <Row className={isForCollateral ? 'justfiy-start' : ''}>
              <Label>Borrow Limit</Label>
              <ValuesWrapper>
                <Value className={!!state.borrowLimit ? 'range' : ''}>
                  ${formatBorrowLimit(2)}
                </Value>
                {!!state.borrowLimit && (
                  <>
                    <div className="mx_5">
                      <ArrowIcon
                        color="#979ABE"
                        className="mx_5"
                      />
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
                  {(isBorrow && state.borrowBalance) && (
                    <>
                      <div className="mx_5">
                        <ArrowIcon
                          color="#979ABE"
                          className="mx_5"
                        />
                      </div>
                      <Value>${Big(state.borrowBalance).toFixed(2)}</Value>
                    </>
                  )}
                </ValuesWrapper>
              </Row>
            )}
            {/* {!!state.isOverSize && (
             <Tips style={{ marginBottom: 0 }}>
             <div className="icon">
             <Widget src="bluebiu.near/widget/0vix.LendingInfoIcon" />
             </div>
             Amount must be &lt;= 99% borrow limit.
             </Tips>
             )}
             {!!state.isEmpty && (
             <Tips style={{ marginBottom: 0 }}>
             <div className="icon">
             <Widget src="bluebiu.near/widget/0vix.LendingInfoIcon" />
             </div>
             Amount must be &gt;0
             </Tips>
             )}
             {!!state.isBigerThanBalance && (
             <Tips style={{ marginBottom: 0 }}>
             <div className="icon">
             <Widget src="bluebiu.near/widget/0vix.LendingInfoIcon" />
             </div>
             Amount must be &lt;= balance
             </Tips>
             )} */}
            <LendingDialogButton
              disabled={!state.buttonClickable}
              actionText={actionText}
              amount={state.isMax ? state.balance : state.amount}
              data={data}
              addAction={props.addAction}
              toast={props.toast}
              chainId={chainId}
              unsignedTx={state.unsignedTx}
              isError={state.isError}
              loading={state.loading}
              gas={state.gas}
              account={account}
              onApprovedSuccess={() => {}}
              onSuccess={() => {
                handleClose();
                onSuccess?.();
              }}
            />
          </BottomBox>
        </Content>
      </Overlay>
      {data.config.handler && Handler && (
        <Handler
          provider={provider}
          update={state.updateHandler}
          chainId={chainId}
          data={data}
          account={account}
          amount={state.amount}
          curPool={curPool}
          onLoad={(_data: any) => {
            console.log('Dialog-handler-onLoad--', _data);
            updateState({
              ..._data,
              loading: false
            });
          }}
        />
      )}
    </Dialog>
  );
};

export default LendingDialog;

export interface Props {
  display: boolean;
  data: any;
  chainId: number;
  source: string;
  account: string;
  from: string;
  dexConfig: any;
  addAction: any;
  toast: any;
  curPool?: any;

  onClose(): void;

  onSuccess(): void;
}
