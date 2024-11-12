import Big from 'big.js';
import { useEffect, useState } from 'react';

import LendingTotal from '@/modules/lending/components/Total';
import { StyledFlex } from '@/styled/styles';
import { formatValueDecimal } from '@/utils/formate';

import useFunctions from '../../../Yours/hooks/useFunctions';
import { StyledInfo, StyledInfoContent, StyledInfoItem, StyledInfoTips, StyledInfoTitle, StyledLine } from './styles';

const LendingMarketInfo = (props: any) => {
  const { getMode, getNetApy, getHealthFactor } = useFunctions();
  const { underlyingPrices, usdcPrice, data, state, markets, dexConfig, updateState } = props;

  const { supplyApy, borrowApy, underlyingPrice, collateralFactor, userUnderlyingBalance } = data;

  useEffect(() => {
    if (Big(state?.amount ? state?.amount : 0).gt(0)) {
      const netApy = getNetApy(
        [[data?.address, state?.amount]],
        [[state?.currentBorrowToken?.address, state?.borrowAmount ? state?.borrowAmount : 0]],
        markets,
        underlyingPrices
      );
      const mode = getMode(
        [
          {
            ...data
          }
        ],
        Big(state?.borrowAmount ? state?.borrowAmount : 0).gt(0)
          ? [
              {
                ...state?.currentBorrowToken
              }
            ]
          : []
      );
      updateState({
        mode,
        netApy
      });
    } else {
      updateState({
        mode: 'general',
        netApy: ''
      });
    }

    if (Big(state?.amount ? state?.amount : 0).gt(0)) {
      console.log('=====1111=====');
      const healthFactor = getHealthFactor(
        [
          {
            ...data,
            amount: state?.amount
          }
        ],
        Big(state?.borrowAmount ? state?.borrowAmount : 0).gt(0)
          ? [
              {
                ...state?.currentBorrowToken,
                amount: state?.borrowAmount
              }
            ]
          : [],
        underlyingPrices
      );
      updateState({
        healthFactor
      });
    } else {
      updateState({
        healthFactor: Infinity
      });
    }
  }, [state?.amount, state?.borrowAmount, data?.address, state?.currentBorrowToken?.underlyingAddress]);

  return (
    <StyledInfo>
      <StyledInfoContent>
        <StyledInfoTitle>Summary</StyledInfoTitle>

        <StyledFlex flexDirection="column" gap="8px">
          <StyledInfoItem>
            <span>Health Factor</span>
            <span
              style={{
                color: isFinite(state?.healthFactor) && Big(state?.healthFactor ?? 0).lt(1.02) ? 'red' : 'inherit'
              }}
            >
              {isFinite(state?.healthFactor) ? Big(state?.healthFactor ?? 0).toFixed(2) : '∞'}
            </span>
          </StyledInfoItem>
          <StyledInfoItem>
            <span>Mode</span>
            <span>{state?.mode}</span>
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
            <span>{!state?.netApy || isNaN(state?.netApy) ? '0.00' : Big(state?.netApy).times(100).toFixed(2)}%</span>
          </StyledInfoItem>
        </StyledFlex>
      </StyledInfoContent>
    </StyledInfo>
  );
};

export default LendingMarketInfo;
