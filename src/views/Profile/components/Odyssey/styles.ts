import styled from "styled-components";

export const StyledContainer = styled.div`
`
export const StyledOdysseyCard = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 612px;
  height: 220px;
  flex-shrink: 0;
  border-radius: 12px;
  border: 1px solid #202329;
  background: #101115;
  cursor: pointer;
`
export const StyledOdysseyCardL = styled.div`
  display: flex;
  align-items: center;
  width: 400px;
  height: 220px;
`
export const StyledOdysseyCardImage = styled.img`
  width: 100%;
  height: 100%;
`
export const StyledOdysseyCardR = styled.div`
  position: relative;
  padding: 20px 0 18px 0;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`

export const StyledLive = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(32, 34, 47, 0.8);
  padding: 0px 10px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
`;
export const StyledTransactionsAndEarned = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`
export const StyledTransactions = styled.div`
  padding: 12px 18px;
  border-radius: 10px;
  border: 1px solid #373A53;
  background: rgba(0, 0, 0, 0.30);
  backdrop-filter: blur(0.5px);

  color: #979ABE;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
  span {
    color: #FFF;
    font-weight: 600;
  }
`
export const StyledEarned = styled.div`
  overflow: hidden;
  padding: 1px;
  border-radius: 10px;
  opacity: 0.8;
  background: linear-gradient(90deg, #F79CFF 0%, #FFBD7F 30% , #7FC9FF 85%);


`
export const StyledEarnedFont = styled.div`
  border-radius: 10px;
  padding: 12px 13px;
  background: #101115;
  color: #979ABE;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%; /* 14px */
  span {
    background: linear-gradient(90deg, #FFAF65 3.39%, #FF84EB 31.09%, #9B82FF 59.93%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`
export const StyledMark = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`
export const StyledMarkNumber = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  top: 46px;
  transform: rotate(-15deg);
  color: #000;
  text-align: center;
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 27px */
  text-transform: uppercase;
`