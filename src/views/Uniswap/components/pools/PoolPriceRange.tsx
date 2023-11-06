import { memo } from 'react';
import styled from 'styled-components';

import { ArrowBothIcon } from './Icons';

const StyledWrap = styled.div<{ style?: string }>`
  ${(props) => (props.style == '1' ? 'margin-top: 20px;' : 'border: 1px solid #3d363d;padding: 20px;margin-top: 15px;')}
  border-radius: 24px;
  background-color: #131313;
  .vchb {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .hvc {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .w-full {
    width: 100%;
  }
`;
const StyledHead = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  .gap-20 {
    gap: 20px;
  }
  .point {
    width: 5px;
    height: 5px;
    border-radius: 100px;
    margin-right: 6px;
    background-color: #6efa95;
  }
  .range {
    font-size: 14px;
    color: #6efa95;
    font-weight: bold;
  }
  .switch {
    border: 1px solid #3d363d;
    border-radius: 8px;
    background-color: #131313;
    padding: 2px 4px;
    .item {
      font-size: 12px;
      color: #8e8e8e;
      cursor: pointer;
      height: 24px;
      padding: 0 8px;
    }
    .item.active {
      border-radius: 6px;
      background-color: #262626;
      color: #fff;
    }
  }
`;
const StyledBody = styled.div`
  margin-top: 12px;
  .minmax {
    gap: 12px;
  }
  .mt-17 {
    margin-top: 17px;
  }
`;
const PoolPriceRange = ({ style }: { style?: string }) => {
  return (
    <StyledWrap style={style}>
      <StyledHead className="vchb">
        {style == '1' ? (
          <span>Selected range</span>
        ) : (
          <div className="hvc gap-20">
            <span>Pirce range</span>
            <div className="hvc">
              <span className="point"></span>
              <span className="range">In range</span>
            </div>
          </div>
        )}
        <div className="switch hvc">
          <span className="item hvc">USDC</span>
          <span className="item hvc active">ETH</span>
        </div>
      </StyledHead>
      <StyledBody>
        <div className="vchb minmax">
          <PriceDetailBox priceType="Min price" price="1811.5246" priceRate="USDC per ETH" />
          <ArrowBothIcon />
          <PriceDetailBox priceType="Max price" price="1811.5246" priceRate="USDC per ETH" />
        </div>
        <div className="mt-17">
          <PriceDetailBox priceType="Current price" price="1811.5246" priceRate="USDC per ETH" />
        </div>
      </StyledBody>
    </StyledWrap>
  );
};

const StyledPriceDetailBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #1b1b1b;
  border-radius: 16px;
  height: 118px;
  flex-grow: 1;
  .text {
    font-size: 14px;
    color: #8e8e8e;
  }
  .value {
    font-size: 20px;
    color: #ffffff;
    font-weight: bold;
    margin: 6px 0 2px 0;
  }
`;
const PriceDetailBox = ({ priceType, price, priceRate }: { priceType: string; price: string; priceRate: string }) => {
  return (
    <StyledPriceDetailBox>
      <span className="text">{priceType}</span>
      <span className="value">{price}</span>
      <span className="text">{priceRate}</span>
    </StyledPriceDetailBox>
  );
};

export default memo(PoolPriceRange);
