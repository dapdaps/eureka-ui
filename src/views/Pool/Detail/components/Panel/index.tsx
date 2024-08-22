import Big from 'big.js';
import { memo, useMemo } from 'react';

import { usePriceStore } from '@/stores/price';
import { balanceFormated } from '@/utils/balance';
import Button from '@/views/Pool/components/Button';

import {
  StyledAmount,
  StyledBox,
  StyledContainer,
  StyledFloat,
  StyledHeader,
  StyledInt,
  StyledPanel,
  StyledPanelRow,
  StyledTitle,
  StyledTokenIcon,
  StyledTokenPercent,
  StyledTokenValue,
  StyledValue,
} from './styles';

// type 1 for Liquidity, 2 for Unclaimed fees
const Panel = ({ type, token0, token1, amount0, amount1, currentPrice, style = {}, onCollect }: any) => {
  const prices = usePriceStore((store) => store.price);

  const [percent0, percent1] = useMemo(() => {
    if (isNaN(Number(amount0)) || isNaN(Number(amount1)) || isNaN(Number(currentPrice)) || type === 2)
      return ['-', '-'];
    const _amount0 = Big(amount0);
    const _amount1 = new Big(amount1).mul(1 / currentPrice);
    const total = _amount0.add(_amount1);

    return !total.eq(0)
      ? [_amount0.div(total).mul(100).toFixed(2, 0), _amount1.div(total).mul(100).toFixed(2, 0)]
      : [0, 0];
  }, [amount0, amount1, currentPrice]);

  const collectClickable = useMemo(
    () => new Big(amount0 || 0).gt(0) || new Big(amount1 || 0).gt(0),
    [amount0, amount1],
  );
  const { int, float } = useMemo(() => {
    if (!prices || !token0 || !token1) return { int: '-', float: '-' };
    const _price0 = prices[token0.priceKey || token0.symbol];
    const _price1 = prices[token1.priceKey || token1.symbol];
    if ((amount0 || amount0 === 0) && !_price0) return { int: '-', float: '-' };
    if ((amount1 || amount1 === 0) && !_price1) return { int: '-', float: '-' };
    const value0 = new Big(amount0).mul(_price0);
    const value1 = new Big(amount1).mul(_price1);
    const total = value0.plus(value1).toFixed(18);
    const formatedTotal = balanceFormated(total, 2);
    const splits = formatedTotal.split('.');
    return {
      int: splits[0],
      float: splits[1],
    };
  }, [prices, amount0, amount1, token0, token1]);
  return (
    <StyledContainer style={style}>
      <StyledHeader>
        <StyledTitle>{type === 1 ? 'Liquidity' : 'Unclaimed fees'}</StyledTitle>
        {type === 2 && collectClickable && (
          <Button onClick={onCollect} style={{ width: 106, height: 35 }}>
            Collect fees
          </Button>
        )}
      </StyledHeader>

      <StyledValue>
        <StyledAmount>
          <StyledInt>$ {int || 0}.</StyledInt>
          <StyledFloat>{float || 0}</StyledFloat>
        </StyledAmount>
      </StyledValue>
      <StyledPanel>
        <StyledPanelRow>
          <StyledBox>
            <StyledTokenIcon src={token0.icon} />
            <StyledTokenValue>{token0.symbol}</StyledTokenValue>
          </StyledBox>
          <StyledBox>
            <StyledTokenValue>{balanceFormated(amount0, 4)}</StyledTokenValue>
            {type === 1 && <StyledTokenPercent>{percent0}%</StyledTokenPercent>}
          </StyledBox>
        </StyledPanelRow>
        <StyledPanelRow>
          <StyledBox>
            <StyledTokenIcon src={token1.icon} />
            <StyledTokenValue>{token1.symbol}</StyledTokenValue>
          </StyledBox>
          <StyledBox>
            <StyledTokenValue> {balanceFormated(amount1, 4)}</StyledTokenValue>
            {type === 1 && <StyledTokenPercent>{percent1}%</StyledTokenPercent>}
          </StyledBox>
        </StyledPanelRow>
      </StyledPanel>
    </StyledContainer>
  );
};

export default memo(Panel);
