import styled from 'styled-components';

export const StyledContainer = styled.div`
`;

export const StyledOdysseyContainer = styled.div`
  padding-bottom: 44px;
  position: relative;
  &:last-child {
    border-bottom: 1px solid #202329;
  }
`;

export const StyledOdysseyDetail = styled.div`
  margin-bottom: 30px;
`;

export const StyledOdysseyBanner = styled.div<{url: string}>`
  width: 500px;
  height: 250px;
  border-radius: 20px;
  filter: grayscale(100%);
  background: ${props => props.url ? `url(${props.url}) no-repeat center`: ''};
  background-size: contain;
  margin-bottom: 20px;
`;
export const StyledOdysseyTitle = styled.div`
  color: #FFF;
  font-family: Montserrat;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  column-gap: 10px;
`;
export const StyledOdysseyTag = styled.div`
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(32, 34, 47, 0.8);
  padding: 4px 8px;
  display: flex;
  align-items: center;
  color: #979ABE;
  font-family: Gantari;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
  &::before {
    display: block;
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #979ABE;
    margin-right: 5px;
  }
`;
export const StyledRewardTag = styled.div<{url: string}>`
  position: absolute;
  right: 3px;
  top: -12px;
  width: 91px;
  height: 91px;
  z-index: 2;
  background: ${props => props.url ? `url(${props.url}) no-repeat center`: ''};
  background-size: contain;
`;

export const StyledRewardText = styled.div`
  position: absolute;
  color: #000;
  text-align: center;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 900;
  text-transform: uppercase;
  transform: rotate(-15deg);
  left: 0;
  right: -6px;
`;

export const StyledRelatedTitle = styled.div`
  font-family: Montserrat;
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(90deg, #FFF 0%, #979ABE 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
`;