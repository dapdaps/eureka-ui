import styled from 'styled-components';

export const PortfolioTabs = styled.div`
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: left;
  color: #7c7f96;
  display: flex;
  align-items: center;
  gap: 2rem;
  .item {
    padding: 0px 20px 20px 20px;
    position: relative;
  }
  .item.active {
    color: white;
  }

  > div {
    cursor: pointer;
  }

  .active-bar {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 4px;
    background: #ebf479;
    border-radius: 2px;
  }
  border-bottom: 1px solid #332c4b;
`;
