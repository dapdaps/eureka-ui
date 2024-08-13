import styled from "styled-components";

export const StyledRpcContainer = styled.div`
  font-family: Montserrat;
`;
export const StyledRpcListDesc = styled.div`
  color: #979ABE;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
    margin-top: 20px;
    text-align: left;
`;
export const StyledRpcList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
    margin-top: 20px;
`;
export const StyledRpcItem = styled.div`
  border-radius: 10px;
  border: 1px solid #333648;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 17px;
  color: #FFF;
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;
export const StyledRpcRadio = styled.div<{ $selected?: boolean; }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.50);
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: '';
    display: ${({ $selected }) => $selected ? 'block' : 'none'};
    width: 12px;
    height: 12px;
    flex-shrink: 0;
    border-radius: 12px;
    background: #EBF479;
  }
`;
export const StyledNetworkDelay = styled.div<{ $color?: string; }>`
  display: flex;
  align-items: center;
  gap: 7px;
  color: ${({ $color }) => $color || '#57DB64'};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::after {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 12px;
    background: ${({ $color }) => $color || '#57DB64'};
  }
`;

export const StyledAlertText = styled.div`
  color: #FFF;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;

  > p {
    margin: 0;
  }
`;
export const StyledAlertButton = styled.button`
  width: 222px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 10px;
  background: #EBF479;
  color: #000;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 50px;
  text-align: center;
`;

