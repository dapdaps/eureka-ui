import { styled } from 'styled-components';

const StyledWrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const StyledBg = styled.img`
  position: absolute;
  z-index: 0;
  object-fit: contain;
  object-position: center;
  flex-shrink: 0;
  pointer-events: none;
`;
const StyledBgLeftTop = styled(StyledBg)`
  width: 186px;
  height: 231px;
  left: 11%;
  top: 5%;
  @media (max-width: 768px) {
    width: 93px;
    height: 115px;
  }
`;
const StyledBgLeftBot = styled(StyledBg)`
  width: 325px;
  height: 314px;
  left: -7%;
  bottom: 1%;
  @media (max-width: 768px) {
    width: 163px;
    height: 157px;
  }
`;
const StyledBgRightTop = styled(StyledBg)`
  width: 230px;
  height: 294px;
  right: 2%;
  top: 1%;
  @media (max-width: 768px) {
    width: 115px;
    height: 147px;
  }
`;
const StyledBgRightBot = styled(StyledBg)`
  width: 314px;
  height: 205px;
  right: -7%;
  bottom: 1%;
  @media (max-width: 768px) {
    width: 157px;
    height: 103px;
  }
`;
const StyledLogo = styled.img`
  width: 168px;
  height: 45px;
  object-fit: contain;
  object-position: center;
  flex-shrink: 0;
  margin-top: 84px;
  position: relative;
  z-index: 1;
`;
const StyledCone = styled.img`
  width: 125px;
  height: 219px;
  object-fit: contain;
  object-position: center;
  flex-shrink: 0;
  margin-top: 73px;
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    width: 100px;
    height: 175px;
    margin-top: 30px;
  }
`;
const StyledContent = styled.div`
  width: 780px;
  position: relative;
  z-index: 1;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0 10px;
  }
`;
const StyledTitle = styled.div`
  color: #fff;
  text-align: center;
  text-shadow: 0px 0px 30px rgba(255, 255, 255, 0.6);
  font-family: Montserrat;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  margin-top: 30px;
  @media (max-width: 768px) {
    font-size: 26px;
    margin-top: 20px;
  }
`;
const StyledDescription = styled.div`
  color: #fff;
  text-align: center;
  text-shadow: 0px 0px 30px rgba(255, 255, 255, 0.6);
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 30px */
  margin-top: 45px;
  @media (max-width: 768px) {
    font-size: 18px;
    margin-top: 20px;
    line-height: 120%;
  }
`;
const StyledExpected = styled.div`
  color: #ebf479;
  text-align: center;
  text-shadow: 0px 0px 30px rgba(255, 255, 255, 0.6);
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  margin-top: 12px;
  @media (max-width: 768px) {
    font-size: 14px;
    margin-top: 10px;
    line-height: 120%;
  }
`;

const systemMaintenanceDowntimeExpected =
  process.env.NEXT_PUBLIC_SYSTEM_MAINTENANCE_DOWNTIME_EXPECTED || 'July 7, 2025 at 18:00 UTC';

const Downtime = () => {
  return (
    <StyledWrapper>
      <StyledBgLeftTop src="/images/downtime/bg-left-top.png" alt="" />
      <StyledBgLeftBot src="/images/downtime/bg-left-bot.png" alt="" />
      <StyledBgRightTop src="/images/downtime/bg-right-top.png" alt="" />
      <StyledBgRightBot src="/images/downtime/bg-right-bot.png" alt="" />
      <StyledLogo src="/assets/images/logo.png" alt="" />
      <StyledCone src="/images/downtime/icon-traffic-cone.png" alt="" />
      <StyledContent>
        <StyledTitle>Under Maintenance</StyledTitle>
        <StyledDescription>
          We're currently performing scheduled maintenance to improve your experience. Please check back soon.
        </StyledDescription>
        <StyledExpected>Expected to be back online: {systemMaintenanceDowntimeExpected}</StyledExpected>
      </StyledContent>
    </StyledWrapper>
  );
};

export default Downtime;
