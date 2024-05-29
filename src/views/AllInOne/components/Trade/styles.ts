import styled from 'styled-components';

export const StyledTradeContainer = styled.div`
  &.disabled {
    cursor: pointer !important;
  }

  .price-impact-0 {
    color: #33b65f;
  }
  .price-impact-1 {
    color: #ff9445;
  }
  .price-impact-2 {
    color: #ff547d;
  }
`;

export const StyledTrade = styled.div`
  position: relative;
  margin-bottom: 20px;

  .from-currency_margin {
    margin-bottom: 10px;
  }
`;

export const StyledTradeIcon = styled.div<{ disabled?: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 38px;
  height: 38px;
  border-radius: 8px;
  border: 4px solid #16181d;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #2e3142;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ disabled }) => (disabled ? '#2E3142' : '#1f212d')};
  }
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
    color: #979abe;
  }
`;

export const StyledTradeEth = styled.div`
  font-size: 14px;
  color: #979abe;
`;

export const StyledMarketIcon = styled.div<{ url: string }>`
  width: 20px;
  height: 20px;
  background: ${(props) => (props.url ? `url(${props.url})` : 'none')} center no-repeat;
  background-size: contain;
`;

export const StyledMarketTitle = styled.div`
  font-size: 14px;
  color: #fff;
`;
export const StyledMarketTag = styled.div`
  background: rgba(51, 182, 95, 0.2);
  border-radius: 4px;
  padding: 2px 5px;
  color: #33b65f;
  font-size: 12px;
  white-space: nowrap;
`;
export const StyledMarketCount = styled.div`
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  white-space: nowrap;
`;

export const ArrowWrap = styled.div<{ isDropdown: boolean }>`
  transform: ${(props) => (props.isDropdown ? 'rotate(180deg)' : 'rotate(0deg)')};
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
    border: 1px solid #373a53;
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
export const StyledMarketItem = styled.div<{ active?: boolean; color?: string }>`
  background: #1e2128;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  border-radius: 12px;
  cursor: ${(props) => (props.active ? 'arrow' : 'pointer')};
  border: 1px solid ${(props) => (props.active ? props?.color : 'transparent')};
  transition: 0.5s;
  &:hover {
    border: ${(props) => `1px solid ${props?.color}`};
    opacity: 0.5;
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
  color: #979abe;
`;
export const StyledMarketItemDetail = styled.div`
  background: #1e2128;
  border-radius: 12px;
  padding: 18px;
`;

export const StyledMarketItemContent = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px 26px;
  color: #979abe;
  grid: repeat(2, 50%) / auto-flow 48%;
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
    border: 1px dashed #373a53;
    margin: 0 6px;
  }
`;

export const StyledMarketItemTextRight = styled.div`
  flex-shrink: 0;
  &.active {
    color: #33b65f;
  }
  &.underline {
    text-decoration: underline;
  }
`;
