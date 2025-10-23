import Big from 'big.js';
import { useMemo } from 'react';

import { formateValueWithThousandSeparatorAndFont } from '@/utils/formate';

import { StyledBorrowInfoKey, StyledBorrowInfoWrap, StyledInfo, StyledInfoContent } from './styles';

const LendingMarketEarnInfo = (props: Props) => {
  const {
    borrowToken,
    yourDeposited,
    maxLTV = 0,
    liquidationFee = 0,
    symbol,
    prices,
    tokenTal,
    wrappedTokenAddress,
    address
  } = props;

  const getPrice = (symbol: string) => {
    if (symbol === 'weETH.mode') {
      return prices['weETH'];
    }
    return prices[symbol] || 1;
  };

  const tokenTalData = useMemo(() => {
    if (!wrappedTokenAddress) {
      const data = tokenTal.find((item: any) => item.address.toLowerCase() === address?.toLowerCase());
      return data ? data.talUsdTotal : '-';
    } else {
      return '-';
    }
  }, [tokenTal, wrappedTokenAddress, address]);

  return (
    <StyledInfo>
      <StyledInfoContent>
        <StyledBorrowInfoWrap>
          <StyledBorrowInfoKey>Your Deposited:</StyledBorrowInfoKey>
          {formateValueWithThousandSeparatorAndFont(yourDeposited, 2, true)} {symbol} $
          {Big(yourDeposited || 0)
            .times(Big(getPrice(symbol)))
            .toFixed(2)}
        </StyledBorrowInfoWrap>

        {!wrappedTokenAddress && (
          <StyledBorrowInfoWrap>
            <StyledBorrowInfoKey>Total Available Liquidity:</StyledBorrowInfoKey>${tokenTalData}
          </StyledBorrowInfoWrap>
        )}

        {/* <StyledBorrowInfoWrap>
          <StyledBorrowInfoKey>Max LTV:</StyledBorrowInfoKey>
          {Big(maxLTV * 100).toFixed(2, Big.roundDown)}%
        </StyledBorrowInfoWrap>
        <StyledBorrowInfoWrap>
          <StyledBorrowInfoKey>Liquidation Fee:</StyledBorrowInfoKey>
          {Big(liquidationFee * 100).toFixed()}%
        </StyledBorrowInfoWrap> */}
      </StyledInfoContent>
    </StyledInfo>
  );
};

export default LendingMarketEarnInfo;

interface Props {
  borrowToken: any;
  yourDeposited?: string;
  maxLTV?: number;
  liquidationFee?: number;
  symbol: string;
  prices: any;
  tokenTal: any;
  wrappedTokenAddress?: string;
  address?: string;
}
