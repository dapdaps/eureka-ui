import Big from 'big.js';

import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';

import { StyledBorrowInfoKey, StyledBorrowInfoWrap, StyledInfo, StyledInfoContent } from './styles';

const LendingMarketEarnInfo = (props: Props) => {
  const {
    borrowToken,
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
          <StyledBorrowInfoKey>Your Deposited:</StyledBorrowInfoKey>
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

export default LendingMarketEarnInfo;

interface Props {
  borrowToken: any;
  yourLends?: string;
  maxLTV?: number;
  liquidationFee?: number;

  prices: any;
}
