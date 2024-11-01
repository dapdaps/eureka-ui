import Big from 'big.js';
import { useEffect, useState } from 'react';

import LendingTotal from '@/modules/lending/components/Total';
import { StyledFlex } from '@/styled/styles';
import { formatValueDecimal } from '@/utils/formate';

import { StyledInfo, StyledInfoContent, StyledInfoItem, StyledInfoTips, StyledInfoTitle, StyledLine } from './styles';

const LendingMarketInfo = (props: Props) => {
  const {
    userUnderlyingBalance,
    collateralFactor,
    underlyingPrice,
    dexConfig,
    localConfig,
    state,
    updateState,
    supplyApy,
    borrowApy
  } = props;

  console.log('====props', props);
  const getHealthFactor = (depositAmount, borrowAmount) => {
    let healthFactor = '';
    if (!depositAmount || !borrowAmount) {
      healthFactor = '∞';
    } else {
      const { prices, markets } = localConfig;
      const underlyingAddress = state?.currentBorrowToken?.underlyingAddress;
      const borrowPrice = prices[underlyingAddress];

      const CollateralCredit = Big(depositAmount).times(underlyingPrice).times(collateralFactor);
      const BorrowCredit = Big(borrowAmount).times(borrowPrice).times(markets[underlyingAddress]?.borrowFactor);
      if (Big(BorrowCredit).eq(0) || Big(CollateralCredit).eq(0)) {
        healthFactor = '∞';
      } else {
        healthFactor = Big(CollateralCredit).div(BorrowCredit).toFixed();
      }
    }
    updateState({
      healthFactor
    });
  };

  useEffect(() => {
    getHealthFactor(state?.amount, state?.borrowAmount);
  }, [state?.amount, state?.borrowAmount]);
  return (
    <StyledInfo>
      <StyledInfoContent>
        <StyledInfoTitle>Summary</StyledInfoTitle>

        <StyledFlex flexDirection="column" gap="8px">
          <StyledInfoItem>
            <span>Health Factor</span>
            <span>{isNaN(state?.healthFactor) ? '∞' : Big(state?.healthFactor).toFixed(2)}</span>
          </StyledInfoItem>
          <StyledInfoItem>
            <span>Mode</span>
            <span>General</span>
          </StyledInfoItem>
          <StyledLine />
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
          <StyledLine />
          <StyledInfoItem>
            <span>Deposit APY</span>
            {state?.amount ? <span>{supplyApy}</span> : <span>0.00%</span>}
          </StyledInfoItem>
          <StyledInfoItem>
            <span>Borrow APY</span>
            {state?.borrowAmount ? <span>-{borrowApy}</span> : <span>0.00%</span>}
          </StyledInfoItem>
          <StyledInfoItem>
            <span>Net APY</span>
            <span>General</span>
          </StyledInfoItem>
        </StyledFlex>

        {/* <StyledInfoTips>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5.5" stroke="#EBF479" />
            <path d="M6 6L6 9" stroke="#EBF479" strokeWidth="1.4" strokeLinecap="round" />
            <circle cx="6" cy="3.75" r="0.75" fill="#EBF479" />
          </svg>
          <div>To borrow you need to supply any asset to be used as collateral.</div>
        </StyledInfoTips> */}
      </StyledInfoContent>
    </StyledInfo>
  );
};

export default LendingMarketInfo;

interface Props {
  userUnderlyingBalance?: string;
  underlyingPrice?: string;
  dexConfig: any;
  from?: string;
}
