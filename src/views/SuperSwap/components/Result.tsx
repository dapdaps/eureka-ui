import { StyledFlex } from '@/styled/styles';
import styled from 'styled-components';
import { balanceFormated } from '@/utils/balance';
import Big from 'big.js';
import { StyledBestPrice } from '../styles';
import IconArrow from '@public/images/chains/arrorw-top.svg';
import IconAlertTriangle from '@public/images/chains/waring.svg';
import { useEffect, useMemo, useState } from 'react';
import { useSettingsStore } from '@/stores/settings';
import IconRefresh from '@public/images/refresh.svg';

type PriceImpactLevel = 'low' | 'medium' | 'high';

const Wrapper = styled.div`
  .trade-display {
    cursor: pointer;
  }
  .outputCurrency {
    cursor: pointer;
  }
`;

const StyledIconArrow = styled(IconArrow)<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? 'rotate(0deg)' : 'rotate(180deg)')};
  transition: transform 0.3s ease-in-out;
  color: ${({ isOpen }) => (isOpen ? '#fff' : '#53577B')};
`;

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 6px;
`;

const StylePriceContainer = styled.div<{ isOpen: boolean }>`
  overflow: hidden;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  padding: 12px 15px;
  border: 1px solid #373a53;
  border-radius: 10px;
  margin-top: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #53577b;
  font-size: 14px;
  line-height: 14px;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Value = styled.span`
  color: #979abe;
`;

export const PriceImpactTypeColorMap: Record<number, string> = {
  0: '#33b65f',
  1: '#F88C39',
  2: '#E956A6',
};

const WarningValue = styled(Value)<{ color: number }>`
  color: ${({ color }) => PriceImpactTypeColorMap[color]};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledIconAlertTriangle = styled(IconAlertTriangle)<{ impact: number }>`
  width: 22px;
  height: 22px;
  margin-top: 4px;
  color: ${({ impact }) => PriceImpactTypeColorMap[impact]};
`;

const StyleOptionChart = styled.div`
  padding: 4px 6px;
  font-family: Montserrat;
  font-size: 12px;
  font-weight: 300;
  line-height: 12px;
  color: #979abe;
  background-color: #21232a;
  border-radius: 4px;
  cursor: pointer;
`;

export default function Result({ trade, bestTrade, markets, showChart, onShowChart }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const slippage: any = useSettingsStore((store: any) => store.slippage);
  const [isRateReversed, setIsRateReversed] = useState(false);

  useEffect(() => {
    if (markets?.length === 0) return;
    const shouldOpen = trade.priceImpactType !== 0;
    setIsOpen(shouldOpen);
  }, [trade]);

  const calculateRate = (input: string, output: string) => {
    const inputBig = Big(input || '1');
    const outputBig = Big(output || '1');
    return inputBig.div(outputBig);
  };

  const displayRate = useMemo(() => {
    const rate = isRateReversed
      ? calculateRate(trade.inputCurrencyAmount, trade.outputCurrencyAmount)
      : calculateRate(trade.outputCurrencyAmount, trade.inputCurrencyAmount);
    return balanceFormated(rate.toString(), 4);
  }, [trade.inputCurrencyAmount, trade.outputCurrencyAmount, isRateReversed]);

  return (
    <Wrapper>
      <StyledFlex justifyContent="space-between" style={{ paddingTop: 13 }}>
        <StyledFlex gap="9px">
          <div>
            1 {isRateReversed ? trade.outputCurrency?.symbol : trade.inputCurrency?.symbol} ≈ {displayRate}{' '}
            {isRateReversed ? trade.inputCurrency?.symbol : trade.outputCurrency?.symbol}
          </div>
          <IconRefresh className="outputCurrency" onClick={() => setIsRateReversed((prev) => !prev)} />
          {/* <StyleOptionChart onClick={onShowChart}>{showChart ? 'Hide' : 'Show'} chart</StyleOptionChart> */}
        </StyledFlex>
        {markets?.length > 0 && (
          <StyledFlex className="trade-display" gap="5px" onClick={() => setIsOpen(!isOpen)}>
            <StyledIcon src={trade.logo} />
            <div>{trade.name}</div>
            {trade.priceImpactType !== 0 ? (
              <StyledIconAlertTriangle impact={trade.priceImpactType} />
            ) : (
              bestTrade?.name === trade.name && <StyledBestPrice>Cheapest</StyledBestPrice>
            )}

            <StyledIconArrow isOpen={isOpen} />
          </StyledFlex>
        )}
      </StyledFlex>
      <StylePriceContainer isOpen={isOpen}>
        <Row>
          <span>Price impact</span>
          {trade.priceImpactType === 0 ? (
            <Value>{trade.priceImpact}</Value>
          ) : (
            <WarningValue color={trade.priceImpactType}>
              <StyledIconAlertTriangle impact={trade.priceImpactType} /> {trade.priceImpact || '-'}% / -{' '}
              {Big(trade.inputCurrencyAmount || 0)
                .mul(trade.priceImpact || 0)
                .div(100)
                .toFixed(8)}{' '}
              {trade.inputCurrency.symbol}
            </WarningValue>
          )}
        </Row>
        <Row>
          <span>Gas fee</span>
          <Value>~${balanceFormated(trade.gasUsd, 4)}</Value>
        </Row>
        <Row>
          <span>Minimum received</span>
          <Value>
            {balanceFormated(
              Big(trade.outputCurrencyAmount || 0)
                .mul(1 - slippage / 100)
                .toString(),
              8,
            )}{' '}
            {trade.outputCurrency.symbol}
          </Value>
        </Row>
        <Row>
          <span>Route</span>
          <Value>{trade.routerStr}</Value>
        </Row>
      </StylePriceContainer>
    </Wrapper>
  );
}
