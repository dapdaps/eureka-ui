import styled from 'styled-components';

export const PortfolioTabs = styled.div`
`;

export const PortfolioTabContent = styled.div`

  `;

export const PortfolioTabHead = styled.div`
  display: flex;
  align-items: center;
  column-gap: 109px;
  font-size: 20px;
  position: relative;
  padding: 0 60px 6px;
  background: #101115;
  margin-bottom: 24px;
  border-bottom: 1px solid  #373A53;
  overflow-x: hidden;
  `;

export const StyledTabItem = styled.div`
  position: relative;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  color: #979ABE;
  
  &.active {
    color: #fff;
    &::after {
      display: block;
      content: '';
      width: 200px;
      height: 2px;
      background: #fff;
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
    }
  }
`;