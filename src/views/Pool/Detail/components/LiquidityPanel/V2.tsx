import Big from 'big.js';
import { memo, useMemo } from 'react';

import { usePriceStore } from '@/stores/price';
import { balanceFormated } from '@/utils/balance';

import {
  StyledAmount,
  StyledBox,
  StyledContainer as StyledContent,
  StyledFloat,
  StyledHeader,
  StyledInt,
  StyledPanel,
  StyledPanelRow,
  StyledTitle,
  StyledTokenIcon,
  StyledTokenValue,
  StyledValue,
} from '../Panel/styles';
import { StyledContainer, StyledLabelValue, StyledValueRow } from './styles';

const LiquidityPanel = ({ amount0, amount1, share, token0, token1 }: any) => {
  const prices = usePriceStore((store) => store.price);

  const { int, float, value0, value1 } = useMemo(() => {
    if (!prices || !token0 || !token1) return { int: '-', float: '-', value0: '-', value1: '-' };
    const _price0 = prices[token0.priceKey || token0.symbol];
    const _price1 = prices[token1.priceKey || token1.symbol];
    if ((amount0 || amount0 === 0) && !_price0) return { int: '-', float: '-', value0: '-', value1: '-' };
    if ((amount1 || amount1 === 0) && !_price1) return { int: '-', float: '-', value0: '-', value1: '-' };
    const value0 = new Big(amount0).mul(_price0);
    const value1 = new Big(amount1).mul(_price1);
    const total = value0.plus(value1).toFixed(18);
    const formatedTotal = balanceFormated(total, 2);
    const splits = formatedTotal.split('.');
    return {
      int: splits[0],
      float: splits[1],
      value0: value0.toString(),
      value1: value1.toString(),
    };
  }, [prices, amount0, amount1, token0, token1]);

  return (
    <StyledContainer
      style={{
        width: '100%',
      }}
    >
      <StyledContent
        style={{
          width: '100%',
          height: 308,
          paddingBottom: 6,
        }}
      >
        <StyledHeader>
          <StyledTitle>Liquidity</StyledTitle>
        </StyledHeader>

        <StyledValue>
          <StyledAmount>
            <StyledInt>$ {int || 0}.</StyledInt>
            <StyledFloat>{float || 0}</StyledFloat>
          </StyledAmount>
        </StyledValue>
        <StyledPanel style={{ height: 135 }}>
          <StyledPanelRow>
            <StyledBox>
              <StyledTokenIcon src={token0.icon} />
              <StyledTokenValue>{token0.symbol}</StyledTokenValue>
            </StyledBox>
            <StyledBox>
              <StyledTokenValue>{balanceFormated(amount0, 4)}</StyledTokenValue>
            </StyledBox>
          </StyledPanelRow>
          <StyledValueRow>
            <StyledLabelValue>${value0 !== '-' ? balanceFormated(value0, 2) : '-'}</StyledLabelValue>
          </StyledValueRow>
          <StyledPanelRow>
            <StyledBox>
              <StyledTokenIcon src={token1.icon} />
              <StyledTokenValue>{token1.symbol}</StyledTokenValue>
            </StyledBox>
            <StyledBox>
              <StyledTokenValue> {balanceFormated(amount1, 4)}</StyledTokenValue>
            </StyledBox>
          </StyledPanelRow>
          <StyledValueRow>
            <StyledLabelValue>${value1 !== '-' ? balanceFormated(value1, 2) : '-'}</StyledLabelValue>
          </StyledValueRow>
        </StyledPanel>
        <StyledPanelRow
          style={{
            paddingTop: 12,
          }}
        >
          <StyledLabelValue>Share of Pool</StyledLabelValue>
          <StyledTokenValue>{balanceFormated(share, 3)}%</StyledTokenValue>
        </StyledPanelRow>
      </StyledContent>
    </StyledContainer>
  );
};

export default memo(LiquidityPanel);
