import styled from 'styled-components';

export const StyledTradeContainer = styled.div`
  position: relative;
  margin-bottom: 20px;

  .from-currency_margin {
    margin-bottom: 10px;
  }`;
export const StyledTradeIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledTradeButton = styled.button<{ bgColor: string, color: string }>`
  background: ${props => props.bgColor};
  color: ${props => props.color};
  padding: 19px 0;
  text-align: center;
  width: 100%;
  font-weight: bolder;
  border-radius: 10px;
  margin-bottom: 12px;
`;

export const StyledTradeFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .light {
    color: #fff;
    transition: all 0.15s ease-in-out;
  }

  .dark {
    color: #979ABE;
  }
`;

export const StyledTradeEth = styled.div`
  font-size: 14px;
  color: #979ABE;
`;

export const StyledMarketIcon = styled.div<{ url: string }>`
  width: 20px;
  height: 20px;
  background: ${props => props.url ? `url(${props.url})` : 'none'} center no-repeat;
  background-size: contain;
`;

export const StyledMarketTitle = styled.div`
  font-size: 14px;
  color: #fff`;
export const StyledMarketTag = styled.div`
  background: rgba(51, 182, 95, 0.2);
  border-radius: 4px;
  padding: 2px 5px;
  color: #33B65F;
  font-size: 12px;
`;
export const StyledMarketCount = styled.div`
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
`;

export const ArrowWrap = styled.div<{ isDropdown: boolean }>`
  transform: ${props => props.isDropdown ? 'rotate(180deg)' : 'rotate(0deg)'};
  cursor: pointer;
  transition: all 0.15s ease-in-out;
`;
export const StyledMarketsContainer = styled.div`
  width: 0;
  height: 0;
  overflow: hidden;
  border: none;
  transition: all 0.15s ease-in-out;
  &.open-market {
    padding: 10px;
    width: auto;
    height: auto;
    border: 1px solid #373A53;
    border-radius: 12px;
    display: grid;
    grid-template-columns: auto auto;
    gap: 10px;
    transform: translateY(16px);
  }
  &.active-market {
    grid-template-columns: auto;
    padding: 0;
  }
`;
export const StyledMarketItem = styled.div<{ active?: boolean, color?: string }>`
  background: #1E2128;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  border-radius: 12px;
  cursor: ${ props => props.active ? 'arrow' : 'pointer' };
  border: 1px solid transparent;
  &:hover {
    border: ${props => `1px solid ${!props?.active ? (props?.color ?? 'transparent') : 'transparent'}`};
  }
  &.market-item_detail {
    padding: 0;
    background: none;
    margin-bottom: 14px;
  }
`;
export const StyledMarketItemLeft = styled.div`
  display: flex;
  align-items: center;
`;
export const StyledMarketItemIcon = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
  border-radius: 6px;
`;
export const StyledMarketItemName = styled.div`
  font-size: 14px;
  color: #fff;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-left: 10px;
  margin-right: 6px;
`;
export const StyledMarketItemRight = styled.div`
  display: flex;
  align-items: center;
`;
export const StyledMarketItemToken = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;
  border-radius: 50%;
`;
export const StyledMarketItemBalance = styled.div`
  font-size: 14px;
  color: #fff;
  margin: 0 6px;
`;
export const StyledMarketArrow = styled.div`
  transform: rotate(-90deg);
  color: #979ABE;
`;
export const StyledMarketItemDetail = styled.div`
  background: #1E2128;
  border-radius: 12px;
  padding: 18px;
`;

export const StyledMarketItemContent = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px 40px;
  color: #979ABE;
`;

export const StyledMarketItemText = styled.div`
  display: flex;
  align-items: center;
`;
export const StyledMarketItemTextLeft = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  white-space: nowrap;
  &:after {
    display: block;
    content: '';
    height: 1px;
    width: 100%;
    border: 1px dashed #373A53;
    margin: 0 6px;
  }
`;

export const StyledMarketItemTextRight = styled.div`
  flex-shrink: 0;
  &.active {
    color: #33B65F;
  }
  &.underline {
    text-decoration: underline;
  }
`;