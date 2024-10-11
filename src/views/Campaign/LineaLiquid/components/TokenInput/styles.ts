import styled from 'styled-components';

export const StyledContainer = styled.div`
  border-radius: 12px;
  border: 1px solid #373a53;
  background: #2e3142;
  padding: 12px 13px 9px 14px;
`;
export const StyledTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
export const StyledBot = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 9px;
`;
export const StyledInput = styled.input`
  color: #ffffff;
  font-family: Gantari;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border: 0;
  outline: #ebf479;
`;
export const StyledToken = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  color: #fff;
  text-align: center;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
export const StyledTokenIcon = styled.img`
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  border-radius: 50%;
`;
export const StyledUsdValue = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const StyledRule = styled.div`
  height: 20px;
  flex-shrink: 0;
  border-radius: 6px;
  border: 1px solid #373a53;
  background: rgba(50, 54, 75, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #979abe;
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding: 0 5px 0 8px;
`;
export const StyledBalance = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  color: #979abe;
  text-align: right;
  font-family: Montserrat;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  .value {
    text-decoration-line: underline;
    cursor: pointer;
  }
`;
export const StyledBotRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 7px;
`;
