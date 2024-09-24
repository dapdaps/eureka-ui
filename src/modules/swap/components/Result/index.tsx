import Big from 'big.js';
import { useState } from 'react';

import {
  Layer,
  StyledArrow,
  StyledContainer,
  StyledFeePanel,
  StyledFlex,
  StyledFlexSpace,
  StyledItem,
  StyledPanel,
  StyledPanelWrapper,
  StyledPriceWarning
} from './styles';

const WarningIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.10016 1C7.86996 -0.333334 9.79446 -0.333333 10.5643 1L17.3935 12.8286C18.1633 14.1619 17.201 15.8286 15.6614 15.8286H2.00298C0.463382 15.8286 -0.498867 14.1619 0.270933 12.8286L7.10016 1ZM7.91793 6.22857C7.91793 5.72363 8.32727 5.31429 8.83221 5.31429C9.33716 5.31429 9.7465 5.72363 9.7465 6.22857V9.88572C9.7465 10.3907 9.33716 10.8 8.83221 10.8C8.32727 10.8 7.91793 10.3907 7.91793 9.88572V6.22857ZM8.83221 11.7143C8.32727 11.7143 7.91793 12.1236 7.91793 12.6286C7.91793 13.1335 8.32727 13.5429 8.83221 13.5429C9.33716 13.5429 9.7465 13.1335 9.7465 12.6286C9.7465 12.1236 9.33716 11.7143 8.83221 11.7143Z"
      fill="#FF547D"
    />
  </svg>
);

export default function Result({
  inputCurrency,
  outputCurrency,
  inputCurrencyAmount,
  outputCurrencyAmount,
  priceImpact,
  priceImpactType,
  gasUsd,
  routerStr
}: any) {
  const [showFeePanel, setShowFeePanel] = useState(false);
  const [showContent, setShowContent] = useState(false);
  return (
    <StyledContainer>
      <StyledFlexSpace>
        <StyledFlex style={{ gap: '5px' }}>
          <div></div>
          <div>
            1 {outputCurrency.symbol} ={' '}
            {Big(inputCurrencyAmount || 0)
              .div(Big(outputCurrencyAmount || 0).eq(0) ? 1 : outputCurrencyAmount)
              .toFixed(4)}{' '}
            {inputCurrency.symbol}{' '}
          </div>
        </StyledFlex>
        <StyledFlex style={{ gap: '10px' }}>
          {priceImpactType === 2 && WarningIcon}
          {!showContent && gasUsd && <span className="gray">Fee {gasUsd}</span>}
          <StyledArrow
            onClick={() => {
              setShowContent(!showContent);
            }}
            className={showContent ? 'up' : 'down'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
              <path d="M1 1L6 5L11 1" stroke="#979ABE" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </StyledArrow>
        </StyledFlex>
      </StyledFlexSpace>
      <StyledPanelWrapper className={showContent ? 'expand' : ''}>
        <StyledPanel className={showContent ? 'expand' : ''}>
          <StyledItem>
            <div>Minimum Received</div>
            <div>
              {Big(outputCurrencyAmount || 0).toFixed(8)} {outputCurrency.symbol}
            </div>
          </StyledItem>
          {!!priceImpact && (
            <StyledItem>
              <div>Price Impact</div>
              <div className={`price_impact warning-${priceImpactType}`}>{priceImpact}%</div>
            </StyledItem>
          )}
          {gasUsd && (
            <StyledItem>
              <div>Trading Fee</div>
              <div
                className="fee"
                onClick={() => {
                  setShowFeePanel(true);
                }}
              >
                <div>{gasUsd}</div>
                {showFeePanel && (
                  <StyledFeePanel>
                    <StyledFlexSpace>
                      <div>Gas fee</div>
                      <div>{gasUsd}</div>
                    </StyledFlexSpace>
                  </StyledFeePanel>
                )}
              </div>
            </StyledItem>
          )}
          <StyledItem>
            <div>Route</div>
            <div>{routerStr ? routerStr : ` ${inputCurrency.symbol} > ${outputCurrency.symbol}`}</div>
          </StyledItem>
        </StyledPanel>
      </StyledPanelWrapper>
      {!!priceImpact && !!priceImpactType && (
        <StyledPriceWarning className={`warning-card-${priceImpactType}`}>
          <StyledFlex style={{ gap: '5px' }}>
            {priceImpactType === 2 && WarningIcon}
            <div>Price impact warning</div>
          </StyledFlex>
          <div>{priceImpact}%</div>
        </StyledPriceWarning>
      )}
      {showFeePanel && (
        <Layer
          onClick={() => {
            setShowFeePanel(false);
          }}
        />
      )}
    </StyledContainer>
  );
}
