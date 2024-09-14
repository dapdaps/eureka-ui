import styled from 'styled-components';

export const StyledBreadcrumbAndBanner = styled.div`
  position: relative;
  padding-top: 30px;
  height: 415px;
  background: #0c0117;
  overflow: hidden;
`;
export const StyledBreadcrumbContainer = styled.div`
  position: relative;
  width: 1334px;
  margin: 0 auto 56px;
  left: -68px;
`;
export const Banner = styled.div``;
export const BannerBody = styled.div`
  width: 1334px;
  margin: 0 auto;
`;
export const Intro = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const Logo = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
`;
export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  color: #fff;
  font-family: Montserrat;
  font-size: 42px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
export const Desc = styled.div`
  margin-top: 16px;
  color: #fff;
  /* text-align: center; */
  font-family: Montserrat;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
export const Status = styled.span`
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
export const Content = styled.div`
  position: relative;
  top: -72px;
  z-index: 10;
  margin: 0 auto;
  width: 1334px;
  display: flex;
  justify-content: space-between;
`;

export const Main = styled.div`
  width: 780px;
`;
export const Sider = styled.div`
  margin-top: 32px;
  width: 510px;
`;
export const SocialGroup = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 10px;
`;
export const TimerTitle = styled.div`
  color: #979abe;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  margin-bottom: 12px;
`;
export const TimerWrap = styled.div`
  width: 320px;
  margin-bottom: 100px;
`;

export const TabBody = styled.div`
  padding: 40px 0 0;
`;

export const StyledProjectStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 7px 0 8px;
  height: 26px;
  border-radius: 30px;
  border: 1px solid #61fd53;
  background: rgba(14, 80, 8, 0.2);
  backdrop-filter: blur(5px);
  &.upcoming {
    border-color: #ffae63;
    background-color: rgba(156, 95, 38, 0.2);
    span {
      color: #ffae63;
    }
  }
  span {
    color: #61fd53;
    font-family: Montserrat;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;

export const StyledSiderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 510px;
  height: 422px;
  border-radius: 16px;
  border: 1px solid #373a53;
  background: #262836;
`;

export const StyledSiderButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 470px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #543dc9;
  span {
    color: #fff;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`;

export const StyledRadialGradient = styled.div`
  position: absolute;
  left: -161px;
  bottom: -150px;
  width: 1090px;
  height: 300px;
  flex-shrink: 0;
  border-radius: 1090px;
  background: radial-gradient(50% 50% at 50% 50%, rgba(129, 237, 112, 0.3) 0%, rgba(129, 237, 112, 0) 100%);
  filter: blur(25px);
  z-index: 10;
`;
export const StyledBannerBg = styled.img`
  position: absolute;
  right: 115px;
  bottom: -55px;
  width: 492px;
`;
