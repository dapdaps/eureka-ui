import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding: 14px;
  width: 328px;
  border-radius: 12px;
  background: linear-gradient(180deg, #262836 0%, #000 100%);
  height: 100%;
  position: absolute;
  right: 0px;
  top: 0px;
`;

export const StyledList = styled.div`
  overflow-y: auto;
  height: calc(100% - 30px);
  padding-right: 4px;
`;

export const StyledItem = styled.div<{ isActive: boolean }>`
  border-radius: 8px;
  border: 1px solid #373a53;
  padding: 10px 12px 16px;
  cursor: pointer;
  transition: 0.5s;
  margin-top: 10px;
  border-color: ${({ isActive }) => (isActive ? '#ebf479' : '#373A53')};
`;

export const StyledIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 6px;
`;

export const StyledTitle = styled.div`
  color: #fff;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const StyledDesc = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const StyledTokenIcon = styled.img`
  width: 22px;
  height: 22px;
`;

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 400;
  line-height: 19.2px;
  color: #fff;
  padding-bottom: 14px;
  .arrow {
    display: flex;
    align-items: center;
    gap: 10px;
    .route-num {
      color: #fff;
      font-size: 16px;
      font-weight: 400;
      line-height: 16.8px;
      padding-right: 10px;
    }
  }
`;

export const StyledEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 34px 0;
  .empty-text {
    color: rgba(151, 154, 190, 1);
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 500;
    margin-top: 22px;
  }
`;

export const StyledTitleName = styled.span`
  margin-right: 4px;
`;
