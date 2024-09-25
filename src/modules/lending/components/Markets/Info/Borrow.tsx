import Big from 'big.js';

import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';

import { StyledBorrowInfoKey, StyledBorrowInfoWrap, StyledInfo, StyledInfoContent } from './styles';

const LendingMarketBorrowInfo = (props: Props) => {
  const {
    underlyingToken,
    borrowToken,
    yourCollateral,
    yourBorrow,
    yourLends,
    maxLTV = 0,
    liquidationFee = 0,

    prices
  } = props;

  const getPrice = (symbol: string) => {
    if (symbol === 'weETH.mode') {
      return prices['weETH'];
    }
    return prices[symbol] || 1;
  };

  return (
    <StyledInfo>
      <StyledInfoContent>
        <StyledBorrowInfoWrap>
          <StyledBorrowInfoKey>Your Collateral:</StyledBorrowInfoKey>
          {formateValueWithThousandSeparatorAndFont(yourCollateral, 2, true)} {underlyingToken?.symbol} $
          {Big(yourCollateral || 0)
            .times(Big(getPrice(underlyingToken?.symbol)))
            .toFixed(2)}
        </StyledBorrowInfoWrap>
        <StyledBorrowInfoWrap>
          <StyledBorrowInfoKey>Your Borrow:</StyledBorrowInfoKey>
          {formateValueWithThousandSeparatorAndFont(yourBorrow, 2, true)} {borrowToken?.symbol} $
          {Big(yourBorrow || 0)
            .times(Big(getPrice(borrowToken?.symbol)))
            .toFixed(2)}
        </StyledBorrowInfoWrap>
        <StyledBorrowInfoWrap>
          <StyledBorrowInfoKey>Your Lend:</StyledBorrowInfoKey>
          {formateValueWithThousandSeparatorAndFont(yourLends, 2, true)} {borrowToken?.symbol} $
          {Big(yourLends || 0)
            .times(Big(getPrice(borrowToken?.symbol)))
            .toFixed(2)}
        </StyledBorrowInfoWrap>
        <StyledBorrowInfoWrap>
          <StyledBorrowInfoKey>Max LTV:</StyledBorrowInfoKey>
          {Big(maxLTV * 100).toFixed()}%
        </StyledBorrowInfoWrap>
        <StyledBorrowInfoWrap>
          <StyledBorrowInfoKey>Liquidation Fee:</StyledBorrowInfoKey>
          {Big(liquidationFee * 100).toFixed()}%
        </StyledBorrowInfoWrap>
      </StyledInfoContent>
    </StyledInfo>
  );
};

export default LendingMarketBorrowInfo;

interface Props {
  underlyingToken: any;
  borrowToken: any;
  yourCollateral?: string;
  yourBorrow?: string;
  yourLends?: string;
  maxLTV?: number;
  liquidationFee?: number;

  prices: any;
}
