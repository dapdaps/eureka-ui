import styled from 'styled-components';

export const StyledContainer = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const StyledTitle = styled.div`
  position: relative;
  font-family: Montserrat;
  font-size: 90px;
  font-style: normal;
  font-weight: 700;
  background: linear-gradient(90deg, #16181D 0%, #979ABE 26%, #979ABE 79%, #16181D 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: -40px;
    left: 40.5%;
    transform: translateX(-40.5%);
    width: 187px;
    height: 95px;
    background: url('/images/portfolio/logto-text.svg') center no-repeat;
    background-size: contain;
  }
`;

export const StyledAccount = styled.div`
  color: #FFF;
  text-align: center;
  font-family: Gantari;
  font-size: 20px;
  font-weight: 700;
  padding: 6px 42px;
  line-height: 1;
  border-radius: 22px;
  border: 1px solid #3D405A;
  background: #1E2028;
  width: fit-content;
  position: relative;
  top: -20px;
  left: 135px;
`;

export const StyledAvatar = styled.div<{ url: string }>`
  background: ${props => `url(${props.url}) center no-repeat`};
  background-size: contain;
  width: 43px;
  height: 43px;
  border-radius: 50%;
  position: absolute;
  top: 46px;
  left: 148px;
`;

export const StyledUserInfoWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const DefaultProfileIcon = styled.div`
  background-image: conic-gradient(from 180deg at 50% 50%, rgb(0, 209, 255) 0deg, rgb(255, 0, 138) 360deg);
  width: 52px;
  height: 52px;
  border-radius: 50%;
`;

export const StyledAddressWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 5px;
`;

export const StyledAddress = styled.div`
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const StyledMetamask = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  color: #7c7f96;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ChartContainer = styled.div`
  color: #fff;
  width: 425px;
  height: 120px;
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const ChartDataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 12px; */

  position: relative;
`;

export const TotalBalanceWrapper = styled.div`
  /* position: absolute; */
  left: 0;
  top: 0;
`;

export const DiffWrapper = styled.div<{ dir: 'desc' | 'asc' }>`
  font-family: Gantari;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  text-align: left;

  color: ${(p) => (p.dir === 'desc' ? '#FF6F6F' : '#63C341')};
`;
