import styled from 'styled-components';

export const StyledContainer = styled.div`
  font-family: Montserrat;
  padding-bottom: 50px;
  border-bottom: 1px solid #202329;
`;

export const StyledTitle = styled.div`
  display: inline-block;
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(90deg, #FFF 0%, #979ABE 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 27px;
`;

export const StyledMedalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 158px;
  height: 176px;
  flex-shrink: 0;
  background-color: #18191E;
  padding: 33px 0 16px 0;
  border-radius: 20px;
  position: relative;
  border: 1px solid #202329;
`;

export const StyledMedalLogo = styled.div<{url: string}>`
  width: 74px;
  height: 63px;
  background: ${props => props.url ? `url(${props.url}) no-repeat center`: ''};
  background-size: contain;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledMedalInner = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
`;

export const StyledMedalTag = styled.div`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 34px;
  background: #21222B;
  color: #979ABE;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  padding: 7px 15px;
  white-space: nowrap;
`;

export const StyledMedalName = styled.div`
  color: #FFF;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-top: 10px;
`;