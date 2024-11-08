import Big from 'big.js';
import { useEffect, useState } from 'react';

import LendingTotal from '@/modules/lending/components/Total';
import { StyledFlex } from '@/styled/styles';
import { formatValueDecimal } from '@/utils/formate';

import { StyledInfo, StyledInfoContent, StyledInfoItem, StyledInfoTips, StyledInfoTitle, StyledLine } from './styles';

const LendingMarketInfo = (props: any) => {
  const { underlyingPrices, usdcPrice, data, state, markets, dexConfig, updateState } = props;

  const { supplyApy, borrowApy, underlyingPrice, collateralFactor, userUnderlyingBalance } = data;

  console.log('====props', props);

  const getHealthFactor = (depositAmount: string, borrowAmount: string) => {
    let healthFactor: any = '';
    if (!depositAmount || !borrowAmount) {
      healthFactor = Infinity;
    } else {
      // const { prices, markets } = localConfig;
      const underlyingAddress = state?.currentBorrowToken?.underlyingAddress;
      const borrowPrice = underlyingPrices?.[underlyingAddress];
      console.log('===borrowPrice', borrowPrice);
      console.log('====underlyingAddress', underlyingAddress);
      console.log('====markets', markets);
      console.log('===markets[underlyingAddress]', markets[underlyingAddress]);
      const CollateralCredit = Big(depositAmount).times(underlyingPrice).times(collateralFactor);
      const BorrowCredit = Big(borrowAmount)
        .times(borrowPrice)
        .times(markets[underlyingAddress]?.borrowFactor ?? 0);

      console.log('===BorrowCredit', BorrowCredit);
      if (Big(BorrowCredit).eq(0) || Big(CollateralCredit).eq(0)) {
        healthFactor = Infinity;
      } else {
        healthFactor = Big(CollateralCredit).div(BorrowCredit).toFixed();
      }
    }
    updateState({
      healthFactor
    });
  };
  // const getNetApy = (depositAmount: string, borrowAmount: string) => {

  // }
  useEffect(() => {
    // getNetApy(state?.amount, state?.borrowAmount)
    getHealthFactor(state?.amount, state?.borrowAmount);
  }, [state?.amount, state?.borrowAmount]);

  return (
    <StyledInfo>
      <StyledInfoContent>
        <StyledInfoTitle>Summary</StyledInfoTitle>

        <StyledFlex flexDirection="column" gap="8px">
          <StyledInfoItem>
            <span>Health Factor</span>
            <span>{isFinite(state?.healthFactor) ? Big(state?.healthFactor ?? 0).toFixed(2) : '∞'}</span>
          </StyledInfoItem>
          <StyledInfoItem>
            <span>Mode</span>
            <span>General</span>
          </StyledInfoItem>
          <StyledInfoItem>
            <span>Deposit Value</span>
            <span>{formatValueDecimal(state?.amount || 0, '$', 2, false, false)}</span>
          </StyledInfoItem>
          {state?.tab?.indexOf('Borrow') > -1 && (
            <StyledInfoItem>
              <span>Borrow Value</span>
              <span>{formatValueDecimal(state?.borrowAmount || 0, '$', 2, false, false)}</span>
            </StyledInfoItem>
          )}
          <StyledInfoItem>
            <span>Deposit APY</span>
            {state?.amount ? <span>{Big(supplyApy).times(100).toFixed(2)}%</span> : <span>0.00%</span>}
          </StyledInfoItem>
          <StyledInfoItem>
            <span>Borrow APY</span>
            {state?.borrowAmount ? <span>-{Big(borrowApy).times(100).toFixed(2)}%</span> : <span>0.00%</span>}
          </StyledInfoItem>
          <StyledInfoItem>
            <span>Net APY</span>
            <span>-</span>
          </StyledInfoItem>
        </StyledFlex>
      </StyledInfoContent>
    </StyledInfo>
  );
};

export default LendingMarketInfo;
