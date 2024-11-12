import Big from 'big.js';
import { useEffect, useState } from 'react';

import LendingTotal from '@/modules/lending/components/Total';
import { StyledFlex } from '@/styled/styles';
import { formatValueDecimal } from '@/utils/formate';

import { StyledInfo, StyledInfoContent, StyledInfoItem, StyledInfoTips, StyledInfoTitle, StyledLine } from './styles';

const LendingMarketInfo = (props: any) => {
  const { underlyingPrices, usdcPrice, data, state, markets, dexConfig, updateState } = props;

  const { supplyApy, borrowApy, underlyingPrice, collateralFactor, userUnderlyingBalance } = data;

  const getHealthFactor = (depositAmount: string, borrowAmount: string) => {
    let healthFactor: any = '';
    if (!depositAmount || !borrowAmount) {
      healthFactor = Infinity;
    } else {
      // const { prices, markets } = localConfig;
      const underlyingAddress = state?.currentBorrowToken?.underlyingAddress;
      const borrowPrice = underlyingPrices?.[underlyingAddress];
      const CollateralCredit = Big(depositAmount).times(underlyingPrice).times(collateralFactor);
      const BorrowCredit = Big(borrowAmount)
        .times(borrowPrice)
        .times(markets[underlyingAddress]?.borrowFactor ?? 0);

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
  const getWeightedAverageAPY = (totalBalanceUSD: any, tokens: any, type: 'deposit' | 'borrow') => {
    let weightedAverageAPY = Big(0);
    tokens?.forEach((token: any) => {
      const [address, amount] = token;
      const market = markets[address];
      const positionBalanceUSD = Big(amount).times(underlyingPrices[address]).div(usdcPrice);
      const positionAPY = Big(type === 'deposit' ? market?.supplyApy : market?.borrowApy);

      weightedAverageAPY = Big(weightedAverageAPY).plus(
        Big(totalBalanceUSD).eq(0) ? 0 : Big(positionBalanceUSD).times(positionAPY).div(totalBalanceUSD)
      );
    });
    return weightedAverageAPY.toFixed();
  };
  const getNetApy = (collaterals: any, borrows: any) => {
    if (collaterals?.length > 0) {
      const totalSuppliedUSD = collaterals?.reduce(
        (accumulator: any, curr: any) =>
          Big(accumulator).plus(
            Big(curr?.[1] ?? 0)
              .times(underlyingPrices[curr?.[0]])
              .div(usdcPrice)
          ),
        0
      );
      const weightedAverageSupplyAPY = getWeightedAverageAPY(totalSuppliedUSD, collaterals, 'deposit');
      const totalBorrowedUSD =
        borrows?.reduce(
          (accumulator: any, curr: any) =>
            Big(accumulator).plus(
              Big(curr?.[1] ?? 0)
                .times(underlyingPrices[curr?.[0]])
                .div(usdcPrice)
            ),
          0
        ) ?? 0;

      if (Big(totalSuppliedUSD).eq(0)) {
        return NaN;
      } else if (Big(totalBorrowedUSD).eq(0)) {
        return Big(weightedAverageSupplyAPY).toFixed();
      } else {
        const weightedAverageBorrowAPY = getWeightedAverageAPY(totalBorrowedUSD, borrows, 'borrow');
        return Big(weightedAverageSupplyAPY)
          .minus(Big(weightedAverageBorrowAPY).times(Big(totalBorrowedUSD).div(totalSuppliedUSD)))
          .toFixed();
      }
    } else {
      return NaN;
    }
  };
  useEffect(() => {
    if (Big(state?.amount ? state?.amount : 0).gt(0)) {
      const netApy = getNetApy(
        [[data?.address, state?.amount]],
        [[state?.currentBorrowToken?.underlyingAddress, state?.borrowAmount ? state?.borrowAmount : 0]]
      );
      updateState({
        netApy
      });
    }
    getHealthFactor(state?.amount, state?.borrowAmount);
  }, [state?.amount, state?.borrowAmount]);

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
            <span>{!state?.netApy || isNaN(state?.netApy) ? '0.00' : Big(state?.netApy).times(100).toFixed(2)}%</span>
          </StyledInfoItem>
        </StyledFlex>
      </StyledInfoContent>
    </StyledInfo>
  );
};

export default LendingMarketInfo;
