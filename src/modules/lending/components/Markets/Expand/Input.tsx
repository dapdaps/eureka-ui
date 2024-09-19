import Big from 'big.js';

import LendingMarketInput from '@/modules/lending/components/Markets/Input';
import LendingTotal from '@/modules/lending/components/Total';

import { StyledBorrowLimit, StyledDetailItem, StyledDetailPanel } from './styles';

const LendingMarketExpandInput = (props: Props) => {
  const {
    underlyingToken,
    userUnderlyingBalance,
    underlyingPrice,
    collateralFactor,
    minBorrowAmount,
    loanToValue,
    totalBorrows,
    borrowCaps,

    state,
    updateState,

    borrowLimit,
    dexConfig
  } = props;

  const onAmountChange = (_amount: string) => {
    if (isNaN(Number(_amount))) return;
    if (_amount.split('.')[1]?.length > 18) return;
    const isZero = Big(_amount || 0).eq(0);
    if (isZero) {
      updateState({
        amount: _amount,
        buttonClickable: false,
        borrowLimit: '',
        isEmpty: Number(_amount) === 0 && _amount !== '',
        isOverSize: false,
        isBigerThanBalance: false
      });
      return;
    }
    if (dexConfig.name === 'Ionic' && state.tab === 'Borrow') {
      if (Big(_amount).lt(minBorrowAmount)) {
        updateState({
          amount: _amount,
          buttonClickable: false
        });
        return;
      }
    }
    const params: any = { amount: _amount };
    const value = Big(Big(_amount).mul(underlyingPrice).toFixed(20));
    if (state.tab === 'Supply') {
      params.borrowLimit = Big(borrowLimit || 0).plus(value.mul(loanToValue / 100));
      params.isBigerThanBalance = Big(_amount).gt(userUnderlyingBalance || 0);
      params.isOverSize = false;
    }
    if (state.tab === 'Borrow') {
      params.borrowLimit = Big(borrowLimit || 0).minus(value || 0);
      params.isBigerThanBalance = false;

      params.isOverSize = value.gt(borrowLimit || 0);

      if (dexConfig.name === 'Ionic') {
        if (Big(totalBorrows).gt(Big(borrowCaps))) {
          params.isBorrowCapsFull = true;
        }
      }
    }
    params.buttonClickable = !params.isOverSize && !params.isBigerThanBalance && !params.isBorrowCapsFull;
    updateState(params);

    state.debouncedGetTrade();
  };

  return (
    <>
      <LendingMarketInput
        icon={underlyingToken?.icon}
        symbol={underlyingToken?.symbol}
        decimals={underlyingToken?.decimals}
        balance={
          state.tab === 'Supply'
            ? userUnderlyingBalance
            : Big(borrowLimit || 0)
                .div(Big(underlyingPrice || 1).gt(0) ? 1 : underlyingPrice || 1)
                .toString()
        }
        price={underlyingPrice}
        amount={state.amount}
        onChange={onAmountChange}
      />
      <StyledDetailPanel>
        {state.tab === 'Supply' && dexConfig.name !== 'Ionic' && (
          <StyledDetailItem>
            <div>Collateral factor</div>
            <div className="white">{collateralFactor ? 'Enable' : 'Disable'}</div>
          </StyledDetailItem>
        )}
        <StyledDetailItem>
          <div>Borrow limit</div>
          <StyledBorrowLimit>
            <div>
              {' '}
              <LendingTotal total={borrowLimit} digit={2} unit="$" />
            </div>
            {!!state.borrowLimit && (
              <>
                {' '}
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="10" viewBox="0 0 8 10" fill="none">
                  <path
                    d="M7.5 4.13397C8.16667 4.51887 8.16667 5.48113 7.5 5.86603L1.5 9.33013C0.833334 9.71503 -4.47338e-07 9.2339 -4.13689e-07 8.4641L-1.10848e-07 1.5359C-7.71986e-08 0.766098 0.833333 0.284973 1.5 0.669873L7.5 4.13397Z"
                    fill="#979ABE"
                  />
                </svg>
                <div className="white">
                  {' '}
                  <LendingTotal total={state.borrowLimit} digit={2} unit="$" />
                </div>
              </>
            )}
          </StyledBorrowLimit>
        </StyledDetailItem>
      </StyledDetailPanel>
    </>
  );
};

export default LendingMarketExpandInput;

interface Props {
  underlyingToken: any;
  userUnderlyingBalance: string;
  underlyingPrice: string;
  collateralFactor: any;
  borrowLimit: string;
  dexConfig: any;
  state: any;
  minBorrowAmount: string;
  loanToValue: number;
  totalBorrows: string;
  borrowCaps: string;

  updateState(state: any): void;
}
