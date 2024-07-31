import styled from 'styled-components';

export const Panel = styled.div`
  position: relative;
  height: 258px;
  background-color: #1e1f2a;
  z-index: 10;
`;
export const Body = styled.div`
  height: 378px;
  background: #262836;
`;
export const Head = styled.div`
  display: flex;
  padding: 20px 24px 0 30px;
  justify-content: space-between;
`;
export const HeadLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const Logo = styled.img`
  width: 42px;
  height: 42px;
`;
export const HeadContent = styled.div``;
export const HeadTitle = styled.div`
  display: flex;
  gap: 10px;
  color: #fff;
  align-items: center;
  font-family: Gantari;
  font-size: 26px;
  font-weight: 600;
  line-height: 1;
`;
export const HeadSub = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 1;
`;
export const Status = styled.div`
  padding: 5px 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  border-radius: 30px;
  border: 1px solid #61fd53;
  background: rgba(14, 80, 8, 0.2);
  backdrop-filter: blur(5px);
  color: #61fd53;
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  height: 20px;
  .dot {
    width: 7px;
    height: 7px;
    background-color: #61fd53;
    border-radius: 50%;
  }
`;
export const CloseBtn = styled.div``;
export const TimerEnd = styled.div`
  color: #979abe;
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 16px;
`;

export const TabBody = styled.div`
  padding: 30px 24px 0;
`;

export const ArrowSwap = styled.div`
  position: relative;
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  .arrow {
    position: absolute;
    width: 34px;
    height: 34px;
    border: 4px solid rgba(38, 40, 54, 1);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* cursor: pointer; */
    background-color: rgba(46, 49, 66, 1);
  }
`;
export const FootWrap = styled.div`
  padding: 20px 24px 0;
`;

export const Foot = styled.div`
  margin-top: 14px;
  display: flex;
  justify-content: space-between;
  color: #979abe;
  font-family: Gantari;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  .addToken {
    cursor: pointer;
    &:hover {
      color: white;
      text-decoration-line: underline;
    }
  }
`;
export const StyledRelativeModal = styled.div`
  border-radius: 16px;
  overflow: hidden;
`