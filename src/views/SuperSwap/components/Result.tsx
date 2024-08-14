import { StyledFlex } from '@/styled/styles';
import styled from 'styled-components';
import { balanceFormated } from '@/utils/balance';
import Big from 'big.js';
import { StyledBestPrice } from '../styles';
import IconArrow from '@public/images/chains/arrorw-top.svg'
import IconAlertTriangle from '@public/images/chains/waring.svg'
import { useEffect, useState } from 'react';
import { useSettingsStore } from '@/stores/settings';

type PriceImpactLevel = 'low' | 'medium' | 'high';

const Wrapper = styled.div`
  .trade-display {
    cursor: pointer;
  }
`

const StyledIconArrow = styled(IconArrow)<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? 'rotate(0deg)' : 'rotate(180deg)')};
  transition: transform 0.3s ease-in-out;
  color: ${({ isOpen }) => (isOpen ? '#fff' : '#53577B')};
`

const StyledIcon = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 6px;
`;

const StylePriceContainer = styled.div<{ isOpen: boolean }>`
  overflow: hidden;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  padding: 12px 15px;
  border: 1px solid #373A53;
  border-radius: 10px;
  margin-top: 10px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #53577B;
  font-size: 14px;
  line-height: 14px;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Value = styled.span`
  color: #979ABE;
`;


export const PriceImpactTypeColorMap: Record<number, string> = {
  0: '#33b65f',
  1: '#F88C39',
  2: '#E956A6',
}

const WarningValue = styled(Value)<{ color: number }>`
  color: ${({ color }) => PriceImpactTypeColorMap[color]};
  display: flex;
  align-items: center;
  gap: 4px;
`;

const StyledIconAlertTriangle = styled(IconAlertTriangle)<{ impact:  number}>`
  width: 22px;
  height: 22px;
  margin-top: 4px;
  color: ${({ impact }) => PriceImpactTypeColorMap[impact]};
`


export default function Result({ trade, bestTrade, markets }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const slippage: any = useSettingsStore((store: any) => store.slippage);


  useEffect(() => {
    if (markets?.length === 0) return
    const shouldOpen = trade.priceImpactType !== 0;
    setIsOpen(shouldOpen);
  }, [trade]);


  return (
    <Wrapper>
      <StyledFlex justifyContent="space-between" style={{ paddingTop: 13 }}>
          <StyledFlex gap="9px">
            <div>
              1 {trade.outputCurrency?.symbol} ≈ {' '}
              {balanceFormated(
                Big(trade.inputCurrencyAmount || 0)
                  .div(Big(trade.outputCurrencyAmount || 0).eq(0) ? 1 : trade.outputCurrencyAmount)
                  .toString(),
                4,
              )}{' '}
              {trade.inputCurrency?.symbol}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M1.01514 6.11148C0.887128 4.95763 1.55283 3.03456 3.70343 3.03456C5.85402 3.03456 10.9999 3.03456 10.9999 3.03456M10.9999 3.03456L9.01977 1M10.9999 3.03456L9.01977 5"
                stroke="#979ABE"
              />
              <path
                d="M10.9849 5.88071C11.1129 7.03456 10.4472 8.95763 8.29657 8.95763C6.14598 8.95763 1.00006 8.95763 1.00006 8.95763M1.00006 8.95763L3.01978 11M1.00006 8.95763L3.01978 7"
                stroke="#979ABE"
              />
            </svg>
          </StyledFlex>
          {
            markets?.length > 0 && (
              <StyledFlex className='trade-display' gap="5px" onClick={() => setIsOpen(!isOpen)}>
                <StyledIcon src={trade.logo} />
                <div>{trade.name}</div>
                {
                  trade.priceImpactType !== 0 ? (<StyledIconAlertTriangle impact={trade.priceImpactType} />) : (bestTrade?.name === trade.name && <StyledBestPrice>Cheapest</StyledBestPrice>)
                }
                
                <StyledIconArrow  isOpen={isOpen}/>
              </StyledFlex>
            )
          }

      </StyledFlex>
      <StylePriceContainer isOpen={isOpen}>
        <Row>
          <span>Price impact</span>
          {
            trade.priceImpactType === 0 ? (
              <Value>{trade.priceImpact}</Value>
            ) : (
              <WarningValue color={trade.priceImpactType}>
                <StyledIconAlertTriangle impact={trade.priceImpactType} /> {trade.priceImpact || '-'}% / - {Big(trade.inputCurrencyAmount || 0).mul(trade.priceImpact || 0).div(100).toFixed(8)} {trade.inputCurrency.symbol}
              </WarningValue>
            )
          }
          
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
