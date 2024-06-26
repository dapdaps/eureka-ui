import styled from 'styled-components';
export { StyledButton } from '../../styles';

export const StyledContainer = styled.div`
  position: relative;
  width: 157px;
  height: 44px;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 16px;

  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;

export const StyledBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

export const StyledValue = styled.div`
  color: #1e2028;
  font-size: 16px;
  font-weight: 500;
  position: absolute;
  right: 8px;
  top: 10px;
  z-index: 10;
  gap: 5px;
  display: flex;
  align-items: center;
  .num {
    font-weight: 700;
  }
`;
export const StyledPanelWrapper = styled.div`
  background: linear-gradient(to right, #7dd3f8, #c388e7, #ffc189);
  padding: 1px;
  border-radius: 20px;
`;
export const StyledPanel = styled.div`
  border-radius: 20px;
  border: 1px solid #373a53;
  background-color: #21242a;
  padding: 20px;
  width: 175px;
  height: 175px;
  box-sizing: border-box;
  flex-shrink: 0;
`;

export const StyledPanelHeader = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  text-align: center;
  .num {
    color: #ebf479;
    font-size: 32px;
    font-weight: 700;
  }
`;

export const StyledPanelContent = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
  margin-top: 30px;
`;
export const StyledPanelFriends = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
`;

export const StyledPanelFriendsTitle = styled.div`
  color: #979abe;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const JoinedAccounts = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  .more {
    margin-right: -10px;
  }
`;

export const JoinedAccount = styled.img`
  border-radius: 36px;
  border: 2px solid #2c2e3e;
  width: 30px;
  height: 30px;
  margin-right: -10px;
`;

export const StyledFriendsNum = styled.div`
  color: #979abe;
  font-family: Gantari;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
`;
